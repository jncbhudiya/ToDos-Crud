import React, { useEffect, useState } from "react";
import {
  Container,
  CircularProgress,
  Typography,
  Box,
  Fab,
  Button,
} from "@mui/material";
import axios from "axios";
import TodoTable from "../components/todoTable";
import AddTodo from "../components/addTodo";
import AddIcon from "@mui/icons-material/Add";
import { green } from "@mui/material/colors";

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddTodo, setShowAddTodo] = useState(true);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/todos?limit=100&skip=0"
        );
        setTodos(response.data?.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      {loading ? (
        <Container
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </Container>
      ) : todos.length > 0 ? (
        <>
          {showAddTodo && <AddTodo />}
          <TodoTable todos={todos} />
          {/* Plus Button */}
          <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1300 }}>
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => setShowAddTodo(!showAddTodo)}
            >
              <AddIcon />
            </Fab>
          </Box>
        </>
      ) : (
        <Typography variant="h6" align="center" color="error">
          No Todos Found
        </Typography>
      )}
    </Container>
  );
}
