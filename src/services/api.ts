// services/api.ts
import axios from "axios";
import { Todo } from "../components/types/todo";
const API_URL = "https://dummyjson.com";

// Get todos with pagination
export const getTodos = async (limit: number = 10, skip: number = 0) => {
  try {
    const response = await axios.get(
      `${API_URL}/todos?limit=${limit}&skip=${skip}`
    );
    return {
      todos: response.data.todos,
      total: response.data.total,
    };
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// Add a new todo
export const createTodo = async (todoData: {
  todo: string; // Note: DummyJSON expects "todo" not "title"
  completed: boolean;
  userId: number; // Required by DummyJSON
}): Promise<Todo> => {
  try {
    const response = await axios.post(`${API_URL}/todos/add`, todoData);
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

// Update a todo
export const updateTodo = async (id: number, todoData: Partial<Todo>) => {
  try {
    const response = await axios.put(`${API_URL}/todos/${id}`, todoData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
