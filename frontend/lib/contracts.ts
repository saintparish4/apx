// Provider Registry ABI (key functions)
export const providerRegistryABI = [
  {
    inputs: [{ name: "credentialsHash", type: "bytes32" }],
    name: "register",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ name: "provider", type: "address" }],
    name: "getProvider",
    outputs: [
      {
        components: [
          { name: "walletAddress", type: "address" },
          { name: "credentialsHash", type: "bytes32" },
          { name: "stake", type: "uint256" },
          { name: "reputation", type: "uint256" },
          { name: "totalClaimsSubmitted", type: "uint256" },
          { name: "approvedClaims", type: "uint256" },
          { name: "rejectedClaims", type: "uint256" },
          { name: "registeredAt", type: "uint256" },
          { name: "lastActivityAt", type: "uint256" },
          { name: "status", type: "uint8" },
        ],
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "provider", type: "address" }],
    name: "isActiveProvider",
    outputs: [{ type: "bool" }],
    statreMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "addStake",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ name: "amount", type: "uint256" }],
    name: "withdrawStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getProviderCount",
    outputs: [
      { name: "total", type: "uint256" },
      { name: "active", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "provider", type: "address" }],
    name: "getApprovalRate",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "provider", type: "address" },
      { indexed: true, name: "credentialsHash", type: "bytes32" },
      { indexed: false, name: "stake", type: "uint256" },
      { indexed: false, name: "timestamp", type: "uint256" },
    ],
    name: "ProviderRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "provider", type: "address" },
      { indexed: false, name: "timestamp", type: "uint256" },
    ],
    name: "ProviderActivated",
    type: "event",
  },
] as const;

// Claims Registry ABI (key functions)
export const claimsRegistryABI = [
  {
    inputs: [
      { name: "dataHash", type: "bytes32" },
      { name: "ipfsCid", type: "string" },
      { name: "amount", type: "uint256" },
    ],
    name: "submitClaim",
    outputs: [{ name: "claimId", type: "bytes32" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "claimId", type: "bytes32" }],
    name: "getClaim",
    outputs: [
      {
        components: [
          { name: "claimId", type: "bytes32" },
          { name: "provider", type: "address" },
          { name: "dataHash", type: "bytes32" },
          { name: "ipfsCid", type: "string" },
          { name: "amount", type: "uint256" },
          { name: "submittedAt", type: "uint256" },
          { name: "verifiedAt", type: "uint256" },
          { name: "status", type: "uint8" },
          { name: "approvalsCount", type: "uint256" },
          { name: "rejectionsCount", type: "uint256" },
          { name: "rejectionReason", type: "string" },
        ],
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "provider", type: "address" },
      { name: "offset", type: "uint256" },
      { name: "limit", type: "uint256" },
    ],
    name: "getProviderClaims",
    outputs: [{ type: "bytes32[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getClaimsCount",
    outputs: [
      { name: "total", type: "uint256" },
      { name: "approved", type: "uint256" },
      { name: "rejected", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "claimId", type: "bytes32" },
      { name: "reason", type: "string" },
    ],
    name: "disputeClaim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "claimId", type: "bytes32" },
      { indexed: true, name: "provider", type: "address" },
      { indexed: false, name: "dataHash", type: "bytes32" },
      { indexed: false, name: "ipfsCid", type: "string" },
      { indexed: false, name: "amount", type: "uint256" },
      { indexed: false, name: "timestamp", type: "uint256" },
    ],
    name: "ClaimSubmitted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "claimId", type: "bytes32" },
      { indexed: false, name: "oldStatus", type: "uint8" },
      { indexed: false, name: "newStatus", type: "uint8" },
      { indexed: false, name: "timestamp", type: "uint256" },
    ],
    name: "ClaimStatusChanged",
    type: "event",
  },
] as const;
