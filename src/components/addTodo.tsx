import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { addTodo } from "../api/todosApi";
import { Todo } from "../types/todoTypes";

interface AddTodoProps {
  onClose: () => void;
  setTodos?: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function AddTodo({ onClose, setTodos }: AddTodoProps) {
  const [todoText, setTodoText] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const handleAddTodo = async () => {
    if (todoText.trim() === "") {
      alert("Todo text cannot be empty!");
      return;
    }

    try {
      setLoading(true);
      const response = await addTodo(todoText, status);
      const newTodoWithId = { ...response, id: Date.now() };

      setTodos?.((prev) => [...prev, newTodoWithId]);
      setTodoText("");
      onClose();
    } catch (error) {
      alert("Failed to create the todo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Create a New Todo
      </Typography>
      <TextField
        label="Todo Text"
        variant="outlined"
        fullWidth
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        sx={{ mb: 2, mt: 1 }}
      />
      <Button
        variant={status === "pending" ? "contained" : "outlined"}
        onClick={() => setStatus("pending")}
        sx={{ mr: 2 }}
        disabled={loading}
      >
        Set as Pending
      </Button>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTodo}
          disabled={loading}
          startIcon={
            loading ? <CircularProgress color="inherit" size={20} /> : undefined
          }
        >
          {loading ? "Adding..." : "Add Todo"}
        </Button>
      </Box>
    </Container>
  );
}
