import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

const ConfirmDeleteModal = ({ open, onClose, onConfirm }: any) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("Deletion failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onClose={isDeleting ? undefined : onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this item?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          color="error"
          variant="contained"
          disabled={isDeleting}
          startIcon={
            isDeleting ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
