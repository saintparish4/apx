/**
 * Type Definitions for Demo Mode
 * 
 * Central type definitions used across the demo mode implementation
 */

import type { MockWalletProvider } from "./mock-wallet";

// ============================================================================
// Demo Mode Types
// ============================================================================

export interface DemoModeConfig {
    readonly enabled: boolean;
    readonly demoWalletPrefix: string;
    readonly autoConnectDelay: number;
    readonly transactionDelay: number;
    readonly consensusUpdateInterval: number;
  }
  
  export interface DemoProvider {
    readonly name: string;
    readonly npi: string;
    readonly address: string;
    readonly reputation: number;
    readonly totalClaims: number;
    readonly approvedClaims: number;
    readonly rejectedClaims: number;
    readonly pendingClaims: number;
    readonly totalStaked: string;
    readonly joinedDate: string;
  }
  
  export interface DemoModeStatus {
    enabled: boolean;
    wallet: {
      connected: boolean;
      address: string | null;
    };
    provider: DemoProvider | null;
  }
  
  export type DemoModeEvent = 
    | 'demo_mode_activated'
    | 'demo_wallet_connected'
    | 'demo_claim_submitted'
    | 'demo_claim_viewed'
    | 'demo_transaction_simulated'
    | 'demo_consensus_viewed';
  
  export interface DemoFeatures {
    readonly claimSubmission: boolean;
    readonly claimVerification: boolean;
    readonly consensusViewing: boolean;
    readonly stakeManagement: boolean;
    readonly reputationSystem: boolean;
    readonly transactionHistory: boolean;
    readonly realBlockchainTx: boolean;
    readonly walletSignatures: boolean;
    readonly actualPayments: boolean;
  }
  
  export interface DemoBannerConfig {
    show: boolean;
    message: string;
    type: 'info' | 'warning';
    dismissible: boolean;
  }
  
  // ============================================================================
  // Wallet Types
  // ============================================================================
  
  export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';
  
  export interface WalletState {
    status: ConnectionStatus;
    address: string | null;
    chainId: number | null;
    balance: string | null;
    error: string | null;
  }
  
  export interface TransactionRequest {
    to: string;
    data?: string;
    value?: string;
    gasLimit?: string;
  }
  
  export type TransactionStatus = 'pending' | 'confirmed' | 'failed';
  
  export interface TransactionReceipt {
    hash: string;
    from: string;
    to: string;
    status: TransactionStatus;
    blockNumber?: number;
    timestamp: number;
    gasUsed?: string;
  }
  
  export interface MockWalletContextValue {
    wallet: MockWalletProvider;
    state: WalletState;
    connect: () => Promise<string>;
    disconnect: () => Promise<void>;
    sendTransaction: (request: TransactionRequest) => Promise<string>;
    signMessage: (message: string) => Promise<string>;
  }
  
  // ============================================================================
  // Claim Types
  // ============================================================================
  
  export type ClaimStatus = 
    | 'pending'
    | 'verifying'
    | 'verified'
    | 'flagged'
    | 'rejected'
    | 'appealing';
  
  export type Currency = 'USD' | 'ETH';
  
  export interface Claim {
    // Identifiers
    id: string;
    claimNumber: string;
    patientId: string;
    providerId: string;
    providerName: string;
    providerNPI: string;
    
    // Medical codes
    diagnosisCodes: string[];
    procedureCodes: string[];
    
    // Financial
    amount: number;
    currency: Currency;
    
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
    
    // Metadata
    description: string;
    rejectionReason: string | null;
    flagReason: string | null;
    notes: string[];
  }
  
  export type VerifierStatus = 'pending' | 'approved' | 'rejected' | 'abstained';
  
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
    threshold: number;
    startTime: number;
    endTime: number | null;
  }
  
  export interface SubmitClaimData {
    patientId: string;
    diagnosisCodes: string[];
    procedureCodes: string[];
    amount: number;
    description: string;
  }
  
  export interface ClaimFilters {
    status?: ClaimStatus;
    limit?: number;
    startDate?: number;
    endDate?: number;
    minAmount?: number;
    maxAmount?: number;
  }
  
  // ============================================================================
  // Transaction Types
  // ============================================================================
  
  export type TransactionType = 
    | 'claim_submission'
    | 'verification'
    | 'stake'
    | 'unstake'
    | 'slash';
  
  export interface Transaction {
    hash: string;
    from: string;
    to: string;
    value: string;
    timestamp: number;
    blockNumber: number;
    status: TransactionStatus;
    type: TransactionType;
    claimId?: string;
    gasUsed: string;
    gasCost: string;
  }
  
  export interface TransactionFilters {
    type?: TransactionType;
    status?: TransactionStatus;
    limit?: number;
    startDate?: number;
    endDate?: number;
  }
  
  // ============================================================================
  // Provider Types
  // ============================================================================
  
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
    totalStaked: string;
    averageClaimAmount: number;
    approvalRate: number;
    averageVerificationTime: number;
    joinedDate: string;
    lastActivityDate: string;
  }
  
  export interface ProviderCredentials {
    name: string;
    npi: string;
    licenseNumber: string;
    specialties: string[];
    address: string;
  }
  
  // ============================================================================
  // Medical Code Types
  // ============================================================================
  
  export interface ICD10Code {
    code: string;
    description: string;
  }
  
  export interface CPTCode {
    code: string;
    description: string;
    amount: number;
  }
  
  export interface MedicalCoding {
    icd10: ICD10Code[];
    cpt: CPTCode[];
  }
  
  // ============================================================================
  // Mock Data Types
  // ============================================================================
  
  export interface MockAPIResponse<T> {
    success: boolean;
    data: T;
    timestamp: number;
    demo: boolean;
  }
  
  export interface MockDataService {
    claims: () => Claim[];
    transactions: (claims: Claim[]) => Transaction[];
    providerStats: () => ProviderStats;
    claimById: (id: string) => Claim | null;
    claimsByStatus: (status: ClaimStatus) => Claim[];
    recentClaims: (limit?: number) => Claim[];
    verifyingClaims: () => Claim[];
    updateConsensus: (claim: Claim) => Claim;
    icd10Codes: ICD10Code[];
    cptCodes: CPTCode[];
    verifiers: VerifierInfo[];
  }
  
  export interface VerifierInfo {
    name: string;
    reputation: number;
    address: string;
  }
  
  // ============================================================================
  // Hook Return Types
  // ============================================================================
  
  export interface UseDemoModeReturn {
    isDemoMode: boolean;
    wallet: {
      connected: boolean;
      address: string | null;
    };
    provider: DemoProvider | null;
  }
  
  export interface UseMockWalletReturn extends WalletState {
    connect: () => Promise<string | null>;
    disconnect: () => Promise<void>;
    sendTransaction: (request: TransactionRequest) => Promise<string>;
    isDemo: boolean;
  }
  
  export interface UseMockClaimsReturn {
    claims: Claim[];
    loading: boolean;
    refreshClaims: () => void;
  }
  
  export interface UseMockClaimReturn {
    claim: Claim | null;
    loading: boolean;
  }
  
  export interface UseAnimatedConsensusReturn {
    claim: Claim | null;
    isAnimating: boolean;
  }
  
  export interface UseMockTransactionsReturn {
    transactions: Transaction[];
    loading: boolean;
  }
  
  export interface UseMockProviderStatsReturn {
    stats: ProviderStats | null;
    loading: boolean;
    refreshStats: () => void;
  }
  
  export interface UseMockClaimSubmissionReturn {
    submitClaim: (data: SubmitClaimData) => Promise<{
      success: boolean;
      txHash: string;
      claimId: string;
    }>;
    submitting: boolean;
    error: string | null;
  }
  
  export interface RealtimeUpdate {
    type: 'consensus_update' | 'claim_status_change' | 'new_claim' | 'verifier_vote';
    claimId: string;
    timestamp: number;
    data?: unknown;
  }
  
  export interface UseMockRealtimeUpdatesReturn {
    updates: RealtimeUpdate[];
    clearUpdates: () => void;
  }
  
  export interface UseDemoBannerReturn {
    visible: boolean;
    dismiss: () => void;
  }
  
  // ============================================================================
  // Component Props Types
  // ============================================================================
  
  export interface DemoBannerProps {
    className?: string;
    onDismiss?: () => void;
  }
  
  export interface ClaimCardProps {
    claim: Claim;
    onClick?: (claim: Claim) => void;
    showConsensus?: boolean;
    className?: string;
  }
  
  export interface ConsensusProgressProps {
    claim: Claim;
    animated?: boolean;
    compact?: boolean;
    className?: string;
  }
  
  export interface WalletConnectProps {
    onConnect?: (address: string) => void;
    onDisconnect?: () => void;
    className?: string;
  }
  
  export interface ProviderStatsCardProps {
    stats: ProviderStats;
    className?: string;
  }
  
  export interface TransactionListProps {
    transactions: Transaction[];
    limit?: number;
    className?: string;
  }
  
  // ============================================================================
  // Utility Types
  // ============================================================================
  
  export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
  };
  
  export type Nullable<T> = T | null;
  
  export type Optional<T> = T | undefined;
  
  export type AsyncFunction<T = void> = () => Promise<T>;
  
  export type EventCallback<T = unknown> = (data: T) => void;
  
  export type Timestamp = number;
  
  export type EthereumAddress = string;
  
  export type TransactionHash = string;
  
  export type IPFSCid = string;
  
  // ============================================================================
  // Enum-like Constants
  // ============================================================================
  
  export const CLAIM_STATUSES = [
    'pending',
    'verifying',
    'verified',
    'flagged',
    'rejected',
    'appealing',
  ] as const;
  
  export const TRANSACTION_TYPES = [
    'claim_submission',
    'verification',
    'stake',
    'unstake',
    'slash',
  ] as const;
  
  export const VERIFIER_STATUSES = [
    'pending',
    'approved',
    'rejected',
    'abstained',
  ] as const;
  
  // ============================================================================
  // Type Guards
  // ============================================================================
  
  export function isClaimStatus(value: string): value is ClaimStatus {
    return CLAIM_STATUSES.includes(value as ClaimStatus);
  }
  
  export function isTransactionType(value: string): value is TransactionType {
    return TRANSACTION_TYPES.includes(value as TransactionType);
  }
  
  export function isVerifierStatus(value: string): value is VerifierStatus {
    return VERIFIER_STATUSES.includes(value as VerifierStatus);
  }
  
  export function isDemoWallet(address: string): boolean {
    return address.startsWith('0xDemo');
  }
  
  export function isValidClaim(claim: unknown): claim is Claim {
    return (
      typeof claim === 'object' &&
      claim !== null &&
      typeof (claim as Record<string, unknown>).id === 'string' &&
      typeof (claim as Record<string, unknown>).claimNumber === 'string' &&
      isClaimStatus((claim as Record<string, unknown>).status as string)
    );
  }
  
  // ============================================================================
  // Discriminated Union Types
  // ============================================================================
  
  export type ClaimEvent =
    | { type: 'submitted'; claim: Claim; txHash: string }
    | { type: 'verifying'; claim: Claim; consensus: ConsensusProgress }
    | { type: 'verified'; claim: Claim; verifiedAt: number }
    | { type: 'rejected'; claim: Claim; reason: string }
    | { type: 'flagged'; claim: Claim; flagReason: string };
  
  export type WalletEvent =
    | { type: 'connected'; address: string; chainId: number }
    | { type: 'disconnected' }
    | { type: 'chainChanged'; chainId: number }
    | { type: 'accountsChanged'; accounts: string[] };
  