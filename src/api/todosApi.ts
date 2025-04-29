// src/api/todosApi.ts
import axios from "axios";

const BASE_URL = "https://dummyjson.com";

export const fetchTodos = async (
  limit: number,
  skip: number,
  searchQuery: string = ""
) => {
  const url = searchQuery
    ? `${BASE_URL}/todos/search?q=${searchQuery}&limit=${limit}&skip=${skip}`
    : `${BASE_URL}/todos?limit=${limit}&skip=${skip}`;
  const response = await axios.get(url);
  return response.data;
};

export const createTodo = async (newTodo: {
  todo: string;
  completed: boolean;
  userId: number; // Add this field
}) => {
  const response = await axios.post(`${BASE_URL}/todos/add`, {
    ...newTodo,
    userId: 1,
  });
  return response.data;
};

export const updateTodo = async (
  id: number,
  updatedTodo: { todo: string; completed: boolean }
) => {
  const response = await axios.put(`${BASE_URL}/todos/${id}`, updatedTodo);
  return response.data;
};

export const deleteTodo = async (id: number) => {
  const response = await axios.delete(`${BASE_URL}/todos/${id}`);
  console.log("Delete response:", response.data);
  return response.data;
};
