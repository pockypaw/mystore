import React, { useState } from "react"; // React import
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Use react-router-dom for BrowserRouter
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import HomePages from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import CreatePage from "./pages/CreatePage";

function App() {
  const [colorMode, setColorMode] = useState("light"); // Manage colorMode here

  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: colorMode === "light" ? "#fff" : "#121212", // Background color based on color mode
        color: colorMode === "light" ? "#000" : "#fff", // Text color based on color mode
      }}
    >
      <BrowserRouter>
        <Navbar colorMode={colorMode} toggleColorMode={toggleColorMode} />
        <Routes>
          <Route path="/" element={<HomePages colorMode={colorMode} />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
