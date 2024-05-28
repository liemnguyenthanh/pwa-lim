import { PropsWithChildren } from "react";
import { AppBar, CustomSidebar } from "../components";
import { Box, Stack } from "@mui/material";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Stack
      flexDirection={{ md: "row" }}
      height={{ md: "100dvh" }}
      pb={{ xs: 10, md: 2 }}
    >
      <CustomSidebar />
      <Box flex={1} bgcolor={"#1c1c1c"}>
        {children}
      </Box>
      <AppBar />
    </Stack>
  );
};
