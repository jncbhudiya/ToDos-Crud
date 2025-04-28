import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline, Container, Typography, Box } from "@mui/material";
import TodoList from "./components/TodoList/TodoList";
import TodoForm from "./components/TodoForm/TodoForm";
import "./App.css";

const App: React.FC = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [refreshList, setRefreshList] = React.useState(false);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          Todo Manager
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <button onClick={() => setShowForm(true)} className="add-todo-button">
            + Add New Todo
          </button>
        </Box>

        {showForm && (
          <Box sx={{ mb: 4 }}>
            <TodoForm
              onCancel={() => setShowForm(false)}
              onSubmit={(updatedTodo) => {
                console.log("Todo submitted:", updatedTodo);
              }}
            />
          </Box>
        )}

        <TodoList refresh={refreshList} />
      </Container>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default App;
