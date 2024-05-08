import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

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
    {
      name: "Usuários",
      link: "/usuarios",
      icon: <PersonIcon />,
    },
  ],
};

export default menuConfig;
