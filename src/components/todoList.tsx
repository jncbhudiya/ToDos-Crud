import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Fab, Modal } from "@mui/material";
import TodoTable from "../components/todoTable";
import AddTodo from "../components/addTodo";
import AddIcon from "@mui/icons-material/Add";
import { getTodos } from "../api/todosApi";
import { useLoader } from "../context/LoaderContext";

export default function TodosList() {
  const [todos, setTodos] = useState<any[]>([]);
  const [openAddTodo, setOpenAddTodo] = useState(false);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        showLoader();
        const todos = await getTodos();
        setTodos(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        hideLoader();
      }
    };

    fetchTodos();
  }, []);

  const handleClose = () => {
    setOpenAddTodo(false);
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* Render only when todos are available */}
      {todos.length > 0 ? (
        <>
          <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1300 }}>
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => setOpenAddTodo(true)}
            >
              <AddIcon />
            </Fab>
          </Box>
          <TodoTable todos={todos} />

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
              <AddTodo
                onClose={handleClose}
                setTodos={setTodos}
                todos={todos}
              />
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
