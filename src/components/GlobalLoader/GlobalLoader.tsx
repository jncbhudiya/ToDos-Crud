// src/components/GlobalLoader.tsx
import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useLoader } from "../../context/LoaderContext";

const GlobalLoader = () => {
  const { loading } = useLoader();

  return (
    <Backdrop sx={{ color: "#fff", zIndex: 1301 }} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default GlobalLoader;
