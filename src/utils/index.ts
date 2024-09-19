import bArtioChain from "@/config/chain";
import { Network } from "ethers";
import { JsonRpcProvider } from "ethers";
import { BigNumberish, formatUnits } from "ethers";
import { Numeric } from "ethers";
import { isNull, isUndefined } from "lodash";

export const formatUnitsToNumber = (
  value: BigNumberish,
  unit: string | Numeric = 18
) => {
  if (isNull(value) || isUndefined(value)) return 0;
  try {
    return Number(formatUnits(BigInt(value), unit));
  } catch (error) {
    // console.error(`Failed to format value: ${value}`);
    return 0;
  }
};

export const getGnosisProvider = () => {
  const url = bArtioChain.rpcUrls.default.http[0];
  const network = new Network(bArtioChain.name, bArtioChain.id);
  const provider = new JsonRpcProvider(url, network, {
    staticNetwork: network,
    batchMaxCount: 10
  });

  return provider;
};

export const beraNetworkGnosis = {
  id: 'berachain-bArtio',
  chainId: 80084,
  nativeAssetSymbol: 'BERA',
  name: 'berachain-bArtio',
  explorerUrl: 'https://bartio.beratrail.io',
  isGasTankAvailable: true,
  relayerlessOnly: false,
  unstoppableDomainsChain: 'ERC20',
  nativeAsset: {
    address: '0x0000000000000000000000000000000000000000',
    symbol: 'BERA',
    coingeckoId: 'berachain-bera',
    decimals: 18,
  },
};
