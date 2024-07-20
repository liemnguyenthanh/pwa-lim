import { PotABI } from "@/abi";
import { useEffect, useRef } from "react";
import { parseUnits } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export type AssetWithdraw = { address: `0x${string}`; amount: number };

type Props = { potAddress: string };

export const useWithdrawPot = ({ potAddress }: Props) => {
  const config = {
    chainId: 80084,
  };
  const chainId = Number(config.chainId);
  const amountWithdraw = useRef<bigint>(BigInt(0));

  const dataDecimals = 18;

  const {
    data: dataWithdraw,
    writeContract: withdraw,
    isPending: loadingWithdraw,
    error: errorWithdraw,
    reset: resetWithdraw,
  } = useWriteContract();

  const {
    data: dataFinishWithdraw,
    isLoading: loadingFinishWithdraw,
    isSuccess: isSuccessWithdraw,
    error: errorFinishWithdraw,
  } = useWaitForTransactionReceipt({
    hash: dataWithdraw,
    chainId,
  });

  const handleWithdraw = async (
    numWithdraw: bigint,
    assets: AssetWithdraw[]
  ) => {
    const slippages = assets.map((aet) => {
      const amount = parseUnits(aet.amount.toString(), dataDecimals);
      return { asset: aet.address, amount };
    });

    withdraw({
      address: potAddress as `0x${string}`,
      abi: PotABI,
      chainId,
      functionName: "withdraw",
      args: [numWithdraw, slippages],
    });
  };

  const onClickWithdraw = async (value: string, assets: AssetWithdraw[]) => {
    resetWithdraw();
    if (!value || !dataDecimals) return;
    const numberWithdraw = parseUnits(value, dataDecimals);
    amountWithdraw.current = numberWithdraw;
    handleWithdraw(numberWithdraw, assets);
  };

  // FIXME: remove error after finish
  useEffect(() => {
    if (errorFinishWithdraw || errorWithdraw) {
      console.log({
        cause: errorWithdraw?.cause,
        message: errorWithdraw?.message,
      });
    }
  }, [errorFinishWithdraw, errorWithdraw]);

  return {
    loading: loadingWithdraw || loadingFinishWithdraw,
    isSuccess: isSuccessWithdraw,
    error: errorWithdraw,
    onWithdraw: onClickWithdraw,
  };
};
