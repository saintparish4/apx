// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {AccessControl} from "openzeppelin-contracts/contracts/access/AccessControl.sol";
import {ReentrancyGuard} from "openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import {Pausable} from "openzeppelin-contracts/contracts/utils/Pausable.sol";

/**
 * @title ProviderRegistry
 * @notice Manages healthcare provider registration, staking, and reputation tracking.
 * @dev Uses OpenZeppelin AccessControl for role-based permissions
 */
contract ProviderRegistry is AccessControl, ReentrancyGuard, Pausable {
    // =========== Constants ===========
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");

    uint256 public constant MIN_STAKE = 0.1 ether;
    uint256 public constant MAX_REPUTATION = 100;
    uint256 public constant INITIAL_REPUTATION = 50;
    uint256 public constant SLASH_PERCENTAGE = 10; // 10% slash for fraud

    // =========== Types ===========
    enum ProviderStatus {
        None,
        Pending,
        Active,
        Suspended,
        Revoked
    }

    struct Provider {
        address walletAddress;
        bytes32 credentialsHash; // Hash of off-chain credentials (NPI, license, etc.)

        uint256 stake;
        uint256 reputation;
        uint256 totalClaimsSubmitted;
        uint256 approvedClaims;
        uint256 rejectedClaims;
        uint256 registeredAt;
        uint256 lastActivityAt;
        ProviderStatus status;
    }

    // =========== State ===========
    mapping(address => Provider) public providers;
    mapping(bytes32 => address) public credentialsToProvider; // Prevent duplicate registrations
    address[] public providerAddresses;

    uint256 public totalStaked;
    uint256 public totalProviders;
    uint256 public activeProviders;

    // =========== Events ===========
    event ProviderRegistered(
        address indexed provider, bytes32 indexed credentialsHash, uint256 stake, uint256 timestamp
    );
    event ProviderActivated(address indexed provider, uint256 timestamp);
    event ProviderSuspended(address indexed provider, string reason, uint256 timestamp);
    event ProviderRevoked(address indexed provider, string reason, uint256 timestamp);
    event StakeAdded(address indexed provider, uint256 amount, uint256 newTotal);
    event StakeWithdrawn(address indexed provider, uint256 amount, uint256 remaining);

    event StakeSlashed(address indexed provider, uint256 amount, string reason, uint256 newTotal);
    event ReputationUpdated(
        address indexed provider, uint256 oldReputation, uint256 newReputation, string reason
    );
    event ClaimProcessed(
        address indexed provider, bool approved, uint256 newApproved, uint256 newRejected
    );
    event ClaimRecorded(
        address indexed provider, bool approved, uint256 newApproved, uint256 newRejected
    );

    // =========== Errors ===========
    error InsufficientStake(uint256 provided, uint256 required);
    error ProviderNotFound(address provider);
    error ProviderAlreadyRegistered(address provider);
    error CredentialsAlreadyUsed(bytes32 credentialsHash);
    error InvalidProviderStatus(ProviderStatus current, ProviderStatus required);
    error InvalidReputation(uint256 value);
    error WithdrawExceedsAvailable(uint256 requested, uint256 available);
    error ZeroAddress();

    // =========== Constructor ===========
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    // =========== External Functions ===========

    /**
     * @notice Register as a healthcare provider
     * @param credentialsHash Hash of provider credentials (NPI, license, etc.)
     */
    function register(bytes32 credentialsHash) external payable nonReentrant whenNotPaused {
        if (msg.sender == address(0)) revert ZeroAddress();
        if (providers[msg.sender].status != ProviderStatus.None) {
            revert ProviderAlreadyRegistered(msg.sender);
        }
        if (credentialsToProvider[credentialsHash] != address(0)) {
            revert CredentialsAlreadyUsed(credentialsHash);
        }
        if (msg.value < MIN_STAKE) {
            revert InsufficientStake(msg.value, MIN_STAKE);
        }

        providers[msg.sender] = Provider({
            walletAddress: msg.sender,
            credentialsHash: credentialsHash,
            stake: msg.value,
            reputation: INITIAL_REPUTATION,
            totalClaimsSubmitted: 0,
            approvedClaims: 0,
            rejectedClaims: 0,
            registeredAt: block.timestamp,
            lastActivityAt: block.timestamp,
            status: ProviderStatus.Pending
        });

        credentialsToProvider[credentialsHash] = msg.sender;
        providerAddresses.push(msg.sender);
        totalStaked += msg.value;
        totalProviders++;

        emit ProviderRegistered(msg.sender, credentialsHash, msg.value, block.timestamp);
    }

    /**
     * @notice Activate a pending provider (admin only)
     * @param provider Address of the provider to activate
     */
    function activateProvider(address provider) external onlyRole(ADMIN_ROLE) {
        Provider storage p = providers[provider];
        if (p.status == ProviderStatus.None) revert ProviderNotFound(provider);
        if (p.status != ProviderStatus.Pending) {
            revert InvalidProviderStatus(p.status, ProviderStatus.Pending);
        }

        p.status = ProviderStatus.Active;
        p.lastActivityAt = block.timestamp;
        activeProviders++;

        emit ProviderActivated(provider, block.timestamp);
    }

    /**
     * @notice Suspend a provider
     * @param provider Address of the provider to suspend
     * @param reason Reason for suspension
     */
    function suspendProvider(address provider, string calldata reason)
        external
        onlyRole(ADMIN_ROLE)
    {
        Provider storage p = providers[provider];
        if (p.status == ProviderStatus.None) revert ProviderNotFound(provider);
        if (p.status != ProviderStatus.Active) {
            revert InvalidProviderStatus(p.status, ProviderStatus.Active);
        }

        p.status = ProviderStatus.Suspended;
        p.lastActivityAt = block.timestamp;
        activeProviders--;

        emit ProviderSuspended(provider, reason, block.timestamp);
    }

    /**
     * @notice Revoke a provider permanently
     * @param provider Address of the provider to revoke
     * @param reason Reason for revocation
     */
    function revokeProvider(address provider, string calldata reason)
        external
        onlyRole(ADMIN_ROLE)
    {
        Provider storage p = providers[provider];
        if (p.status == ProviderStatus.None) revert ProviderNotFound(provider);
        if (p.status == ProviderStatus.Active) {
            activeProviders--;
        }

        p.status = ProviderStatus.Revoked;
        p.lastActivityAt = block.timestamp;

        emit ProviderRevoked(provider, reason, block.timestamp);
    }

    /**
     * @notice Add additional stake
     */
    function addStake() external payable nonReentrant whenNotPaused {
        Provider storage p = providers[msg.sender];
        if (p.status == ProviderStatus.None) revert ProviderNotFound(msg.sender);

        p.stake += msg.value;
        p.lastActivityAt = block.timestamp;
        totalStaked += msg.value;

        emit StakeAdded(msg.sender, msg.value, totalStaked);
    }

    /**
     * @notice Withdraw stake (only if above minimum and not suspended/revoked)
     * @param amount Amount to withdraw
     */
    function withdrawStake(uint256 amount) external nonReentrant whenNotPaused {
        Provider storage p = providers[msg.sender];
        if (p.status == ProviderStatus.None) revert ProviderNotFound(msg.sender);
        if (p.status == ProviderStatus.Suspended || p.status == ProviderStatus.Revoked) {
            revert InvalidProviderStatus(p.status, ProviderStatus.Active);
        }

        uint256 withdrawable = p.stake > MIN_STAKE ? p.stake - MIN_STAKE : 0;
        if (amount > withdrawable) {
            revert WithdrawExceedsAvailable(amount, withdrawable);
        }

        p.stake -= amount;
        p.lastActivityAt = block.timestamp;
        totalStaked -= amount;

        (bool success,) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        emit StakeWithdrawn(msg.sender, amount, p.stake);
    }

    /**
     * @notice Slash provider stake for fraudulent activity
     * @param provider Address of the provider to slash
     * @param reason Reason for slashing
     */
    function slashStake(address provider, string calldata reason) external onlyRole(VERIFIER_ROLE) {
        Provider storage p = providers[provider];
        if (p.status == ProviderStatus.None) revert ProviderNotFound(provider);

        uint256 slashAmount = (p.stake * SLASH_PERCENTAGE) / 100;
        p.stake -= slashAmount;
        p.lastActivityAt = block.timestamp;
        totalStaked -= slashAmount;

        // Slashed funds go to contract (could be distributed to verifiers)
        emit StakeSlashed(provider, slashAmount, reason, p.stake);
    }

    /**
     * @notice Record a claim submission result (called by ClaimsRegistry)
     * @param provider Address of the provider
     * @param approved Whether the claim was approved
     */
    function recordClaimResult(address provider, bool approved) external onlyRole(VERIFIER_ROLE) {
        Provider storage p = providers[provider];
        if (p.status == ProviderStatus.None) revert ProviderNotFound(provider);

        p.totalClaimsSubmitted++;
        p.lastActivityAt = block.timestamp;

        if (approved) {
            p.approvedClaims++;
            _increaseReputation(provider, 1);
        } else {
            p.rejectedClaims++;
            _decreaseReputation(provider, 2);
        }

        emit ClaimRecorded(provider, approved, p.approvedClaims, p.rejectedClaims);
    }

    /**
     * @notice Manually adjust reputation (admin only)
     * @param provider Address of the provider
     * @param newReputation New reputation value (0-100)
     * @param reason Reason for adjustment
     */
    function setReputation(address provider, uint256 newReputation, string calldata reason)
        external
        onlyRole(ADMIN_ROLE)
    {
        if (newReputation > MAX_REPUTATION) revert InvalidReputation(newReputation);

        Provider storage p = providers[provider];
        if (p.status == ProviderStatus.None) revert ProviderNotFound(provider);

        uint256 oldReputation = p.reputation;
        p.reputation = newReputation;
        p.lastActivityAt = block.timestamp;

        emit ReputationUpdated(provider, oldReputation, newReputation, reason);
    }

    // ============ View Functions ============

    /**
     * @notice Check if a provider is active and can submit claims
     */
    function isActiveProvider(address provider) external view returns (bool) {
        return providers[provider].status == ProviderStatus.Active;
    }

    /**
     * @notice Get provider details
     */
    function getProvider(address provider) external view returns (Provider memory) {
        return providers[provider];
    }

    /**
     * @notice Get provider count
     */
    function getProviderCount() external view returns (uint256 total, uint256 active) {
        return (totalProviders, activeProviders);
    }

    /**
     * @notice Get all provider addresses (paginated)
     * @param offset Starting index
     * @param limit Maximum number to return
     */
    function getProviderAddresses(uint256 offset, uint256 limit)
        external
        view
        returns (address[] memory)
    {
        uint256 end = offset + limit;
        if (end > providerAddresses.length) {
            end = providerAddresses.length;
        }

        uint256 length = end > offset ? end - offset : 0;
        address[] memory result = new address[](length);

        for (uint256 i = 0; i < length; i++) {
            result[i] = providerAddresses[offset + i];
        }

        return result;
    }

    /**
     * @notice Calculate provider's approval rate (basis points)
     */
    function getApprovalRate(address provider) external view returns (uint256) {
        Provider storage p = providers[provider];
        if (p.totalClaimsSubmitted == 0) return 0;
        return (p.approvedClaims * 10_000) / p.totalClaimsSubmitted;
    }

    // ============ Admin Functions ============

    function pause() external onlyRole(ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(ADMIN_ROLE) {
        _unpause();
    }

    /**
     * @notice Withdraw slashed funds (admin only)
     */
    function withdrawSlashedFunds(address payable recipient, uint256 amount)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
        nonReentrant
    {
        uint256 available = address(this).balance - totalStaked;
        require(amount <= available, "Insufficient slashed funds");

        (bool success,) = recipient.call{value: amount}("");
        require(success, "Transfer failed");
    }

    // ============ Internal Functions ============

    function _increaseReputation(address provider, uint256 amount) internal {
        Provider storage p = providers[provider];
        uint256 oldReputation = p.reputation;
        uint256 newReputation = p.reputation + amount;
        if (newReputation > MAX_REPUTATION) {
            newReputation = MAX_REPUTATION;
        }
        p.reputation = newReputation;

        emit ReputationUpdated(provider, oldReputation, newReputation, "claim_approved");
    }

    function _decreaseReputation(address provider, uint256 amount) internal {
        Provider storage p = providers[provider];
        uint256 oldReputation = p.reputation;
        uint256 newReputation = p.reputation > amount ? p.reputation - amount : 0;
        p.reputation = newReputation;

        emit ReputationUpdated(provider, oldReputation, newReputation, "claim_rejected");
    }
}
