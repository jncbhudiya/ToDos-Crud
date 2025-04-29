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
} from "@mui/material";

import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import NestedModal from "./modal";
import axios from "axios";
import Notification from "./notification";
import { useNavigate } from "react-router-dom";

const TodoTable = ({ todos }: any) => {
  //states
  const [open, setOpen] = useState(false);
  const [notifi, setNotifi] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState(todos);
  const [currentTodo, setCurrentTodo] = useState<any>(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const paginatedTodos = selectedTodos?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  //router objects
  const navigate = useNavigate();

  //delete todo frome existing data
  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`https://dummyjson.com/todos/${id}`);
      const filteredTodos = selectedTodos.filter((todo: any) => todo.id !== id);
      setNotifi(true);
      setSelectedTodos(filteredTodos);
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
                  <Box>
                    <Button
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
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(todo.id);
                      }}
                      startIcon={<DeleteOutlineIcon />}
                    >
                      Delete
                    </Button>
                  </Box>
                  <Chip
                    label={todo.completed ? "Completed" : "Pending"}
                    color={todo.completed ? "success" : "error"}
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
    </>
  );
};

export default TodoTable;

//styles

const styles = {
  cardBox: {
    borderRadius: 4,
    position: "relative",
    padding: 3,
    boxShadow: 1,
    height: "250px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.2s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: 3,
      cursor: "pointer",
    },
  },
  idBox: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: "0.8rem",
    zIndex: 1,
  },
  title: {
    fontWeight: "400",
    fontSize: "1.05rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "normal", // Allow text to wrap if it overflows
    display: "block", // Make it behave like a block element
  },
  status: {
    textAlign: "right",
    marginBottom: 2,
    marginRight: 2,
  },
  buttonContainer: {
    display: "flex",
    zIndex: 1,
    justifyContent: "space-between",
  },
};
