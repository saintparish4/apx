// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {ProviderRegistry} from "../src/ProviderRegistry.sol";

contract ProviderRegistryTest is Test {
    ProviderRegistry public registry;

    address public admin = address(1);
    address public provider1 = address(2);
    address public provider2 = address(3);
    address public verifier = address(4);

    bytes32 public credentials1 = keccak256("provider1-npi-123456");
    bytes32 public credentials2 = keccak256("provider2-npi-789012");

    event ProviderRegistered(
        address indexed provider, bytes32 indexed credentialsHash, uint256 stake, uint256 timestamp
    );
    event ProviderActivated(address indexed provider, uint256 timestamp);
    event ReputationUpdated(
        address indexed provider, uint256 oldReputation, uint256 newReputation, string reason
    );

    function setUp() public {
        vm.startPrank(admin);
        registry = new ProviderRegistry();
        registry.grantRole(registry.VERIFIER_ROLE(), verifier);
        vm.stopPrank();

        // Fund test accounts
        vm.deal(provider1, 10 ether);
        vm.deal(provider2, 10 ether);
    }

    // ============ Registration Tests ============

    function test_RegisterProvider() public {
        vm.startPrank(provider1);

        vm.expectEmit(true, true, false, true);
        emit ProviderRegistered(provider1, credentials1, 0.1 ether, block.timestamp);

        registry.register{value: 0.1 ether}(credentials1);

        ProviderRegistry.Provider memory p = registry.getProvider(provider1);
        assertEq(p.walletAddress, provider1);
        assertEq(p.credentialsHash, credentials1);
        assertEq(p.stake, 0.1 ether);
        assertEq(p.reputation, 50); // INITIAL_REPUTATION
        assertEq(uint256(p.status), uint256(ProviderRegistry.ProviderStatus.Pending));

        vm.stopPrank();
    }

    function test_RevertWhen_InsufficientStake() public {
        vm.startPrank(provider1);

        vm.expectRevert(
            abi.encodeWithSelector(
                ProviderRegistry.InsufficientStake.selector, 0.05 ether, 0.1 ether
            )
        );
        registry.register{value: 0.05 ether}(credentials1);

        vm.stopPrank();
    }

    function test_RevertWhen_AlreadyRegistered() public {
        vm.startPrank(provider1);
        registry.register{value: 0.1 ether}(credentials1);

        vm.expectRevert(
            abi.encodeWithSelector(ProviderRegistry.ProviderAlreadyRegistered.selector, provider1)
        );
        registry.register{value: 0.1 ether}(credentials2);

        vm.stopPrank();
    }

    function test_RevertWhen_CredentialsAlreadyUsed() public {
        vm.prank(provider1);
        registry.register{value: 0.1 ether}(credentials1);

        vm.prank(provider2);
        vm.expectRevert(
            abi.encodeWithSelector(ProviderRegistry.CredentialsAlreadyUsed.selector, credentials1)
        );
        registry.register{value: 0.1 ether}(credentials1);
    }

    // ============ Activation Tests ============

    function test_ActivateProvider() public {
        // Register
        vm.prank(provider1);
        registry.register{value: 0.1 ether}(credentials1);

        // Activate
        vm.prank(admin);
        vm.expectEmit(true, false, false, true);
        emit ProviderActivated(provider1, block.timestamp);
        registry.activateProvider(provider1);

        ProviderRegistry.Provider memory p = registry.getProvider(provider1);
        assertEq(uint256(p.status), uint256(ProviderRegistry.ProviderStatus.Active));

        assertTrue(registry.isActiveProvider(provider1));
    }

    function test_RevertWhen_NonAdminActivates() public {
        vm.prank(provider1);
        registry.register{value: 0.1 ether}(credentials1);

        vm.prank(provider2);
        vm.expectRevert();
        registry.activateProvider(provider1);
    }

    // ============ Staking Tests ============

    function test_AddStake() public {
        vm.startPrank(provider1);
        registry.register{value: 0.1 ether}(credentials1);
        registry.addStake{value: 0.5 ether}();

        ProviderRegistry.Provider memory p = registry.getProvider(provider1);
        assertEq(p.stake, 0.6 ether);
        vm.stopPrank();
    }

    function test_WithdrawStake() public {
        vm.startPrank(provider1);
        registry.register{value: 1 ether}(credentials1);
        vm.stopPrank();

        vm.prank(admin);
        registry.activateProvider(provider1);

        uint256 balanceBefore = provider1.balance;

        vm.prank(provider1);
        registry.withdrawStake(0.5 ether);

        ProviderRegistry.Provider memory p = registry.getProvider(provider1);
        assertEq(p.stake, 0.5 ether);
        assertEq(provider1.balance, balanceBefore + 0.5 ether);
    }

    function test_RevertWhen_WithdrawBelowMinimum() public {
        vm.startPrank(provider1);
        registry.register{value: 0.1 ether}(credentials1);
        vm.stopPrank();

        vm.prank(admin);
        registry.activateProvider(provider1);

        vm.prank(provider1);
        vm.expectRevert(
            abi.encodeWithSelector(
                ProviderRegistry.WithdrawExceedsAvailable.selector, 0.01 ether, 0
            )
        );
        registry.withdrawStake(0.01 ether);
    }

    function test_SlashStake() public {
        vm.prank(provider1);
        registry.register{value: 1 ether}(credentials1);

        vm.prank(verifier);
        registry.slashStake(provider1, "Fraudulent claim detected");

        ProviderRegistry.Provider memory p = registry.getProvider(provider1);
        assertEq(p.stake, 0.9 ether); // 10% slashed
    }

    // ============ Reputation Tests ============

    function test_ReputationIncreasesOnApproval() public {
        vm.prank(provider1);
        registry.register{value: 0.1 ether}(credentials1);

        vm.prank(verifier);
        registry.recordClaimResult(provider1, true);

        ProviderRegistry.Provider memory p = registry.getProvider(provider1);
        assertEq(p.reputation, 51); // 50 + 1
        assertEq(p.approvedClaims, 1);
    }

    function test_ReputationDecreasesOnRejection() public {
        vm.prank(provider1);
        registry.register{value: 0.1 ether}(credentials1);

        vm.prank(verifier);
        registry.recordClaimResult(provider1, false);

        ProviderRegistry.Provider memory p = registry.getProvider(provider1);
        assertEq(p.reputation, 48); // 50 - 2
        assertEq(p.rejectedClaims, 1);
    }

    function test_ReputationCapsAt100() public {
        vm.prank(provider1);
        registry.register{value: 0.1 ether}(credentials1);

        vm.prank(admin);
        registry.setReputation(provider1, 99, "test");

        vm.prank(verifier);
        registry.recordClaimResult(provider1, true);

        vm.prank(verifier);
        registry.recordClaimResult(provider1, true);

        ProviderRegistry.Provider memory p = registry.getProvider(provider1);
        assertEq(p.reputation, 100); // Capped at MAX_REPUTATION
    }

    function test_ReputationFloorsAtZero() public {
        vm.prank(provider1);
        registry.register{value: 0.1 ether}(credentials1);

        vm.prank(admin);
        registry.setReputation(provider1, 1, "test");

        vm.prank(verifier);
        registry.recordClaimResult(provider1, false);

        ProviderRegistry.Provider memory p = registry.getProvider(provider1);
        assertEq(p.reputation, 0); // Floored at 0
    }

    // ============ Suspension/Revocation Tests ============

    function test_SuspendProvider() public {
        vm.prank(provider1);
        registry.register{value: 0.1 ether}(credentials1);

        vm.startPrank(admin);
        registry.activateProvider(provider1);
        registry.suspendProvider(provider1, "Investigation pending");
        vm.stopPrank();

        ProviderRegistry.Provider memory p = registry.getProvider(provider1);
        assertEq(uint256(p.status), uint256(ProviderRegistry.ProviderStatus.Suspended));
        assertFalse(registry.isActiveProvider(provider1));
    }

    function test_RevokeProvider() public {
        vm.prank(provider1);
        registry.register{value: 0.1 ether}(credentials1);

        vm.startPrank(admin);
        registry.activateProvider(provider1);
        registry.revokeProvider(provider1, "Fraudulent activity confirmed");
        vm.stopPrank();

        ProviderRegistry.Provider memory p = registry.getProvider(provider1);
        assertEq(uint256(p.status), uint256(ProviderRegistry.ProviderStatus.Revoked));
    }

    // ============ Pause Tests ============

    function test_PauseUnpause() public {
        vm.startPrank(admin);
        registry.pause();
        vm.stopPrank();

        vm.prank(provider1);
        vm.expectRevert();
        registry.register{value: 0.1 ether}(credentials1);

        vm.prank(admin);
        registry.unpause();

        vm.prank(provider1);
        registry.register{value: 0.1 ether}(credentials1);
        assertTrue(true); // Registration succeeded
    }

    // ============ View Function Tests ============

    function test_GetProviderCount() public {
        vm.prank(provider1);
        registry.register{value: 0.1 ether}(credentials1);

        vm.prank(provider2);
        registry.register{value: 0.1 ether}(credentials2);

        vm.prank(admin);
        registry.activateProvider(provider1);

        (uint256 total, uint256 active) = registry.getProviderCount();
        assertEq(total, 2);
        assertEq(active, 1);
    }

    function test_GetApprovalRate() public {
        vm.prank(provider1);
        registry.register{value: 0.1 ether}(credentials1);

        vm.startPrank(verifier);
        registry.recordClaimResult(provider1, true);
        registry.recordClaimResult(provider1, true);
        registry.recordClaimResult(provider1, false);
        registry.recordClaimResult(provider1, true);
        vm.stopPrank();

        uint256 rate = registry.getApprovalRate(provider1);
        assertEq(rate, 7500); // 75% in basis points
    }

    // ============ Fuzz Tests ============

    function testFuzz_RegisterWithValidStake(uint256 stake) public {
        vm.assume(stake >= 0.1 ether && stake <= 100 ether);
        vm.deal(provider1, stake);

        vm.prank(provider1);
        registry.register{value: stake}(credentials1);

        ProviderRegistry.Provider memory p = registry.getProvider(provider1);
        assertEq(p.stake, stake);
    }

    function testFuzz_SetReputationBounded(uint256 rep) public {
        vm.assume(rep <= 100);

        vm.prank(provider1);
        registry.register{value: 0.1 ether}(credentials1);

        vm.prank(admin);
        registry.setReputation(provider1, rep, "fuzz test");

        ProviderRegistry.Provider memory p = registry.getProvider(provider1);
        assertEq(p.reputation, rep);
    }

    function testFuzz_RevertWhen_InvalidReputation(uint256 rep) public {
        vm.assume(rep > 100);

        vm.prank(provider1);
        registry.register{value: 0.1 ether}(credentials1);

        vm.prank(admin);
        vm.expectRevert(abi.encodeWithSelector(ProviderRegistry.InvalidReputation.selector, rep));
        registry.setReputation(provider1, rep, "fuzz test");
    }
}
