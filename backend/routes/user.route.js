//importing all the necessary dependencies
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

//using the router
const router = express.Router();

//making the loginAPI
export const LoginAPI = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "Some of the fields are missing",
        success: false,
      });
    }
    const user = await User.findOne({
      name: username,
    });
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        const tokenData = {
          userId: user._id,
        };
        const token = await jwt.sign(tokenData, "abcde", {
          expiresIn: "1d",
        });
        return res
          .status(200)
          .cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpsOnly: true,
            sameSite: "strict",
          })
          .json({
            token: token,
            expiresIn: "1d",
          });
      }
    } else {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//making the authentication middleware
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User is not authenticated",
        success: false,
      });
    }
    const decode = await jwt.verify(token, "abcde");
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: true,
      });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

//making the routes
router.route("/auth/login").post(isAuthenticated, LoginAPI);

//exporting the router
export default router;
