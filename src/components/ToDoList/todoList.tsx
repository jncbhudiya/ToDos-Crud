import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Modal,
  CircularProgress,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  useTheme,
  Skeleton,
  Tooltip,
} from "@mui/material";
import TodoTable from "../TodoTable/todoTable";
import AddTodo from "../AddTodo/addTodo";
import AddIcon from "@mui/icons-material/Add";
import { getTodos } from "../../api/todosApi";
import { useLoader } from "../../context/LoaderContext";
import { Lightbulb, TaskAlt } from "@mui/icons-material";
import { showNotification } from "../Notification/notification";

export default function TodosList() {
  const [todos, setTodos] = useState<any[]>([]);
  const [openAddTodo, setOpenAddTodo] = useState(false);
  const [loading, setLoading] = useState(true);
  const { showLoader, hideLoader } = useLoader();
  const theme = useTheme();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        showLoader();
        setLoading(true);
        const todos = await getTodos();
        setTodos(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
        showNotification("Failed to load todos", "error");
      } finally {
        setLoading(false);
        hideLoader();
      }
    };

    fetchTodos();
  }, []);

  const handleClose = () => {
    setOpenAddTodo(false);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        transition: "all 0.3s ease",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 56,
              height: 56,
            }}
          >
            <TaskAlt fontSize="large" />
          </Avatar>
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Task Manager
            </Typography>
          </Box>
          <Typography variant="subtitle1" color="text.secondary">
            {loading
              ? "Loading..."
              : `${todos.length} ${todos.length === 1 ? "task" : "tasks"}`}
          </Typography>
        </Box>
      </Box>

      {/* Content Section */}
      <Card
        sx={{
          boxShadow: theme.shadows[1],
          borderRadius: 3,
          overflow: "hidden",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: theme.palette.success.light }}>
              <Lightbulb />
            </Avatar>
          }
          title={
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Task Dashboard
            </Typography>
          }
          subheader="Manage all your tasks efficiently"
          action={
            <Tooltip title="Add New Task" arrow>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenAddTodo(true)}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  boxShadow: theme.shadows[1],
                  "&:hover": {
                    boxShadow: theme.shadows[2],
                    bgcolor: theme.palette.primary.dark,
                  },
                }}
              >
                Add Task
              </Button>
            </Tooltip>
          }
          sx={{
            bgcolor:
              theme.palette.mode === "dark"
                ? theme.palette.grey[900]
                : theme.palette.grey[50],
            borderBottom: `1px solid ${theme.palette.divider}`,
            py: 1,
          }}
        />

        {loading ? (
          <Box sx={{ p: 3 }}>
            {[...Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height={60}
                sx={{
                  mb: 2,
                  borderRadius: 1,
                  bgcolor:
                    theme.palette.mode === "dark" ? "grey.800" : "grey.100",
                }}
              />
            ))}
          </Box>
        ) : todos.length > 0 ? (
          <>
            <TodoTable todos={todos} setTodos={setTodos} />

            {/* Add Todo Modal */}
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
                  width: { xs: "90%", sm: 500 },
                  bgcolor: "background.paper",
                  boxShadow: theme.shadows[10],
                  p: 4,
                  borderRadius: 3,
                  outline: "none",
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
          <Box
            sx={{
              p: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <TaskAlt
              sx={{
                fontSize: 60,
                color: theme.palette.text.disabled,
                mb: 2,
                opacity: 0.8,
              }}
            />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Your task list is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Get started by creating your first task
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpenAddTodo(true)}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1.5,
                textTransform: "none",
              }}
            >
              Create Task
            </Button>
          </Box>
        )}
      </Card>
    </Container>
  );
}
