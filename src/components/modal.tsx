import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

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

//mui nested modal

export default function NestedModal({ open, setOpen, todoTitle, onSave }: any) {
  const [title, setTitle] = useState(todoTitle || "");

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    onSave(title);
    handleClose();
  };

  useEffect(() => {
    setTitle(todoTitle || "");
  }, [todoTitle]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-todo-modal-title"
        aria-describedby="edit-todo-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="edit-todo-modal-title">Edit Todo</h2>
          <TextField
            fullWidth
            label="Todo Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
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
    </div>
  );
}
