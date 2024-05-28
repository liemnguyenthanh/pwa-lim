import { Button, Stack, Typography } from "@mui/material";
import { Logout } from "./Logout";

export const AppBar = () => {
  return (
    <Stack
      display={{ xs: "flex", md: "none" }}
      position='fixed'
      bottom={0}
      width='100vw'
      height={80}
      bgcolor="#000"
      borderTop={1}
      borderColor="#909090"
      p={2}
      flexDirection='row'
      alignItems='center'
      justifyContent="space-between"
    >
      <Typography
        textAlign="center"
        color="white"
        fontSize={24}
        fontWeight={700}
      >
        Lim DApp
      </Typography>

      <Logout />
    </Stack>
  );
};
