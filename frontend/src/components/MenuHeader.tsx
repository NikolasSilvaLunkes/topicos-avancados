"use client";

import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { Icon } from "@iconify/react";
import { setOpen } from "@/redux/slices/menu";
import { dispatch, useSelector } from "@/redux/store";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function MenuHeader() {
  const theme = useTheme();

  const handleDrawerOpen = () => {
    dispatch(setOpen(true));
  };

  const handleDrawerClose = () => {
    dispatch(setOpen(false));
  };

  const open = useSelector((state) => state.menu.open);

  return (
    <DrawerHeader
      key={"MenuHeader"}
      sx={{ display: "flex", justifyContent: "space-between", height: "64px" }}
    >
      <div
        key={"MenuHeaderDiv"}
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 20,
          justifyContent: "center",
          fontWeight: "bold",
          marginLeft: 1,
        }}
      >
        {open ? (
          <></>
        ) : (
          <IconButton
            key={"MenuHeaderIconButton"}
            sx={{ color: theme.palette.text.secondary }}
            onClick={handleDrawerOpen}
            id={"MenuDrawerOpenButton"}
          >
            <Icon icon="ion:menu" />
          </IconButton>
        )}
      </div>
      <div key={"MenuHeaderDiv2"}>
        {open && (
          <IconButton
            id={"MenuDrawerCloseButton"}
            sx={{ color: theme.palette.text.secondary }}
            onClick={() => {
              handleDrawerClose();
            }}
          >
            <Icon icon="mdi:chevron-double-left" />
          </IconButton>
        )}
      </div>
    </DrawerHeader>
  );
}
