import type { Palette, PaletteMode } from "@mui/material";

export const createPalette = (
  mode: PaletteMode
): Omit<
  Palette,
  | "action"
  | "secondary"
  | "background"
  | "divider"
  | "contrastThreshold"
  | "common"
  | "getContrastText"
  | "grey"
  | "tonalOffset"
  | "type"
  | "augmentColor"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "primary"
> => {
  const isLight = mode === "light";

  return {
    mode,
    text: {
      primary: isLight ? "#fff" : "#000",
      secondary: isLight ? "#fff" : "#000",
      disabled: isLight ? "#fff" : "#000",
    },
  };
};
