import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/product";

import Toast from "../components/Toast"; // Import Toast component
import { useToastStore } from "../store/toast";

function HomePages() {
  const { fetchProducts, products, deleteProduct, updateProduct } =
    useProductStore();
  const { showToast } = useToastStore(); // Access showToast
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      await fetchProducts();
      setLoading(false);
    };
    fetchProductsData();
  }, [fetchProducts]);

  const handleDeleteProduct = async (pid) => {
    const result = await deleteProduct(pid);
    if (result.success) {
      await fetchProducts();
      showToast({
        severity: "success",
        message: "Product deleted successfully!",
      });
    } else {
      showToast({
        severity: "error",
        message: result.message || "Failed to delete product.",
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const result = await updateProduct(pid, updatedProduct);
    if (result.success) {
      await fetchProducts();
      showToast({
        severity: "success",
        message: "Product updated successfully!",
      });
    } else {
      showToast({
        severity: "error",
        message: result.message || "Failed to update product.",
      });
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        My Products
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "300px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <ProductCard
                  product={product}
                  onDelete={handleDeleteProduct}
                  onUpdate={handleUpdateProduct}
                />
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No products found. Please add one.</Typography>
          )}
        </Grid>
      )}

      {/* Global Toast Component */}
      <Toast />
    </Container>
  );
}

export default HomePages;
