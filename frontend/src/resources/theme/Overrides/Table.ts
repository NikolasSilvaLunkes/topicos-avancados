"use client"
import { Theme, alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Table(theme: Theme) {
  return {
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: theme.palette.action.selected,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "none",
        },
        head: {
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
          "&:first-of-type": {
            paddingLeft: theme.spacing(3),
            borderTopLeftRadius: theme.shape.borderRadius,
          },
          "&:last-of-type": {
            paddingRight: theme.spacing(3),
            borderTopRightRadius: theme.shape.borderRadius,
          },
        },
        stickyHeader: {
          backgroundColor: theme.palette.background.default,
        },
        body: {
          
          backgroundColor: alpha(theme.palette.background.paper,0.72),
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          borderTop: `solid 1px ${theme.palette.divider}`,
        },
        toolbar: {
          height: 64,
        },
        select: {
          "&:focus": {
            borderRadius: theme.shape.borderRadius,
          },
        },
        selectIcon: {
          width: 20,
          height: 20,
          marginTop: -4,
        },
      },
    },
  };
}
