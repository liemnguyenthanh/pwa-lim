import { WaitingModal } from "@/shared/components";
import { usePrivy, useToken } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect } from "react";

export const AuthProvider = ({ children }: PropsWithChildren) => {

  return <div>{children}</div>;
};
