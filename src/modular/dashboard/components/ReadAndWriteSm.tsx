import { PassABI } from "@/abi";
import { chains } from "@/config";
import {
  Box,
  BoxProps,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useWallets } from "@privy-io/react-auth";
import { useState } from "react";
import { createWalletClient, custom, encodeFunctionData } from "viem";
import { useReadContract } from "wagmi";

const passContractAddress = "0x80Ea3AC4ee5C563D1A292E0f6C8a6096Ee5BA231";
const defaultAddress = "0x2569eD22A926971FF4ba299365AA9ece3EF23376";

export const ReadAndWriteSm = () => {
  const [managerAddress, setManagerAddress] = useState(defaultAddress);
  const {
    data: buyPrice,
    isLoading: isBuyPriceLoading,
    error: errorBuyPrice,
  } = useReadContract({
    address: passContractAddress,
    abi: PassABI,
    functionName: "getBuyPriceAfterFee",
    args: [managerAddress, Number.isInteger(1) ? BigInt(1) : BigInt(1)],
  });


  const { data: dataFactor, isLoading } = useReadContract({
    address: passContractAddress,
    abi: PassABI,
    chainId: chains.testnet.id,
    functionName: "factors",
    args: [managerAddress],
    query: {
      enabled: !!managerAddress,
    },
  });

  return (
    <Stack gap={2}>
      <Typography color="white" fontSize={20}>
        This section will be test read and write sm for user login by web2
      </Typography>

      <Stack gap={1}>
        <Rounded display="flex" flexDirection="column" gap={1}>
          <Typography
            color="white"
            fontSize={16}
            whiteSpace="pre-wrap"
            sx={{ wordBreak: "break-all" }}
          >
            Test read Pass by address: <b>example address: {defaultAddress}</b>
          </Typography>
          <TextField
            placeholder="Please fill address"
            variant="standard"
            size="small"
            sx={{
              bgcolor: "white",
              px: 2,
              py: 0.5,
              borderRadius: 2,
              minWidth: 300,
              width: "fit-content",
            }}
            onChange={(event) => {
              setManagerAddress(event.target.value);
            }}
          />

          {isBuyPriceLoading ? (
            <CircularProgress color="warning" size={30} />
          ) : (
            <Stack gap={1}>
              <Typography color="white">Pass Price:</Typography>
              <Typography color="white">
                {/* {buyPrice && ethers.formatEther(buyPrice as any)} */}
              </Typography>
            </Stack>
          )}
        </Rounded>

        <BuyTheFirstPass />
      </Stack>
    </Stack>
  );
};

export const BuyTheFirstPass = () => {
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
    <Rounded display="flex" flexDirection="column" gap={1}>
      <Typography color="white" fontSize={16}>
        Test buy the first Pass
      </Typography>

      <Button
        variant="outlined"
        color="warning"
        onClick={() => {
          handleBuyPass();
        }}
      >
        Buy the first Pass
      </Button>
    </Rounded>
  );
};

export const Rounded = ({ children, ...rest }: BoxProps) => {
  return (
    <Box
      borderRadius={2}
      border={2}
      borderColor="white"
      bgcolor="black"
      p={2.5}
      {...rest}
    >
      {children}
    </Box>
  );
};
