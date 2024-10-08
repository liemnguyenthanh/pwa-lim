import { createSmartAccount } from "@/lib/Biconomy";
import { BiconomySmartAccountV2 } from "@biconomy/account";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { useEffect, useMemo, useState } from "react";
import type { Account, Chain, Client, Transport } from "viem";
import { type Config, useConnectorClient } from "wagmi";

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId });
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client]);
}

type SmartAccount = BiconomySmartAccountV2 | null;

export function useBiconomyAccount() {
  const client = useEthersSigner({ chainId: 80084 });
  const [smartAccount, setSmartAccount] = useState<SmartAccount>(null);

  useEffect(() => {
    const createAndSetSmartAccount = async () => {
      try {
        if (!client) return null;

        const newSmartAccount = await createSmartAccount(client);
        const isAccountDeployed = await newSmartAccount.isAccountDeployed();
        setSmartAccount(newSmartAccount);
        if (!isAccountDeployed) {
          const accDeploy = await newSmartAccount.deploy();
          console.log({ accDeploy });
        }
        return;
      } catch (error) {
        console.error("CreateAndSetSmartAccount Error::", error);
        return null;
      }
    };
    createAndSetSmartAccount();
  }, [client]);

  return { smartAccount };
}
