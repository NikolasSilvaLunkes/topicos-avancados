import { MenuItemProps } from "./MenuItem";

export type MenuConfig = {
  menuItems: MenuItemProps[];
};

export default function Menu(config: MenuConfig) {
  return config.menuItems.map((item: MenuItemProps) => <></>);
}
