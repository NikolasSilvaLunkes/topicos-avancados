"use client"
import { Theme } from '@mui/material/styles';

export default function InputLabel(theme: Theme) {
  return {
    MuiInputLabel:{
      defaultProps:{
        shrink: true
      },
      styleOverrides:{
        outlined:{
          borderColor: "#FFFF"
        }
      }
    },
  };
}
