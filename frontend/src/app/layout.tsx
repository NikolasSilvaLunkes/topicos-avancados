"use client";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import { Provider as ReduxProvider } from "react-redux";
import { store, persistor } from "@/redux/store";
import ThemeRegistry from "@/resources/theme/ThemeRegistry";
import { PersistGate } from "redux-persist/integration/react";
import { toast, ToastContainer } from "react-toastify";
import { Grid } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <ToastContainer />
        </div>
        <PersistGate loading={null} persistor={persistor}>
          <ReduxProvider store={store}>
            <ThemeRegistry>{children}</ThemeRegistry>
          </ReduxProvider>
        </PersistGate>
      </body>
    </html>
  );
}
