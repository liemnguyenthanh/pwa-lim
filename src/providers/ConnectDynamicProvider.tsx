import bArtioChain from "@/config/chain";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { http } from "viem";
import { createConfig, WagmiProvider } from "wagmi";

const config = createConfig({
  chains: [bArtioChain],
  multiInjectedProviderDiscovery: false,
  transports: {
    [bArtioChain.id]: http(),
  },
});

const queryClient = new QueryClient();

export const ConnectDynamicProvider = ({ children }: PropsWithChildren) => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "a3e6a1b9-12f7-4be0-baca-979b48bc22ce",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
};
