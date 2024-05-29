import { useMediaQuery as useMuiMediaQuery, useTheme } from '@mui/material';

export function useMediaQuery() {
  const theme = useTheme();
  const isMobile = useMuiMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMuiMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLaptop = useMuiMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const isUltraWide = useMuiMediaQuery(theme.breakpoints.up('xl'));

  return { isMobile, isTablet, isLaptop, isUltraWide };
}
