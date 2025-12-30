# Smart Contracts Documentation

## Overview

APX uses two main smart contracts deployed on Ethereum-compatible chains:

1. **ProviderRegistry.sol** - Manages healthcare provider registration, staking, and reputation
2. **ClaimsRegistry.sol** - Handles claim submission, verification, and lifecycle management

Both contracts use OpenZeppelin's battle-tested security libraries and follow best practices for access control, reentrancy protection, and pausability.

## Contract Addresses

### Sepolia Testnet
- **ProviderRegistry**: `0x...` (To be deployed)
- **ClaimsRegistry**: `0x...` (To be deployed)

### Mainnet
- **ProviderRegistry**: `0x...` (Not yet deployed)
- **ClaimsRegistry**: `0x...` (Not yet deployed)

## ProviderRegistry Contract

### Purpose

Manages healthcare provider registration, tracks reputation scores, and handles staking mechanisms to incentivize honest behavior.

### Key Features

- Provider registration with credential verification
- Reputation scoring system (0-100 scale)
- Staking mechanism with minimum stake requirement
- Slashing for fraudulent activity
- Status management (Pending → Active → Suspended/Revoked)

### Contract Interface

```solidity
contract ProviderRegistry is AccessControl, ReentrancyGuard, Pausable {
    // Constants
    uint256 public constant MIN_STAKE = 0.1 ether;
    uint256 public constant MAX_REPUTATION = 100;
    uint256 public constant INITIAL_REPUTATION = 50;
    uint256 public constant SLASH_PERCENTAGE = 10; // 10%
    
    // Enums
    enum ProviderStatus {
        None,
        Pending,
        Active,
        Suspended,
        Revoked
    }
    
    // Structs
    struct Provider {
        address walletAddress;
        bytes32 credentialsHash;
        uint256 stake;
        uint256 reputation;
        uint256 totalClaimsSubmitted;
        uint256 approvedClaims;
        uint256 rejectedClaims;
        uint256 registeredAt;
        uint256 lastActivityAt;
        ProviderStatus status;
    }
}
```

### Functions

#### `register(bytes32 credentialsHash)`

Register as a healthcare provider. Requires minimum stake.

**Parameters:**
- `credentialsHash` (bytes32): Hash of provider credentials (NPI, license, etc.)

**Requirements:**
- Must send at least `MIN_STAKE` (0.1 ETH)
- Provider must not already be registered
- Credentials hash must be unique

**Returns:**
- None (emits `ProviderRegistered` event)

**Gas Estimate:** ~150,000 gas

**Example:**
```solidity
// In JavaScript/TypeScript
const credentialsHash = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("NPI:1234567890|License:ABC123")
);

await providerRegistry.register(credentialsHash, {
  value: ethers.utils.parseEther("0.1")
});
```

**Example (Solidity):**
```solidity
bytes32 credentialsHash = keccak256(abi.encodePacked("NPI:1234567890|License:ABC123"));
providerRegistry.register{value: 0.1 ether}(credentialsHash);
```

---

#### `activateProvider(address provider)`

Activate a pending provider (admin only).

**Parameters:**
- `provider` (address): Address of the provider to activate

**Requirements:**
- Caller must have `ADMIN_ROLE`
- Provider must be in `Pending` status

**Returns:**
- None (emits `ProviderActivated` event)

**Gas Estimate:** ~50,000 gas

**Example:**
```solidity
await providerRegistry.connect(admin).activateProvider(providerAddress);
```

---

#### `suspendProvider(address provider, string reason)`

Suspend an active provider (admin only).

**Parameters:**
- `provider` (address): Address of the provider to suspend
- `reason` (string): Reason for suspension

**Requirements:**
- Caller must have `ADMIN_ROLE`
- Provider must be `Active`

**Returns:**
- None (emits `ProviderSuspended` event)

**Gas Estimate:** ~50,000 gas

---

#### `revokeProvider(address provider, string reason)`

Permanently revoke a provider (admin only).

**Parameters:**
- `provider` (address): Address of the provider to revoke
- `reason` (string): Reason for revocation

**Requirements:**
- Caller must have `ADMIN_ROLE`

**Returns:**
- None (emits `ProviderRevoked` event)

**Gas Estimate:** ~50,000 gas

---

#### `addStake()`

Add additional stake to existing provider account.

**Parameters:**
- None (value sent with transaction)

**Requirements:**
- Caller must be registered provider
- Contract must not be paused

**Returns:**
- None (emits `StakeAdded` event)

