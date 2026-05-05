import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import connectDB from "./Config/db.js";

import userRoutes from "./Routes/userRoutes.js";
import serviceRoutes from "./Routes/serviceRoutes.js";
import bookingRoutes from "./Routes/bookingRoutes.js";

import { errorHandler } from "./Middlewares/errorMiddleware.js";
import { logger, notFound } from "./Middlewares/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 8080;
// 🔴 MIDDLEWARES
app.use(
  cors({
    origin: [/\.vercel\.app$/],
    credentials: true,
  }),
);
app.use(express.json());
app.use(logger);

// 🔴 ROUTES
app.get("/", (req, res) => {
  res.send("hi mom");
});

app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);

// 🔴 NOT FOUND + ERROR HANDLER (ALWAYS LAST)
app.use(notFound);
app.use(errorHandler);

// 🔴 CONNECT DB
connectDB();

// 🔴 SERVER

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
