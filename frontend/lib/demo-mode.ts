/**
 * Demo Mode Config and Utilities
 *
 * Provides utilities for enabling demo mode in application
 * Allows users to explore features without wallet connection or blockchain interactions
 */

// Demo mode config
export const DEMO_MODE_CONFIG = {
  enabled: process.env.NEXT_PUBLIC_DEMO_MODE === "true",
  demoWalletPrefix: "0xDemo",
  autoConnectDelay: 500, // 500ms delay to simulate wallet connection
  transactionDelay: 1500, // 1.5s delay to simulate transaction processing
  consensusUpdateInterval: 3000, // 3s interval for consensus updates
} as const;

// Demo wallet addresses pool
export const DEMO_WALLETS = [
  "0xDemo12345678901234567890123456789012",
  "0xDemoABCDEF012345678901234567890123",
  "0xDemo1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P",
  "0xDemo5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U",
  "0xDemoVWXYZ01234567890123456789012345678901",
  "0xDemoABCDEF012345678901234567890123",
  "0xDemo1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P",
  "0xDemo5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U",
  "0xDemoVWXYZ01234567890123456789012345678901",
  "0xDemoABCDEF012345678901234567890123",
  "0xDemo1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P",
] as const;

// Demo provider information
export const DEMO_PROVIDER = {
  name: "Demo Healthcare Provider",
  npi: "1234567890",
  address: DEMO_WALLETS[0],
  reputation: 90,
  totalClaims: 847,
  approvedClaims: 782,
  rejectedClaims: 65,
  pendingClaims: 23,
  totalStaked: "10.0", // ETH
  joinedDate: "2024-03-15",
} as const;

/**
 * Check if demo mode is enabled
 */
export function isDemoMode(): boolean {
  return DEMO_MODE_CONFIG.enabled;
}

/**
 * Get a random demo wallet address
 */
export function getRandomDemoWallet(): string {
  const index = Math.floor(Math.random() * DEMO_WALLETS.length);
  return DEMO_WALLETS[index];
}

/**
 * Generate a demo wallet address with a specific seed
 */
export function generateDemoWallet(seed: string): string {
  // Simple hash function for deterministic address generation
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  const hexHash = Math.abs(hash).toString(16).padStart(12, "0");
  return `${DEMO_MODE_CONFIG.demoWalletPrefix}${hexHash}${"0".repeat(
    34 - hexHash.length
  )}`;
}

/**
 * Check if an address is a demo wallet
 */
export function isDemoWallet(address: string): boolean {
  return address.startsWith(DEMO_MODE_CONFIG.demoWalletPrefix);
}

/**
 * Format demo wallet address for display
 */
export function formatDemoAddress(address: string): string {
  if (!isDemoWallet(address)) {
    return address;
  }
  return `${address.slice(0, 10)}...${address.slice(-8)}`;
}

/**
 * Simulate async operation with delay (for demo transactions)
 */
export async function simulateDelay(ms?: number): Promise<void> {
  const delay = ms ?? DEMO_MODE_CONFIG.transactionDelay;
  return new Promise((resolve) => setTimeout(resolve, delay));
}

/**
 * Simulate transaction hash generation
 */
export function generateDemoTxHash(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `0xDemo${timestamp.toString(16)}${random}`;
}

/**
 * Demo mode status object
 */
export interface DemoModeStatus {
  enabled: boolean;
  wallet: {
    connected: boolean;
    address: string | null;
  };
  provider: typeof DEMO_PROVIDER | null;
}

/**
 * Get current demo mode status
 */
export function getDemoModeStatus(): DemoModeStatus {
  if (!isDemoMode()) {
    return {
      enabled: false,
      wallet: { connected: false, address: null },
      provider: null,
    };
  }

  return {
    enabled: true,
    wallet: {
      connected: true,
      address: DEMO_WALLETS[0],
    },
    provider: DEMO_PROVIDER,
  };
}

/**
 * Demo mode event types for analytics
 */

export type DemoModeEvent =
  | "demo_mode_activated"
  | "demo_wallet_connected"
  | "demo_claim_submitted"
  | "demo_claim_viewed"
  | "demo_transaction_simulated"
  | "demo_consensus_viewed";

/**
 * Log demo mode events (can be integrated with analytics)
 */
export function logDemoEvent(
  event: DemoModeEvent,
  metadata?: Record<string, unknown>
): void {
  if (!isDemoMode()) return;

  console.log("[Demo Mode]", event, metadata);

  // TODO: Integrate with analytics service
  // Example: analytics.track(event, { ...metadata, demoMode: true });
}

/**
 * Demo mode feature flags
 */
export const DEMO_FEATURES = {
  // Enable all features in demo mode
  claimSubmission: true,
  claimVerification: true,
  consensusViewing: true,
  stakeManagement: true,
  reputationSystem: true,
  transactionHistory: true,

  // Disable certain features that don't make sense in demo
  realBlockchainTx: false,
  walletSignatures: false,
  actualPayments: false,
} as const;

/**
 * Check if a feature is enabled in demo mode
 */
export function isDemoFeatureEnabled(
  feature: keyof typeof DEMO_FEATURES
): boolean {
  if (!isDemoMode()) {
    return true; // In production, all features should work
  }
  return DEMO_FEATURES[feature];
}

/**
 * Demo mode warning messages
 */
export const DEMO_WARNINGS = {
  noRealTransactions:
    "Demo mode active - no real blockchain transactions will be executed",
  mockData: "You are viewing simulated data for demonstration purposes",
  noRealWallet:
    "Using a demo wallet - connect a real wallet to interact with the blockchain",
  limitedFeatures: "Some features are limited in demo mode",
} as const;

/**
 * Get demo mode banner configuration
 */
export interface DemoBannerConfig {
  show: boolean;
  message: string;
  type: "info" | "warning";
  dismissible: boolean;
}

export function getDemoBannerConfig(): DemoBannerConfig {
  if (!isDemoMode()) {
    return {
      show: false,
      message: "",
      type: "info",
      dismissible: false,
    };
  }

  return {
    show: true,
    message: DEMO_WARNINGS.noRealTransactions,
    type: "warning",
    dismissible: true,
  };
}
