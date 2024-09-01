//importing the dependencies
import mongoose from "mongoose";

//making the schema
const jobPostingSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    requiredSkills: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    applicationLink: {
      type: String,
      required: true,
    },
    expiry: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    relevanceScore: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//making the model
const jobPosting = mongoose.model("JobPosting", jobPostingSchema);

export default jobPosting;
