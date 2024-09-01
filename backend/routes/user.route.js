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

const RegisterAPI = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Some of the fields are empty",
        success: false,
      });
    }
    const user = await User.findOne({
      email: email,
    });
    if (user) {
      return res.status(400).json({
        message: "User is already registered with this email id",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password,
      role,
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};

//generating the token for the authentication middlware
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, "abcde", {
    expiresIn: "1d",
  });
};

const authenticate = async (req, res) => {
  const { username, password } = req.body;
  const user = User.findOne({
    name: username,
  });

  if (!user) {
    return res.status(400).json({
      message: "User with the username is not found",
      success: false,
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      message: "Incorrect password is found",
      success: false,
    });
  }

  const token = generateToken(user);
  return res.status(200).json({
    message: "User is authenticated",
    success: true,
    token: token,
    expiresIn: "1d",
  });
};

// Role-based access control middleware
const authorization = (roles) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        message: "Access Denied since no token is provided",
        success: false,
      });
    }

    try {
      const decoded = jwt.verify(token, "abcde");
      if (!roles.length || roles.includes(decoded.role)) {
        req.user = decoded;
        next();
      } else {
        return res.status(400).json({
          message: "Access is denied because you dont have the role to access",
          success: false,
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: "Invalid",
        success: true,
      });
    }
  };
};

//making the routes
router.route("/auth/login").post(isAuthenticated, LoginAPI);
router.route("/auth/register").post(RegisterAPI);
router
  .route("/role/dashboard")
  .get(authorization(["student", "ccps staff"]), (req, res) => {
    res.status(200).json({
      message: "Access done",
      success: true,
    });
  });

//exporting the router
export default router;
