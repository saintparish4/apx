"use client";

/**
 * React Hooks for Demo Mode
 *
 * Custom hooks to integrate demo mode functionality into React components
 */

import { useState, useEffect, useCallback, useRef } from "react";
import {
  isDemoMode,
  DEMO_MODE_CONFIG,
  logDemoEvent,
  getDemoModeStatus,
  type DemoModeStatus,
} from "./demo-mode";
import {
  getMockWallet,
  TransactionRequest,
  type WalletState,
} from "./mock-wallet";
import {
  mockData,
  type Claim,
  type Transaction,
  type ProviderStats,
  type ClaimStatus,
} from "./mock-data";

// ===================================================
// Demo Mode Status Hook
// ===================================================

/**
 * Hook to get current demo mode status
 */
export function useDemoMode() {
  const [status] = useState<DemoModeStatus>(getDemoModeStatus());

  useEffect(() => {
    if (isDemoMode()) {
      logDemoEvent("demo_mode_activated");
    }
  }, []);

  return status;
}

// ===================================================
// Mock Wallet Hook
// ===================================================

/**
 * Hook to integrate mock wallet into components
 */
export function useMockWalletIntegration() {
  const [walletState, setWalletState] = useState<WalletState>({
    status: "disconnected",
    address: null,
    chainId: null,
    balance: null,
    error: null,
  });

  const wallet = isDemoMode() ? getMockWallet() : null;

  useEffect(() => {
    if (!wallet) return;

    const handleStateChange = (...args: unknown[]) => {
      const state = args[0] as WalletState;
      setWalletState(state);
    };

    wallet.on("stateChanged", handleStateChange);

    // Auto-connect in demo mode
    if (isDemoMode() && walletState.status === "disconnected") {
      wallet.connect().catch(console.error);
    }

    return () => {
      wallet.off("stateChanged", handleStateChange);
    };
  }, [wallet, walletState.status]);

  const connect = useCallback(async () => {
    if (!wallet) return null;
    return wallet.connect();
  }, [wallet]);

  const disconnect = useCallback(async () => {
    if (!wallet) return;
    return wallet.disconnect();
  }, [wallet]);

  const sendTransaction = useCallback(
    async (request: TransactionRequest) => {
      if (!wallet) throw new Error("Wallet not available");
      return wallet.sendTransaction(request);
    },
    [wallet]
  );

  return {
    ...walletState,
    connect,
    disconnect,
    sendTransaction,
    isDemo: isDemoMode(),
  };
}

// ============================================================================
// Mock Claims Data Hook
// ============================================================================

/**
 * Hook to fetch and manage mock claims data
 */
export function useMockClaims(filters?: {
  status?: ClaimStatus;
  limit?: number;
}) {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(() => isDemoMode());

  useEffect(() => {
    if (!isDemoMode()) {
      setTimeout(() => setLoading(false), 0);
      return;
    }

    // Simulate API delay
    const timer = setTimeout(() => {
      let data = mockData.claims();

      if (filters?.status) {
        data = mockData.claimsByStatus(filters.status);
      }

      if (filters?.limit) {
        data = data.slice(0, filters.limit);
      }

      setClaims(data);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters?.status, filters?.limit]);

  const refreshClaims = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setClaims(mockData.claims());
      setLoading(false);
    }, 300);
  }, []);

  return {
    claims,
    loading,
    refreshClaims,
  };
}

// ============================================================================
// Mock Claim Detail Hook
// ============================================================================

/**
 * Hook to fetch a single claim by ID
 */
