// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {AccessControl} from "openzeppelin-contracts/contracts/access/AccessControl.sol";
import {ReentrancyGuard} from "openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import {Pausable} from "openzeppelin-contracts/contracts/utils/Pausable.sol";
import {ProviderRegistry} from "./ProviderRegistry.sol";

/**
 * @title ClaimsRegistry
 * @notice Manages healthcare claim submission, verification, and lifecycle
 * @dev Stores claim hashes on-chain, full data stored off-chain (IPFS)
 */
contract ClaimsRegistry is AccessControl, ReentrancyGuard, Pausable {
    // ============ Constants ============
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");

    uint256 public constant VERIFICATION_THRESHOLD = 2; // Minimum verifiers needed
    uint256 public constant VERIFICATION_WINDOW = 7 days;
    uint256 public constant MAX_CLAIM_AMOUNT = 1_000_000 * 1e18; // $1M max claim

    // ============ Types ============
    enum ClaimStatus {
        None,
        Submitted,
        UnderReview,
        Approved,
        Rejected,
        Disputed,
        Expired
    }

    struct Claim {
        bytes32 claimId;
        address provider;
        bytes32 dataHash; // Keccak256 of claim data
        string ipfsCid; // IPFS Content ID for full data
        uint256 amount; // Claim amount in wei (or smallest unit)
        uint256 submittedAt;
        uint256 verifiedAt;
        ClaimStatus status;
        uint256 approvalsCount;
        uint256 rejectionsCount;
        string rejectionReason;
    }

    struct Verification {
        address verifier;
        bool approved;
        string reason;
        uint256 timestamp;
    }

    // ============ State ============
    ProviderRegistry public providerRegistry;

    mapping(bytes32 => Claim) public claims;
    mapping(bytes32 => mapping(address => Verification)) public verifications;
    mapping(bytes32 => address[]) public claimVerifiers;
    mapping(address => bytes32[]) public providerClaims;

    bytes32[] public allClaimIds;
    uint256 public totalClaims;
    uint256 public approvedClaims;
    uint256 public rejectedClaims;
    uint256 public totalAmountApproved;

    // ============ Events ============
    event ClaimSubmitted(
        bytes32 indexed claimId,
        address indexed provider,
        bytes32 dataHash,
        string ipfsCid,
        uint256 amount,
        uint256 timestamp
    );

    event ClaimVerificationSubmitted(
        bytes32 indexed claimId,
        address indexed verifier,
        bool approved,
        string reason,
        uint256 timestamp
    );

    event ClaimStatusChanged(
        bytes32 indexed claimId, ClaimStatus oldStatus, ClaimStatus newStatus, uint256 timestamp
    );

    event ClaimDisputed(
        bytes32 indexed claimId, address indexed disputedBy, string reason, uint256 timestamp
    );

    event ClaimExpired(bytes32 indexed claimId, uint256 timestamp);

    // ============ Errors ============
    error ProviderNotActive(address provider);
    error ClaimNotFound(bytes32 claimId);
    error ClaimAlreadyExists(bytes32 claimId);
    error InvalidClaimStatus(ClaimStatus current, ClaimStatus required);
    error AlreadyVerified(bytes32 claimId, address verifier);
    error InvalidClaimAmount(uint256 amount);
    error EmptyIPFSCid();
    error VerificationWindowExpired(bytes32 claimId);
    error InsufficientVerifications(uint256 current, uint256 required);

    // ============ Constructor ============
    constructor(address _providerRegistry) {
        providerRegistry = ProviderRegistry(_providerRegistry);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    // ============ External Functions ============

    /**
     * @notice Submit a new healthcare claim
     * @param dataHash Keccak256 hash of the claim data
     * @param ipfsCid IPFS Content ID where full claim data is stored
     * @param amount Claim amount
     * @return claimId The unique identifier for this claim
     */
    function submitClaim(bytes32 dataHash, string calldata ipfsCid, uint256 amount)
        external
        nonReentrant
        whenNotPaused
        returns (bytes32 claimId)
    {
        // Verify provider is active
        if (!providerRegistry.isActiveProvider(msg.sender)) {
            revert ProviderNotActive(msg.sender);
        }

        // Validate inputs
        if (bytes(ipfsCid).length == 0) revert EmptyIPFSCid();
        if (amount == 0 || amount > MAX_CLAIM_AMOUNT) {
            revert InvalidClaimAmount(amount);
        }

        // Generate unique claim ID
        claimId = keccak256(abi.encodePacked(msg.sender, dataHash, block.timestamp, block.number));

        if (claims[claimId].status != ClaimStatus.None) {
            revert ClaimAlreadyExists(claimId);
        }

        // Store claim
        claims[claimId] = Claim({
            claimId: claimId,
            provider: msg.sender,
            dataHash: dataHash,
            ipfsCid: ipfsCid,
            amount: amount,
            submittedAt: block.timestamp,
            verifiedAt: 0,
            status: ClaimStatus.Submitted,
            approvalsCount: 0,
            rejectionsCount: 0,
            rejectionReason: ""
        });

        providerClaims[msg.sender].push(claimId);
        allClaimIds.push(claimId);
        totalClaims++;

        emit ClaimSubmitted(claimId, msg.sender, dataHash, ipfsCid, amount, block.timestamp);

        return claimId;
    }

    /**
     * @notice Submit verification for a claim (verifier only)
     * @param claimId The claim to verify
     * @param approved Whether to approve or reject
     * @param reason Reason for the decision
     */
    function submitVerification(bytes32 claimId, bool approved, string calldata reason)
        external
        onlyRole(VERIFIER_ROLE)
        nonReentrant
        whenNotPaused
    {
        Claim storage claim = claims[claimId];

        // Validate claim state
        if (claim.status == ClaimStatus.None) revert ClaimNotFound(claimId);
        if (claim.status != ClaimStatus.Submitted && claim.status != ClaimStatus.UnderReview) {
            revert InvalidClaimStatus(claim.status, ClaimStatus.Submitted);
        }

        // Check verification window
        if (block.timestamp > claim.submittedAt + VERIFICATION_WINDOW) {
            revert VerificationWindowExpired(claimId);
        }

        // Check if already verified by this verifier
        if (verifications[claimId][msg.sender].timestamp != 0) {
            revert AlreadyVerified(claimId, msg.sender);
        }

        // Store verification
        verifications[claimId][msg.sender] = Verification({
            verifier: msg.sender, approved: approved, reason: reason, timestamp: block.timestamp
        });
        claimVerifiers[claimId].push(msg.sender);

        // Update counts
        if (approved) {
            claim.approvalsCount++;
        } else {
            claim.rejectionsCount++;
            if (bytes(claim.rejectionReason).length == 0) {
                claim.rejectionReason = reason;
            }
        }

        // Update status to UnderReview if first verification
        if (claim.status == ClaimStatus.Submitted) {
            _updateStatus(claimId, ClaimStatus.UnderReview);
        }

        emit ClaimVerificationSubmitted(claimId, msg.sender, approved, reason, block.timestamp);

        // Check if we have enough verifications to finalize
        _checkAndFinalize(claimId);
    }

    /**
     * @notice Dispute an approved or rejected claim
     * @param claimId The claim to dispute
     * @param reason Reason for dispute
     */
    function disputeClaim(bytes32 claimId, string calldata reason) external whenNotPaused {
        Claim storage claim = claims[claimId];

        if (claim.status == ClaimStatus.None) revert ClaimNotFound(claimId);

        // Only provider or admin can dispute
        require(
            claim.provider == msg.sender || hasRole(ADMIN_ROLE, msg.sender),
            "Not authorized to dispute"
        );

        // Can only dispute approved or rejected claims
        require(
            claim.status == ClaimStatus.Approved || claim.status == ClaimStatus.Rejected,
            "Cannot dispute this claim"
        );

        _updateStatus(claimId, ClaimStatus.Disputed);

        emit ClaimDisputed(claimId, msg.sender, reason, block.timestamp);
    }

    /**
     * @notice Mark expired claims (can be called by anyone)
     * @param claimId The claim to check for expiration
     */
    function expireClaim(bytes32 claimId) external {
        Claim storage claim = claims[claimId];

        if (claim.status == ClaimStatus.None) revert ClaimNotFound(claimId);

        // Can only expire Submitted or UnderReview claims past the window
        require(
            claim.status == ClaimStatus.Submitted || claim.status == ClaimStatus.UnderReview,
            "Cannot expire this claim"
        );

        require(
            block.timestamp > claim.submittedAt + VERIFICATION_WINDOW,
            "Verification window still open"
        );

        _updateStatus(claimId, ClaimStatus.Expired);

        emit ClaimExpired(claimId, block.timestamp);
    }

    /**
     * @notice Force finalize a claim (admin only, for edge cases)
     * @param claimId The claim to finalize
     * @param approved Whether to approve
     * @param reason Reason for decision
     */
    function adminFinalize(bytes32 claimId, bool approved, string calldata reason)
        external
        onlyRole(ADMIN_ROLE)
    {
        Claim storage claim = claims[claimId];

        if (claim.status == ClaimStatus.None) revert ClaimNotFound(claimId);

        ClaimStatus newStatus = approved ? ClaimStatus.Approved : ClaimStatus.Rejected;
        _updateStatus(claimId, newStatus);

        if (!approved) {
            claim.rejectionReason = reason;
        }

        claim.verifiedAt = block.timestamp;

        // Update provider stats
        providerRegistry.recordClaimResult(claim.provider, approved);

        // Update totals
        if (approved) {
            approvedClaims++;
            totalAmountApproved += claim.amount;
        } else {
            rejectedClaims++;
        }
    }

    // ============ View Functions ============

    /**
     * @notice Get claim details
     */
    function getClaim(bytes32 claimId) external view returns (Claim memory) {
        return claims[claimId];
    }

    /**
     * @notice Get all verifications for a claim
     */
    function getClaimVerifications(bytes32 claimId) external view returns (Verification[] memory) {
        address[] memory verifierAddrs = claimVerifiers[claimId];
        Verification[] memory result = new Verification[](verifierAddrs.length);

        for (uint256 i = 0; i < verifierAddrs.length; i++) {
            result[i] = verifications[claimId][verifierAddrs[i]];
        }

        return result;
    }

    /**
     * @notice Get claims by provider (paginated)
     */
    function getProviderClaims(address provider, uint256 offset, uint256 limit)
        external
        view
        returns (bytes32[] memory)
    {
        bytes32[] storage pClaims = providerClaims[provider];
        uint256 end = offset + limit;
        if (end > pClaims.length) {
            end = pClaims.length;
        }

        uint256 length = end > offset ? end - offset : 0;
        bytes32[] memory result = new bytes32[](length);

        for (uint256 i = 0; i < length; i++) {
            result[i] = pClaims[offset + i];
        }

        return result;
    }

    /**
     * @notice Get claims by status (paginated)
     * @dev This is expensive - for production, use off-chain indexing
     */
    function getClaimsByStatus(ClaimStatus status, uint256 offset, uint256 limit)
        external
        view
        returns (bytes32[] memory)
    {
        // First pass: count matching claims
        uint256 count = 0;
        for (uint256 i = 0; i < allClaimIds.length; i++) {
            if (claims[allClaimIds[i]].status == status) {
                count++;
            }
        }

        // Second pass: collect with pagination
        bytes32[] memory result = new bytes32[](limit);
        uint256 found = 0;
        uint256 added = 0;

        for (uint256 i = 0; i < allClaimIds.length && added < limit; i++) {
            if (claims[allClaimIds[i]].status == status) {
                if (found >= offset) {
                    result[added] = allClaimIds[i];
                    added++;
                }
                found++;
            }
        }

        // Resize array
        assembly {
            mstore(result, added)
        }

        return result;
    }

    /**
     * @notice Get total claims count
     */
    function getClaimsCount()
        external
        view
        returns (uint256 total, uint256 approved, uint256 rejected)
    {
        return (totalClaims, approvedClaims, rejectedClaims);
    }

    /**
     * @notice Verify claim data integrity
     * @param claimId The claim to verify
     * @param data The original claim data
     * @return valid Whether the hash matches
     */
    function verifyClaimData(bytes32 claimId, bytes calldata data)
        external
        view
        returns (bool valid)
    {
        return claims[claimId].dataHash == keccak256(data);
    }

    // ============ Admin Functions ============

    function setProviderRegistry(address _providerRegistry) external onlyRole(DEFAULT_ADMIN_ROLE) {
        providerRegistry = ProviderRegistry(_providerRegistry);
    }

    function pause() external onlyRole(ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(ADMIN_ROLE) {
        _unpause();
    }

    // ============ Internal Functions ============

    function _updateStatus(bytes32 claimId, ClaimStatus newStatus) internal {
        ClaimStatus oldStatus = claims[claimId].status;
        claims[claimId].status = newStatus;

        emit ClaimStatusChanged(claimId, oldStatus, newStatus, block.timestamp);
    }

    function _checkAndFinalize(bytes32 claimId) internal {
        Claim storage claim = claims[claimId];

        uint256 totalVerifications = claim.approvalsCount + claim.rejectionsCount;

        // Need minimum threshold
        if (totalVerifications < VERIFICATION_THRESHOLD) {
            return;
        }

        // Don't finalize on a tie - need clear majority
        if (claim.approvalsCount == claim.rejectionsCount) {
            return;
        }

        // Determine outcome based on majority
        bool approved = claim.approvalsCount > claim.rejectionsCount;

        ClaimStatus newStatus = approved ? ClaimStatus.Approved : ClaimStatus.Rejected;

        _updateStatus(claimId, newStatus);
        claim.verifiedAt = block.timestamp;

        // Update provider stats
        providerRegistry.recordClaimResult(claim.provider, approved);

        // Update totals
        if (approved) {
            approvedClaims++;
            totalAmountApproved += claim.amount;
        } else {
            rejectedClaims++;
        }
    }
}

