const Class = require("../models/Class");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

// @desc    Get all classes
// @route   GET /api/classes
// @access  Private/Admin
const getClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("teacher", "firstName lastName email")
      .populate("students", "firstName lastName rollNumber");

    const formattedClasses = classes.map(cls => ({
      id: cls._id,
      className: cls.className,
      section: cls.section,
      teacherId: cls.teacher?._id,
      teacherName: cls.teacher ? `${cls.teacher.firstName} ${cls.teacher.lastName}` : "Not assigned",
      studentCount: cls.students.length
    }));

    res.status(200).json(formattedClasses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get single class
// @route   GET /api/classes/:id
// @access  Private/Admin/Teacher
const getClassById = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id)
      .populate("teacher", "firstName lastName email")
      .populate("students", "firstName lastName rollNumber email parentName");

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json(classData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create class
// @route   POST /api/classes
// @access  Private/Admin
const createClass = async (req, res) => {
  try {
    const { className, section, teacherId } = req.body;

    // Check if class already exists
    const classExists = await Class.findOne({ className, section });
    if (classExists) {
      return res.status(400).json({ message: "Class with this name and section already exists" });
    }

    const classData = await Class.create({
      className,
      section,
      teacher: teacherId || null,
      students: []
    });

    // If teacher assigned, update teacher's class
    if (teacherId) {
      await Teacher.findByIdAndUpdate(teacherId, { class: classData._id });
    }

    res.status(201).json({
      success: true,
      class: classData
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update class
// @route   PUT /api/classes/:id
// @access  Private/Admin
const updateClass = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      class: updatedClass
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete class
// @route   DELETE /api/classes/:id
// @access  Private/Admin
const deleteClass = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Remove class reference from students
    await Student.updateMany(
      { class: classData._id },
      { $unset: { class: "" } }
    );

    await classData.deleteOne();

    res.status(200).json({ success: true, message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Assign student to class
// @route   POST /api/classes/:id/assign-student
// @access  Private/Admin
const assignStudent = async (req, res) => {
  try {
    const { studentId } = req.body;
    const classData = await Class.findById(req.params.id);

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Add student to class if not already present
    if (!classData.students.includes(studentId)) {
      classData.students.push(studentId);
      await classData.save();
    }

    // Update student's class reference
    student.class = classData._id;
    await student.save();

    res.status(200).json({ success: true, message: "Student assigned to class successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get students in a class
// @route   GET /api/classes/:id/students
// @access  Private/Teacher
const getClassStudents = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id).populate("students", "firstName lastName rollNumber email parentName");

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json(classData.students);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  assignStudent,
  getClassStudents
};