**Gas Estimate:** ~40,000 gas

**Example:**
```solidity
await providerRegistry.addStake({
  value: ethers.utils.parseEther("0.5")
});
```

---

#### `withdrawStake(uint256 amount)`

Withdraw stake above minimum requirement.

**Parameters:**
- `amount` (uint256): Amount to withdraw (in wei)

**Requirements:**
- Provider must be `Active`
- Amount must not exceed withdrawable balance (stake - MIN_STAKE)
- Contract must not be paused

**Returns:**
- None (emits `StakeWithdrawn` event)

**Gas Estimate:** ~60,000 gas

**Example:**
```solidity
const withdrawableAmount = currentStake.sub(MIN_STAKE);
await providerRegistry.withdrawStake(withdrawableAmount);
```

---

#### `slashStake(address provider, string reason)`

Slash provider stake for fraudulent activity (verifier only).

**Parameters:**
- `provider` (address): Address of the provider to slash
- `reason` (string): Reason for slashing

**Requirements:**
- Caller must have `VERIFIER_ROLE`
- Provider must exist

**Returns:**
- None (emits `StakeSlashed` event)

**Gas Estimate:** ~50,000 gas

**Note:** Slashes 10% of current stake

---

#### `recordClaimResult(address provider, bool approved)`

Record claim result and update reputation (called by ClaimsRegistry).

**Parameters:**
- `provider` (address): Provider address
- `approved` (bool): Whether claim was approved

**Requirements:**
- Caller must have `VERIFIER_ROLE` (typically ClaimsRegistry)

**Returns:**
- None (emits `ClaimRecorded` and `ReputationUpdated` events)

**Gas Estimate:** ~80,000 gas

**Reputation Changes:**
- Approved: +1 reputation point
- Rejected: -2 reputation points

---

#### `setReputation(address provider, uint256 newReputation, string reason)`

Manually adjust provider reputation (admin only).

**Parameters:**
- `provider` (address): Provider address
- `newReputation` (uint256): New reputation value (0-100)
- `reason` (string): Reason for adjustment

**Requirements:**
- Caller must have `ADMIN_ROLE`
- New reputation must be ≤ 100

**Returns:**
- None (emits `ReputationUpdated` event)

**Gas Estimate:** ~50,000 gas

---

### View Functions

#### `isActiveProvider(address provider)`

Check if provider is active and can submit claims.

**Parameters:**
- `provider` (address): Provider address

**Returns:**
- `bool`: True if provider is Active

**Gas Estimate:** ~2,300 gas

---

#### `getProvider(address provider)`

Get full provider details.

**Parameters:**
- `provider` (address): Provider address

**Returns:**
- `Provider` struct with all provider information

**Gas Estimate:** ~5,000 gas

---

#### `getProviderCount()`

Get total and active provider counts.

**Returns:**
- `uint256 total`: Total registered providers
- `uint256 active`: Active providers

**Gas Estimate:** ~2,300 gas

---

#### `getApprovalRate(address provider)`

Calculate provider's claim approval rate in basis points.

**Parameters:**
- `provider` (address): Provider address

**Returns:**
- `uint256`: Approval rate in basis points (0-10000)

**Gas Estimate:** ~3,000 gas

**Example:**
```solidity
uint256 rate = providerRegistry.getApprovalRate(providerAddress);
// rate = 8500 means 85% approval rate
```

---

### Events

#### `ProviderRegistered`
```solidity
event ProviderRegistered(
    address indexed provider,
    bytes32 indexed credentialsHash,
    uint256 stake,
    uint256 timestamp
);
```

#### `ProviderActivated`
```solidity
event ProviderActivated(
    address indexed provider,
    uint256 timestamp
);
```

#### `ReputationUpdated`
```solidity
event ReputationUpdated(
    address indexed provider,
    uint256 oldReputation,
    uint256 newReputation,
    string reason
);
```

#### `StakeSlashed`
```solidity
event StakeSlashed(
    address indexed provider,
    uint256 amount,
    string reason,
    uint256 newTotal
);
```

---

## ClaimsRegistry Contract

### Purpose

Manages healthcare claim submission, verification through multi-signature consensus, and claim lifecycle state transitions.

### Key Features

- Claim submission with IPFS CID and data hash
- Multi-signature verification (minimum 2 verifiers)
- Consensus-based approval/rejection
- Dispute mechanism for providers
- Expiration handling for unverified claims
- Provider reputation integration

### Contract Interface

