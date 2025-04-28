import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import TodoList from "../components/TodoList/TodoList";
import TodoForm from "../components/TodoForm/TodoForm";

const HomePage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Add refresh state

  const handleTodoCreated = () => {
    setShowForm(false);
    setRefreshKey((prev) => prev + 1); // Trigger refresh
  };

  return (
    <div className="home-page">
      <h1>Todo Management</h1>
      <Box mb={2}>
        <Button variant="contained" onClick={() => setShowForm(true)}>
          Add New Todo
        </Button>
      </Box>
      {showForm && (
        <TodoForm
          onSubmit={handleTodoCreated}
          onCancel={() => setShowForm(false)}
        />
      )}
      <TodoList refresh={refreshKey % 2 === 0} /> {/* Pass refresh prop */}
    </div>
  );
};

export default HomePage;
