import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Button,
  Box,
  Grid,
  Container,
  CardContent,
  CardActions,
  Card,
  Chip,
  TextField,
} from "@mui/material";

import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import NestedModal from "./modal";
import axios from "axios";
import Notification from "./notification";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import SearchIcon from "@mui/icons-material/Search";
import { deleteTodo, updateTodo } from "../api/todosApi";
import { Todo } from "../types/todoTypes";
const TodoTable = ({ todos }: any) => {
  //states
  const [open, setOpen] = useState(false);
  const [notifi, setNotifi] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState(todos);
  const [currentTodo, setCurrentTodo] = useState<any>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  const filteredTodos = selectedTodos.filter((todo: any) =>
    todo.todo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedTodos = filteredTodos?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  //router objects
  const navigate = useNavigate();

  //delete todo frome existing data
  const handleDeleteConfirmed = async () => {
    try {
      await deleteTodo(todoToDelete.id);

      const filteredTodos = selectedTodos.filter(
        (todo: any) => todo.id !== todoToDelete?.id
      );
      setNotifi(true);
      setSelectedTodos(filteredTodos);
      setDeleteConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting todos:", error);
    }
  };

  //edit todo
  const handleEdit = (todo: any) => {
    setCurrentTodo(todo);
    setOpen(true);
  };

  //save edited todo
  const handleSave = async (updatedTitle: string, updatedStatus: boolean) => {
    if (currentTodo.id >= 1000000000000) {
      const updatedTodos = selectedTodos.map((todo: Todo) =>
        todo.id === currentTodo.id
          ? { ...todo, todo: updatedTitle, completed: updatedStatus }
          : todo
      );
      setSelectedTodos(updatedTodos);
      return;
    }

    try {
      const updated = await updateTodo(
        currentTodo.id,
        updatedTitle,
        updatedStatus
      );
      const updatedTodos = selectedTodos.map((todo: Todo) =>
        todo.id === currentTodo.id ? updated : todo
      );
      setSelectedTodos(updatedTodos);
    } catch (e) {
      console.error("API update failed:", e);
    }
  };

  useEffect(() => {
    setSelectedTodos(todos);
  }, [todos]);

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          🚀 Task Launchpad
        </Typography>

        <Box display="flex" justifyContent="center" mb={4}>
          <TextField
            variant="outlined"
            placeholder="Search todos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: "100%", maxWidth: 500 }}
            InputProps={{
              startAdornment: (
                <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                  <SearchIcon color="action" />
                </Box>
              ),
            }}
          />
        </Box>

        <Grid container spacing={4}>
          {paginatedTodos?.map((todo: any) => (
            <Grid size={{ xs: 12, md: 4, sm: 6 }} key={todo.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: 6,
                  },
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/todos/${todo?.id}`)}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    ID: {todo.id}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 1,
                      fontWeight: 500,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {todo.todo}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2,
                    pb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(todo);
                      }}
                      startIcon={<DriveFileRenameOutlineIcon />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTodoToDelete(todo);
                        setDeleteConfirmOpen(true);
                      }}
                      startIcon={<DeleteOutlineIcon />}
                    >
                      Delete
                    </Button>
                  </Box>
                  <Chip
                    label={todo.completed ? "Completed" : "Pending"}
                    color={todo.completed ? "success" : "warning"}
                    size="small"
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box mt={4}>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={filteredTodos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </Box>
      </Container>

      {/* open modals */}

      <NestedModal
        open={open}
        setOpen={setOpen}
        todoStatus={currentTodo?.completed}
        todoTitle={currentTodo?.todo}
        onSave={handleSave}
      />
      {/* <Notification
        notifiMessage={"Successfully Deleted"}
        notifi={notifi}
        setNotifi={setNotifi}
      /> */}
      <ConfirmDeleteModal
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirmed}
      />
    </>
  );
};

export default TodoTable;
