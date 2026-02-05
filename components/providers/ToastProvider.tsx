"use client";

import { ToastProviderType } from "@/constants/types";
import { Close } from "@mui/icons-material";
import { Alert, AlertColor, IconButton, Snackbar } from "@mui/material";
import React, { useCallback, useContext, useMemo } from "react";
import { createContext, ReactNode, useState } from "react";

const ToastContext = createContext<{
  show: (message: string, severity: AlertColor) => void;
}>({ show: () => {} });

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ToastProviderType>({
    open: false,
    message: "",
    severity: "success",
  });

  const action = useMemo(
    () => (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => setState({ ...state, open: false })}
        >
          <Close fontSize="small" />
        </IconButton>
      </React.Fragment>
    ),
    [],
  );

  const show = useCallback((message: string, severity: AlertColor) => {
    setState({ open: true, message: message, severity: severity });
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={state.open}
        onClose={() => setState((prev) => ({ ...prev, open: false }))}
        autoHideDuration={6000}
        action={action}
      >
        <Alert
          onClose={() => setState((prev) => ({ ...prev, open: false }))}
          severity={state.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  return useContext(ToastContext);
};
