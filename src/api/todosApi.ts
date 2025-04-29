// todosApi.ts
import axios from "axios";
import { Todo } from "../types/todoTypes";
import { dispatch } from "../redux/store/apiStore";
import { showNotification } from "../components/notification";

const handleError = (error: any) => {
  const errorMessage = error.response?.data?.message || "An error occurred";
  dispatch({ type: "API_ERROR", payload: errorMessage });
  showNotification(errorMessage, "error");
  throw error;
};

export const getTodos = async (): Promise<Todo[]> => {
  try {
    dispatch({ type: "API_REQUEST" });
    const response = await axios.get(
      "https://dummyjson.com/todos?limit=100&skip=0"
    );
    dispatch({ type: "API_SUCCESS" });
    return response.data.todos;
  } catch (error) {
    return handleError(error);
  }
};

export const addTodo = async (
  todoText: string,
  status: string
): Promise<Todo> => {
  try {
    dispatch({ type: "API_REQUEST" });
    const response = await axios.post("https://dummyjson.com/todos/add", {
      todo: todoText,
      completed: status === "completed",
      userId: 1,
    });
    dispatch({ type: "API_SUCCESS" });
    showNotification("Todo added successfully!");
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteTodo = async (id: number): Promise<void> => {
  try {
    dispatch({ type: "API_REQUEST" });
    await axios.delete(`https://dummyjson.com/todos/${id}`);
    dispatch({ type: "API_SUCCESS" });
    showNotification("Todo deleted successfully!");
  } catch (error) {
    handleError(error);
  }
};

export const updateTodo = async (
  id: number,
  todo: string,
  completed: boolean
): Promise<Todo> => {
  try {
    dispatch({ type: "API_REQUEST" });
    const response = await axios.put(`https://dummyjson.com/todos/${id}`, {
      todo,
      completed,
    });
    dispatch({ type: "API_SUCCESS" });
    showNotification("Todo updated successfully!");
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getTodoById = async (id: string): Promise<Todo> => {
  try {
    dispatch({ type: "API_REQUEST" });
    const response = await axios.get(`https://dummyjson.com/todos/${id}`);
    dispatch({ type: "API_SUCCESS" });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
