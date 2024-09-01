//impoting all the necessary dependencies and functions
import mongoose, { connect } from "mongoose";

//making the connect database function
const URl=process.env.URL;
const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("MongoDB database is connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
