"use client";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import { Provider as ReduxProvider } from "react-redux";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import OtherProviders from "./otherProviders";

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
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <OtherProviders>{children}</OtherProviders>
          </PersistGate>
        </ReduxProvider>
      </body>
    </html>
  );
}
