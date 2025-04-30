import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"; // Optional: Hero icon

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        px: 3,
      }}
    >
      <CheckCircleOutlineIcon
        sx={{ fontSize: 80, color: "primary.main", mb: 3 }}
      />

      <Typography variant="h2" sx={{ fontWeight: "bold", mb: 1 }}>
        Welcome to <span style={{ color: "#1976d2" }}>TaskMaster</span>
      </Typography>

      <Typography variant="h6" sx={{ color: "text.secondary", mb: 4 }}>
        Organize your day and boost your productivity with our simple todo
        manager.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => navigate("/todos")}
        sx={{
          px: 5,
          py: 1.5,
          borderRadius: "30px",
          fontWeight: "bold",
          textTransform: "none",
          fontSize: "1rem",
          boxShadow: 3,
        }}
      >
        Go to Todos
      </Button>
    </Container>
  );
}
