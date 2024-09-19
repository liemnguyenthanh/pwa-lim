'use client'
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import { AuthLayout } from "./auth";
import { MainLayout } from "./main";

export const AppLayout = ({ children }: PropsWithChildren) => {
  const { pathname } = useRouter();
  const isLogin = pathname === "/login";
  const Layout = isLogin ? AuthLayout : MainLayout;

  return <Layout>{children}</Layout>;
};
