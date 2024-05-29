import { Components, Palette, Theme } from '@mui/material';

import { TypographyOptions } from '@mui/material/styles/createTypography';

export const createComponents = (
  palette: Palette,
): Components<Omit<Theme, 'components'>> => {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          padding: 0,
          margin: 0,
          boxSizing: 'border-box',
        },
        html: {
          padding: 0,
          margin: 0,
        },
        body: {
          padding: 0,
          margin: 0,
          scrollBehavior: 'smooth',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: 7,
            backgroundColor: 'black',
            borderRadius: 16,
          },
          '&::-webkit-scrollbar-track': {
            WebkitBoxShadow: 'inherit',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'grey',
            borderRadius: 16,
          },
        },
        a: {
          color: 'inherit',
          textDecoration: 'none',
        },
    
      },
    },
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       fontFamily: fonts,
    //       display: 'flex',
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //       borderRadius: '10px',
    //       textTransform: 'initial',
    //       gap: '8px',
    //       boxShadow: 'none',
    //       lineHeight: 1.2,
    //       fontWeight: 500,
    //       letterSpacing: '-0.03rem',
    //       whiteSpace: 'nowrap',
    //       '&.Mui-disabled': {
    //         background: palette.dfText.greyWhite,
    //         color: palette.dfText.white,
    //         opacity: 0.5,
    //       },
    //     },
    //     sizeLarge: () => ({
    //       padding: '15px',
    //       fontSize: '24px',
    //       fontWeight: 700,
    //     }),
    //     sizeMedium: () => ({
    //       padding: `15px`,
    //       fontSize: '20px',
    //       fontWeight: 500,
    //     }),
    //     sizeSmall: () => ({
    //       padding: `15px`,
    //       fontSize: '16px',
    //       fontWeight: 500,
    //     }),
    //   },
    // },
    // MuiTypography: {
    //   styleOverrides: {
    //     root: {
    //       fontFamily: fonts,
    //     },
    //   },
    // },
    // MuiInputBase: {
    //   styleOverrides: {
    //     root: {
    //       fontFamily: fonts,
    //     },
    //   },
    // },
    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       '.MuiInputBase-root': {
    //         borderRadius: '8px',
    //         '.MuiInputBase-input': {
    //           ...typography.fs16,
    //           fontWeight: 700,
    //           padding: '15px 30px',
    //           color: palette.dfText.white,
    //         },
    //       },
    //     },
    //   },
    // },
  };
};
