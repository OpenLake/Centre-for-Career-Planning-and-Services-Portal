import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    Discipline:{
        type: String,
        required: true
    },
    // job status true if he is seeking off-campus placements
    Jobstatus:[{
        JobRerenceID:{
        type:mongoose.Schema.Types.ObjectID,
        ref:'JobPosting'
        
    },
    ApplicationStatus:{enum:["applied","in-review","rejected","accepted"]},
}
],
    
    JobReferenceID:{
        type:mongoose.Schema.Types.ObjectID,
        ref:'JobPosting'
    },
    Status:{
        type:String,
        required:true
    },
    StudentID:{
        type:String,
        required:true,
        unique: true
    },
    Batch:{
        type:Number,
        required:true
    },
    SavedJobs:[{
        type:mongoose.Schema.Types.ObjectID,
        ref:'JobPosting'
    }],
    ReferenceObject:{
        type:mongoose.Schema.Types.ObjectID,
        ref:'User'
    }
},{timestamps:true})

const Student = mongoose.model("Student",studentSchema);

export default Student;