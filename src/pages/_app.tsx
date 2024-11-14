import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import createCustomTheme from "@/theme";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider theme={createCustomTheme("dark")}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
