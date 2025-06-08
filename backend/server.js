import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import connectDB from "./config/db.js";

import router from "./routes/router.js";
import authRoutes from "./routes/auth.routes.js";
import threadRoutes from "./routes/thread.routes.js";
import statsRouter from "./routes/stats.routes.js";
import referalRouter from "./routes/referral.routes.js";
import resumeRouter from "./routes/resume.routes.js";
import profileRouter from "./routes/profile.routes.js"

import dotenv from "dotenv";
dotenv.config({});

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//apis
app.use("/api", router);
app.use("/api/auth",authRoutes);
app.use("/api/threads", threadRoutes);
app.use("/api/stats",statsRouter);
app.use("/api/referrals",referalRouter);
app.use("/api/resume",resumeRouter);
app.use("/api/profile",profileRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running at the port ${port}`);
});