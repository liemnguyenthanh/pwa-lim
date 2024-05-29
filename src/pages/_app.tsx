import { AuthProvider, ConnectPrivyProvider } from "@/providers";
import { AppLayout } from "@/shared/layouts";
import { Button, CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import "@/styles/globals.css";
import createCustomTheme from "@/theme";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps, router }: AppProps) {
  const [mode, setMode] = useState("light");
  

  return (

      <ConnectPrivyProvider>
        <AuthProvider>
          <AppLayout>
            <ThemeProvider theme={createCustomTheme(mode as PaletteMode)}>
              <Button
                onClick={() => {
                  const newMode = mode === "light" ? "dark" : "light";
                  setMode(newMode);
                }}
              >
                {mode}
              </Button>
              <ToastContainer />
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </AppLayout>
        </AuthProvider>
      </ConnectPrivyProvider>
  );
}
