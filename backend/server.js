import express from "express";
import connectDB from "./config/db.js";
import router from "./routes/router.js";

import dotenv from "dotenv";
dotenv.config({});

const app = express();

//port
const port = process.env.PORT || 5000;

//apis
app.use("/api", router);

//listener
app.listen(port, () => {
  connectDB();
  console.log(`Server is running at the port ${port}`);
});
