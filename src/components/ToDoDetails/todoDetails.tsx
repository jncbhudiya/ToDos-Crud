import React, { useEffect, useState } from "react";
import {
  Container,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Alert,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { useLoader } from "../../context/LoaderContext";
import { getTodoById } from "../../api/todosApi";
import styles from "./ToDoDetails.module.scss";

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId?: number;
}

export default function TodoDetails() {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showLoader, hideLoader } = useLoader();
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchTodo = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const response = await getTodoById(id);
      setTodo(response);
    } catch (err) {
      setError("Failed to fetch todo details");
      console.error("Error fetching todo:", err);
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  useEffect(() => {
    fetchTodo();
  }, [id]);

  const handleBack = () => navigate(-1);

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          variant="outlined"
        >
          Back
        </Button>
        {todo && (
          <Button startIcon={<EditIcon />} variant="contained" color="primary">
            Edit Todo
          </Button>
        )}
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" mt={10}>
          <CircularProgress />
        </Box>
      ) : todo ? (
        <Card elevation={4}>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h5" fontWeight="bold">
                Todo Details
              </Typography>
              <Chip
                label={todo.completed ? "Completed" : "Pending"}
                color={todo.completed ? "success" : "warning"}
                variant="outlined"
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Title
            </Typography>
            <Typography
              variant="body1"
              className={`${styles.todoText} ${
                todo.completed ? styles.completed : ""
              }`}
              sx={{ mb: 3 }}
            >
              {todo.todo}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Status
            </Typography>
            <Typography variant="body2" sx={{ pl: 1 }}>
              {todo.completed
                ? "This task has been marked as completed."
                : "This task is still pending."}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" align="center" sx={{ mt: 10 }}>
          Todo not found
        </Typography>
      )}
    </Container>
  );
}
