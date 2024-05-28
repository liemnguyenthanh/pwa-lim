import { AuthProvider, ConnectPrivyProvider } from "@/providers";
import { AppLayout } from "@/shared/layouts";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import "@/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConnectPrivyProvider>
      <AuthProvider>
        <AppLayout>
          <ThemeProvider theme={createTheme()}>
            <ToastContainer />
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </AppLayout>
      </AuthProvider>
    </ConnectPrivyProvider>
  );
}
