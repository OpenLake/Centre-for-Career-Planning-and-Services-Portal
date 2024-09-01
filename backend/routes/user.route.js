//importing all the necessary dependencies
import express from "express";

//using the router
const router = express.Router();

export const LoginAPI = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Some of the fields are missing",
        success: false,
      });
    }
    const user = await User.findOne({
      email,
    });
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        if (role != user.role) {
          return res.status(400).json({
            message: "Incorrect role is entered",
            success: false,
          });
        } else {
          //since all the three details are correct, we will generate the token
          //creating a unique token data
          const tokenData = {
            userId: user._id,
          };
          //creating the token using unique token data, secret key, configurations
          const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: "1d",
          });
          //storing the token into the cookie
          const userReturned = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
          };
          return res
            .status(200)
            .cookie("token", token, {
              maxAge: 1 * 24 * 60 * 60 * 1000,
              httpsOnly: true,
              sameSite: "strict",
            })
            .json({
              message: `Welcome back ${user.fullname}`,
              user: userReturned,
              success: true,
            });
        }
      } else {
        return res.status(400).json({
          message: "Incorrect password",
          success: false,
        });
      }
    } else {
      return res.status(400).json({
        message: "Email is not registered",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//making the routes
router.route("").get();

//exporting the router
export default router;
