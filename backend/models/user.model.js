import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    }, 
    password:{
        type:String,
        required : true,
        minlength: 6,
    },
    role:{
        type:String,
        enum: ["student","recruiter","admin","alumni"],
        required:true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken : String,
    resetPasswordTokenExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
})  

const User = mongoose.model("User",userSchema);

export default User;