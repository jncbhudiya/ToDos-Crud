import * as React from "react";
import { useEffect, useState } from "react";
import { Box, Modal, Button, TextField, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function NestedModal({
  open,
  setOpen,
  todoTitle,
  todoStatus,
  onSave,
}: any) {
  const [title, setTitle] = useState(todoTitle || "");
  const [status, setStatus] = useState(todoStatus ? "completed" : "pending");

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    onSave(title, status === "completed"); // ✅ pass updated title & status
    handleClose();
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
      <Box sx={style}>
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
        />
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Status:</Typography>
          <Button
            variant={status === "pending" ? "contained" : "outlined"}
            onClick={() => setStatus("pending")}
            sx={{ mr: 1, mt: 1 }}
          >
            Pending
          </Button>
          <Button
            variant={status === "completed" ? "contained" : "outlined"}
            onClick={() => setStatus("completed")}
            sx={{ mt: 1 }}
          >
            Completed
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
