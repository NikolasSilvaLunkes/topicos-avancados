"use client"
import { Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Accordion(theme: Theme) {
  return {
    MuiGrid: {
      styleOverrides: {
        root: {
          maxHeight: 'none',
        },
      },
    },
  };
}
