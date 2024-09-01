import zod from "zod";
import jwt from "jsonwebtoken"; // Assuming you are using JSON Web Token
import Register from "../models/usermodel";

// Define JWT_SECRET, ensure it's stored securely (e.g., in environment variables)
const JWT_SECRET = "kartIsCoding"

// Zod validation schemas
const signupBody = zod.object({
  email: zod.string().email(),
  name: zod.string(),
  role: zod.string(),
  password: zod.string(),
});

const signinBody = zod.object({
  email: zod.string().email(),  // Changed to match your schema
  password: zod.string(),
});

// Signup handler
const Signup = async (req, res) => {
  const { success, error } = signupBody.safeParse(req.body);
  
  if (!success) {
    return res.status(400).json({
      message: "Invalid inputs",
      error: error.errors,  // Provide validation errors
    });
  }

  const existingUser = await Register.findOne({
    email: req.body.email,  // Assuming email is unique
  });

  if (existingUser) {
    return res.status(409).json({
      message: "Email already taken",
    });
  }

  const user = await Register.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    role: req.body.role,
  });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);

  res.json({
    message: "User created successfully",
    token,  // Return the token if needed
  });
};

// Signin handler
const Signin = async (req, res) => {
  const { success, error } = signinBody.safeParse(req.body);
  
  if (!success) {
    return res.status(400).json({
      message: "Invalid inputs",
      error: error.errors,  // Provide validation errors
    });
  }

  const user = await Register.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.cookie("token", token);

    return res.json({
      message: "Successfully logged in",
      token,
    });
  }

  res.status(401).json({
    message: "Incorrect email or password",
  });
};

// Exporting the functions
module.exports({
    Signin,Signup
})
