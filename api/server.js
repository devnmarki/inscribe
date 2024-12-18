import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import usersRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import folderRoutes from "./routes/folder.route.js";
import noteRoutes from "./routes/note.route.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://inscribe-app-api.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB database"))
  .catch((err) =>
    console.log("Failed to connect to MongoDB database. Error: " + err)
  );

app.use("/api", authRoutes);
app.use("/api", usersRoutes);
app.use("/api", folderRoutes);
app.use("/api", noteRoutes);

app.listen(process.env.PORT);
