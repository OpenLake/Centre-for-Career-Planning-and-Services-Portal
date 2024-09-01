//importing all the necessary dependencies
import express from "express";
import connectDB from "./config/db.js";
import router from "./routes/user.route.js";
import cookieParser from "cookie-parser";

//dotenv configurations
import dotenv from "dotenv";
dotenv.config({});

//this is the application
const app = express();

//setting the middlwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//this is the port number
const port = 3000;

//apis
app.use("/api", router);

//listener
app.listen(port, () => {
  connectDB();
  console.log("Server is running at the port 3000");
});
