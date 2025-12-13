// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {ClaimsRegistry} from "../src/ClaimsRegistry.sol";
import {ProviderRegistry} from "../src/ProviderRegistry.sol";

contract ClaimsRegistryTest is Test {
    ProviderRegistry public providerRegistry;
    ClaimsRegistry public claimsRegistry;

    address public admin = address(1);
    address public provider1 = address(2);
    address public provider2 = address(3);
    address public verifier1 = address(4);
    address public verifier2 = address(5);
    address public verifier3 = address(6);

    bytes32 public credentials1 = keccak256("provider1-npi-123456");

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
        bytes32 indexed claimId,
        ClaimsRegistry.ClaimStatus oldStatus,
        ClaimsRegistry.ClaimStatus newStatus,
        uint256 timestamp
    );

    function setUp() public {
        vm.startPrank(admin);

        // Deploy provider registry
        providerRegistry = new ProviderRegistry();

        // Deploy claims registry
        claimsRegistry = new ClaimsRegistry(address(providerRegistry));

        // Grant roles
        providerRegistry.grantRole(providerRegistry.VERIFIER_ROLE(), address(claimsRegistry));
        claimsRegistry.grantRole(claimsRegistry.VERIFIER_ROLE(), verifier1);
        claimsRegistry.grantRole(claimsRegistry.VERIFIER_ROLE(), verifier2);
        claimsRegistry.grantRole(claimsRegistry.VERIFIER_ROLE(), verifier3);

        vm.stopPrank();

        // Fund and register provider
        vm.deal(provider1, 10 ether);
        vm.prank(provider1);
        providerRegistry.register{value: 0.1 ether}(credentials1);

        vm.prank(admin);
        providerRegistry.activateProvider(provider1);
    }

    // ============ Helper Functions ============

    function _submitTestClaim() internal returns (bytes32 claimId) {
        bytes32 dataHash = keccak256("test-claim-data");
        string memory ipfsCid = "QmTest123456789";
        uint256 amount = 1000 ether;

        vm.prank(provider1);
        claimId = claimsRegistry.submitClaim(dataHash, ipfsCid, amount);
    }

    // ============ Submission Tests ============

    function test_SubmitClaim() public {
        bytes32 dataHash = keccak256("test-claim-data");
        string memory ipfsCid = "QmTest123456789";
        uint256 amount = 1000 ether;

        vm.prank(provider1);
        bytes32 claimId = claimsRegistry.submitClaim(dataHash, ipfsCid, amount);

        ClaimsRegistry.Claim memory claim = claimsRegistry.getClaim(claimId);
        assertEq(claim.provider, provider1);
        assertEq(claim.dataHash, dataHash);
        assertEq(keccak256(bytes(claim.ipfsCid)), keccak256(bytes(ipfsCid)));
        assertEq(claim.amount, amount);
        assertEq(uint256(claim.status), uint256(ClaimsRegistry.ClaimStatus.Submitted));
    }

    function test_RevertWhen_InactiveProviderSubmits() public {
        vm.prank(provider2); // Not registered
        vm.expectRevert(
            abi.encodeWithSelector(ClaimsRegistry.ProviderNotActive.selector, provider2)
        );
        claimsRegistry.submitClaim(keccak256("data"), "QmTest", 1000 ether);
    }

    function test_RevertWhen_EmptyIPFSCid() public {
        vm.prank(provider1);
        vm.expectRevert(ClaimsRegistry.EmptyIPFSCid.selector);
        claimsRegistry.submitClaim(keccak256("data"), "", 1000 ether);
    }

    function test_RevertWhen_ZeroAmount() public {
        vm.prank(provider1);
        vm.expectRevert(abi.encodeWithSelector(ClaimsRegistry.InvalidClaimAmount.selector, 0));
        claimsRegistry.submitClaim(keccak256("data"), "QmTest", 0);
    }

    function test_RevertWhen_ExceedsMaxAmount() public {
        uint256 maxAmount = claimsRegistry.MAX_CLAIM_AMOUNT();
        vm.prank(provider1);
        vm.expectRevert(
            abi.encodeWithSelector(ClaimsRegistry.InvalidClaimAmount.selector, maxAmount + 1)
        );
        claimsRegistry.submitClaim(keccak256("data"), "QmTest", maxAmount + 1);
    }

    // ============ Verification Tests ============

    function test_SingleVerification() public {
        bytes32 claimId = _submitTestClaim();

        vm.prank(verifier1);
        claimsRegistry.submitVerification(claimId, true, "Looks good");

        ClaimsRegistry.Claim memory claim = claimsRegistry.getClaim(claimId);
        assertEq(claim.approvalsCount, 1);
        assertEq(uint256(claim.status), uint256(ClaimsRegistry.ClaimStatus.UnderReview));
    }

    function test_ClaimApprovedWithThreshold() public {
        bytes32 claimId = _submitTestClaim();

        vm.prank(verifier1);
        claimsRegistry.submitVerification(claimId, true, "Approved");

        vm.prank(verifier2);
        claimsRegistry.submitVerification(claimId, true, "Approved");

        ClaimsRegistry.Claim memory claim = claimsRegistry.getClaim(claimId);
        assertEq(uint256(claim.status), uint256(ClaimsRegistry.ClaimStatus.Approved));
        assertEq(claim.approvalsCount, 2);
    }

    function test_ClaimRejectedWithThreshold() public {
        bytes32 claimId = _submitTestClaim();

        vm.prank(verifier1);
        claimsRegistry.submitVerification(claimId, false, "Invalid data");

        vm.prank(verifier2);
        claimsRegistry.submitVerification(claimId, false, "Suspicious pattern");

        ClaimsRegistry.Claim memory claim = claimsRegistry.getClaim(claimId);
        assertEq(uint256(claim.status), uint256(ClaimsRegistry.ClaimStatus.Rejected));
        assertEq(claim.rejectionsCount, 2);
    }

    function test_MajorityDecides() public {
        bytes32 claimId = _submitTestClaim();

        vm.prank(verifier1);
        claimsRegistry.submitVerification(claimId, true, "Good");

        vm.prank(verifier2);
        claimsRegistry.submitVerification(claimId, false, "Bad");

        // Tie, not finalized
        ClaimsRegistry.Claim memory claim = claimsRegistry.getClaim(claimId);
        assertEq(uint256(claim.status), uint256(ClaimsRegistry.ClaimStatus.UnderReview));

        // Third vote breaks tie
        vm.prank(verifier3);
        claimsRegistry.submitVerification(claimId, true, "Good");

        claim = claimsRegistry.getClaim(claimId);
        assertEq(uint256(claim.status), uint256(ClaimsRegistry.ClaimStatus.Approved));
    }

    function test_RevertWhen_DuplicateVerification() public {
        bytes32 claimId = _submitTestClaim();

        vm.startPrank(verifier1);
        claimsRegistry.submitVerification(claimId, true, "Good");

        vm.expectRevert(
            abi.encodeWithSelector(ClaimsRegistry.AlreadyVerified.selector, claimId, verifier1)
        );
        claimsRegistry.submitVerification(claimId, true, "Good again");
        vm.stopPrank();
    }

    function test_RevertWhen_VerificationWindowExpired() public {
        bytes32 claimId = _submitTestClaim();

        // Warp past verification window
        vm.warp(block.timestamp + 8 days);

        vm.prank(verifier1);
        vm.expectRevert(
            abi.encodeWithSelector(ClaimsRegistry.VerificationWindowExpired.selector, claimId)
        );
        claimsRegistry.submitVerification(claimId, true, "Too late");
    }

    // ============ Claim Lifecycle Tests ============

    function test_ExpireClaim() public {
        bytes32 claimId = _submitTestClaim();

        // Warp past verification window
        vm.warp(block.timestamp + 8 days);

        claimsRegistry.expireClaim(claimId);

        ClaimsRegistry.Claim memory claim = claimsRegistry.getClaim(claimId);
        assertEq(uint256(claim.status), uint256(ClaimsRegistry.ClaimStatus.Expired));
    }

    function test_DisputeClaim() public {
        bytes32 claimId = _submitTestClaim();

        // Approve the claim
        vm.prank(verifier1);
        claimsRegistry.submitVerification(claimId, true, "OK");
        vm.prank(verifier2);
        claimsRegistry.submitVerification(claimId, true, "OK");

        // Provider disputes
        vm.prank(provider1);
        claimsRegistry.disputeClaim(claimId, "Incorrect amount");

        ClaimsRegistry.Claim memory claim = claimsRegistry.getClaim(claimId);
        assertEq(uint256(claim.status), uint256(ClaimsRegistry.ClaimStatus.Disputed));
    }

    function test_AdminFinalize() public {
        bytes32 claimId = _submitTestClaim();

        vm.prank(admin);
        claimsRegistry.adminFinalize(claimId, true, "Admin override");

        ClaimsRegistry.Claim memory claim = claimsRegistry.getClaim(claimId);
        assertEq(uint256(claim.status), uint256(ClaimsRegistry.ClaimStatus.Approved));
    }

    // ============ Data Integrity Tests ============

    function test_VerifyClaimData() public {
        bytes memory claimData = "patient:123,procedure:CPT99213,amount:150";
        bytes32 dataHash = keccak256(claimData);

        vm.prank(provider1);
        bytes32 claimId = claimsRegistry.submitClaim(dataHash, "QmTest", 150 ether);

        assertTrue(claimsRegistry.verifyClaimData(claimId, claimData));
        assertFalse(claimsRegistry.verifyClaimData(claimId, "wrong data"));
    }

    // ============ Provider Stats Tests ============

    function test_ProviderStatsUpdatedOnApproval() public {
        bytes32 claimId = _submitTestClaim();

        vm.prank(verifier1);
        claimsRegistry.submitVerification(claimId, true, "OK");
        vm.prank(verifier2);
        claimsRegistry.submitVerification(claimId, true, "OK");

        ProviderRegistry.Provider memory p = providerRegistry.getProvider(provider1);
        assertEq(p.approvedClaims, 1);
        assertGt(p.reputation, 50); // Should increase
    }

    function test_ProviderStatsUpdatedOnRejection() public {
        bytes32 claimId = _submitTestClaim();

        vm.prank(verifier1);
        claimsRegistry.submitVerification(claimId, false, "Bad");
        vm.prank(verifier2);
        claimsRegistry.submitVerification(claimId, false, "Bad");

        ProviderRegistry.Provider memory p = providerRegistry.getProvider(provider1);
        assertEq(p.rejectedClaims, 1);
        assertLt(p.reputation, 50); // Should decrease
    }

    // ============ View Function Tests ============

    function test_GetClaimVerifications() public {
        bytes32 claimId = _submitTestClaim();

        vm.prank(verifier1);
        claimsRegistry.submitVerification(claimId, true, "Good");
        vm.prank(verifier2);
        claimsRegistry.submitVerification(claimId, false, "Bad");

        ClaimsRegistry.Verification[] memory verifs = claimsRegistry.getClaimVerifications(claimId);

        assertEq(verifs.length, 2);
        assertEq(verifs[0].verifier, verifier1);
        assertTrue(verifs[0].approved);
        assertEq(verifs[1].verifier, verifier2);
        assertFalse(verifs[1].approved);
    }

    function test_GetProviderClaims() public {
        // Submit multiple claims
        vm.startPrank(provider1);
        bytes32 claim1 = claimsRegistry.submitClaim(keccak256("data1"), "QmTest1", 100 ether);
        bytes32 claim2 = claimsRegistry.submitClaim(keccak256("data2"), "QmTest2", 200 ether);
        bytes32 claim3 = claimsRegistry.submitClaim(keccak256("data3"), "QmTest3", 300 ether);
        vm.stopPrank();

        bytes32[] memory claims = claimsRegistry.getProviderClaims(provider1, 0, 10);
        assertEq(claims.length, 3);
        assertEq(claims[0], claim1);
        assertEq(claims[1], claim2);
        assertEq(claims[2], claim3);

        // Test pagination
        bytes32[] memory page = claimsRegistry.getProviderClaims(provider1, 1, 2);
        assertEq(page.length, 2);
        assertEq(page[0], claim2);
        assertEq(page[1], claim3);
    }

    function test_GetClaimsCount() public {
        // Submit and approve a claim
        bytes32 claimId = _submitTestClaim();
        vm.prank(verifier1);
        claimsRegistry.submitVerification(claimId, true, "OK");
        vm.prank(verifier2);
        claimsRegistry.submitVerification(claimId, true, "OK");

        // Submit and reject another
        vm.prank(provider1);
        bytes32 claimId2 = claimsRegistry.submitClaim(keccak256("data2"), "QmTest2", 100 ether);
        vm.prank(verifier1);
        claimsRegistry.submitVerification(claimId2, false, "Bad");
        vm.prank(verifier2);
        claimsRegistry.submitVerification(claimId2, false, "Bad");

        (uint256 total, uint256 approved, uint256 rejected) = claimsRegistry.getClaimsCount();
        assertEq(total, 2);
        assertEq(approved, 1);
        assertEq(rejected, 1);
    }

    // ============ Pause Tests ============

    function test_PausePreventsSubmission() public {
        vm.prank(admin);
        claimsRegistry.pause();

        vm.prank(provider1);
        vm.expectRevert();
        claimsRegistry.submitClaim(keccak256("data"), "QmTest", 100 ether);
    }

    // ============ Fuzz Tests ============

    function testFuzz_SubmitClaimWithValidAmount(uint256 amount) public {
        uint256 maxAmount = claimsRegistry.MAX_CLAIM_AMOUNT();
        vm.assume(amount > 0 && amount <= maxAmount);

        vm.prank(provider1);
        bytes32 claimId =
            claimsRegistry.submitClaim(keccak256(abi.encodePacked(amount)), "QmTest", amount);

        ClaimsRegistry.Claim memory claim = claimsRegistry.getClaim(claimId);
        assertEq(claim.amount, amount);
    }

    function testFuzz_DataHashIntegrity(bytes memory data) public {
        vm.assume(data.length > 0);
        bytes32 dataHash = keccak256(data);

        vm.prank(provider1);
        bytes32 claimId = claimsRegistry.submitClaim(dataHash, "QmTest", 100 ether);

        assertTrue(claimsRegistry.verifyClaimData(claimId, data));
    }
}
