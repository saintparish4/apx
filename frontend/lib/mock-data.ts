/**
 * Mock Data Service
 *
 * Genreates comprehensive, realistic healthcare claims data for demo mode
 * Includes valid medical codes, realistic amounts, and various claim statuses
 */

import {
  DEMO_WALLETS,
  DEMO_PROVIDER,
  generateDemoWallet,
  generateDemoTxHash,
  isDemoMode,
} from "./demo-mode";

// ===================================================
// Types and Interfaces
// ===================================================

export type ClaimStatus =
  | "pending" // Submitted, waiting for verification
  | "verifying" // Currently being verified by consensus
  | "verified" // Approved by consensus
  | "flagged" // Flagged for manual review
  | "rejected" // Rejected by consensus
  | "appealing"; // Under appeal process

export type VerifierStatus = "pending" | "approved" | "rejected" | "abstained";

export interface Verifier {
  address: string;
  name: string;
  status: VerifierStatus;
  timestamp: number | null;
  reputation: number;
}

export interface ConsensusProgress {
  current: number;
  required: number;
  verifiers: Verifier[];
  threshold: number; // Percentage (e.g., 66 for 2/3)
  startTime: number;
  endTime: number | null;
}

export interface Claim {
  id: string;
  claimNumber: string;
  patientId: string;
  providerId: string;
  providerName: string;
  providerNPI: string;

  // Medical codes
  diagnosisCodes: string[]; // ICD-10 codes
  procedureCodes: string[]; // CPT codes

  // Financial
  amount: number; // in USD
  currency: "USD";

  // Status and timestamps
  status: ClaimStatus;
  submittedAt: number;
  updatedAt: number;
  verifiedAt: number | null;

  // Blockchain data
  txHash: string;
  blockNumber: number | null;
  ipfsCid: string;

  // Consensus
  consensus: ConsensusProgress | null;

  // Additional metadata
  description: string;
  rejectionReason: string | null;
  flagReason: string | null;
  notes: string[];
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  blockNumber: number;
  status: "confirmed" | "pending" | "failed";
  type: "claim_submission" | "verification" | "stake" | "unstake" | "slash";
  claimId?: string;
  gasUsed: string;
  gasCost: string;
}

export interface ProviderStats {
  address: string;
  name: string;
  npi: string;
  reputation: number;
  totalClaims: number;
  verifiedClaims: number;
  rejectedClaims: number;
  pendingClaims: number;
  flaggedClaims: number;
  totalStaked: string; // in ETH
  averageClaimAmount: number;
  approvalRate: number;
  averageVerificationTime: number; // in hours
  joinedDate: string;
  lastActivityDate: string;
}

// ============================================================================
// Medical Code Databases
// ============================================================================

const ICD10_CODES = [
  {
    code: "E11.9",
    description: "Type 2 diabetes mellitus without complications",
  },
  { code: "I10", description: "Essential (primary) hypertension" },
  {
    code: "J44.0",
    description:
      "Chronic obstructive pulmonary disease with acute lower respiratory infection",
  },
  { code: "M54.5", description: "Low back pain" },
  { code: "E78.5", description: "Hyperlipidemia, unspecified" },
  { code: "F41.1", description: "Generalized anxiety disorder" },
  {
    code: "K21.9",
    description: "Gastro-esophageal reflux disease without esophagitis",
  },
  {
    code: "J06.9",
    description: "Acute upper respiratory infection, unspecified",
  },
  { code: "M79.3", description: "Panniculitis, unspecified" },
  { code: "R51", description: "Headache" },
  {
    code: "Z00.00",
    description:
      "Encounter for general adult medical examination without abnormal findings",
  },
  {
    code: "I25.10",
    description:
      "Atherosclerotic heart disease of native coronary artery without angina pectoris",
  },
  { code: "N39.0", description: "Urinary tract infection, site not specified" },
  { code: "J18.9", description: "Pneumonia, unspecified organism" },
  { code: "E66.9", description: "Obesity, unspecified" },
];

