const Student = require("../models/Student");
const User = require("../models/User");

// @desc    Get all students
// @route   GET /api/students
// @access  Private/Admin
const getStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      query = {
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } }
        ]
      };
    }

    const students = await Student.find(query)
      .populate("class", "className section")
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Student.countDocuments(query);

    res.status(200).json({
      students,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Private/Admin/Teacher
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("class", "className section")
      .populate("user", "name email");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create student
// @route   POST /api/students
// @access  Private/Admin
const createStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      class: classId,
      rollNumber,
      parentName,
      parentPhone,
      address,
      dateOfBirth,
      gender,
      joinDate
    } = req.body;

    // Check if student already exists
    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      return res.status(400).json({ message: "Student with this email already exists" });
    }

    // Create user account for student
    const user = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: "student123", // Default password, should be changed on first login
      role: "student"
    });

    // Create student
    const student = await Student.create({
      user: user._id,
      firstName,
      lastName,
      email,
      phone,
      class: classId,
      rollNumber,
      parentName,
      parentPhone,
      address,
      dateOfBirth,
      gender,
      joinDate: joinDate || Date.now()
    });

    res.status(201).json({
      success: true,
      student
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private/Admin
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // Update associated user
    await User.findByIdAndUpdate(student.user, {
      name: `${updatedStudent.firstName} ${updatedStudent.lastName}`,
      email: updatedStudent.email
    });

    res.status(200).json({
      success: true,
      student: updatedStudent
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private/Admin
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Delete associated user
    await User.findByIdAndDelete(student.user);
    
    // Delete student
    await student.deleteOne();

    res.status(200).json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get students by class
// @route   GET /api/students/class/:classId
// @access  Private/Teacher
const getStudentsByClass = async (req, res) => {
  try {
    const students = await Student.find({ class: req.params.classId })
      .select("firstName lastName rollNumber email");

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentsByClass
};