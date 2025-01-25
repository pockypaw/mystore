import express from "express";
import {
  createNewProduct,
  deleteSingleProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();
// Fetch all products
router.get("/", getAllProducts);

// Root route
router.get("/:id", getSingleProduct);

router.put("/:id", updateProduct);

// Create a new product
router.post("/", createNewProduct);

// Delete a product
router.delete("/:id", deleteSingleProduct);

export default router;
