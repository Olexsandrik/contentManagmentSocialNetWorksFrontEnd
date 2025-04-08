import { useState } from "react";

import { Snackbar, Alert } from "@mui/material";

export const useToast = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("success");

  const toast = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    setMessage(`${title}: ${description}`);
    setSeverity("success");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    toast,
    Snackbar: (
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    ),
  };
};
