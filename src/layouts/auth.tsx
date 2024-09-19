import { Box, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box bgcolor='text.primary'>
      <Typography color='text.primary'>
        Text 
      </Typography>
      {children}
    </Box>
  );
};
