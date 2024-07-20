import { formatUnitsToNumber } from "@/utils";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { erc20Abi, formatUnits } from "viem";
import { useAccount, useBalance, useReadContract } from "wagmi";
import { AssetWithdraw, useGetFundComposition, useWithdrawPot } from "../hooks";
import { useGetPriceInUsdOfPot } from "../hooks/useGetPriceInUsdOfPot";

const dataDecimals = 18;
export type TWithdrawAssetItem = {
  address: `0x${string}`;
  balance: number;
  value: number;
};

export const Withdraw = () => {
  const { address } = useAccount();
  const [potAddress, setPotAddress] = useState(
    "0x7c0714849225dcbdc34b664617af7a803878456f"
  );
  return (
    <Stack gap={2}>
      <Typography>
        <b>Account:</b> {address}
      </Typography>
      <Stack direction="row" gap={1} alignItems="center">
        <b>Pot Address:</b>
        <TextField
          variant="outlined"
          placeholder="Fill pot address..."
          value={potAddress}
          onChange={(event) => setPotAddress(event.target.value)}
        />
      </Stack>

      {potAddress && <WithdrawForm potAddress={potAddress} />}
    </Stack>
  );
};

type WithdrawFormProps = {
  potAddress: string;
};

const WithdrawForm = ({ potAddress }: WithdrawFormProps) => {
  const { address } = useAccount();
  const { data: dataPotBalance } = useBalance({
    address,
    token: potAddress as `0x${string}`,
  });

  const [amount, setAmount] = useState("0");
  const [potAssets, setPotAssets] = useState<TWithdrawAssetItem[]>([]);
  const { dataGetFundComposition } = useGetFundComposition({ potAddress });

  const { error, onWithdraw } = useWithdrawPot({
    potAddress,
  });

  const { dataPriceInUsdOfPot } = useGetPriceInUsdOfPot({
    potAddress,
  });

  const handleWithdraw = () => {
    const assets: AssetWithdraw[] = potAssets.map((receive) => {
      const priceOfHoney = 1;
      let receiveValue =
        (Number(amount) *
          formatUnitsToNumber(dataPriceInUsdOfPot as any, dataDecimals)) /
        priceOfHoney;

      return { address: receive.address, amount: receiveValue };
    });
    onWithdraw(amount, assets);
  };

  useEffect(() => {
    const list: TWithdrawAssetItem[] = [];
    if (dataGetFundComposition) {
      const fundComposition = Object.values(dataGetFundComposition);
      if (fundComposition[0]) {
        fundComposition[0].map((asset: `0x${string}`, index: number) => {
          list.push({
            address: asset,
            balance: fundComposition[1][index]
              ? formatUnitsToNumber(fundComposition[1][index], dataDecimals)
              : 0,
            value: fundComposition[1][index]
              ? formatUnitsToNumber(fundComposition[2][index], dataDecimals)
              : 0,
          } as TWithdrawAssetItem);
        });
      }
    }
    setPotAssets(list);
  }, [dataGetFundComposition]);

  return (
    <Stack direction="row" gap={2}>
      <Stack
        borderRadius={2}
        bgcolor="#303030"
        p={2}
        gap={2}
        maxWidth={400}
        width={1}
        flexShrink={0}
      >
        <Typography>
          Pot Balance :{" "}
          {dataPotBalance && (
            <b>
              {formatUnits(dataPotBalance?.value as bigint, 18)}{" "}
              {dataPotBalance?.symbol}
            </b>
          )}
        </Typography>

        <TextField
          variant="outlined"
          value={amount}
          label="Amount"
          onChange={(event) => setAmount(event.target.value)}
        />

        {potAssets.map((item) => (
          <AssetInfo {...item} key={item.address} />
        ))}

        <Button
          variant="contained"
          color="warning"
          fullWidth
          size="large"
          onClick={handleWithdraw}
        >
          Withdraw
        </Button>
      </Stack>
      <Stack>
        <Typography>Error: {error?.message}</Typography>
      </Stack>
    </Stack>
  );
};

const AssetInfo = ({ address, balance, value }: TWithdrawAssetItem) => {
  const { data: dataSymbol } = useReadContract({
    address: address,
    abi: erc20Abi,
    functionName: "symbol",
  });

  return (
    <Box width={1} borderRadius={2} p={2}>
      <b>Balance</b>: {balance} {dataSymbol}
    </Box>
  );
};
