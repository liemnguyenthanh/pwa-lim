import privy from "@/assets/images/icons/privy.svg";
import Image from "next/image";
import {
  PRIVY_STORAGE_KEY,
  PrivyConfigContext,
  defaultDashboardConfig,
  defaultIndexConfig,
  useMediaQuery,
} from "@/shared/hooks";
import { CircularProgress } from "@mui/material";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
const mobileQuery = "(max-width: 900px)";

export default function Home() {
  const router = useRouter();
  const { login, ready, authenticated } = usePrivy();
  const { config, setConfig } = useContext(PrivyConfigContext);
  const [copied, setCopied] = useState(false);
  const storedConfigRaw =
    typeof window === "undefined"
      ? null
      : window.localStorage.getItem(PRIVY_STORAGE_KEY);
  const storedConfig = storedConfigRaw ? JSON.parse(storedConfigRaw) : null;
  const [readyToSetTheme, setReadyToSetTheme] = useState(false);

  const { isMobile } = useMediaQuery();
  useEffect(() => {
    if (!ready || authenticated) {
      return;
    }
    setConfig?.({
      ...config,
      appearance: storedConfig?.appearance
        ? storedConfig.appearance
        : defaultIndexConfig.appearance,

      embeddedWallets: {
        ...defaultIndexConfig.embeddedWallets,
        requireUserPasswordOnCreate:
          storedConfig?.embeddedWallets?.requireUserPasswordOnCreate ??
          defaultIndexConfig.embeddedWallets!.requireUserPasswordOnCreate,
      },
    });
    // ensure that the modal is open on desktop
    if (!isMobile) {
      login();
    }
    setReadyToSetTheme(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, ready, authenticated]);

  useEffect(() => {
    if (!ready || authenticated) {
      return;
    }
    const isMobileOnLoad = window.matchMedia(mobileQuery).matches;

    // there is an issue with applying the dashboard config (render as modal)
    // _after_ loading the dashboard page, where the changing from in-line to modal
    // rendering will re-trigger the oauth process (since that's an effect on the oauth
    // status screen.) This will apply the config change if coming back from an oauth redirect,
    // before that issue arises.
    const currentUrl = new URL(window.location.href);

    const oauthProvider = currentUrl.searchParams.get("privy_oauth_provider");
    setConfig?.({
      ...(oauthProvider ? defaultDashboardConfig : defaultIndexConfig),
      appearance: storedConfig?.appearance
        ? storedConfig.appearance
        : defaultIndexConfig.appearance,
      embeddedWallets: {
        ...defaultIndexConfig.embeddedWallets,
        requireUserPasswordOnCreate:
          storedConfig?.embeddedWallets?.requireUserPasswordOnCreate ??
          defaultIndexConfig.embeddedWallets!.requireUserPasswordOnCreate,
      },
    });

    if (!isMobileOnLoad) {
      login();
    }
    setReadyToSetTheme(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, authenticated]);

  if (!ready) {
    return <CircularProgress />;
  } else if (ready && authenticated) {
    router.push("/dashboard");
    return <CircularProgress />;
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <button
        className="text-gray-900 bg-white gap-2 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
        onClick={login}
      >
        Connect with
        <Image src={privy} alt="" className="w-20" style={{ height: "auto" }} />
      </button>
    </div>
  );
}
