import { PotABI } from "@/abi";
import bArtioChain from "@/providers/ConnectPrivyProvider";
import { useReadContract } from "wagmi";

type Props = {
  potAddress: string;
};

export const useGetFundComposition = ({ potAddress }: Props) => {
  const {
    data: dataGetFundComposition,
    isLoading: loadingGetFundComposition,
    refetch: fetchGetFundComposition,
    error: errorGetFundComposition,
  } = useReadContract({
    address: potAddress as `0x${string}`,
    abi: PotABI,
    chainId: bArtioChain.id,
    functionName: "getFundComposition",
    query: {
      staleTime: 2000,
    },
  });

  return {
    dataGetFundComposition,
    loadingGetFundComposition,
    fetchGetFundComposition,
    errorGetFundComposition,
  };
};
