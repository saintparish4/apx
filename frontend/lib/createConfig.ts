import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, metaMask, walletConnect } from "wagmi/connectors";

// Custom local Anvil chain
const anvil = {
  id: 31337,
  name: "Anvil",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
    public: { http: ["http://127.0.0.1:8545"] },
  },
} as const;

export const config = createConfig({
  chains: [mainnet, sepolia, anvil],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo",
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [anvil.id]: http("http://127.0.0.1:8545"),
  },
});

// Contract addresses (will be set after deployment)
export const contracts = {
  providerRegistry: process.env.NEXT_PUBLIC_PROVIDER_REGISTRY_ADDRESS || "",
  claimsRegistry: process.env.NEXT_PUBLIC_CLAIMS_REGISTRY_ADDRESS || "",
};

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
