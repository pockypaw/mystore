import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { styled } from "@mui/material/styles";

// Define styled buttons
const ButtonPrimary = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

const ButtonDelete = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.error.contrastText,
  },
}));

export default function ProductCard({ product = {}, onDelete, onUpdate }) {
  return (
    <Card sx={{ maxWidth: 350, margin: "0 auto" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={
            product.image ||
            "https://mui.com/static/images/cards/contemplative-reptile.jpg"
          }
          alt={product.name || "Product Image"}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name || "Unnamed Product"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.price ? `$${product.price}` : "Price not available"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ButtonPrimary size="small" variant="contained">
          Add Feature
        </ButtonPrimary>
        <ButtonDelete
          size="small"
          variant="contained"
          onClick={() => onDelete(product._id)}
        >
          Delete Product
        </ButtonDelete>
      </CardActions>
    </Card>
  );
}
