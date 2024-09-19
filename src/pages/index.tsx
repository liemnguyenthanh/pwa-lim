import { useBiconomyAccount } from "@/hooks/useBiconomyAccount";
import { FeeQuotesOrDataResponse, PaymasterMode } from "@biconomy/account";
import { DynamicWidget, useUserWallets } from "@dynamic-labs/sdk-react-core";
import { Box, Button, Stack } from "@mui/material";
import { ethers, parseUnits } from "ethers";
import { useEffect, useState } from "react";
import { encodeFunctionData, erc20Abi } from "viem";

export default function Home() {
  const { smartAccount } = useBiconomyAccount();
  const [info, setInfo] = useState("");
  const userWallets = useUserWallets();
  const [txHash, setTxHash] = useState<string | null>(null);

  const sendTransaction = async () => {
    if (!smartAccount) return;

    const encodedCall = encodeFunctionData({
      abi: erc20Abi,

      functionName: "transfer",
      args: ["0xb4B5440298816aEc06B00757384F3D0F9A56877c", parseUnits("1")],
    });
    const toAddress = "0xb4B5440298816aEc06B00757384F3D0F9A56877c";

    const transaction = {
      to: toAddress,
      data: encodedCall,
    };

    const feeQuotesResponse: FeeQuotesOrDataResponse =
      await smartAccount.getTokenFees(transaction, {
        paymasterServiceData: { mode: PaymasterMode.ERC20 },
      });

    console.log("feeQuotesResponse", feeQuotesResponse);

    const userSeletedFeeQuote = feeQuotesResponse.feeQuotes?.[0];
    console.log("userSeletedFeeQuote", userSeletedFeeQuote);

    const { wait } = await smartAccount.sendTransaction(transaction, {
      paymasterServiceData: {
        mode: PaymasterMode.ERC20,
        feeQuote: userSeletedFeeQuote,
        spender: feeQuotesResponse.tokenPaymasterAddress,
      },
    });

    const { success, receipt } = await wait();
    console.log({ success, receipt });
  };

  useEffect(() => {
    if (smartAccount) {
      console.log("my Biconomy smart account", smartAccount);
      const getInit = async () => {
        setInfo(await smartAccount.getAccountAddress());
      };
      getInit();
    }
  }, [smartAccount]);

  console.log("userWallets", userWallets);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      gap={3}
      height={"100dvh"}
    >
      <DynamicWidget />

      {info && (
        <Box color="red" p={3} bgcolor={"blue"}>
          {info}
        </Box>
      )}
      <Stack gap={1}>
        <Button variant="contained" onClick={() => sendTransaction()}>
          Send transaction
        </Button>
      </Stack>
    </Stack>
  );
}