const CPT_CODES = [
  {
    code: "99213",
    description: "Office visit, established patient, 20-29 minutes",
    amount: 150,
  },
  {
    code: "99214",
    description: "Office visit, established patient, 30-39 minutes",
    amount: 220,
  },
  {
    code: "99215",
    description: "Office visit, established patient, 40-54 minutes",
    amount: 310,
  },
  {
    code: "99203",
    description: "Office visit, new patient, 30-44 minutes",
    amount: 200,
  },
  {
    code: "99204",
    description: "Office visit, new patient, 45-59 minutes",
    amount: 275,
  },
  {
    code: "99285",
    description: "Emergency department visit, high severity",
    amount: 450,
  },
  { code: "93000", description: "Electrocardiogram, complete", amount: 85 },
  { code: "80053", description: "Comprehensive metabolic panel", amount: 45 },
  {
    code: "85025",
    description: "Complete blood count with differential",
    amount: 35,
  },
  { code: "36415", description: "Venipuncture", amount: 25 },
  { code: "71045", description: "Chest X-ray, 2 views", amount: 125 },
  {
    code: "73721",
    description: "MRI lower extremity without contrast",
    amount: 850,
  },
  { code: "70450", description: "CT head without contrast", amount: 650 },
  {
    code: "99386",
    description: "Preventive visit, established patient, 40-64 years",
    amount: 180,
  },
  { code: "90834", description: "Psychotherapy, 45 minutes", amount: 140 },
];

// ============================================================================
// Mock Verifier Pool
// ============================================================================

const VERIFIER_POOL = [
  {
    name: "HealthVerify AI",
    reputation: 95,
    address: generateDemoWallet("verifier1"),
  },
  {
    name: "MedChain Validator",
    reputation: 92,
    address: generateDemoWallet("verifier2"),
  },
  {
    name: "ClaimGuard Systems",
    reputation: 88,
    address: generateDemoWallet("verifier3"),
  },
  {
    name: "TrustMed Network",
    reputation: 90,
    address: generateDemoWallet("verifier4"),
  },
  {
    name: "Consensus Health",
    reputation: 93,
    address: generateDemoWallet("verifier5"),
  },
];

// ============================================================================
// Data Generators
// ============================================================================

/**
 * Generate random date within a range
 */
function randomDate(daysAgo: number, daysForward: number = 0): number {
  const now = Date.now();
  const minDate = now - daysAgo * 24 * 60 * 60 * 1000;
  const maxDate = now + daysForward * 24 * 60 * 60 * 1000;
  return Math.floor(Math.random() * (maxDate - minDate) + minDate);
}

/**
 * Generate random IPFS CID
 */
function generateIPFSCid(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let cid = "Qm";
  for (let i = 0; i < 44; i++) {
    cid += chars[Math.floor(Math.random() * chars.length)];
  }
  return cid;
}

/**
 * Generate random patient ID (HIPAA-compliant format)
 */
function generatePatientId(): string {
  const prefix = "PT";
  const random = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  return `${prefix}${random}`;
}

/**
 * Generate consensus progress for a claim
 */
function generateConsensusProgress(
  status: ClaimStatus,
  submittedAt: number
): ConsensusProgress | null {
  if (status === "pending") {
    return null; // Not yet in verification
  }

  const numVerifiers = 5;
  const requiredVotes = 3; // 3 out of 5 (60%)
  const threshold = 66; // 2/3 threshold

  // Select random verifiers
  const selectedVerifiers = [...VERIFIER_POOL]
    .sort(() => Math.random() - 0.5)
    .slice(0, numVerifiers);

  const startTime = submittedAt + 5 * 60 * 1000; // Start 5 minutes after submission

  let verifiers: Verifier[];
  let current: number;
  let endTime: number | null;

  switch (status) {
    case "verifying":
      // In progress - some have voted, some haven't
      current = Math.floor(Math.random() * (requiredVotes - 1)) + 1;
      verifiers = selectedVerifiers.map((v, i) => ({
        address: v.address,
        name: v.name,
        reputation: v.reputation,
        status: i < current ? "approved" : "pending",
        timestamp: i < current ? startTime + i * 3 * 60 * 1000 : null,
      }));
      endTime = null;
      break;

    case "verified":
      // Completed successfully
      current = requiredVotes;
      verifiers = selectedVerifiers.map((v, i) => ({
        address: v.address,
        name: v.name,
        reputation: v.reputation,
        status:
          i < requiredVotes
            ? "approved"
            : i === requiredVotes
            ? "pending"
            : "pending",
        timestamp: i < requiredVotes ? startTime + i * 3 * 60 * 1000 : null,
      }));
      endTime = startTime + requiredVotes * 3 * 60 * 1000;
      break;

    case "rejected":
      // Rejected by majority
      current = requiredVotes;
      verifiers = selectedVerifiers.map((v, i) => ({
        address: v.address,
        name: v.name,
        reputation: v.reputation,
        status: i < requiredVotes ? "rejected" : "pending",
        timestamp: i < requiredVotes ? startTime + i * 3 * 60 * 1000 : null,
      }));
      endTime = startTime + requiredVotes * 3 * 60 * 1000;
      break;

    case "flagged":
      // Mixed votes, flagged for review
      current = 2;
      verifiers = selectedVerifiers.map((v, i) => ({
        address: v.address,
        name: v.name,
        reputation: v.reputation,
        status: i === 0 ? "approved" : i === 1 ? "rejected" : "pending",
        timestamp: i < 2 ? startTime + i * 3 * 60 * 1000 : null,
      }));
      endTime = null;
      break;

    default:
      return null;
  }

  return {
    current,
    required: requiredVotes,
    threshold,
    verifiers,
    startTime,
    endTime,
  };
}