```solidity
contract ClaimsRegistry is AccessControl, ReentrancyGuard, Pausable {
    // Constants
    uint256 public constant VERIFICATION_THRESHOLD = 2;
    uint256 public constant VERIFICATION_WINDOW = 7 days;
    uint256 public constant MAX_CLAIM_AMOUNT = 1_000_000 * 1e18; // $1M
    
    // Enums
    enum ClaimStatus {
        None,
        Submitted,
        UnderReview,
        Approved,
        Rejected,
        Disputed,
        Expired
    }
    
    // Structs
    struct Claim {
        bytes32 claimId;
        address provider;
        bytes32 dataHash;
        string ipfsCid;
        uint256 amount;
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
}
```

### Functions

#### `submitClaim(bytes32 dataHash, string calldata ipfsCid, uint256 amount)`

Submit a new healthcare claim.

**Parameters:**
- `dataHash` (bytes32): Keccak256 hash of claim data
- `ipfsCid` (string): IPFS Content Identifier for full claim data
- `amount` (uint256): Claim amount in wei

**Requirements:**
- Provider must be active (checked via ProviderRegistry)
- IPFS CID must not be empty
- Amount must be > 0 and ≤ MAX_CLAIM_AMOUNT
- Contract must not be paused

**Returns:**
- `bytes32 claimId`: Unique claim identifier

**Gas Estimate:** ~120,000 gas

**Example:**
```solidity
// Calculate data hash
bytes32 dataHash = keccak256(abi.encodePacked(claimDataJson));
string memory ipfsCid = "QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
uint256 amount = 500 * 1e18; // $500

bytes32 claimId = await claimsRegistry.submitClaim(
  dataHash,
  ipfsCid,
  amount
);
```

**Claim ID Generation:**
```solidity
claimId = keccak256(abi.encodePacked(
    msg.sender,
    dataHash,
    block.timestamp,
    block.number
));
```

---

#### `submitVerification(bytes32 claimId, bool approved, string calldata reason)`

Submit verification decision for a claim (verifier only).

**Parameters:**
- `claimId` (bytes32): Claim to verify
- `approved` (bool): Whether to approve or reject
- `reason` (string): Reason for decision

**Requirements:**
- Caller must have `VERIFIER_ROLE`
- Claim must exist and be in `Submitted` or `UnderReview` status
- Verification window must not be expired
- Verifier must not have already verified this claim
- Contract must not be paused

**Returns:**
- None (emits `ClaimVerificationSubmitted` event)

**Gas Estimate:** ~100,000 gas

**Consensus Logic:**
- First verification moves claim to `UnderReview`
- After threshold met, majority vote determines outcome
- Ties prevent automatic finalization

**Example:**
```solidity
await claimsRegistry.connect(verifier).submitVerification(
  claimId,
  true, // approved
  "All documentation verified, codes match diagnosis"
);
```

---

#### `disputeClaim(bytes32 claimId, string calldata reason)`

Dispute an approved or rejected claim.

**Parameters:**
- `claimId` (bytes32): Claim to dispute
- `reason` (string): Reason for dispute

**Requirements:**
- Caller must be claim provider or admin
- Claim must be in `Approved` or `Rejected` status
- Contract must not be paused

**Returns:**
- None (emits `ClaimDisputed` event)

**Gas Estimate:** ~50,000 gas

**Example:**
```solidity
await claimsRegistry.disputeClaim(
  claimId,
  "Incorrect diagnosis code used by verifier"
);
```

---

#### `expireClaim(bytes32 claimId)`

Mark a claim as expired if verification window passed.

**Parameters:**
- `claimId` (bytes32): Claim to expire

**Requirements:**
- Claim must be in `Submitted` or `UnderReview` status
- Verification window (7 days) must have passed

**Returns:**
- None (emits `ClaimExpired` event)

**Gas Estimate:** ~40,000 gas

**Note:** Can be called by anyone

---

#### `adminFinalize(bytes32 claimId, bool approved, string calldata reason)`

Force finalize a claim (admin only, for edge cases).

**Parameters:**
- `claimId` (bytes32): Claim to finalize
- `approved` (bool): Whether to approve
- `reason` (string): Reason for decision

**Requirements:**
- Caller must have `ADMIN_ROLE`
- Claim must exist

**Returns:**
- None (updates claim status and provider reputation)

**Gas Estimate:** ~80,000 gas

---

### View Functions

#### `getClaim(bytes32 claimId)`

