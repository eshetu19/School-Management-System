const Teacher = require("../models/Teacher");
const User = require("../models/User");

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Private/Admin
const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate("user", "name email");
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get single teacher
// @route   GET /api/teachers/:id
// @access  Private/Admin
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate("user", "name email")
      .populate("subjects");

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create teacher
// @route   POST /api/teachers
// @access  Private/Admin
const createTeacher = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      subject,
      qualification,
      joinDate
    } = req.body;

    // Check if teacher exists
    const teacherExists = await Teacher.findOne({ email });
    if (teacherExists) {
      return res.status(400).json({ message: "Teacher with this email already exists" });
    }

    // Create user account for teacher
    const user = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: "teacher123", // Default password
      role: "teacher"
    });

    // Create teacher
    const teacher = await Teacher.create({
      user: user._id,
      firstName,
      lastName,
      email,
      phone,
      subject,
      qualification,
      joinDate: joinDate || Date.now()
    });

    res.status(201).json({
      success: true,
      teacher
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update teacher
// @route   PUT /api/teachers/:id
// @access  Private/Admin
const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // Update associated user
    await User.findByIdAndUpdate(teacher.user, {
      name: `${updatedTeacher.firstName} ${updatedTeacher.lastName}`,
      email: updatedTeacher.email
    });

    res.status(200).json({
      success: true,
      teacher: updatedTeacher
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete teacher
// @route   DELETE /api/teachers/:id
// @access  Private/Admin
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Delete associated user
    await User.findByIdAndDelete(teacher.user);
    
    // Delete teacher
    await teacher.deleteOne();

    res.status(200).json({ success: true, message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Assign subject to teacher
// @route   POST /api/teachers/:id/assign-subject
// @access  Private/Admin
const assignSubject = async (req, res) => {
  try {
    const { subject } = req.body;
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (!teacher.subjects.includes(subject)) {
      teacher.subjects.push(subject);
      await teacher.save();
    }

    res.status(200).json({ success: true, subjects: teacher.subjects });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  assignSubject
};