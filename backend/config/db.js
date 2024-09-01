import mongoose, { connect } from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://openlake:VsEsw0XB9s9a2Clh@webwave2.h1neo.mongodb.net/"
    );
    console.log("MongoDB database is connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;

//push
//