Get full claim details.

**Parameters:**
- `claimId` (bytes32): Claim identifier

**Returns:**
- `Claim` struct with all claim information

**Gas Estimate:** ~5,000 gas

---

#### `getClaimVerifications(bytes32 claimId)`

Get all verifications for a claim.

**Parameters:**
- `claimId` (bytes32): Claim identifier

**Returns:**
- `Verification[]`: Array of all verifications

**Gas Estimate:** ~(5,000 + 3,000 * numVerifications) gas

---

#### `getProviderClaims(address provider, uint256 offset, uint256 limit)`

Get claims by provider with pagination.

**Parameters:**
- `provider` (address): Provider address
- `offset` (uint256): Starting index
- `limit` (uint256): Maximum number to return

**Returns:**
- `bytes32[]`: Array of claim IDs

**Gas Estimate:** ~(10,000 + 2,000 * limit) gas

---

#### `getClaimsByStatus(ClaimStatus status, uint256 offset, uint256 limit)`

Get claims by status with pagination.

**Parameters:**
- `status` (ClaimStatus): Status to filter by
- `offset` (uint256): Starting index
- `limit` (uint256): Maximum number to return

**Returns:**
- `bytes32[]`: Array of claim IDs

**Gas Estimate:** Expensive - use off-chain indexing for production

**Note:** This function iterates through all claims. For production, use an off-chain indexer like The Graph.

---

#### `getClaimsCount()`

Get total claim statistics.

**Returns:**
- `uint256 total`: Total claims submitted
- `uint256 approved`: Approved claims
- `uint256 rejected`: Rejected claims

**Gas Estimate:** ~2,300 gas

---

#### `verifyClaimData(bytes32 claimId, bytes calldata data)`

Verify claim data integrity by comparing hash.

**Parameters:**
- `claimId` (bytes32): Claim identifier
- `data` (bytes): Original claim data

**Returns:**
- `bool valid`: True if hash matches stored hash

**Gas Estimate:** ~3,000 gas

**Example:**
```solidity
bytes memory claimData = abi.encode(claimDataStruct);
bool isValid = claimsRegistry.verifyClaimData(claimId, claimData);
require(isValid, "Claim data hash mismatch");
```

---

### Events

#### `ClaimSubmitted`
```solidity
event ClaimSubmitted(
    bytes32 indexed claimId,
    address indexed provider,
    bytes32 dataHash,
    string ipfsCid,
    uint256 amount,
    uint256 timestamp
);
```

#### `ClaimVerificationSubmitted`
```solidity
event ClaimVerificationSubmitted(
    bytes32 indexed claimId,
    address indexed verifier,
    bool approved,
    string reason,
    uint256 timestamp
);
```

#### `ClaimStatusChanged`
```solidity
event ClaimStatusChanged(
    bytes32 indexed claimId,
    ClaimStatus oldStatus,
    ClaimStatus newStatus,
    uint256 timestamp
);
```

#### `ClaimDisputed`
```solidity
event ClaimDisputed(
    bytes32 indexed claimId,
    address indexed disputedBy,
    string reason,
    uint256 timestamp
);
```

#### `ClaimExpired`
```solidity
event ClaimExpired(
    bytes32 indexed claimId,
    uint256 timestamp
);
```

---

## Gas Optimization

### Current Gas Costs

| Operation | Gas Cost | Notes |
|-----------|----------|-------|
| Provider Registration | ~150,000 | Includes initial stake |
| Claim Submission | ~120,000 | Includes IPFS storage reference |
| Submit Verification | ~100,000 | Per verifier |
| Dispute Claim | ~50,000 | Provider or admin |
| Get Claim | ~5,000 | View function |
| Get Provider | ~5,000 | View function |

### Optimization Strategies

1. **Storage Packing**: Struct fields are packed to minimize storage slots
2. **Event Usage**: Events used instead of storage where possible
3. **Batch Operations**: Multiple operations can be batched (future enhancement)
4. **Off-Chain Indexing**: Expensive queries moved off-chain

### Future Optimizations

- Layer 2 deployment (Optimism, Arbitrum)
- Batch verification submissions
- Merkle tree for claim IDs
- Storage optimization for IPFS CIDs

---

## Security Considerations

### Access Control

Both contracts use OpenZeppelin's `AccessControl`:

- **DEFAULT_ADMIN_ROLE**: Full control (deployer)
- **ADMIN_ROLE**: Operational management
- **VERIFIER_ROLE**: Claim verification authority

