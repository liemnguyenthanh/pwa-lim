import { Button } from "@mui/material";
import { useLogout } from "@privy-io/react-auth";

export const Logout = () => {
  const { logout } = useLogout();
  return (
    <Button variant="outlined" onClick={logout} size="large" color="warning">
      Logout
    </Button>
  );
};
