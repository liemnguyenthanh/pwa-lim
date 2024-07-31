import { AuthProvider, ConnectPrivyProvider } from "@/providers";
import { AppLayout } from "@/shared/layouts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import "@/styles/globals.css";
import createCustomTheme from "@/theme";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps, router }: AppProps) {
  return (

      <ConnectPrivyProvider>
        <AuthProvider>
          <AppLayout>
            <ThemeProvider theme={createCustomTheme('light')}>
              <ToastContainer />
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </AppLayout>
        </AuthProvider>
      </ConnectPrivyProvider>
  );
}
