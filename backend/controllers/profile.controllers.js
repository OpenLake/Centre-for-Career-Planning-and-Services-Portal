import User from "../models/user.model.js";
import Student from "../models/student.model.js";

export const getStudentProfile = async (req, res) => {
  try {
    const { studentID } = req.params;

    const student = await Student.findOne({ StudentID: studentID }).populate('ReferenceObject');
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const user = student.ReferenceObject;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const profile = {
      name: user.name,
      email: user.email,         
      studentID: student.StudentID,
      degree: student.Degree || "",
      program: student.Program || "",   
      cgpa: student.CGPA || "",         
    };

    return res.json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const { studentID } = req.params;
    const { name, email, degree, program, cgpa } = req.body;

    const student = await Student.findOne({ StudentID: studentID });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const user = await User.findById(student.ReferenceObject);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update User fields
    if (name) user.name = name;
    if (email) user.email = email;
    await user.save();

    // Update Student fields
    if (degree) student.Degree = degree;
    if (program) student.Program = program;
    if (cgpa) student.CGPA = cgpa;
    await student.save();

    return res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
