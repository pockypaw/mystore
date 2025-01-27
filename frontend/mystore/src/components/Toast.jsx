import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useToastStore } from "../store/toast";


export default function Toast() {
  const { toast, hideToast } = useToastStore();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    hideToast();
  };

  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={toast.severity}
        sx={{ width: "100%" }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
}
