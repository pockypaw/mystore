import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import ProductRoutes from "./routes/product.route.js"

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

app.use('/api/v1/product', ProductRoutes)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
