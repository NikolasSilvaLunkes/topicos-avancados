"use client"
import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Menu(theme: Theme) {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          margin: "5px 4px",
          "&:first-of-type": {
            marginTop: "-4px",
          },
          "&:last-of-type": {
            marginBottom: "-4px",
          },
          '&.Mui-selected': {
            backgroundColor: theme.palette.background.paper,
            '&:hover': {
              backgroundColor: theme.palette.action.hover
            }
          }
        }
      }
    }
  };
}
