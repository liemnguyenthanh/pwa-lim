import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrivyProvider } from "@privy-io/react-auth";
import { PRIVY_APP_ID, privyConfig } from "@/config";
import { http } from "wagmi";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import { defineChain } from "viem";

const bArtioChain = defineChain({
  id: 80084,
  name: "Berachain bArtio",
  network: "Berachain bArtio",
  nativeCurrency: {
    decimals: 18,
    name: "BERA Token",
    symbol: "BERA",
  },
  rpcUrls: {
    default: { http: ["https://bartio.rpc.berachain.com"] },
  },
  blockExplorers: {
    default: {
      name: "Beratrail",
      url: "https://bartio.beratrail.io",
    },
  },
  testnet: true,
});
export default bArtioChain;

export const config = createConfig({
  chains: [bArtioChain],
  transports: {
    [bArtioChain.id]: http(),
  },
});
const queryClient = new QueryClient();

export const ConnectPrivyProvider = ({ children }: PropsWithChildren) => {
  return (
    <PrivyProvider appId={PRIVY_APP_ID} config={privyConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
};
