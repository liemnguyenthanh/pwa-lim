import { PassABI } from "@/abi";
import { useBiconomyAccount } from "@/hooks/useBiconomyAccount";
import { BalancePayload, PaymasterMode } from "@biconomy/account";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { PropsWithChildren, useEffect, useState } from "react";
import { encodeFunctionData } from "viem";
import { useReadContract } from "wagmi";

const passContractAddress = "0x557De5cC9031E71246e50FE68df749217683f4A3";
const referral = "0x0000000000000000000000000000000000000000";

type Info = {
  address: string;
  balances: BalancePayload[];
};

export default function Home() {
  const { smartAccount } = useBiconomyAccount();
  const [info, setInfo] = useState<Info>({
    address: "",
    balances: [],
  });
  const [result, setResult] = useState({
    loading: false,
    error: "",
    txHash: "",
  });

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

  const { data: dataBalance, refetch: refetchPassBalance } = useReadContract({
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
      const shouldPaymasterService = Number(dataBalance) === 0;
      const { waitForTxHash } = await smartAccount.sendTransaction(
        transaction,
        shouldPaymasterService
          ? {
              paymasterServiceData: { mode: PaymasterMode.SPONSORED },
            }
          : undefined
      );
      const { transactionHash } = await waitForTxHash();
      if (transactionHash) {
        setResult({ loading: false, error: "", txHash: transactionHash });
        setTimeout(() => {
          refetchPassBalance();
        }, 1000);
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
              {info.balances?.map((balance, index) => {
                return <BalanceItem balance={balance} key={index} />;
              })}
            </Card>
            <Card title="You holding Your Pass">
              {Number(dataBalance)}
              <Button
                variant="contained"
                fullWidth
                color="warning"
                onClick={() => refetchPassBalance()}
              >
                Refetch
              </Button>
            </Card>
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
      <Stack
        fontSize={16}
        color="white"
        sx={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
        gap={2}
      >
        {children}
      </Stack>
    </Stack>
  );
};

const BalanceItem = ({ balance }: { balance: BalancePayload }) => {
  return (
    <Typography>
      Balance: {balance.formattedAmount} - chainID: {balance.chainId}
    </Typography>
  );
};
