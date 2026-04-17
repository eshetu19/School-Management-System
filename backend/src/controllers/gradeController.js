const Grade = require("../models/Grade");
const Student = require("../models/Student");
const Class = require("../models/Class");

// Helper to calculate letter grade
const getLetterGrade = (score) => {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B+";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  if (score >= 40) return "D";
  return "F";
};

// @desc    Get grades for a student
// @route   GET /api/grades/student/:studentId
// @access  Private/Student/Teacher
const getByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { term } = req.query;

    let query = { student: studentId };
    if (term) query.term = term;

    const grades = await Grade.find(query)
      .populate("subject", "name")
      .populate("teacher", "firstName lastName");

    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get grades for a class, subject, term
// @route   GET /api/grades/class/:classId/subject/:subject/term/:term
// @access  Private/Teacher
const getByClassAndSubject = async (req, res) => {
  try {
    const { classId, subject, term } = req.params;

    const students = await Student.find({ class: classId }).select("firstName lastName rollNumber");
    const grades = await Grade.find({ class: classId, subject, term });

    const result = students.map(student => {
      const grade = grades.find(g => g.student.toString() === student._id.toString());
      return {
        studentId: student._id,
        name: `${student.firstName} ${student.lastName}`,
        rollNumber: student.rollNumber,
        score: grade ? grade.score : null,
        grade: grade ? grade.grade : null
      };
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create or update a grade
// @route   POST /api/grades
// @access  Private/Teacher
const createOrUpdate = async (req, res) => {
  try {
    const { studentId, classId, subject, term, score, teacherId } = req.body;

    let grade = await Grade.findOne({ student: studentId, subject, term });
    const letterGrade = getLetterGrade(score);

    if (grade) {
      grade.score = score;
      grade.grade = letterGrade;
      grade.teacher = teacherId;
      await grade.save();
    } else {
      grade = await Grade.create({
        student: studentId,
        class: classId,
        subject,
        term,
        score,
        grade: letterGrade,
        teacher: teacherId
      });
    }

    res.status(200).json({ success: true, grade });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a grade
// @route   DELETE /api/grades/:id
// @access  Private/Teacher
const deleteGrade = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) {
      return res.status(404).json({ message: "Grade not found" });
    }
    await grade.deleteOne();
    res.status(200).json({ success: true, message: "Grade deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get average grade for a student
// @route   GET /api/grades/student/:studentId/average
// @access  Private/Student
const getAverage = async (req, res) => {
  try {
    const { studentId } = req.params;
    const grades = await Grade.find({ student: studentId });

    if (grades.length === 0) {
      return res.status(200).json({ average: 0, totalSubjects: 0, highest: 0, lowest: 0 });
    }

    const scores = grades.map(g => g.score);
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);

    res.status(200).json({
      average: average.toFixed(1),
      totalSubjects: scores.length,
      highest,
      lowest
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getByStudent, getByClassAndSubject, createOrUpdate, deleteGrade, getAverage };