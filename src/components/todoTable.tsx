import React, { useState } from "react";
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
      const response = await axios.delete(
        `https://dummyjson.com/todos/${todoToDelete?.id}`
      );
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
  const handleSave = (updatedTitle: string) => {
    const data = axios
      .put(`https://dummyjson.com/todos/${currentTodo?.id}`, {
        completed: false,
      })
      .then((response) => {
        console.log("API Response:", response.data);
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });

    const updatedTodos = selectedTodos.map((todo: any) =>
      todo.id === currentTodo.id ? { ...todo, todo: updatedTitle } : todo
    );
    setSelectedTodos(updatedTodos);
  };

  return (
    <>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" align="center" mb={5} gutterBottom>
          Todo Grid
        </Typography>
        <Box display="flex" justifyContent="center" mb={3}>
          <TextField
            variant="outlined"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: "100%" }}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
          />
        </Box>
        <Grid container spacing={3}>
          {paginatedTodos?.map((todo: any) => (
            <Grid size={{ xs: 12, md: 4, sm: 6 }} key={todo.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/todos/${todo?.id}`)}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6"> {todo.id}</Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    gutterBottom
                    sx={{
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
                  }}
                >
                  <Box sx={{ display: "flex", gap: 2 }}>
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
      </Box>

      {/* open modals */}

      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={todos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
      <NestedModal
        open={open}
        setOpen={setOpen}
        todoTitle={currentTodo?.todo}
        onSave={handleSave}
      />
      <Notification
        notifiMessage={"Successfully Deleted"}
        notifi={notifi}
        setNotifi={setNotifi}
      />
      <ConfirmDeleteModal
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirmed}
      />
    </>
  );
};

export default TodoTable;
