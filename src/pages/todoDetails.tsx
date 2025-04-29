import React, { useEffect, useState } from "react";
import {
  Container,
  CircularProgress,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function TodoDetails() {
  //manage states
  const [todo, setTodo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  // const router = useRouter();

  const { id } = useParams(); // Extract the dynamic "id" from the URL

  //fetch todo
  const fetchTodo = async () => {
    if (!id) return;

    try {
      const response = await axios?.get(`https://dummyjson.com/todos/${id}`);
      setTodo(response.data);
    } catch (error) {
      console.error("Error fetching todo:", error);
    } finally {
      setLoading(false); //loading
    }
  };

  //get todo detail by id
  useEffect(() => {
    fetchTodo();
  }, [id]);

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
      ) : todo ? (
        <Card sx={{ maxWidth: 600, mx: "auto", mt: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Todo Details
            </Typography>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Title: {todo.todo}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Status: {todo.completed ? "Completed" : "Pending"}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" align="center" color="error" sx={{ mt: 4 }}>
          Todo not found
        </Typography>
      )}
    </Container>
  );
}
