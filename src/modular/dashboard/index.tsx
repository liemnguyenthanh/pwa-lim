import { Box, Grid } from "@mui/material";
import { Actions, ReadAndWriteSm, UserInfo } from "./components";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import { usePrivy } from "@privy-io/react-auth";
import { BuyBtn, TestModal } from "./components/TestModal";
import { Withdraw } from "./components/Withdraw";

export const DashboardModular = () => {
  const router = useRouter();
  const { ready, authenticated } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/login");
    }
  }, [authenticated]);

  return (
    <Box p={2}>
      <Withdraw />
    </Box>
  );
};
