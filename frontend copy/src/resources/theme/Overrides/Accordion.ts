"use client"
import { Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Accordion(theme: Theme) {
  return {
    MuiAccordion: {
      styleOverrides: {
        
        textOverflow: "ellipsis",
        width: "-webkit-fill-available",
        backgroundImage: `linear-gradient(${"#fff"}, ${"#fff"}) !important`,
        root: {
          "&.Mui-expanded": {
            borderRadius: theme.shape.borderRadius,
          },
          "&.Mui-disabled": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          maxHeight: 'none !important',
          overflowY: 'scrool',
        },
      },
    },

    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            opacity: 1,
            color: theme.palette.action.disabled,
            "& .MuiTypography-root": {
              color: "inherit",
            },
          },
        },
        expandIconWrapper: {
          color: "inherit",
        },
      },
    },
  };
}
