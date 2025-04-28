import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
} from "@mui/material";
import { updateTodo, createTodo } from "../../services/api"; // Make sure to import createTodo
import { Todo } from "../types/todo";

interface TodoFormProps {
  todo?: Todo;
  onCancel?: () => void;
  onSubmit: (updatedTodo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ todo, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(todo?.todo || ""); // Changed from todo?.title
  const [completed, setCompleted] = useState(todo?.completed || false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let result: Todo;
      if (todo) {
        // For update
        result = await updateTodo(todo.id, {
          todo: title, // Using "todo" instead of "title"
          completed,
        });
      } else {
        // For create
        result = await createTodo({
          todo: title, // Using "todo" instead of "title"
          completed,
          userId: 1, // DummyJSON requires userId
        });
      }
      onSubmit(result);
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="todo-form">
      <TextField
        label="Todo Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        }
        label="Completed"
      />
      <div className="form-actions">
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          {todo ? "Update" : "Create"}
        </Button>
      </div>
    </Box>
  );
};

export default TodoForm;
