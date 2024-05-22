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
import { useSelector } from "@/redux/store";

function IconBullet({ sizeMult }: any) {
  return (
    <Box
      sx={{
        width: 24,
        height: 16,
        display: "flex",
        mt: 0.2,
        alignItems: "center",
      }}
    >
      <Box
        component="span"
        sx={{
          ml: "2px",
          width: 4 * sizeMult,
          height: 4 * sizeMult,
          margin: "auto",
          borderRadius: "50%",
          bgcolor: "currentColor",
        }}
      />
    </Box>
  );
}

export type MenuItemProps = {
  name: string;
  link: string;
  icon: JSX.Element | undefined;
};

export default function MenuItem({ name, link, icon }: MenuItemProps) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  function handleClick() {
    router.push(link);
  }
  const open = useSelector((state) => state.menu.open);
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
            key={name + "MenuMainRouteButton"}
            sx={{
              textTransform: "none",
              width: "100%",
              justifyContent: open ? "initial" : "center",
              pl: 1.1,
              backgroundColor:
                link == pathname
                  ? alpha(theme.palette.primary.main, 0.05)
                  : alpha(theme.palette.primary.main, 0),
            }}
          >
            <ListItemIcon
              key={name + "MenuMainRouteListItemIcon"}
              sx={{
                minWidth: 0,
                mr: open ? 1.5 : "auto",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: "bold",
                color:
                  link == pathname
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
              }}
            >
              {icon != undefined ? (
                icon
              ) : (
                <IconBullet
                  key={name + "MenuMainRouteListItemIcon"}
                  sizeMult={icon == undefined && link == pathname ? 1.8 : 1}
                />
              )}
            </ListItemIcon>
            {open ? (
              <ListItemText key={"MenuMainRouteListMiniItem" + link}>
                <Typography
                  key={"MenuMainRouteListMiniItemTypography" + link}
                  sx={{
                    textOverflow: "ellipsis",
                    fontSize: 14,
                    overflow: "hidden",
                    maxWidth: "95%",
                    textAlign: "left",
                    color:
                      link == pathname
                        ? icon == undefined
                          ? theme.palette.text.primary
                          : theme.palette.primary.main
                        : theme.palette.text.secondary,
                    fontWeight: link == pathname ? "700" : "400",
                  }}
                >
                  {name}
                </Typography>
              </ListItemText>
            ) : (
              ""
            )}
          </Button>
        )}
        {!open && icon != undefined && (
          <IconButton
            key={"MenuMainRouteIconButton" + link}
            sx={{
              mx: "auto",
              backgroundColor:
                link == pathname
                  ? alpha(theme.palette.primary.main, 0.05)
                  : alpha(theme.palette.primary.main, 0),
              color:
                link == pathname
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
