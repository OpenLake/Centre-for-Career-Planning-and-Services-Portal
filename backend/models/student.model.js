import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({

    ReferenceObject:{
        type:mongoose.Schema.Types.ObjectID,
        ref:'User',
        required: true
    },

    Discipline:{
        type: String,
        required: true
    },

    Degree: {
        type: String,
        default: ''
    },
    Program: {
        type: String,
        default: ''
    },
    CGPA: {
        type: Number,
        min: 0,
        max: 10,
        default: null
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


},{timestamps:true})

const Student = mongoose.model("Student",studentSchema);

export default Student;