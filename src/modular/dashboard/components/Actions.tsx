import { usePrivy } from "@privy-io/react-auth";
import React from "react";
import type { SendTransactionModalUIOptions, UnsignedTransactionRequest } from "@privy-io/react-auth";
import { Button } from "flowbite-react";

export const Actions = () => {
  const { sendTransaction, getAccessToken } = usePrivy();

  const requestData: UnsignedTransactionRequest = {
    to: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    chainId: 1,
    value: "0x3B9ACA00",
  };

  const uiConfig: SendTransactionModalUIOptions = {
    header: "Sample header text",
    description: "Sample description text",
    buttonText: "Sample button text",
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

  return (
    <div className="flex flex-col gap-4">
      {" "}
      <Button
        onClick={async () => {
          const txReceipt = await sendTransaction(requestData, uiConfig);
          // The returned `txReceipt` has the type `TransactionReceipt`
        }}
      >
        Send ETH
      </Button>
      <Button onClick={handleVerify}>Verify Authencation</Button>
    </div>
  );
};
