import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./config/db.js";
import ProductRoutes from "./routes/product.route.js";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "http://localhost:5173"],
        connectSrc: ["'self'", "http://localhost:5173"],
        imgSrc: ["'self'", "data:", "http://localhost:5173"],
        styleSrc: ["'self'", "'unsafe-inline'", "http://localhost:5173"],
        frameSrc: ["'self'", "http://localhost:5173"],
      },
    },
    crossOriginEmbedderPolicy: false, // Optional: Disable COEP if needed
  })
);

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow cookies or authorization headers
  })
);

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

app.use("/api/v1/product", ProductRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
