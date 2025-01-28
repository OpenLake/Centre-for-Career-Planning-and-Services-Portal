//importing all the necessary dependencies
import express from "express";
import connectDB from "./config/db.js";
import router from "./routes/router.js";
import { userRouter } from "./routes/user.router.js";
//dotenv configurations
import dotenv from "dotenv";
dotenv.config({});


const app = express();

//middleware
app.use(express.json());

//this is the application


//this is the port number
const port = 3000;

//apis
app.use("/api", router);
app.use("/api/users", userRouter);
//listener
app.listen(port, () => {
  connectDB();
  console.log("Server is running at the port 3000");
});
