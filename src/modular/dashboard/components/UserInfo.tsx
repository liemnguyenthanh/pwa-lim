import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import {
  WalletWithMetadata,
  useLinkAccount,
  usePrivy,
  useWallets,
} from "@privy-io/react-auth";
import React, { use } from "react";

export const UserInfo = () => {
  const { ready, user, unlinkTwitter, unlinkGithub } = usePrivy();
  const { linkTwitter, linkGoogle, linkGithub } = useLinkAccount({
    onSuccess: (user, linkMethod, linkedAccount) => {
      console.log({ user, linkMethod, linkedAccount });
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  if (!ready || !user) {
    return <CircularProgress size={40} />;
  }
  console.log("user", user);

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
            linkAction={linkGoogle}
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
            linkAction={linkTwitter}
            unlinkAction={() => {
              unlinkTwitter(user.twitter?.subject as string);
            }}
            titleBtn="Connect Twitter"
          />
          <SocialCard
            title="Github"
            info={
              user.github
                ? {
                    title: user.github.subject ?? "",
                    des: user.github.username ?? "",
                  }
                : null
            }
            linkAction={linkGithub}
            unlinkAction={() => {
              unlinkGithub(user.github?.subject as string);
            }}
            titleBtn="Connect Github"
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
  linkAction?: () => void;
  unlinkAction?: () => void;
  titleBtn: string;
};

export const SocialCard = ({
  title,
  info,
  titleBtn,
  linkAction,
  unlinkAction,
}: SocialCardProps) => {
  if (!info) {
    return (
      <Button variant="outlined" color="inherit" onClick={linkAction}>
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
      {unlinkAction && (
        <Button variant="outlined" color="inherit" onClick={unlinkAction}>
          unlink
        </Button>
      )}
    </Box>
  );
};
