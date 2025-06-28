import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { RouterProvider } from "react-router";

import { queryClient, persister } from "./queryClient";
import { Box, CircularProgress } from "@mui/material";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { router } from "./routes";
import "./main.less";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <SnackbarProvider
        TransitionProps={{ direction: "up" }}
        autoHideDuration={2000}
      >
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister }}
        >
          <Box className="router-container">
            <Suspense
              fallback={
                <Box>
                  <CircularProgress />
                </Box>
              }
            >
              <RouterProvider router={router} />
            </Suspense>
          </Box>
        </PersistQueryClientProvider>
      </SnackbarProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);