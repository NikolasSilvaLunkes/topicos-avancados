"use client"
import { Theme, alpha } from '@mui/material/styles';

export default function TextField(theme: Theme) {
  return {
    MuiTextField: {
      defaultProps:{
        InputLabelProps:{
          shrink: true
        },
        autoComplete:"new-password"
      }
    },
    MuiAutoComplete: {
      defaultProps:{
        InputLabelProps:{
          shrink: true
        },
        autoComplete:"new-password"
      }
    },
  };
}
