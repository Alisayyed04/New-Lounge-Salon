import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import userRoutes from "./Routes/userRoutes.js";
dotenv.config(); //dotenv helps import the password from the .env i think

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hi mom");
});

// connect DB
connectDB();

app.use("/api/users", userRoutes);

app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
