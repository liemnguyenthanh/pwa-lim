import { usePrivy } from "@privy-io/react-auth";
import React from "react";
import type {
  UnsignedTransactionRequest,
} from "@privy-io/react-auth";
import { Button } from "flowbite-react";

export const Transaction = () => {
  const { sendTransaction } = usePrivy();

  const requestData: UnsignedTransactionRequest = {
    to: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    chainId: 1,
    value: "0x3B9ACA00",
  };

  const uiConfig: any = {
    header: "Sample header text",
    description: "Sample description text",
    buttonText: "Sample button text",
  };

  return (
    <div>
      {" "}
      <Button
        onClick={async () => {
          const txReceipt = await sendTransaction(requestData, uiConfig);
          // The returned `txReceipt` has the type `TransactionReceipt`
        }}
      >
        Send ETH
      </Button>
    </div>
  );
};
