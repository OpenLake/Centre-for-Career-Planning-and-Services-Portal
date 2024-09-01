const express=require("express");
const app=express("./routes/route.js");
const rootRouter=require("./routes")
app.use("/api",rootRouter);