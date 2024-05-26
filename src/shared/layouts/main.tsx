import React, { PropsWithChildren, useEffect } from "react";
import { CustomSidebar } from "../components";
import { useThemeMode } from "flowbite-react";

export const MainLayout = ({ children }: PropsWithChildren) => {
  const { setMode } = useThemeMode();
  useEffect(() => {
    setMode("dark");
  }, []);

  return (
    <div className="h-screen flex">
      <CustomSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};
