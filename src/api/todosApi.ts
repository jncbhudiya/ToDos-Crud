// src/api/todoAPI.ts
import axios from "axios";
import { Todo } from "../types/todoTypes";

// Get all todos
export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(
    "https://dummyjson.com/todos?limit=100&skip=0"
  );
  return response.data.todos;
};

// Add new todo
export const addTodo = async (
  todoText: string,
  status: string
): Promise<Todo> => {
  const response = await axios.post("https://dummyjson.com/todos/add", {
    todo: todoText,
    completed: status === "completed",
    userId: 1,
  });
  return response.data;
};

// Delete todo
export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`https://dummyjson.com/todos/${id}`);
};

// Update todo
export const updateTodo = async (
  id: number,
  todo: string,
  completed: boolean
): Promise<Todo> => {
  const response = await axios.put(`https://dummyjson.com/todos/${id}`, {
    todo,
    completed,
  });
  return response.data;
};

// Get todo by ID
export const getTodoById = async (id: string): Promise<Todo> => {
  const response = await axios.get(`https://dummyjson.com/todos/${id}`);
  return response.data;
};
