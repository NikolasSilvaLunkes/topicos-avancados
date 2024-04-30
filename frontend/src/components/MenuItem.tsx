import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useRouter, usePathname } from "next/navigation";
import { Stack, alpha, useTheme } from "@mui/material";
import React, { useState } from "react";
import uuidv4 from "arpa-utils/uuidv4";

export type MenuItemProps = {
  name: string;
  link: string;
  icon: string;
};

export default function MenuItem({ name, link, icon }: MenuItemProps) {
  return (
    <Stack>
      <ListItem
        disablePadding
        key={"menuRoute" + link}
        sx={{
          py: 0.3,
        }}
      >
        {open && (
          <Button
            id={"menuRouteButton" + name}
            onClick={handleClick}
            key={keyNumber.toString() + "arpaMenuMainRouteButton" + route}
            sx={{
              textTransform: "none",
              width: "100%",
              justifyContent: open ? "initial" : "center",
              pl: 1.1 + level,
              backgroundColor:
                route == pathname && level == 1
                  ? alpha(theme.palette.primary.main, 0.05)
                  : alpha(theme.palette.primary.main, 0),
            }}
          >
            <ListItemIcon
              key={
                keyNumber.toString() + "arpaMenuMainRouteListItemIcon" + route
              }
              sx={{
                minWidth: 0,
                mr: open ? 1.5 : "auto",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: "bold",
                color:
                  route == pathname
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
              }}
            >
              {icon != undefined ? (
                icon
              ) : (
                <IconBullet
                  key={
                    keyNumber.toString() +
                    "arpaMenuMainRouteListItemIcon" +
                    route
                  }
                  sizeMult={icon == undefined && route == pathname ? 1.8 : 1}
                />
              )}
            </ListItemIcon>
            {open ? (
              <ListItemText
                key={
                  keyNumber.toString() + "arpaMenuMainRouteListMiniItem" + route
                }
              >
                <Typography
                  key={
                    keyNumber.toString() +
                    "arpaMenuMainRouteListMiniItemTypography" +
                    route
                  }
                  sx={{
                    textOverflow: "ellipsis",
                    fontSize: 14,
                    overflow: "hidden",
                    maxWidth: "95%",
                    textAlign: "left",
                    color:
                      route == pathname
                        ? icon == undefined
                          ? theme.palette.text.primary
                          : theme.palette.primary.main
                        : theme.palette.text.secondary,
                    fontWeight: route == pathname ? "700" : "400",
                  }}
                >
                  {label}
                </Typography>
              </ListItemText>
            ) : (
              ""
            )}
          </Button>
        )}
        {!open && icon != undefined && (
          <IconButton
            id={formataIdComponente(
              ("menuRouteIconButton" + route + keyNumber.toString() + label)
                .split(" ")
                .join("_")
            )}
            key={keyNumber.toString() + "arpaMenuMainRouteIconButton" + route}
            sx={{
              mx: "auto",
              backgroundColor:
                route == pathname && level == 1
                  ? alpha(theme.palette.primary.main, 0.05)
                  : alpha(theme.palette.primary.main, 0),
              color:
                route == pathname
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
            }}
            onClick={handleClick}
          >
            {icon}
          </IconButton>
        )}
      </ListItem>
    </Stack>
  );
}
