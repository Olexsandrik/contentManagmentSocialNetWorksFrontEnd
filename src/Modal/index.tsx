import { Box, Modal } from "@mui/material";
import React from "react";

type PropsChild = {
  children: React.ReactNode;
  open: boolean;
  handleClose: (e: boolean) => void;
  className?: string;
};

export const MainModal = ({
  children,
  open,
  handleClose,
  className,
}: PropsChild) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="w-10 m-auto flex"
    >
      <Box className={className}>{children}</Box>
    </Modal>
  );
};
