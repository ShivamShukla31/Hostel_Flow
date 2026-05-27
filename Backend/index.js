import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser"; // <--- fix

import {errorHandler} from "./src/middleware/globalError.Middleware.js";
import connectDB from "./src/db/db.config.js";
import authRoutes from "./src/routes/auth.routes.js";
import problemRoutes from "./src/routes/problem.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:5175',
  'http://127.0.0.1:5176',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true
};

/* Middlewares */
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Serve static files from public directory
app.use('/temp', express.static(path.join(__dirname, 'public', 'temp')));

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);

/* 404 Handler */
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

/* Error Handler */
app.use(errorHandler);

/* Start Server */
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

startServer();
