import { mainnet, sepolia, berachainTestnet } from "viem/chains";
import { PrivyClientConfig } from "@privy-io/react-auth";

export const privyConfig: PrivyClientConfig = {
  appearance: {
    theme: "dark",
    showWalletLoginFirst: true,
    accentColor: "#676FFF",
    logo: "https://i.ibb.co/7t8DL1k/Screenshot-2024-05-25-at-3-01-25-PM.png",
  },
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: false,
  },
  loginMethods: [
    "wallet",
    "email",
    "google",
    "twitter",
    "discord",
    "github",
    "tiktok",
  ],
  supportedChains: [mainnet, sepolia, berachainTestnet],
};

export const PRIVY_APP_ID = "clw52n8mi0emlvv5hqi1thyrw";
