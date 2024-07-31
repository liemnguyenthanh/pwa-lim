import privy from "@/assets/images/icons/privy.svg";
import Image from "next/image";
import {
  PRIVY_STORAGE_KEY,
  PrivyConfigContext,
  defaultDashboardConfig,
  defaultIndexConfig,
  useMediaQuery,
} from "@/shared/hooks";
import { CircularProgress } from "@mui/material";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
const mobileQuery = "(max-width: 900px)";

export default function Apps() {
  return <div className="">Apps</div>;
}
