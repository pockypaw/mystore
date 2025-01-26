import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/product";

function HomePages() {
  const { fetchProducts, products } = useProductStore();
  
  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        My Products
      </Typography>
      <Grid container spacing={3}>
        {/* Adjust the number of columns based on screen size */}
        {products.map((product) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={product._id}
          >
            <ProductCard product={product} /> {/* Pass product as prop */}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePages;
