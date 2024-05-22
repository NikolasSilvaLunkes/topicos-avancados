"use client";

import { dispatch, useSelector } from "@/redux/store";
import { Button, IconButton, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";
import { setAuth } from "@/redux/slices/auth";
import { useRouter } from "next/navigation";

export default function MenuLogoutButton() {
  const expanded = useSelector((state) => state.menu.open);
  const router = useRouter();
  const logout = () => {
    dispatch(setAuth(undefined));
    router.push("/login");
  };
  const theme = useTheme();
  console.log("arrrmythmee", theme);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {expanded ? (
        <Button
          variant="contained"
          onClick={logout}
          color="error"
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      ) : (
        <IconButton onClick={logout} color="error">
          <LogoutIcon />
        </IconButton>
      )}
    </Box>
  );
}