### Reentrancy Protection

All state-changing functions use `ReentrancyGuard` to prevent reentrancy attacks.

### Pausability

Both contracts are `Pausable` for emergency stops:
- `pause()`: Stop all operations
- `unpause()`: Resume operations

### Input Validation

- Amount bounds checking
- Address validation
- String length limits
- Status transition validation

### Known Limitations

1. **Front-running**: Claim IDs are predictable (uses timestamp). Consider commit-reveal scheme.
2. **Gas Costs**: High for frequent operations. Consider Layer 2.
3. **Storage Costs**: IPFS CIDs stored as strings (expensive). Consider bytes32 encoding.
4. **Query Performance**: `getClaimsByStatus` is O(n). Use off-chain indexing.

---

## Integration Examples

### Submitting a Claim (JavaScript/ethers.js)

```javascript
const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/YOUR_KEY");
const wallet = new ethers.Wallet("PRIVATE_KEY", provider);

const claimsRegistry = new ethers.Contract(
  CLAIMS_REGISTRY_ADDRESS,
  CLAIMS_REGISTRY_ABI,
  wallet
);

// Prepare claim data
const claimData = {
  patient_id: "hashed_patient_123",
  provider_npi: "1234567890",
  service_date: "2024-01-15",
  procedure_codes: ["99213"],
  diagnosis_codes: ["E11.9"],
  billed_amount: "500.00"
};

// Calculate hash
const dataHash = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes(JSON.stringify(claimData))
);

// Submit claim
const tx = await claimsRegistry.submitClaim(
  dataHash,
  "QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // IPFS CID
  ethers.utils.parseEther("500"), // Amount
  { gasLimit: 200000 }
);

await tx.wait();
console.log("Claim submitted:", tx.hash);
```

### Registering a Provider (Solidity)

```solidity
// In a contract that interacts with ProviderRegistry
import {ProviderRegistry} from "./ProviderRegistry.sol";

contract MyContract {
    ProviderRegistry public providerRegistry;
    
    function registerProvider(bytes32 credentialsHash) external payable {
        require(msg.value >= 0.1 ether, "Insufficient stake");
        providerRegistry.register{value: msg.value}(credentialsHash);
    }
}
```

### Listening to Events (JavaScript)

```javascript
// Listen for claim submissions
claimsRegistry.on("ClaimSubmitted", (claimId, provider, dataHash, ipfsCid, amount, timestamp) => {
  console.log("New claim submitted:", {
    claimId,
    provider,
    dataHash,
    ipfsCid,
    amount: ethers.utils.formatEther(amount),
    timestamp: new Date(timestamp * 1000)
  });
});

// Listen for status changes
claimsRegistry.on("ClaimStatusChanged", (claimId, oldStatus, newStatus, timestamp) => {
  console.log("Claim status changed:", {
    claimId,
    oldStatus,
    newStatus,
    timestamp: new Date(timestamp * 1000)
  });
});
```

---

## Testing

### Foundry Tests

Tests are located in `Core/test/`:

- `ClaimsRegistry.t.sol`: Tests for ClaimsRegistry
- `ProviderRegistry.t.sol`: Tests for ProviderRegistry

**Run tests:**
```bash
cd Core
forge test
forge test --gas-report
```

### Test Coverage

Current coverage targets:
- Unit tests: 90%+
- Integration tests: 80%+
- Fuzzing tests: Critical functions

---

## Deployment

### Deployment Script

Located in `Core/script/Deploy.s.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {ProviderRegistry} from "../src/ProviderRegistry.sol";
import {ClaimsRegistry} from "../src/ClaimsRegistry.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast();
        
        // Deploy ProviderRegistry first
        ProviderRegistry providerRegistry = new ProviderRegistry();
        
        // Deploy ClaimsRegistry with ProviderRegistry address
        ClaimsRegistry claimsRegistry = new ClaimsRegistry(address(providerRegistry));
        
        vm.stopBroadcast();
    }
}
```

**Deploy to Sepolia:**
```bash
forge script script/Deploy.s.sol:Deploy --rpc-url $SEPOLIA_RPC_URL --broadcast --verify
```

---

## References

- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Foundry Documentation](https://book.getfoundry.sh/)
- [Ethereum Smart Contract Best Practices](https://consensys.github.io/smart-contract-best-practices/)
- [Architecture Documentation](./ARCHITECTURE.md)
- [API Documentation](./API.md)
- [Integration Guide](./INTEGRATION.md)

