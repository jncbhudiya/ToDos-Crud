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
import AddTodo from "../AddTodo/AddTodo";
import AddIcon from "@mui/icons-material/Add";
import { getTodos } from "../../api/todosApi";
import { useLoader } from "../../context/LoaderContext";
import { Lightbulb, TaskAlt } from "@mui/icons-material";
import { showNotification } from "../Notification/notification";
import TodoTable from "../TodoTable/ToDoTable";
import styles from "./ToDoList.module.scss";
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
    <Container maxWidth="lg" className={styles.container}>
      {/* Header Section */}
      <Box className={styles.headerSection}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar className={styles.avatarLarge}>
            <TaskAlt fontSize="large" />
          </Avatar>
          <Box>
            <Typography
              variant="h4"
              component="h1"
              className={styles.taskManagerTitle}
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
      <Card className={styles.todoCard}>
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
                className={styles.addTaskButton}
              >
                Add Task
              </Button>
            </Tooltip>
          }
          className={styles.cardHeader}
        />

        {loading ? (
          <Box sx={{ p: 3 }}>
            {[...Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height={60}
                className={`${styles.skeletonItem} ${
                  theme.palette.mode === "dark" ? styles.dark : styles.light
                }`}
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
              <Box className={styles.modalContent}>
                <AddTodo
                  onClose={handleClose}
                  setTodos={setTodos}
                  todos={todos}
                />
              </Box>
            </Modal>
          </>
        ) : (
          <Box className={styles.emptyState}>
            <TaskAlt className={styles.emptyIcon} />
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
              className={styles.createTaskButton}
            >
              Create Task
            </Button>
          </Box>
        )}
      </Card>
    </Container>
  );
}
