"use client";

import Sidebar from "@/components/shared/Sidebar";
import TopBar from "@/components/shared/Topbar";
import { Close } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import { closeSnackbar, SnackbarProvider } from "notistack";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // mui theme
  const theme = useTheme();

  return (
    <QueryClientProvider client={client}>
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        maxSnack={5}
        autoHideDuration={2000}
        classes={{}}
        action={(snackId) => (
          <IconButton color="inherit" onClick={() => closeSnackbar(snackId)}>
            <Close />
          </IconButton>
        )}
      >
        <style>
          {`
          .notistack-MuiContent-success{
            color: ${theme.palette.primary.main} !important
          }
        `}
        </style>
        <div className="w-screen h-screen">
          <div className="flex h-full overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col">
              <TopBar />
              <div className="flex-1 px-5 py-5 overflow-y-auto">
                <div className="w-full h-full">{children}</div>
              </div>
            </main>
          </div>
        </div>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}
