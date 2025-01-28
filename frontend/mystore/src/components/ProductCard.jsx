import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  styled,
  Box,
  Modal,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  useTheme,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";

// Styled buttons
const ButtonPrimary = styled(Button)(({ theme }) => ({
  backgroundColor: "#c38fff",
  color: "#000",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

const ButtonDelete = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: '#000',
  "&:hover": {
    backgroundColor: theme.palette.error.dark,
  },
}));

// Modal style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 }, // Responsive width
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function ProductCard({
  product = {},
  onDelete,
  onUpdate,
  colorMode,
  toggleColorMode,
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: product.name || "",
    price: product.price || "",
    image: product.image || "",
  });
  const [error, setError] = useState("");
  const theme = useTheme();

  useEffect(() => {
    setFormData({
      name: product.name || "",
      price: product.price || "",
      image: product.image || "",
    });
  }, [product]);

  const handleOpen = () => {
    setError(""); // Clear errors on modal open
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = () => {
    const { name, price, image } = formData;

    // Validate form data
    if (!name || !price || !image) {
      setError("All fields are required.");
      return;
    }

    // Call update function
    onUpdate(product._id, { name, price, image });
    handleClose();
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 350,
          margin: "0 auto",
          backgroundColor: colorMode === "light" ? blueGrey[100] : "#1d1d1d",
        }}
      >
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
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: colorMode === "light" ? "#000" : "#a779df" }}
            >
              {product.name || "Unnamed Product"}
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: colorMode === "light" ? "#000" : "#a779df" }}
            >
              {product.price ? `$${product.price}` : "Price not available"}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <ButtonPrimary onClick={handleOpen} size="small" variant="contained">
            Edit
          </ButtonPrimary>
          <ButtonDelete
            size="small"
            variant="contained"
            onClick={() => onDelete(product._id)}
          >
            Delete
          </ButtonDelete>
        </CardActions>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-product-modal-title"
        aria-describedby="edit-product-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="edit-product-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Edit Product
          </Typography>
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="name">Product Name</InputLabel>
            <Input
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              aria-describedby="name-helper-text"
              required
            />
            <FormHelperText id="name-helper-text">
              Enter the name of the product.
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="price">Product Price</InputLabel>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              aria-describedby="price-helper-text"
              required
            />
            <FormHelperText id="price-helper-text">
              Enter the price of the product.
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="image">Image URL</InputLabel>
            <Input
              id="image"
              value={formData.image}
              onChange={handleInputChange}
              aria-describedby="image-helper-text"
              required
            />
            <FormHelperText id="image-helper-text">
              Enter a URL for the product image.
            </FormHelperText>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <ButtonPrimary onClick={handleSave}>Save</ButtonPrimary>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
