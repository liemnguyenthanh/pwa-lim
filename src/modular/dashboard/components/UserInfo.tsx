import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { usePrivy } from "@privy-io/react-auth";
import React from "react";

export const UserInfo = () => {
  const { ready, user, linkTwitter, linkGoogle, linkTiktok } = usePrivy();

  if (!ready || !user) {
    return <CircularProgress size={40} />;
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Typography color="white" mb={2}>
          User ID <b>{user.id}</b>
        </Typography>
        <Stack gap={2} color="white">
          <SocialCard
            title="Google"
            info={
              user.google
                ? {
                    title: user.google.name ?? "",
                    des: user.google.email,
                  }
                : null
            }
            onClick={linkGoogle}
            titleBtn="Connect Google"
          />

          <SocialCard
            title="Twitter"
            info={
              user.twitter
                ? {
                    title: user.twitter.name ?? "",
                    des: user.twitter.username ?? "",
                  }
                : null
            }
            onClick={linkTwitter}
            titleBtn="Connect Twitter"
          />

          <SocialCard
            title="Tiktok"
            info={
              user.tiktok
                ? {
                    title: user.tiktok.subject ?? "",
                    des: user.tiktok.username ?? "",
                  }
                : null
            }
            onClick={linkTiktok}
            titleBtn="Connect Tiktok"
          />

          <Typography
            color="white"
            whiteSpace="pre-wrap"
            sx={{ wordBreak: "break-all" }}
          >
            Wallet: {user.wallet ? user.wallet.address : "None"}
          </Typography>
        </Stack>
      </div>
    </div>
  );
};
type SocialCardProps = {
  title: string;
  info: null | {
    title: string;
    des: string;
  };
  onClick?: () => void;
  titleBtn: string;
};

export const SocialCard = ({
  title,
  info,
  titleBtn,
  onClick,
}: SocialCardProps) => {
  if (!info) {
    return (
      <Button variant="outlined" color="inherit" onClick={onClick}>
        {titleBtn}
      </Button>
    );
  }
  return (
    <Box
      border={1}
      borderColor="#ccc"
      borderRadius={1}
      p={2}
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      gap={2}
    >
      <Typography color="white" fontSize={20}>
        {title}
      </Typography>
      <Stack gap={1}>
        <Typography color="white" fontSize={16}>
          {info.title}
        </Typography>
        <Typography color="white" fontSize={14}>
          {info.des}
        </Typography>
      </Stack>
    </Box>
  );
};
