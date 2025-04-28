import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Checkbox,
  Button,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Todo } from "../types/todo";
import { deleteTodo, updateTodo } from "../../services/api";
import TodoForm from "../TodoForm/TodoForm";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [editMode, setEditMode] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(todo);

  const handleStatusChange = async () => {
    try {
      const updatedTodo = await updateTodo(currentTodo.id, {
        completed: !currentTodo.completed,
      });
      setCurrentTodo(updatedTodo);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(currentTodo.id);
      // You might want to trigger a refresh of the todo list here
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
if (editMode) {
  return (
    <TodoForm
      todo={currentTodo}
      onCancel={() => setEditMode(false)}
      onSubmit={(updatedTodo: Todo) => {
        
        setCurrentTodo(updatedTodo);
        setEditMode(false);
      }}
    />
  );
}


  return (
    <TableRow>
      <TableCell>{currentTodo.title}</TableCell>
      <TableCell>
        <Checkbox
          checked={currentTodo.completed}
          onChange={handleStatusChange}
        />
      </TableCell>
      <TableCell>
        <IconButton onClick={() => setEditMode(true)}>
          <Edit />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TodoItem;
