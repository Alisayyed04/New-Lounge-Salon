import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./Config/db.js";

import userRoutes from "./Routes/userRoutes.js";
import serviceRoutes from "./Routes/serviceRoutes.js";
import bookingRoutes from "./Routes/bookingRoutes.js";

import { errorHandler } from "./Middlewares/errorMiddleware.js";
import { logger, notFound } from "./Middlewares/authMiddleware.js";

dotenv.config();

const app = express();

// 🔴 MIDDLEWARES
app.use(express.json());
app.use(cors());
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
app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
