import { MetaMaskInpageProvider } from '@metamask/providers';

import { IChartingLibraryWidget } from '@/charting_library/charting_library';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
    tvWidget: IChartingLibraryWidget;
  }
}

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