export function useMockClaim(claimId: string | null) {
  const [claim, setClaim] = useState<Claim | null>(null);
  const [loading, setLoading] = useState(() => isDemoMode() && !!claimId);

  useEffect(() => {
    if (!isDemoMode() || !claimId) {
      setTimeout(() => setLoading(false), 0);
      return;
    }

    const timer = setTimeout(() => {
      const data = mockData.claimById(claimId);
      setClaim(data);
      setLoading(false);

      if (data) {
        logDemoEvent("demo_claim_viewed", { claimId });
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [claimId]);

  return {
    claim,
    loading,
  };
}

// ============================================================================
// Animated Consensus Hook
// ============================================================================

/**
 * Hook to animate consensus progress for verifying claims
 */
export function useAnimatedConsensus(claimId: string | null) {
  const [claim, setClaim] = useState<Claim | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isDemoMode() || !claimId) {
      return;
    }

    // Get initial claim
    const initialClaim = mockData.claimById(claimId);
    if (!initialClaim || initialClaim.status !== "verifying") {
      setTimeout(() => setClaim(initialClaim), 0);
      return;
    }

    setTimeout(() => {
      setClaim(initialClaim);
      logDemoEvent("demo_consensus_viewed", { claimId });
    }, 0);

    // Animate consensus progress
    intervalRef.current = setInterval(() => {
      setClaim((currentClaim) => {
        if (!currentClaim) return null;

        const updated = mockData.updateConsensus(currentClaim);

        // Stop animation if consensus reached
        if (updated.status !== "verifying") {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }

        return updated;
      });
    }, DEMO_MODE_CONFIG.consensusUpdateInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [claimId]);

  return {
    claim,
    isAnimating: claim?.status === "verifying",
  };
}

// ============================================================================
// Mock Transactions Hook
// ============================================================================

/**
 * Hook to fetch mock transaction history
 */
export function useMockTransactions(limit?: number) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(() => isDemoMode());

  useEffect(() => {
    if (!isDemoMode()) {
      setTimeout(() => setLoading(false), 0);
      return;
    }

    const timer = setTimeout(() => {
      const claims = mockData.claims();
      let data = mockData.transactions(claims);

      if (limit) {
        data = data.slice(0, limit);
      }

      setTransactions(data);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [limit]);

  return {
    transactions,
    loading,
  };
}

// ============================================================================
// Mock Provider Stats Hook
// ============================================================================

/**
 * Hook to fetch provider statistics
 */
export function useMockProviderStats() {
  const [stats, setStats] = useState<ProviderStats | null>(null);
  const [loading, setLoading] = useState(() => isDemoMode());

  useEffect(() => {
    if (!isDemoMode()) {
      setTimeout(() => setLoading(false), 0);
      return;
    }

    const timer = setTimeout(() => {
      const data = mockData.providerStats();
      setStats(data);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const refreshStats = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setStats(mockData.providerStats());
      setLoading(false);
    }, 300);
  }, []);

  return {
    stats,
    loading,
    refreshStats,
  };
}

// ============================================================================
// Mock Claim Submission Hook
// ============================================================================

export interface SubmitClaimData {
  patientId: string;
  diagnosisCodes: string[];
  procedureCodes: string[];
  amount: number;
  description: string;
}

/**
 * Hook to handle claim submission in demo mode
 */
export function useMockClaimSubmission() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitClaim = useCallback(async (data: SubmitClaimData) => {
    if (!isDemoMode()) {
      throw new Error("Not in demo mode");
    }

    setSubmitting(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) =>
        setTimeout(resolve, DEMO_MODE_CONFIG.transactionDelay)
      );

      // Generate mock transaction hash
      const txHash = `0xdemo${Date.now()}`;

      logDemoEvent("demo_claim_submitted", {
        ...data,
        txHash,
      });

      return {
        success: true,
        txHash,
        claimId: `claim_${Date.now()}`,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      throw err;
    } finally {
      setSubmitting(false);
    }
  }, []);

  return {
    submitClaim,
    submitting,
    error,
  };
}

// ============================================================================
// Real-time Updates Hook (Simulated)
// ============================================================================

/**
 * Hook to simulate real-time updates via WebSocket
 */
export interface RealtimeUpdate {
  type: string;
  claimId: string;
  timestamp: number;
}

export function useMockRealtimeUpdates() {
  const [updates, setUpdates] = useState<RealtimeUpdate[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isDemoMode()) {
      return;
    }

    // Simulate periodic updates
    intervalRef.current = setInterval(() => {
      const verifyingClaims = mockData.verifyingClaims();

      if (verifyingClaims.length > 0) {
        const randomClaim =
          verifyingClaims[Math.floor(Math.random() * verifyingClaims.length)];

        setUpdates((prev) => [
          {
            type: "consensus_update",
            claimId: randomClaim.id,
            timestamp: Date.now(),
          },
          ...prev.slice(0, 9), // Keep last 10 updates
        ]);
      }
    }, DEMO_MODE_CONFIG.consensusUpdateInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    updates,
    clearUpdates: () => setUpdates([]),
  };
}

// ============================================================================
// Demo Banner Hook
// ============================================================================

/**
 * Hook to manage demo mode banner visibility
 */
export function useDemoBanner() {
  const [visible, setVisible] = useState(isDemoMode());

  const dismiss = useCallback(() => {
    setVisible(false);
    // Store dismissal in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("demo_banner_dismissed", "true");
    }
  }, []);

  useEffect(() => {
    // Check if banner was previously dismissed
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem("demo_banner_dismissed");
      if (dismissed === "true") {
        setTimeout(() => setVisible(false), 0);
      }
    }
  }, []);

  return {
    visible: visible && isDemoMode(),
    dismiss,
  };
}
