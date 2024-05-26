import { useLogout } from "@privy-io/react-auth";
import { Button } from "flowbite-react";
import { IoMdLogOut } from "react-icons/io";

export const Logout = () => {
  const { logout } = useLogout();
  return (
    <Button color="gray" onClick={logout}>
      <IoMdLogOut className="mr-3 h-4 w-4" />
      Logout
    </Button>
  );
};
