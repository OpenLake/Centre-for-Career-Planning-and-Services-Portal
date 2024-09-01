const mongoose = require("mongoose");
const RegisterSchema = new mongoose.Schema({
  discipline: {
    type: String,
    unique: true,
    requied: true,
  },
  saved_jobs: {
    type: String,
    requied: true,
  },
  batch: {
    type: Number,
    requied: true,
  },
  student_id: {
    type: Number,
    unique: true,
    requied: true,
  },
  job_reference_id: {
    type: Number,
    unique: true,
    requied: true,
  },
  job_status: {
    type: String,
    requied: true,
  },
});

exports.module = Register = mongoose.model("Register", RegisterSchema);