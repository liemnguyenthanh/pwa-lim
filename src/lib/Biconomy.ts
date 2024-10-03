import { createSmartAccountClient } from "@biconomy/account";

export const REACT_APP_BICONOMY_BUNDLER_URL =
  "https://bundler.biconomy.io/api/v2/80084/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
export const REACT_APP_BICONOMY_PAYMASTER_URL =
  "https://paymaster.biconomy.io/api/v1/80084/xK7Y5ynAn.0586dccf-2051-495d-993a-dbf735f04a0a";

export const createSmartAccount = async (walletClient: any) => {
  const smartAccount = await createSmartAccountClient({
    signer: walletClient,
    bundlerUrl: REACT_APP_BICONOMY_BUNDLER_URL,
    paymasterUrl: REACT_APP_BICONOMY_PAYMASTER_URL,
    chainId: 80084,
    rpcUrl: "https://bartio.rpc.berachain.com",
  });

  return smartAccount;
};
