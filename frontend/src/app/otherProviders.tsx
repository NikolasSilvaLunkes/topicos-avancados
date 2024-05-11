"use client";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import { Provider as ReduxProvider } from "react-redux";
import { store, persistor } from "@/redux/store";
import ThemeRegistry from "@/resources/theme/ThemeRegistry";
import { PersistGate } from "redux-persist/integration/react";
import { toast, ToastContainer } from "react-toastify";
import { Grid } from "@mui/material";
import menuConfig, { adminMenuChildren } from "@/components/MenuConfig";
import { usePathname } from "next/navigation";
import { getAuth, obterAutenticacao } from "@/resources/auth";
import { useEffect } from "react";
import { parseJwt } from "@/resources/utils/authUtils";
import { Menu } from "@/components/menu";

const inter = Inter({ subsets: ["latin"] });

export default function OtherProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const page = usePathname();
  const isAdmin = parseJwt(getAuth(true)?.token || "")?.sub === "admin";

  const thisMenuConfig = {
    ...menuConfig,
    children: isAdmin
      ? menuConfig.children.concat(adminMenuChildren)
      : menuConfig.children,
  };

  console.log("menuconfigarrr", thisMenuConfig);
  return (
    <ThemeRegistry>
      {page === "/login" ? (
        children
      ) : (
        <Menu config={thisMenuConfig}>{children}</Menu>
      )}
    </ThemeRegistry>
  );
}
