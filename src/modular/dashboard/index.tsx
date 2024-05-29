import { Box, Grid } from "@mui/material";
import { Actions, ReadAndWriteSm, UserInfo } from "./components";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { PRIVY_STORAGE_KEY, PrivyConfigContext, defaultDashboardConfig, defaultIndexConfig } from "@/shared/hooks";

export const DashboardModular = () => {
  const router = useRouter();
  const {setConfig} = useContext(PrivyConfigContext);

  // set initial config, first checking for stored config, then falling back to default
  useEffect(() => {
    const storedConfigRaw = window.localStorage.getItem(PRIVY_STORAGE_KEY);
    const storedConfig = storedConfigRaw ? JSON.parse(storedConfigRaw) : null;
    setConfig?.({
      ...defaultDashboardConfig,
      appearance: storedConfig?.appearance
        ? storedConfig.appearance
        : defaultIndexConfig.appearance,
      embeddedWallets: {
        ...defaultIndexConfig.embeddedWallets,
        requireUserPasswordOnCreate:
          storedConfig?.embeddedWallets?.requireUserPasswordOnCreate ??
          defaultIndexConfig.embeddedWallets!.requireUserPasswordOnCreate,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Box p={2}>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12} md={4}>
          <Actions />
        </Grid>
        <Grid item xs={12} md={8}>
          <UserInfo />
        </Grid>

        <Grid item xs={12}>
          <ReadAndWriteSm />
        </Grid>
      </Grid>
    </Box>
  );
};