/**
 * Generate a single mock claim
 */
function generateClaim(
  index: number,
  status: ClaimStatus,
  daysAgo: number
): Claim {
  const diagnosisCode =
    ICD10_CODES[Math.floor(Math.random() * ICD10_CODES.length)];
  const procedureCode = CPT_CODES[Math.floor(Math.random() * CPT_CODES.length)];

  const submittedAt = randomDate(daysAgo, 0);
  const updatedAt =
    status === "pending"
      ? submittedAt
      : submittedAt + Math.random() * 2 * 24 * 60 * 60 * 1000;

  const claimNumber = `CLM-${new Date(submittedAt).getFullYear()}-${String(
    1000 + index
  ).padStart(6, "0")}`;
  const claimId = `claim_${Date.now()}_${index}`;

  // Calculate amount based on procedure codes
  let amount = procedureCode.amount;

  // Add variation
  amount = Math.floor(amount * (0.8 + Math.random() * 0.4));

  const claim: Claim = {
    id: claimId,
    claimNumber,
    patientId: generatePatientId(),
    providerId: DEMO_PROVIDER.address,
    providerName: DEMO_PROVIDER.name,
    providerNPI: DEMO_PROVIDER.npi,

    diagnosisCodes: [diagnosisCode.code],
    procedureCodes: [procedureCode.code],

    amount,
    currency: "USD",

    status,
    submittedAt,
    updatedAt,
    verifiedAt: status === "verified" ? updatedAt : null,

    txHash: generateDemoTxHash(),
    blockNumber:
      status === "verified"
        ? Math.floor(5000000 + Math.random() * 100000)
        : null,
    ipfsCid: generateIPFSCid(),

    consensus: generateConsensusProgress(status, submittedAt),

    description: `${procedureCode.description} for ${diagnosisCode.description}`,
    rejectionReason: status === "rejected" ? getRandomRejectionReason() : null,
    flagReason: status === "flagged" ? getRandomFlagReason() : null,
    notes: generateClaimNotes(status),
  };

  return claim;
}

/**
 * Get random rejection reason
 */
function getRandomRejectionReason(): string {
  const reasons = [
    "Incomplete documentation provided",
    "Procedure not covered under current policy",
    "Medical necessity not established",
    "Duplicate claim submission detected",
    "Provider credentials verification failed",
    "Claim amount exceeds policy limits",
  ];
  return reasons[Math.floor(Math.random() * reasons.length)];
}

/**
 * Get random flag reason
 */
function getRandomFlagReason(): string {
  const reasons = [
    "Unusual claim amount for procedure type",
    "High claim frequency from provider",
    "Conflicting diagnosis and procedure codes",
    "Requires additional documentation",
    "Verifier consensus not reached within time window",
  ];
  return reasons[Math.floor(Math.random() * reasons.length)];
}

/**
 * Generate claim notes based on status
 */
