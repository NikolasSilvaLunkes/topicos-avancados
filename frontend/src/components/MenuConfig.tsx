import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import { getAuth } from "@/resources/auth";
import { parseJwt } from "@/resources/utils/authUtils";

export type MenuItemProps = {
  name: string;
  link: string;
  icon: JSX.Element;
};

export type MenuConfig = {
  children: MenuItemProps[];
};

const menuConfig: MenuConfig = {
  children: [
    {
      name: "Dashboard",
      link: "/",
      icon: <DashboardIcon />,
    },
    {
      name: "Caixa",
      link: "/caixa",
      icon: <AttachMoneyIcon />,
    },
  ],
};

export const adminMenuChildren: MenuItemProps[] = [
  {
    name: "Usuários",
    link: "/usuarios",
    icon: <PersonIcon />,
  },
  {
    name: "Parametros",
    link: "/parametros",
    icon: <SettingsIcon />,
  },
];

export default menuConfig;
