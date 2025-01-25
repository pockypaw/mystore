import React, { useState } from "react"; // Add React import
import { BrowserRouter, Routes, Route } from "react-router";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar.jsx";
import ProductCard from "./components/ProductCard.jsx";

const ErrorPage = () => {
  return (
    <>
      <h1>ERROR PAGE</h1>
    </>
  );
};

const TestPage = () => {
  return (
    <>
      <ProductCard />
    </>
  );
};

function App() {
  const [colorMode, setColorMode] = useState("light"); // Manage colorMode here

  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

  return (
    <>
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
            <Route path="/" element={<TestPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
}

export default App;