function generateClaimNotes(status: ClaimStatus): string[] {
  const baseNotes = ["Claim submitted via blockchain network"];

  switch (status) {
    case "pending":
      return [...baseNotes, "Awaiting initial verification"];

    case "verifying":
      return [
        ...baseNotes,
        "Verification in progress",
        "Consensus voting underway",
      ];

    case "verified":
      return [
        ...baseNotes,
        "Verification complete",
        "Consensus reached",
        "Claim approved for payment",
      ];

    case "rejected":
      return [
        ...baseNotes,
        "Verification complete",
        "Claim rejected by consensus",
      ];

    case "flagged":
      return [
        ...baseNotes,
        "Flagged for manual review",
        "Awaiting administrator decision",
      ];

    case "appealing":
      return [
        ...baseNotes,
        "Appeal submitted",
        "Under review by appeals committee",
      ];

    default:
      return baseNotes;
  }
}

/**
 * Generate mock transaction
 */
function generateTransaction(
  type: Transaction["type"],
  daysAgo: number,
  claimId?: string
): Transaction {
  const timestamp = randomDate(daysAgo, 0);
  const blockNumber = Math.floor(5000000 + Math.random() * 100000);
  const gasUsed = String(Math.floor(50000 + Math.random() * 150000));
  const gasCost = (parseInt(gasUsed) * 0.00000002).toFixed(8);

  // Determine 'from' address based on transaction type
  let fromAddress: string;
  switch (type) {
    case "stake":
    case "unstake":
      // Staking transactions come from providers
      fromAddress = DEMO_PROVIDER.address;
      break;
    case "verification":
      // Verification transactions come from verifiers (random wallet)
      fromAddress =
        DEMO_WALLETS[Math.floor(Math.random() * DEMO_WALLETS.length)];
      break;
    case "claim_submission":
      // Claim submissions come from patients (random wallet)
      fromAddress =
        DEMO_WALLETS[Math.floor(Math.random() * DEMO_WALLETS.length)];
      break;
    case "slash":
      // Slash transactions come from system/contract
      fromAddress = generateDemoWallet("contract");
      break;
    default:
      fromAddress = DEMO_PROVIDER.address;
  }

  return {
    hash: generateDemoTxHash(),
    from: fromAddress,
    to: generateDemoWallet("contract"),
    value: type === "stake" ? "1.0" : type === "unstake" ? "1.0" : "0.0",
    timestamp,
    blockNumber,
    status: "confirmed",
    type,
    claimId,
    gasUsed,
    gasCost,
  };
}

// ============================================================================
// Mock Data Generation Functions
// ============================================================================

/**
 * Generate comprehensive mock claims dataset
 */
export function generateMockClaims(): Claim[] {
  const claims: Claim[] = [];

  // Verified claims (60%)
  for (let i = 0; i < 8; i++) {
    claims.push(generateClaim(i, "verified", 30));
  }

  // Pending claims (20%)
  for (let i = 8; i < 11; i++) {
    claims.push(generateClaim(i, "pending", 2));
  }

  // Verifying claims (10%)
  for (let i = 11; i < 12; i++) {
    claims.push(generateClaim(i, "verifying", 1));
  }

  // Rejected claims (5%)
  claims.push(generateClaim(12, "rejected", 15));

  // Flagged claims (5%)
  claims.push(generateClaim(13, "flagged", 5));

  return claims.sort((a, b) => b.submittedAt - a.submittedAt);
}

/**
 * Generate mock transactions
 */
export function generateMockTransactions(claims: Claim[]): Transaction[] {
  const transactions: Transaction[] = [];

  // Generate transactions for each claim
  claims.forEach((claim) => {
    transactions.push(generateTransaction("claim_submission", 30, claim.id));

    if (claim.status === "verified" || claim.status === "rejected") {
      transactions.push(generateTransaction("verification", 25, claim.id));
    }
  });

  // Add some stake/unstake transactions
  transactions.push(generateTransaction("stake", 60));
  transactions.push(generateTransaction("stake", 45));
  transactions.push(generateTransaction("unstake", 20));

  return transactions.sort((a, b) => b.timestamp - a.timestamp);
}

/**
 * Generate mock provider stats
 */
