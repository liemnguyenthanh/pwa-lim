import { usePrivy } from "@privy-io/react-auth";
import React from "react";
import type {
  SendTransactionModalUIOptions,
  UnsignedTransactionRequest,
} from "@privy-io/react-auth";
import { Button, Snackbar, Stack } from "@mui/material";
import { toast } from "react-toastify";
import { useBalance } from "wagmi";
import { chains } from "@/config";
import { ethers } from "ethers";

export const Actions = () => {
  const { user } = usePrivy();
  const { sendTransaction, getAccessToken } = usePrivy();
  const {
    data: balances,
    isLoading,
    refetch: refetchBalance,
  } = useBalance({
    address: user?.wallet?.address as `0x${string}`,
    chainId: chains.testnet.id,
    // token: tokenAddress ? tokenAddress : undefined,
  });

  const requestData: UnsignedTransactionRequest = {
    to: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    chainId: 1,
    value: "1",
  };

  const uiConfig: SendTransactionModalUIOptions = {
    header: "Test send Eth",
    description: "i do not know what am i doing",
    buttonText: "Send ETH",
  };

  const handleVerify = async () => {
    try {
      const apiUrl = "http://localhost:8080";
      const token = await getAccessToken();
      const loginUrl = apiUrl + "/login?token=" + token;
      const res = await fetch(loginUrl);
      console.log("res", res);
    } catch (error) {}
  };

  const handleTransaction = async () => {
    try {
      const txReceipt = await sendTransaction(requestData, uiConfig);

      toast("success");
    } catch (error) {
      toast((error as Error).message);
    }
  };

  const handleGetPassInfo = async () => {};

  return (
    <Stack gap={2}>
      <Button
        variant="contained"
        color="inherit"
        sx={{ color: "black" }}
        onClick={handleTransaction}
      >
        Send ETH
      </Button>

      <Button
        variant="contained"
        color="inherit"
        sx={{ color: "black" }}
        onClick={handleVerify}
      >
        Verify Authencation
      </Button>

      <Button
        variant="contained"
        color="inherit"
        sx={{ color: "black" }}
        onClick={() => refetchBalance()}
      >
        Get Balances -{" "}
        <b>
          {balances
            ? `${ethers.formatEther(balances?.value)} ${balances.symbol}`
            : "null"}
        </b>
      </Button>
    </Stack>
  );
};
