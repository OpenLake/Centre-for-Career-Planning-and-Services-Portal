const mongoose = require("mongoose");
const RegisterSchema = new mongoose.Schema({
  job_title: {
    type: String,
    requied: true,
  },
  job_decsription: {
    type: String,
    requied: true,
  },
  company: {
    type: String,
    requied: true,
  },
  required_skills: {
    type: String,
    requied: true,
  },
  job_type: {
    type: String,
    requied: true,
  },
  batch: {
    type: Number,
    requied: true,
  },
  deadline: {
    type: Date,
    requied: true,
    default: Date.now,
  },
  application_link: {
    type: String,
    requied: true,
  },
  expiry: {
    type: Date,
    requied: true,
    default: Date.now,
  },
  author: {
    type: String,
    requied: true,
  },
  relevance_code:{
    type: Number,
    requied: true,  
  }
});

exports.module = Register = mongoose.model("Register", RegisterSchema);