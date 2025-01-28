// import express from "express";
// import dotenv from "dotenv";
// import helmet from "helmet";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import ProductRoutes from "./routes/product.route.js";
// import path from "path";

// // Load environment variables
// dotenv.config();

// // Initialize Express
// const app = express();
// const __dirname = path.resolve();

// // Middleware for parsing request bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // // Configure Helmet
// // app.use(
// //   helmet({
// //     contentSecurityPolicy: {
// //       directives: {
// //         defaultSrc: ["'self'"],
// //         scriptSrc: ["'self'", "'unsafe-inline'", "https://mystore-mocha.vercel.app"],
// //         connectSrc: ["'self'", "https://mystore-mocha.vercel.app"],
// //         imgSrc: ["'self'", "data:", "https://mystore-mocha.vercel.app"],
// //         styleSrc: ["'self'", "'unsafe-inline'", "https://mystore-mocha.vercel.app"],
// //         frameSrc: ["'self'", "https://mystore-mocha.vercel.app"],
// //       },
// //     },
// //     crossOriginEmbedderPolicy: false, // Optional: Disable COEP if needed
// //   })
// // );

// // // Enable CORS
// // app.use(
// //   cors({
// //     origin: "https://mystore-mocha.vercel.app", // Allow requests from this origin
// //     methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
// //     credentials: true, // Allow cookies or authorization headers
// //   })
// // );

// // Connect to the database
// (async () => {
//   try {
//     await connectDB();
//     console.log("Database connected successfully");
//   } catch (error) {
//     console.error("Failed to connect to database:", error.message);
//     process.exit(1); // Exit the process if the connection fails
//   }
// })();

// app.use("/api/v1/product", ProductRoutes);
// app.get('/hello',(req,res)=>{
//   res.send('hello');
// })

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/mystore/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname, "frontend", "mystore", "dist", "index.html")
//     );
//   });
// }

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import ProductRoutes from "./routes/product.route.js";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// API Routes
app.use("/api/v1/product", ProductRoutes);

// Serve static files in production (Vite build output)
if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "frontend/mystore/dist");
  app.use(express.static(staticPath));

  // Catch-all route for React
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(staticPath, "index.html"));
  });
}

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
