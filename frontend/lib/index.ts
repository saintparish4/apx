/**
 * Demo Mode Library - Main Exports
 *
 * Central export point for all demo mode utilities, hooks, and types
 */

// Demo mode utilities
export {
  isDemoMode,
  getRandomDemoWallet,
  generateDemoWallet,
  isDemoWallet,
  formatDemoAddress,
  simulateDelay,
  generateDemoTxHash,
  getDemoModeStatus,
  logDemoEvent,
  isDemoFeatureEnabled,
  getDemoBannerConfig,
  DEMO_MODE_CONFIG,
  DEMO_WALLETS,
  DEMO_PROVIDER,
  DEMO_FEATURES,
  DEMO_WARNINGS,
  type DemoModeStatus,
  type DemoModeEvent,
  type DemoBannerConfig,
} from "./demo-mode";

// Mock wallet
export {
  MockWalletProvider,
  getMockWallet,
  resetMockWallet,
  useMockWallet,
  createMockWalletContext,
  type WalletState,
  type TransactionRequest,
  type TransactionReceipt,
  type ConnectionStatus,
  type MockWalletContextValue,
} from "./mock-wallet";

// Mock data
export {
  mockData,
  generateMockClaims,
  generateMockTransactions,
  generateMockProviderStats,
  getMockClaimById,
  getMockClaimsByStatus,
  getRecentMockClaims,
  getVerifyingClaims,
  updateConsensusProgress,
  createMockResponse,
  type Claim,
  type Transaction,
  type ProviderStats,
  type ClaimStatus,
  type VerifierStatus,
  type Verifier,
  type ConsensusProgress,
  type MockAPIResponse,
} from "./mock-data";

// React hooks
export {
  useDemoMode,
  useMockWalletIntegration,
  useMockClaims,
  useMockClaim,
  useAnimatedConsensus,
  useMockTransactions,
  useMockProviderStats,
  useMockClaimSubmission,
  useMockRealtimeUpdates,
  useDemoBanner,
  type SubmitClaimData,
  type RealtimeUpdate,
} from "./use-demo-mode";

// Types (re-export from types.ts)
export type {
  DemoModeConfig,
  DemoProvider,
  Currency,
  TransactionType,
  TransactionStatus,
  TransactionFilters,
  ClaimFilters,
  ProviderCredentials,
  ICD10Code,
  CPTCode,
  MedicalCoding,
  MockDataService,
  VerifierInfo,
  UseDemoModeReturn,
  UseMockWalletReturn,
  UseMockClaimsReturn,
  UseMockClaimReturn,
  UseAnimatedConsensusReturn,
  UseMockTransactionsReturn,
  UseMockProviderStatsReturn,
  UseMockClaimSubmissionReturn,
  UseMockRealtimeUpdatesReturn,
  UseDemoBannerReturn,
  DemoBannerProps,
  ClaimCardProps,
  ConsensusProgressProps,
  WalletConnectProps,
  ProviderStatsCardProps,
  TransactionListProps,
  DeepPartial,
  Nullable,
  Optional,
  AsyncFunction,
  EventCallback,
  Timestamp,
  EthereumAddress,
  TransactionHash,
  IPFSCid,
  ClaimEvent,
  WalletEvent,
} from "./types";

// Component exports
export { DemoBanner } from "../components/demo-banner";

