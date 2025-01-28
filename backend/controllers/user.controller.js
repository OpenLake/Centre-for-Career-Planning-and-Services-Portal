import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) res.status(404).json({message:"User not found"});

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };

  } catch (error) {
    console.error("Error generating tokens:", error);
    return res.status(500).json({message:"Something went wrong"});
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { Name, email, password ,role } = req.body;
  console.log(req.body);
  if (
    [Name, email, password,role].some((field) => {
      return field?.trim() === "";
    })
  ) {
    return res.status(400).json({message:"All fields are required"});
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log(existingUser);
    return res.status(409).json({message:"User with given email exists"});
  }
  const user = await User.create({
    Name,
    email,
    password,
    role
  });

  return res.status(200).json({ message: "User registered successfully!", user });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
   return res.status(400).json({message:"email is required"});
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({message:"User with given email doesn't exist"});
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json({message:"Invalid user credentials"});
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({message:"User logged in successfully"});
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({message:"User logged out"});
});

const updatePassword = asyncHandler(async (req, res) => {
    const userId = req.user._id;
  
    
    const { currentPassword, newPassword } = req.body;
  

    if (!currentPassword || !newPassword) {
      return res.status(400).json({message:'Please provide both current and new password'});
    }
  
  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message:'User not found'});
    }
  

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.staus(401).json({message:'Current password is incorrect'});
    }
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
  
    user.password = hashedPassword;
    await user.save();
    
    return res.status(200).json({message:'Password updated successfully'});
  });
  

export { registerUser, loginUser, logoutUser, generateAccessAndRefreshTokens,updatePassword };
