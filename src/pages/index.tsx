import { PassABI } from "@/abi";
import { useBiconomyAccount } from "@/hooks/useBiconomyAccount";
import { BalancePayload, PaymasterMode } from "@biconomy/account";
import { DynamicWidget, useUserWallets } from "@dynamic-labs/sdk-react-core";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Children, PropsWithChildren, useEffect, useState } from "react";
import { encodeFunctionData, parseUnits } from "viem";
import { useReadContract } from "wagmi";

const passContractAddress = "0x557De5cC9031E71246e50FE68df749217683f4A3";
const referral = "0x0000000000000000000000000000000000000000";

export default function Home() {
  const { smartAccount } = useBiconomyAccount();
  const [info, setInfo] = useState<{
    address: string;
    balances: BalancePayload[];
  }>({
    address: "",
    balances: [],
  });
  const [result, setResult] = useState({
    loading: false,
    error: "",
    txHash: "",
  });

  const userWallets = useUserWallets();

  const amount = 1;

  const { data: dataPrice } = useReadContract({
    address: passContractAddress,
    abi: PassABI,
    chainId: 80084,
    functionName: "getBuyPriceAfterFee",
    args: [info.address, BigInt(amount)],
    query: {
      enabled: !!info.address,
    },
  });

  const { data: dataBalance } = useReadContract({
    address: passContractAddress,
    abi: PassABI,
    chainId: 80084,
    functionName: "passesBalance",
    args: [info.address, info.address],
    query: {
      enabled: !!info.address,
    },
  });

  const sendTransaction = async () => {
    const managerAddress = info.address;
    if (!smartAccount || !managerAddress) return;

    setResult({ loading: true, error: "", txHash: "" });
    try {
      const encodedCall = encodeFunctionData({
        abi: PassABI,
        functionName: "buyPasses",
        args: [managerAddress, BigInt(amount), BigInt(500), referral],
      });

      const transaction = {
        to: passContractAddress,
        data: encodedCall,
        value: dataPrice as bigint,
      };
      const { waitForTxHash } = await smartAccount.sendTransaction(transaction);
      const { transactionHash, userOperationReceipt } = await waitForTxHash();
      console.log({ transactionHash, userOperationReceipt });
      if (transactionHash) {
        setResult({ loading: false, error: "", txHash: transactionHash });
      }
    } catch (error) {
      console.log("Send transaction error:::", {
        message: (error as Error)?.message,
        cause: (error as Error)?.cause,
      });

      setResult({
        loading: false,
        error: (error as Error)?.message,
        txHash: "",
      });
    }
  };

  useEffect(() => {
    if (smartAccount) {
      console.log("my Biconomy smart account", smartAccount);
      const getInit = async () => {
        const address = await smartAccount.getAccountAddress();
        const balances = await smartAccount.getBalances();
        setInfo({
          address,
          balances,
        });
      };
      getInit();
    }
  }, [smartAccount]);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      gap={3}
      height={"100dvh"}
    >
      <DynamicWidget />

      {smartAccount && (
        <>
          <Stack gap={2}>
            <Card title="Smart Address">{info.address}</Card>
            <Card title="Smart Account Balances">
              {info.balances?.map((balance, indx) => {
                return (
                  <Typography key={indx}>
                    {" "}
                    {balance.formattedAmount} {}
                  </Typography>
                );
              })}
            </Card>
            <Card title="You holding Your Pass">{Number(dataBalance)}</Card>
          </Stack>

          <Stack gap={1}>
            <Button variant="contained" onClick={() => sendTransaction()}>
              Buy 1 Buy
            </Button>
          </Stack>

          <Card title="Execute Buy Pass">
            {result.loading && (
              <CircularProgress
                color="inherit"
                sx={{ color: "white" }}
                size={20}
              />
            )}
            {!!result.error && result.error}
            {!!result.txHash && result.txHash}
          </Card>
        </>
      )}
    </Stack>
  );
}

const Card = ({ title, children }: { title: string } & PropsWithChildren) => {
  return (
    <Stack gap={2} borderRadius={2} p={2} bgcolor="ActiveBorder">
      <Typography fontSize={18} color="grey">
        {title}
      </Typography>
      <Typography color="white">{children}</Typography>
    </Stack>
  );
};
