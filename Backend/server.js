import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import userRoutes from "./Routes/userRoutes.js";
import serviceRoutes from "./Routes/serviceRoutes.js";
import bookingRoutes from "./Routes/bookingRoutes.js";
dotenv.config(); //dotenv helps import the password from the .env i think

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hi mom");
});

app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
// connect DB
connectDB();
