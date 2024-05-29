import { Palette, PaletteMode, Theme, createTheme } from "@mui/material";
import { createComponents } from "./create-components";
import { createPalette } from "./create-palette";

// Create a theme instance.

const createCustomTheme = (mode: PaletteMode): Theme => {
  const palette = createPalette(mode);
  const components = createComponents(palette as Palette);

  return createTheme({
    palette,
    components: components,
  });
};

export default createCustomTheme;
