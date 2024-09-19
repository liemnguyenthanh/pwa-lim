import { defineChain } from "viem";

const bArtioChain = defineChain({
  id: 80084,
  name: "Berachain bArtio",
  network: "Berachain bArtio",
  nativeCurrency: {
    decimals: 18,
    name: "BERA Token",
    symbol: "BERA",
  },
  rpcUrls: {
    default: { http: ["https://bartio.rpc.berachain.com"] },
  },
  blockExplorers: {
    default: {
      name: "Beratrail",
      url: "https://bartio.beratrail.io",
    },
  },
  testnet: true,
});
export default bArtioChain;