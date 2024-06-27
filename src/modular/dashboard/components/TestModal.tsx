import { PassABI } from "@/abi";
import { chains } from "@/config";
import { Button, Stack, SwipeableDrawer, Typography } from "@mui/material";
import { useWallets } from "@privy-io/react-auth";
import React, { useState } from "react";
import { createWalletClient, custom, encodeFunctionData } from "viem";

export const TestModal = () => {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen((pre) => !pre);
  };

  const passContractAddress = "0x80Ea3AC4ee5C563D1A292E0f6C8a6096Ee5BA231";
  const defaultAddress = "0x2569eD22A926971FF4ba299365AA9ece3EF23376";
  const { wallets } = useWallets();
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  );

  const handleBuyPass = async () => {
    const managerAddress = "0x2569eD22A926971FF4ba299365AA9ece3EF23376";
    const priceCurve = 120;
    // address: config.passContractAddress,
    // chainId,
    // abi: PassABI,
    // functionName: 'buyPasses',
    // value: BigInt(0),
    // args: [managerAddress, BigInt(1), BigInt(priceCurve)],

    const data = encodeFunctionData({
      abi: PassABI,
      functionName: "buyPasses",
      args: [managerAddress, BigInt(1), BigInt(priceCurve)],
    });
    // try {
    //   sendTransaction({
    //     to: passContractAddress,
    //     chainId: chains.testnet.id,
    //     value: BigInt(0),
    //     data,
    //   });
    // } catch (error) {}

    if (!embeddedWallet) return;
    try {
      // Switch network to Base Goerli

      await embeddedWallet.switchChain(chains.testnet.id);
      // Get an EIP1193 provider from the embedded wallet
      const provider = await embeddedWallet.getEthereumProvider();
      // From the EIP1193 provider, create a viem wallet client
      const walletClient = createWalletClient({
        account: embeddedWallet.address as `0x${string}`,
        chain: chains.testnet,
        transport: custom(provider),
      });

      // Send transaction using the viem wallet client. Alternatively, you
      // may use Privy's `sendTransaction` method. This is just an example
      // of the many ways to send a transaction from the wallet.

      const _txHash = await walletClient.sendTransaction({
        account: embeddedWallet.address as `0x${string}`,
        to: passContractAddress as `0x${string}`,
        chainId: chains.testnet.id,
        value: BigInt(0),
        data,
      });
    } catch (e) {
      console.error("Transfer failed with error ", e);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={toggleModal}>
        Open Modal
      </Button>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleModal}
        onOpen={() => {}}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          height={300}
          bgcolor="blue"
        >
          <Typography>Huy the b</Typography>
          <Button variant="contained" onClick={handleBuyPass}>
            Open Modal
          </Button>
        </Stack>
      </SwipeableDrawer>
    </>
  );
};
