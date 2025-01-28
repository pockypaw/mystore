import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/product";
import Toast from "../components/Toast";
import { useToastStore } from "../store/toast";

function HomePages({colorMode}) {
  const { fetchProducts, products, deleteProduct, updateProduct } =
    useProductStore();
  const { showToast } = useToastStore(); // Access the toast store for notifications
  const [loading, setLoading] = useState(true);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      try {
        await fetchProducts();
      } catch (error) {
        showToast({
          severity: "error",
          message: "Failed to fetch products. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProductsData();
  }, [fetchProducts, showToast]);

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      const result = await deleteProduct(productId);
      if (result.success) {
        await fetchProducts();
        showToast({
          severity: "success",
          message: "Product deleted successfully!",
        });
      } else {
        throw new Error(result.message || "Failed to delete product.");
      }
    } catch (error) {
      showToast({
        severity: "error",
        message: error.message,
      });
    }
  };

  // Handle product updates
  const handleUpdateProduct = async (productId, updatedProduct) => {
    try {
      const result = await updateProduct(productId, updatedProduct);
      if (result.success) {
        await fetchProducts();
        showToast({
          severity: "success",
          message: "Product updated successfully!",
        });
      } else {
        throw new Error(result.message || "Failed to update product.");
      }
    } catch (error) {
      showToast({
        severity: "error",
        message: error.message,
      });
    }
  };

  return (
    <Container>
      <Typography variant="body" component="h1" gutterBottom sx={{textAlign:"center"}}>
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
                  colorMode={colorMode}
                />
              </Grid>
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "200px",
              }}
            >
              <Typography variant="body1" color="text.secondary">
                No products found. Please add one.
              </Typography>
            </Box>
          )}
        </Grid>
      )}

      {/* Global Toast Component */}
      <Toast />
    </Container>
  );
}

export default HomePages;
