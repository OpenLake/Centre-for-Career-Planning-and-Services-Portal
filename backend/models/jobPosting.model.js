import mongoose from "mongoose";

const jobPostingSchema = new mongoose.Schema({
    jobTitle:{
        type: String,
        required: true
    },
    jobDescription:{
        type: String,
        required: true,
    }, 
    Company:{
        type:String,
        required : true,
    },
    requiredSkills:[{
        type:String,
    }],
    Type:{
        type:String,
        required:true,
        enum:["on-campus","off-campus"]
    },
    batch:{
        type:Number,
        required:true,
    },
    Deadline:{
        type:Date,
    },
    ApplicationLink:{
        type:String,
    },
    Expiry:{
        type:Date,
    },
    author:{
        type:String,
    },
    relevanceScore:{
        type:Number,
    }

})

const JobPosting = mongoose.model("jobPosting",jobPostingSchema);

export default JobPosting;