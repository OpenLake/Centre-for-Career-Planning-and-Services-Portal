//imorting all necessaries dependencies
import mongoose from "mongoose";

// define the student model schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    enum: ["student", "ccps staff"],
    required: true,
  },
});

//exporting model
module.exports = mongoose.model("User", UserSchema);
