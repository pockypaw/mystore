import React from "react";
import { Grid, Box } from "@mui/material";

const ErrorPage = () => {
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid item xs={12} sm={6} md={4}>
        <Box sx={{ bgcolor: "primary.main", color: "white", p: 2, borderRadius: 2 }}>
          Item 1
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Box sx={{ bgcolor: "secondary.main", color: "white", p: 2, borderRadius: 2 }}>
          Item 2
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Box sx={{ bgcolor: "error.main", color: "white", p: 2, borderRadius: 2 }}>
          Item 3
        </Box>
      </Grid>
    </Grid>
  );
};

export default ErrorPage;
