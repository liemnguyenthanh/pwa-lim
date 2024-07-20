import { PotFactory } from "@/abi";
import bArtioChain from "@/providers/ConnectPrivyProvider";
import { useReadContract } from "wagmi";

type Props = { potAddress: string };
export const useGetPriceInUsdOfPot = ({ potAddress }: Props) => {
  const potFactoryContractAddress = "";
  const {
    data: dataPriceInUsdOfPot,
    isLoading: loadingGetPriceInUsdOfPot,
    refetch: fetchGetPriceInUsdOfPot,
  } = useReadContract({
    address: potFactoryContractAddress as `0x${string}`,
    abi: PotFactory,
    chainId: bArtioChain.id,
    functionName: "getPriceInUsdOfPot",
    args: [potAddress as `0x${string}`],
    query: {
      staleTime: 2000,
    },
  });

  return {
    dataPriceInUsdOfPot,
    loadingGetPriceInUsdOfPot,
    fetchGetPriceInUsdOfPot,
  };
};
