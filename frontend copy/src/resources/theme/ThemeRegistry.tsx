"use client";

import {
  ThemeProvider,
  alpha,
  createTheme,
  useTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "@/redux/store";
import ComponentsOverrides from "./Overrides";
import palette from "./palette";
import shadows, { customShadows } from "./shadows";
import React from "react";
import { usePathname } from "next/navigation";
import { presetsDeCores } from "./Types/type";
import themeDef from "./palette";

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry(props: any) {
  const defaultTheme = useTheme();
  const { children } = props;
  const { indiceDaCor, temaEscuro, modoContraste } = useSelector(
    (state) => state.theme
  );
  const routes = {
    noDrawerPages: ["/login"],
  };
  const pathname = usePathname();
  const noDrawer = routes.noDrawerPages.includes(pathname);

  const theme = createTheme({
    ...themeDef,
    palette: temaEscuro ? palette.dark : palette.light,
    shape: { borderRadius: 8 },
    shadows: !temaEscuro
      ? modoContraste
        ? shadows.light
        : shadows.light2
      : modoContraste
      ? shadows.dark
      : shadows.dark2,
    customShadows: !temaEscuro ? customShadows.light : customShadows.dark,
  });

  theme.customShadows.primary = `0 8px 16px 0 ${alpha(
    palette.light.primary.main,
    0.24
  )}`;

  theme.palette.primary = presetsDeCores[indiceDaCor];
  theme.customShadows.primary = `0 8px 16px 0 ${alpha(
    presetsDeCores[indiceDaCor].main,
    0.24
  )}`;

  theme.components = ComponentsOverrides(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
