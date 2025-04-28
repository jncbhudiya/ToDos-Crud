import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  CircularProgress,
  IconButton,
  Chip,
  Typography,
  Box,
} from "@mui/material";
import {
  Edit,
  Delete,
  CheckCircle,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { getTodos } from "../../services/api";
import "./TodoList.scss";
import { Todo } from "../types/todo";

interface TodoListProps {
  refresh: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ refresh }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const limit = 10;
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const { todos, total } = await getTodos(limit, (page - 1) * limit);
        setTodos(todos);
        setTotal(total);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [page, refresh]);
  const handleStatusChange = async (id: number, currentStatus: boolean) => {
    try {
      // Simulating update - replace with actual API call
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !currentStatus } : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      // Simulating delete - replace with actual API call
      const filteredTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filteredTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div className="todo-list-container">
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper} elevation={3}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell width="60%">Title</TableCell>
                  <TableCell width="20%" align="center">
                    Status
                  </TableCell>
                  <TableCell width="20%" align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.map((todo) => (
                  <TableRow
                    key={todo.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {todo.title}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        icon={
                          todo.completed ? (
                            <CheckCircle />
                          ) : (
                            <RadioButtonUnchecked />
                          )
                        }
                        label={todo.completed ? "Completed" : "Pending"}
                        color={todo.completed ? "success" : "default"}
                        onClick={() =>
                          handleStatusChange(todo.id, todo.completed)
                        }
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton aria-label="edit" color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => handleDelete(todo.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {todos.length > 0 && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
              />
            </Box>
          )}

          {todos.length === 0 && !loading && (
            <Box textAlign="center" mt={4}>
              <Typography variant="h6" color="textSecondary">
                No todos found. Add your first todo!
              </Typography>
            </Box>
          )}
        </>
      )}
    </div>
  );
};

export default TodoList;
