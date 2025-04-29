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
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/DriveFileRenameOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchTodo = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<Todo>(
        `https://dummyjson.com/todos/${id}`
      );
      setTodo(response.data);
    } catch (err) {
      setError("Failed to fetch todo details");
      console.error("Error fetching todo:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    navigate(`/todos/${id}/edit`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mb: 3 }}>
        Back to List
      </Button>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <CircularProgress size={60} />
        </Box>
      ) : todo ? (
        <Card sx={{ boxShadow: 3 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h4" component="h1">
                Todo Details
              </Typography>
              <Chip
                label={todo.completed ? "Completed" : "Pending"}
                color={todo.completed ? "success" : "warning"}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" sx={{ mb: 1 }}>
              <h2>Title:</h2>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                pl: 2,
                fontStyle: todo.completed ? "italic" : "normal",
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.todo}
            </Typography>

            <Typography variant="h6" sx={{ mb: 1 }}>
              <strong>Status:</strong>
            </Typography>
            <Typography variant="body1" sx={{ pl: 2, mb: 3 }}>
              {todo.completed
                ? "This task has been completed"
                : "This task is still pending"}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEdit}
              >
                Edit Todo
              </Button>
            </Box>
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
