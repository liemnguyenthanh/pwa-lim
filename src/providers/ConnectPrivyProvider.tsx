import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrivyProvider } from "@privy-io/react-auth";
import { PRIVY_APP_ID, privyConfig } from "@/config";
import { mainnet, sepolia } from "viem/chains";
import { http } from "wagmi";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";

export const config = createConfig({
  chains: [mainnet, sepolia], 
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
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
