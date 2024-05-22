"use client";

import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Grid,
  useTheme,
  Button,
} from "@mui/material";
import { useMediaQuery, Box, Stack } from "@mui/system";
import React from "react";
import { MenuConfig, MenuItemProps } from "./MenuConfig";
import MenuItem from "./MenuItem";
import MenuHeader from "./MenuHeader";
import { dispatch, useSelector } from "@/redux/store";
import { setOpen } from "@/redux/slices/menu";
import MenuLogoutButton from "./MenuLogoutButton";

type MenuProps = {
  children: any;
  config: MenuConfig;
};

export function Menu({ children, config }: MenuProps) {
  const theme = useTheme();

  const open = useSelector((state) => state.menu.open);

  const handleBackdropClick = () => {
    if (open) {
      dispatch(setOpen(false));
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        key={"MenuDrawer"}
        variant="permanent"
        open={open}
        hideBackdrop={false}
        sx={{
          paddingRight: 0,
          height: "100vh",
          transition: "width 0.2s",
          zIndex: 100,
          "& .MuiDrawer-paper": {
            px: open ? 1.5 : 0,
            bgcolor: theme.palette.background.default,
            borderRight: `0.5px  solid ${theme.palette.text.secondary}`,
          },
        }}
      >
        <MenuHeader />
        <Box
          key={"MenuDiv"}
          width={open ? 200 : "60px"}
          sx={{ transition: "0.2s" }}
        >
          {config.children.map((category: MenuItemProps, i: number) => (
            <MenuItem {...category} key={"menuItem" + i} />
          ))}
        </Box>
        <MenuLogoutButton />
      </Drawer>

      <Box
        sx={{
          filter: open ? "opacity(70%)" : "none",
          pointerEvents: open ? "fill" : "auto",
          transition:
            "filter 0.2s, backdrop-filter 0.2s ease, pointer-events 0.2s ease, background-color 0.2s ease",
          width: "100%",
          height: "100%",
          bgcolor: theme.palette.background.default,
          overflow: "hidden",
        }}
        onClick={handleBackdropClick}
      >
        <Box
          pl={"60px"}
          sx={{
            width: "100%",
            pointerEvents: open ? "none" : "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
