// const express = require('express');
import express from 'express';
const router = express.Router();

// const Register=require("../models/usermodel");
import Register from '../models/usermodel.js'
import zod from 'zod';

const signupBody = zod.object({
    email: zod.string().email(),
	name: zod.string(),
	role: zod.string(),
	password: zod.string(),

})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    
    const existingUser = await Register.findOne({
        username: req.body.username
    })
    
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }
    
    const user = await Register.create({
        email: req.body.email,
        name: req.body.name,
        role: req.body.role,
        password: req.body.password,
    })
    
    res.json({
        message: "User created successfully",
        
    })
})
export default router;