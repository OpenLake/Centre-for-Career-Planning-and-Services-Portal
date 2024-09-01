import mongoose from 'mongoose';

const RegisterSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    requied: true,
  },
  email: {
    type: String,
    unique: true,
    requied: true,
  },
  password: {
    type: String,
    unique: true,
    requied: true,
  },
  role: {
    type: String,
    requied: true,
  },
});

const Register = mongoose.model('Register', RegisterSchema);

export default Register