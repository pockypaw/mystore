import React, { useState } from "react";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Container,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useProductStore } from "../store/product.js";

import { Navigate } from "react-router-dom";
import Toast from "../components/Toast"; // Import global Toast component
import { useToastStore } from "../store/toast.js";

export default function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [redirect, setRedirect] = useState(false);

  const { createProduct } = useProductStore();
  const { showToast } = useToastStore(); // Access toast actions

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    const { success, message } = await createProduct(newProduct);

    if (!success) {
      showToast({
        severity: "error",
        message: message || "Failed to create product.",
      });
    } else {
      showToast({
        severity: "success",
        message: message || "Product created successfully!",
      });
      setNewProduct({ name: "", price: "", image: "" });
      setRedirect(true); // Trigger redirection after success
    }
  };

  if (redirect) {
    return <Navigate to="/" replace />; // Redirect to homepage
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 4,
          textAlign: "center",
          color: blueGrey[500],
          fontWeight: "bold",
        }}
      >
        Create New Product
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit} // Use onSubmit event for the form
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "100%",
          backgroundColor: blueGrey[50],
          padding: 4,
          borderRadius: 2,
          boxShadow: `0 2px 8px ${blueGrey[200]}`,
        }}
      >
        <FormControl fullWidth>
          <InputLabel htmlFor="name">Product Name</InputLabel>
          <Input
            id="name"
            value={newProduct.name}
            onChange={handleInputChange}
            aria-describedby="name-helper-text"
            required
          />
          <FormHelperText id="name-helper-text">
            Enter the name of the product.
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="price">Product Price</InputLabel>
          <Input
            id="price"
            value={newProduct.price}
            onChange={handleInputChange}
            aria-describedby="price-helper-text"
            type="number"
            required
          />
          <FormHelperText id="price-helper-text">
            Enter the price of the product.
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="image">Image URL</InputLabel>
          <Input
            id="image"
            value={newProduct.image}
            onChange={handleInputChange}
            aria-describedby="image-helper-text"
            required
          />
          <FormHelperText id="image-helper-text">
            Enter a URL for the product image.
          </FormHelperText>
        </FormControl>

        <Button
          variant="contained"
          sx={{
            backgroundColor: blueGrey[500],
            color: "white",
            "&:hover": {
              backgroundColor: blueGrey[700],
            },
          }}
          type="submit" // Change button type to submit
          fullWidth
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}
