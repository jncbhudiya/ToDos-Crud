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
  ToggleButtonGroup,
  ToggleButton,
  ButtonGroup,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";

import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import NestedModal from "../EditModal/Editmodal";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "../DeleteModal/ConfirmDeleteModal";
import SearchIcon from "@mui/icons-material/Search";
import { deleteTodo, updateTodo } from "../../api/todosApi";
import { Todo } from "../../types/todoTypes";
import FilterListIcon from "@mui/icons-material/FilterList";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import {
  ArrowDownward,
  ArrowUpward,
  CheckCircle,
  PendingActions,
} from "@mui/icons-material";
import styles from "./ToDoTable.module.scss";

const TodoTable = ({ todos }: any) => {
  // states
  const [open, setOpen] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState(todos);
  const [currentTodo, setCurrentTodo] = useState<any>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<any>(null);
  const [showPendingFirst, setShowPendingFirst] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "completed" | "pending"
  >("all");

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const filteredTodos = selectedTodos
    .filter((todo: any) =>
      todo.todo.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((todo: any) => {
      if (statusFilter === "all") return true;
      return statusFilter === "completed" ? todo.completed : !todo.completed;
    })
    .sort((a: any, b: any) => {
      if (statusFilter === "all") {
        return a.id - b.id;
      } else {
        if (showPendingFirst) {
          return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
        } else {
          return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
        }
      }
    });
  const paginatedTodos = filteredTodos.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const navigate = useNavigate();

  const handleDeleteConfirmed = async () => {
    try {
      await deleteTodo(todoToDelete.id);
      const filteredTodos = selectedTodos.filter(
        (todo: any) => todo.id !== todoToDelete?.id
      );
      setSelectedTodos(filteredTodos);
      setDeleteConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting todos:", error);
    }
  };

  const handleEdit = (todo: any) => {
    setCurrentTodo(todo);
    setOpen(true);
  };

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

  const handleStatusFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: "all" | "completed" | "pending"
  ) => {
    if (newFilter !== null) {
      setStatusFilter(newFilter);
      setPage(0);
    }
  };
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const sortOpen = Boolean(sortAnchorEl);

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

        <Box className={styles.searchBox}>
          {/* Enhanced Search Input */}
          <Box className={styles.searchContainer}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(0);
              }}
              className={styles.searchInput}
              InputProps={{
                startAdornment: (
                  <Box className={styles.searchIconWrapper}>
                    <SearchIcon />
                  </Box>
                ),
                sx: {
                  borderRadius: "8px",
                  backgroundColor: "background.paper",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "divider",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                    borderWidth: "1px",
                  },
                },
              }}
            />
          </Box>
        </Box>
        <Box className={styles.controlsContainer}>
          <ToggleButtonGroup
            value={statusFilter}
            exclusive
            onChange={handleStatusFilterChange}
            aria-label="task status filter"
            size="small"
            className={styles.togglebuttongroup}
          >
            <ToggleButton value="all" aria-label="all tasks">
              <Typography variant="body2">All</Typography>
            </ToggleButton>
            <ToggleButton value="pending" aria-label="pending tasks">
              <Box display="flex" alignItems="center" gap={0.5}>
                <PendingActions fontSize="small" />
                <Typography variant="body2">Pending</Typography>
              </Box>
            </ToggleButton>
            <ToggleButton value="completed" aria-label="completed tasks">
              <Box display="flex" alignItems="center" gap={0.5}>
                <CheckCircle fontSize="small" />
                <Typography variant="body2">Completed</Typography>
              </Box>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        {/* Task Count Summary */}
        <Box mb={2}>
          <Typography variant="subtitle2" color="text.secondary">
            Showing {filteredTodos.length} tasks (
            {selectedTodos.filter((t: any) => !t.completed).length} pending,{" "}
            {selectedTodos.filter((t: any) => t.completed).length} completed)
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {paginatedTodos?.map((todo: any) => (
            <Grid size={{ xs: 12, md: 4, sm: 6 }} key={todo.id}>
              <Card
                className={styles.card}
                onClick={() => navigate(`/todos/${todo?.id}`)}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    ID: {todo.id}
                  </Typography>
                  <Typography variant="h6" className={styles.typography}>
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
                    variant={todo.completed ? "filled" : "outlined"}
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

      {/* Modals */}
      <NestedModal
        open={open}
        setOpen={setOpen}
        todoStatus={currentTodo?.completed}
        todoTitle={currentTodo?.todo}
        onSave={handleSave}
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
