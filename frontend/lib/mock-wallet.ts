/**
 * Mock Wallet Service
 *
 * Simulates wallet connection and blockchain interactions for demo purposes.
 * Provides a drop-in replacement for Web3 wallet providers.
 */

import {
  DEMO_WALLETS,
  DEMO_MODE_CONFIG,
  simulateDelay,
  generateDemoTxHash,
  isDemoMode,
  logDemoEvent,
} from "./demo-mode";

export type ConnectionStatus =
  | "disconnected"
  | "connecting"
  | "connected"
  | "error";

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

export interface TransactionReceipt {
  hash: string;
  from: string;
  to: string;
  status: "pending" | "confirmed" | "failed";
  blockNumber?: number;
  timestamp: number;
  gasUsed?: string;
}

/**
 * Mock Wallet Provider Class
 * Simulates wallet behavior for demo mode
 */
export class MockWalletProvider {
  private state: WalletState = {
    status: "disconnected",
    address: null,
    chainId: null,
    balance: null,
    error: null,
  };

  private listeners: Map<string, Set<(...args: unknown[]) => void>> = new Map();
  private pendingTransactions: Map<string, TransactionReceipt> = new Map();

  constructor() {
    if (!isDemoMode()) {
      console.warn("MockWalletProvider should only be used in demo mode");
    }
  }

  /**
   * Simulate wallet connection
   */
  async connect(): Promise<string> {
    this.updateState({ status: "connecting", error: null });
    logDemoEvent("demo_wallet_connected", { action: "connecting" });

    await simulateDelay(DEMO_MODE_CONFIG.autoConnectDelay);

    const address = DEMO_WALLETS[0];
    const chainId = 11155111; // Sepolia testnet
    const balance = "5.5"; // ETH

    this.updateState({
      status: "connected",
      address,
      chainId,
      balance,
      error: null,
    });

    logDemoEvent("demo_wallet_connected", {
      action: "connected",
      address,
      chainId,
    });

    this.emit("accountsChanged", [address]);
    this.emit("chainChanged", chainId);

    return address;
  }

  /**
   * Disconnect wallet
   */
  async disconnect(): Promise<void> {
    this.updateState({
      status: "disconnected",
      address: null,
      chainId: null,
      balance: null,
      error: null,
    });

    this.emit("accountsChanged", []);
    logDemoEvent("demo_wallet_connected", { action: "disconnected" });
  }

  /**
   * Get current wallet state
   */
  getState(): WalletState {
    return { ...this.state };
  }

  /**
   * Check if wallet is connected
   */
  isConnected(): boolean {
    return this.state.status === "connected" && this.state.address !== null;
  }

  /**
   * Get connected address
   */
  getAddress(): string | null {
    return this.state.address;
  }

  /**
   * Get chain ID
   */
  getChainId(): number | null {
    return this.state.chainId;
  }

  /**
   * Get balance
   */
  getBalance(): string | null {
    return this.state.balance;
  }

  /**
   * Simulate transaction sending
   */
  async sendTransaction(request: TransactionRequest): Promise<string> {
    if (!this.isConnected()) {
      throw new Error("Wallet not connected");
    }

    const txHash = generateDemoTxHash();
    const receipt: TransactionReceipt = {
      hash: txHash,
      from: this.state.address!,
      to: request.to,
      status: "pending",
      timestamp: Date.now(),
    };

    this.pendingTransactions.set(txHash, receipt);

    logDemoEvent("demo_transaction_simulated", {
      hash: txHash,
      to: request.to,
      value: request.value,
    });

    // Simulate transaction confirmation after delay
    setTimeout(() => {
      const updatedReceipt: TransactionReceipt = {
        ...receipt,
        status: "confirmed",
        blockNumber: Math.floor(Math.random() * 1000000) + 5000000,
        gasUsed: "21000",
      };
      this.pendingTransactions.set(txHash, updatedReceipt);
      this.emit("transactionConfirmed", updatedReceipt);
    }, DEMO_MODE_CONFIG.transactionDelay);

    return txHash;
  }

  /**
   * Get transaction receipt
   */
  async getTransactionReceipt(
    hash: string
  ): Promise<TransactionReceipt | null> {
    await simulateDelay(100); // Small delay for realism
    return this.pendingTransactions.get(hash) || null;
  }

  /**
   * Wait for transaction confirmation
   */
  async waitForTransaction(
    hash: string,
    confirmations: number = 1
  ): Promise<TransactionReceipt> {
    return new Promise((resolve, reject) => {
      let confirmationCount = 0;
      
      const checkReceipt = async () => {
        const receipt = await this.getTransactionReceipt(hash);

        if (receipt?.status === "failed") {
          reject(new Error("Transaction failed"));
          return;
        }

        if (receipt?.status === "confirmed") {
          confirmationCount++;
          
          // Wait for the specified number of confirmations
          // Each confirmation simulates one block being mined
          if (confirmationCount >= confirmations) {
            resolve(receipt);
          } else {
            // Simulate waiting for next block/confirmation
            setTimeout(checkReceipt, 500);
          }
        } else {
          // Transaction still pending, check again after delay
          setTimeout(checkReceipt, 500);
        }
      };

      checkReceipt();
    });
  }

