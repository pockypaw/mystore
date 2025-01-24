import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/product.model.js";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
(async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to database:", error.message);
    process.exit(1); // Exit the process if the connection fails
  }
})();

// Fetch all products
app.get("/api/v1/product", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      data: products,
      message: products.length
        ? "Products fetched successfully"
        : "No products available",
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create a new product
app.post("/api/v1/product", async (req, res) => {
  const { name, price, image } = req.body;
  try {
    const product = new Product({ name, price, image });
    await product.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Product created successfully",
        product,
      });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ success: false, error: "Failed to create product" });
  }
});

// Delete a product
app.delete("/api/v1/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    console.log("Product deleted successfully:", product);
    res
      .status(200)
      .json({
        success: true,
        message: "Product deleted successfully",
        product,
      });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ success: false, error: "Failed to delete product" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
