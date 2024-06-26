import { Button, Stack, Typography } from "@mui/material";
import { Logout } from "./Logout";

export const CustomSidebar = () => {
  return (
    <Stack
      display={{ xs: "none", md: "flex" }}
      width={300}
      bgcolor="#000"
      borderRight={1}
      borderColor="#909090"
      p={2}
      justifyContent="space-between"
    >
      <Typography
        mt={3}
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
