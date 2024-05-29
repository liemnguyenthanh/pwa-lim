import { AuthProvider, ConnectPrivyProvider } from "@/providers";
import { AppLayout } from "@/shared/layouts";
import { Button, CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import "@/styles/globals.css";
import createCustomTheme from "@/theme";
import { useCallback, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  PRIVY_STORAGE_KEY,
  PrivyConfigContextType,
  defaultDashboardConfig,
  defaultIndexConfig,
  PrivyConfigContext,
} from "@/shared/hooks";

export default function App({ Component, pageProps, router }: AppProps) {
  const [mode, setMode] = useState("light");
  const [config, setConfig] = useState<PrivyConfigContextType["config"]>(() => {
    // Pull out the appearance from local storage if it exists
    const storedConfigRaw =
      typeof window === "undefined"
        ? null
        : window.localStorage.getItem(PRIVY_STORAGE_KEY);
    const storedConfig = storedConfigRaw ? JSON.parse(storedConfigRaw) : null;
    const defaultConfig = router?.route?.includes("dashboard")
      ? defaultDashboardConfig
      : defaultIndexConfig;
    return {
      ...defaultConfig,
      appearance: storedConfig?.appearance
        ? storedConfig.appearance
        : defaultIndexConfig.appearance,
    };
  });

  const setConfigWithAppearanceStorage = useCallback(
    (newConfig: PrivyConfigContextType["config"]) => {
      window.localStorage.setItem(PRIVY_STORAGE_KEY, JSON.stringify(newConfig));
      return setConfig(newConfig);
    },
    [setConfig]
  );

  return (
    <PrivyConfigContext.Provider
      value={{ config, setConfig: setConfigWithAppearanceStorage }}
    >
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
    </PrivyConfigContext.Provider>
  );
}
