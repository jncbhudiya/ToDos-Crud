import React, { useEffect, useState } from "react";
import {
  Container,
  CircularProgress,
  Typography,
  Box,
  Fab,
  Button,
  Modal,
} from "@mui/material";
import axios from "axios";
import TodoTable from "../components/todoTable";
import AddTodo from "../components/addTodo";
import AddIcon from "@mui/icons-material/Add";
import { green } from "@mui/material/colors";

export default function TodosPage() {
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAddTodo, setOpenAddTodo] = useState(false);

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

  const handleClose = () => {
    setOpenAddTodo(false);
  };

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
          <TodoTable todos={todos} />
          {/* Plus Button */}
          <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1300 }}>
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => setOpenAddTodo(true)}
            >
              <AddIcon />
            </Fab>
          </Box>

          {/* Modal for AddTodo */}
          <Modal
            open={openAddTodo}
            onClose={handleClose}
            aria-labelledby="add-todo-modal"
            aria-describedby="add-new-todo-item"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 1,
              }}
            >
              <AddTodo onClose={handleClose} setTodos={setTodos} />
            </Box>
          </Modal>
        </>
      ) : (
        <Typography variant="h6" align="center" color="error">
          No Todos Found
        </Typography>
      )}
    </Container>
  );
}