  /**
   * Simulate contract call (read operation)
   */
  async call(request: TransactionRequest): Promise<string> {
    await simulateDelay(100);

    logDemoEvent("demo_transaction_simulated", {
      action: "contract_call",
      to: request.to,
      data: request.data?.substring(0, 20),
    });

    // Return mock data based on the call
    // This would need to be expanded based on actual contract methods
    return "0x0000000000000000000000000000000000000000000000000000000000000001";
  }

  /**
   * Sign message (simulated)
   */
  async signMessage(message: string): Promise<string> {
    if (!this.isConnected()) {
      throw new Error("Wallet not connected");
    }

    await simulateDelay(500);

    // Generate a fake signature
    const signature = `0xdemo_signature_${Date.now()}_${message.substring(
      0,
      10
    )}`;

    logDemoEvent("demo_transaction_simulated", {
      action: "sign_message",
      message: message.substring(0, 50),
    });

    return signature;
  }

  /**
   * Switch network (simulated)
   */
  async switchNetwork(chainId: number): Promise<void> {
    await simulateDelay(300);

    this.updateState({ chainId });
    this.emit("chainChanged", chainId);

    logDemoEvent("demo_transaction_simulated", {
      action: "switch_network",
      chainId,
    });
  }

  /**
   * Add event listener
   */
  on(event: string, callback: (...args: unknown[]) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  /**
   * Remove event listener
   */
  off(event: string, callback: (...args: unknown[]) => void): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.delete(callback);
    }
  }

  /**
   * Emit event to listeners
   */
  private emit(event: string, ...args: unknown[]): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => {
        try {
          callback(...args);
        } catch (error) {
          console.error(`Error in ${event} listener:`, error);
        }
      });
    }
  }

  /**
   * Update internal state and notify listeners
   */
  private updateState(updates: Partial<WalletState>): void {
    this.state = { ...this.state, ...updates };
    this.emit("stateChanged", this.state);
  }

  /**
   * Request account access (alias for connect)
   */
  async request(args: {
    method: string;
    params?: unknown[];
  }): Promise<unknown> {
    switch (args.method) {
      case "eth_requestAccounts":
        const address = await this.connect();
        return [address];

      case "eth_accounts":
        return this.state.address ? [this.state.address] : [];

      case "eth_chainId":
        return `0x${this.state.chainId?.toString(16)}`;

      case "eth_getBalance":
        return `0x${(parseFloat(this.state.balance || "0") * 1e18).toString(
          16
        )}`;

      case "eth_sendTransaction":
        return this.sendTransaction(
          (args.params?.[0] as TransactionRequest) || {}
        );

      case "eth_call":
        return this.call((args.params?.[0] as TransactionRequest) || {});

      case "personal_sign":
        return this.signMessage((args.params?.[0] as string) || "");

      case "wallet_switchEthereumChain":
        const chainId = parseInt(
          (args.params?.[0] as { chainId: string }).chainId || "0x0",
          16
        );
        await this.switchNetwork(chainId);
        return null;

      default:
        throw new Error(`Unsupported method: ${args.method}`);
    }
  }
}

/**
 * Global mock wallet instance (singleton)
 */
let mockWalletInstance: MockWalletProvider | null = null;

/**
 * Get or create mock wallet instance
 */
export function getMockWallet(): MockWalletProvider {
  if (!mockWalletInstance) {
    mockWalletInstance = new MockWalletProvider();
  }
  return mockWalletInstance;
}

/**
 * Reset mock wallet (useful for testing)
 */
export function resetMockWallet(): void {
  mockWalletInstance = null;
}

/**
 * Hook for React components to use mock wallet
 */
export function useMockWallet() {
  const wallet = getMockWallet();

  return {
    wallet,
    connect: () => wallet.connect(),
    disconnect: () => wallet.disconnect(),
    isConnected: wallet.isConnected(),
    address: wallet.getAddress(),
    chainId: wallet.getChainId(),
    balance: wallet.getBalance(),
    state: wallet.getState(),
  };
}

/**
 * Provider component wrapper for demo mode
 * This can be used to wrap the app and provide mock wallet context
 */
export interface MockWalletContextValue {
  wallet: MockWalletProvider;
  state: WalletState;
  connect: () => Promise<string>;
  disconnect: () => Promise<void>;
  sendTransaction: (request: TransactionRequest) => Promise<string>;
  signMessage: (message: string) => Promise<string>;
}

/**
 * Helper to create mock wallet context value
 */
export function createMockWalletContext(): MockWalletContextValue {
  const wallet = getMockWallet();

  return {
    wallet,
    state: wallet.getState(),
    connect: () => wallet.connect(),
    disconnect: () => wallet.disconnect(),
    sendTransaction: (request) => wallet.sendTransaction(request),
    signMessage: (message) => wallet.signMessage(message),
  };
}
