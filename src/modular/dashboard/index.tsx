import { Box, Grid } from "@mui/material";
import { Actions, ReadAndWriteSm, UserInfo } from "./components";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import { usePrivy } from "@privy-io/react-auth";
import { BuyBtn, TestModal } from "./components/TestModal";

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
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {/* <Grid item xs={12} md={4}>
          <Actions />
        </Grid> */}
        <Grid item xs={12} md={8}>
          <UserInfo />
        </Grid>
        <TestModal />
        <BuyBtn />
        {/* 
        <Grid item xs={12}>
          <ReadAndWriteSm />
        </Grid> */}
      </Grid>
    </Box>
  );
};
