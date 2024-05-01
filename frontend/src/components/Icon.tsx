import { Icon as Iconify, IconifyIcon } from "@iconify/react";

import Box, { BoxProps } from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";

interface Props extends BoxProps {
  sx?: SxProps;
  icon: IconifyIcon | string;
}

export default function Icon({ icon, sx, ...other }: Props) {
  return <Box component={Iconify} icon={Iconify} sx={{ ...sx }} {...other} />;
}
