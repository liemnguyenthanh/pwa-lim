import SmartAccount from "@/components/SmartAccount";
import { useEthersSigner } from "@/hooks/useBiconomyAccount";
import { getAuthToken, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import JsonFormatter from "react-json-formatter";

function getName(data: any[]) {
  for (const item of data) {
    if (item["oauth_username"]) {
      console.log(item);

      return item["oauth_username"];
    }
  }
  return "Not found";
}

const jsonStyle = {
  propertyStyle: { color: "red" },
  stringStyle: { color: "green" },
  numberStyle: { color: "darkorange" },
};

export default function Home() {
  const isLoggedIn = useIsLoggedIn();
  const [message, setMessage] = useState("");
  const [userJson, setUserJson] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const client = useEthersSigner({ chainId: 80084 });

  const signMessage = async (signer: any) => {
    const address = await signer.getAddress(); // Get the EOA wallet address
    const smartAccount = "0x67FA1cFA8f931E54795a45C2BccbF83FA718227E";
    const message = `${address} - ${smartAccount}`;
    const signature = await signer.signMessage(message);

    return {
      message,
      signature,
      address,
    };
  };

  const sendDynamicTokenToSever = async () => {
    setLoading(true);
    try {
      const authToken = getAuthToken();
      const { message, signature } = await signMessage(client);

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: authToken,
          message,
          signature,
        }),
      });

      if (!response.ok) {
        setMessage("Failed to send token to server");
      }

      const res = await response.json();
      setUsername(getName(res.data));
      setUserJson(JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      setMessage(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      gap={3}
      height={"100dvh"}
    >
      <SmartAccount />
      {message && (
        <Typography
          textAlign="center"
          fontSize={14}
          sx={{ whiteSpace: "pre-line" }}
        >
          {message}
        </Typography>
      )}
      {username && (
        <Typography
          textAlign="center"
          fontSize={14}
          sx={{ whiteSpace: "pre-line" }}
        >
          Username: {username}
        </Typography>
      )}
      {loading && <CircularProgress size={24} />}
      {userJson && (
        <Box maxHeight={500} overflow="auto" border={1} borderColor="grey">
          <JsonFormatter json={userJson} tabWith={4} jsonStyle={jsonStyle} />
        </Box>
      )}
      {isLoggedIn && (
        <Button
          variant="contained"
          color="warning"
          fullWidth
          onClick={sendDynamicTokenToSever}
        >
          Send dynamic token to server
        </Button>
      )}
    </Stack>
  );
}
