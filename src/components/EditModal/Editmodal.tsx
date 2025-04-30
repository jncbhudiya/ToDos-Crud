import * as React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import styles from "./Editmodal.module.scss";

export default function NestedModal({
  open,
  setOpen,
  todoTitle,
  todoStatus,
  onSave,
}: any) {
  const [title, setTitle] = useState(todoTitle || "");
  const [status, setStatus] = useState(todoStatus ? "completed" : "pending");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(title, status === "completed");
      handleClose();
    } catch (error) {
      console.error("Error saving todo:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTitle(todoTitle || "");
    setStatus(todoStatus ? "completed" : "pending");
  }, [todoTitle, todoStatus]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-todo-modal-title"
    >
      <Box className={styles.Box}>
        <Typography id="edit-todo-modal-title" variant="h6" gutterBottom>
          Edit Todo
        </Typography>
        <TextField
          fullWidth
          label="Todo Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
          disabled={loading}
        />
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Status:</Typography>
          <Button
            variant={status === "pending" ? "contained" : "outlined"}
            onClick={() => setStatus("pending")}
            sx={{ mr: 1, mt: 1 }}
            disabled={loading}
          >
            Pending
          </Button>
          <Button
            variant={status === "completed" ? "contained" : "outlined"}
            onClick={() => setStatus("completed")}
            sx={{ mt: 1 }}
            disabled={loading}
          >
            Completed
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress size={18} color="inherit" />
              ) : undefined
            }
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