export function generateMockProviderStats(): ProviderStats {
  const claims = generateMockClaims();
  const verified = claims.filter((c) => c.status === "verified").length;
  const rejected = claims.filter((c) => c.status === "rejected").length;
  const pending = claims.filter(
    (c) => c.status === "pending" || c.status === "verifying"
  ).length;
  const flagged = claims.filter((c) => c.status === "flagged").length;

  const totalAmount = claims.reduce((sum, c) => sum + c.amount, 0);
  const avgAmount = totalAmount / claims.length;

  return {
    address: DEMO_PROVIDER.address,
    name: DEMO_PROVIDER.name,
    npi: DEMO_PROVIDER.npi,
    reputation: DEMO_PROVIDER.reputation,
    totalClaims: claims.length,
    verifiedClaims: verified,
    rejectedClaims: rejected,
    pendingClaims: pending,
    flaggedClaims: flagged,
    totalStaked: DEMO_PROVIDER.totalStaked,
    averageClaimAmount: Math.floor(avgAmount),
    approvalRate: Math.floor((verified / (verified + rejected)) * 100),
    averageVerificationTime: 4.5, // hours
    joinedDate: DEMO_PROVIDER.joinedDate,
    lastActivityDate: new Date().toISOString().split("T")[0],
  };
}

/**
 * Get claim by ID
 */
export function getMockClaimById(id: string): Claim | null {
  const claims = generateMockClaims();
  return claims.find((c) => c.id === id) || null;
}

/**
 * Get claims by status
 */
export function getMockClaimsByStatus(status: ClaimStatus): Claim[] {
  const claims = generateMockClaims();
  return claims.filter((c) => c.status === status);
}

/**
 * Get recent claims
 */
export function getRecentMockClaims(limit: number = 5): Claim[] {
  const claims = generateMockClaims();
  return claims.slice(0, limit);
}

/**
 * Get verifying claims (for animated consensus display)
 */
export function getVerifyingClaims(): Claim[] {
  return getMockClaimsByStatus("verifying");
}

/**
 * Simulate consensus progress update
 * Returns updated claim with progressed consensus
 */
export function updateConsensusProgress(claim: Claim): Claim {
  if (claim.status !== "verifying" || !claim.consensus) {
    return claim;
  }

  const { consensus } = claim;
  const pendingVerifiers = consensus.verifiers.filter(
    (v) => v.status === "pending"
  );

  if (pendingVerifiers.length === 0) {
    return claim; // No more pending verifiers
  }

  // Randomly approve one pending verifier
  const randomIndex = Math.floor(Math.random() * pendingVerifiers.length);
  const verifierToUpdate = pendingVerifiers[randomIndex];

  const updatedVerifiers = consensus.verifiers.map((v) => {
    if (v.address === verifierToUpdate.address) {
      return {
        ...v,
        status: Math.random() > 0.2 ? "approved" : "rejected",
        timestamp: Date.now(),
      } as Verifier;
    }
    return v;
  });

  const approvedCount = updatedVerifiers.filter(
    (v) => v.status === "approved"
  ).length;
  const rejectedCount = updatedVerifiers.filter(
    (v) => v.status === "rejected"
  ).length;

  // Check if consensus reached
  let newStatus: ClaimStatus = "verifying";
  let endTime = null;

  if (approvedCount >= consensus.required) {
    newStatus = "verified";
    endTime = Date.now();
  } else if (rejectedCount >= consensus.required) {
    newStatus = "rejected";
    endTime = Date.now();
  }

  return {
    ...claim,
    status: newStatus,
    updatedAt: Date.now(),
    verifiedAt: newStatus === "verified" ? Date.now() : null,
    consensus: {
      ...consensus,
      current: approvedCount,
      verifiers: updatedVerifiers,
      endTime,
    },
  };
}

/**
 * Mock API Response wrapper
 */
export interface MockAPIResponse<T> {
  success: boolean;
  data: T;
  timestamp: number;
  demo: boolean;
}

/**
 * Create mock API response
 */
export function createMockResponse<T>(data: T): MockAPIResponse<T> {
  return {
    success: true,
    data,
    timestamp: Date.now(),
    demo: isDemoMode(),
  };
}

// ============================================================================
// Export all mock data generation functions
// ============================================================================

export const mockData = {
  claims: generateMockClaims,
  transactions: generateMockTransactions,
  providerStats: generateMockProviderStats,
  claimById: getMockClaimById,
  claimsByStatus: getMockClaimsByStatus,
  recentClaims: getRecentMockClaims,
  verifyingClaims: getVerifyingClaims,
  updateConsensus: updateConsensusProgress,

  // Medical code references
  icd10Codes: ICD10_CODES,
  cptCodes: CPT_CODES,

  // Verifier pool
  verifiers: VERIFIER_POOL,
};

export default mockData;
