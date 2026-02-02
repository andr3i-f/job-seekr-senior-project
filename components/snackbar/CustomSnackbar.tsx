import { Close } from "@mui/icons-material";
import { Alert, AlertColor, IconButton, Snackbar } from "@mui/material";
import React, { JSX } from "react";

export default function CustomSnackbar({
  message,
  severity,
  open,
  setOpen,
}: {
  message: string;
  severity: AlertColor;
  open: boolean;
  setOpen: (arg0: boolean) => void;
}): JSX.Element {
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setOpen(false)}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={6000}
      action={action}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
