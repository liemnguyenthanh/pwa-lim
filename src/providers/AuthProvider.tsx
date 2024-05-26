import { WaitingModal } from "@/shared/components";
import { usePrivy, useToken } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect } from "react";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { push, pathname } = useRouter();
  const { ready, authenticated } = usePrivy();
  useEffect(() => {
    const handler = async () => {
      if (authenticated && pathname === "/login") {
        push("/");
        return;
      }

      if (!authenticated && pathname !== "/login") {
        push("/login");
        return;
      }
    };
    handler();
  }, [ready, authenticated]);

  if (!ready) {
    return <WaitingModal />;
  }

  return <div>{children}</div>;
};
