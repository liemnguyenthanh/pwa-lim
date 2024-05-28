import { Box, Grid } from "@mui/material";
import { Actions, ReadAndWriteSm, UserInfo } from "./components";

export const DashboardModular = () => {
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
