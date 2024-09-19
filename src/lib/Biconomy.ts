import {
  createSmartAccountClient
} from "@biconomy/account";

// const BICONOMY_AUTH_TOKEN = "45da3e70-b0df-4f59-91c4-e8fa6f2b32a2";
const REACT_APP_BICONOMY_BUNDLER_URL =
  "https://bundler.biconomy.io/api/v2/80084/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
const REACT_APP_BICONOMY_PAYMASTER_URL =
  "https://paymaster.biconomy.io/api/v1/80084/xK7Y5ynAn.0586dccf-2051-495d-993a-dbf735f04a0a";

export const createSmartAccount = async (walletClient: any) => {
  console.log("creating createSmartAccount");
  const smartAccount = await createSmartAccountClient({
    signer: walletClient,
    bundlerUrl: REACT_APP_BICONOMY_BUNDLER_URL, // <-- Read about this at https://docs.biconomy.io/dashboard#bundler-url
    // biconomyPaymasterApiKey: "0x6e497c9fbaaa3e37aa7490d860d95adb18af1d18", // <-- Read about at https://docs.biconomy.io/dashboard/paymaster
    paymasterUrl: REACT_APP_BICONOMY_PAYMASTER_URL,
    rpcUrl: "https://bartio.rpc.berachain.com",
  });
  console.log("created smartAccount::", smartAccount);

  return smartAccount;
};
