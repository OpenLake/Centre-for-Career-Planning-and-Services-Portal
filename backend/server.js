
const express = require('express');
const userRouter = require("./routes/route");


const router = express.Router();

router.use("/api", userRouter);
module.exports = router;