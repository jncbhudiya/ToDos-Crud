import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";

interface AddTodoProps {
  onClose: () => void;
  setTodos?: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function AddTodo({ onClose, setTodos }: AddTodoProps) {
  const [todoText, setTodoText] = useState("");
  const [status, setStatus] = useState("pending");

  const handleAddTodo = async () => {
    if (todoText?.trim() === "") {
      alert("Todo text cannot be empty!");
      return;
    }

    try {
      const response = await axios.post("https://dummyjson.com/todos/add", {
        todo: todoText,
        completed: status === "completed",
        userId: 1,
      });

      // alert("Todo successfully created!");
      setTodoText("");

      // Update the todos list in the parent component
      if (setTodos) {
        setTodos((prev) => [...prev, response.data]);
      }

      // Close the modal
      onClose();
    } catch (error) {
      alert("Failed to create the todo. Please try again.");
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
      >
        Set as Pending
      </Button>
      <Button
        variant={status === "completed" ? "contained" : "outlined"}
        onClick={() => setStatus("completed")}
      >
        Set as Completed
      </Button>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddTodo}>
          Add Todo
        </Button>
      </Box>
    </Container>
  );
}
