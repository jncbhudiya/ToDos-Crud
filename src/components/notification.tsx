import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

//deleted notification

export default function Notification({
  notifi,
  setNotifi,
  notifiMessage,
}: any) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setNotifi(false);
  };

  return (
    <div>
      <Snackbar open={notifi} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notifiMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
