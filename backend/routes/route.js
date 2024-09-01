//importing all the necessary dependencies 
import express from "express";
import { Signin, Signup } from "../controllers/auth";

//using the router
const router = express.Router();

//making the route

router.post("/signup", Signup)

router.post("/signin", Signin)

export default router;
