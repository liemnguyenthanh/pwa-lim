import { AuthProvider, ConnectPrivyProvider } from "@/providers";
import { AppLayout } from "@/shared/layouts";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConnectPrivyProvider>
      <AuthProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </AuthProvider>
    </ConnectPrivyProvider>
  );
}
