import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { Button, Container } from "@mui/material";
import Home from "./components/Home/home";
import GlobalLoader from "./components/GlobalLoader/GlobalLoader";
import Notification from "./components/Notification/notification";
import TodosPage from "./pages/todoList";
import TodoDetails from "./pages/todoDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <GlobalLoader />
        <Notification />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<TodosPage />} />
          <Route path="/todos/:id" element={<TodoDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
