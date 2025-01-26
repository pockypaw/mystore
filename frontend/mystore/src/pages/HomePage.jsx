import { Container, Grid, Typography, CircularProgress, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/product";

function HomePages() {
  const { fetchProducts, products, createProduct, deleteProduct, updateProduct } = useProductStore();
  const [loading, setLoading] = useState(true);

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true); // Set loading to true before fetching
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate 3-second delay
      await fetchProducts();
      setLoading(false); // Set loading to false after fetching
    };
    fetchProductsData();
  }, [fetchProducts]);

  // Handle product deletion
  const handleDeleteProduct = async (pid) => {
    const result = await deleteProduct(pid);
    if (result.success) {
      await fetchProducts(); // Refresh the products after deleting
    }
    alert(result.message); // Show success or error message
  };

  // Handle product update
  const handleUpdateProduct = async (pid, updatedProduct) => {
    const result = await updateProduct(pid, updatedProduct);
    if (result.success) {
      await fetchProducts(); // Refresh the products after updating
    }
    alert(result.message); // Show success or error message
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
            minHeight: "300px", // Adjust the height as needed
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
                  product={product} // Pass product as prop
                  onDelete={handleDeleteProduct}
                  onUpdate={handleUpdateProduct}
                />
              </Grid>
            ))
          ) : (
            <Typography variant="body1">Product tidak ada diperiksa</Typography> // Message when no products
          )}
        </Grid>
      )}
    </Container>
  );
}

export default HomePages;
