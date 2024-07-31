import { Box, Stack, Typography } from "@mui/material";
import { Logout } from "./Logout";
import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const menus = [
  { title: "Dashboard", url: "/dashboard" },
  { title: "Apps", url: "/apps" },
];

export const CustomSidebar = () => {
  const router = useRouter();

  const renderMenu = useMemo(() => {
    return menus.map(({ title, url }) => {
      const isActive = router.pathname === url
      return (
        <Link href={url}>
          <Box bgcolor={isActive ? '#333' : 'inherit'} px={2} py={1} borderRadius={2}>
            <Typography color="white" fontSize={20}>
              {title}
            </Typography>
          </Box>
        </Link>
      );
    });
  }, [router]);

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
      <Box>
        <Typography
          mt={3}
          textAlign="center"
          color="white"
          fontSize={24}
          fontWeight={700}
        >
          Lim DApp
        </Typography>
        <Stack p={2} gap={1.5}>
          {renderMenu}
        </Stack>
      </Box>
      <Logout />
    </Stack>
  );
};
