import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "../api/routes/user.routes.js";
import taskRouter from "../api/routes/task.routes.js"
import cookieParser from "cookie-parser";


const app = express();
dotenv.config();

const PORT = process.env.PORT || 4002;
const DB_URI = process.env.MONGODB_URI;

app.use(cookieParser());
app.use(express.json());

try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
  app.use("/task",taskRouter)
  app.use("/user", userRoute);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  