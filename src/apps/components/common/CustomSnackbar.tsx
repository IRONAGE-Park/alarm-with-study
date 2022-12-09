import type { SyntheticEvent } from "react";
import type { SnackbarCloseReason } from "@mui/material";
// types

import { StyleCustomSnackbar } from "@renderer/components/common/CustomSnackbar.style";
// styles

interface CustomSnackbarProps {
  open: boolean;
  message: string;
  onClose: (
    event: Event | SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => void;
}

const CustomSnackbar = ({ open, message, onClose }: CustomSnackbarProps) => (
  <StyleCustomSnackbar
    open={open}
    message={message}
    onClose={onClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    autoHideDuration={3000}
  />
);

export default CustomSnackbar;
