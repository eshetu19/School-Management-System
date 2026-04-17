const Attendance = require("../models/Attendance");
const Class = require("../models/Class");
const Student = require("../models/Student");

// @desc    Mark attendance for a class on a specific date
// @route   POST /api/attendance
// @access  Private/Teacher
const markAttendance = async (req, res) => {
  try {
    const { classId, date, attendanceData } = req.body;

    // Check if attendance already marked for this class/date
    const existing = await Attendance.findOne({ class: classId, date });
    if (existing) {
      // Update existing
      existing.records = attendanceData;
      await existing.save();
      return res.status(200).json({ success: true, message: "Attendance updated successfully" });
    }

    // Create new attendance record
    const attendance = await Attendance.create({
      class: classId,
      date,
      records: attendanceData,
      markedBy: req.user.id
    });

    res.status(201).json({ success: true, message: "Attendance saved successfully", attendance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get attendance for a class on a specific date
// @route   GET /api/attendance/class/:classId/date/:date
// @access  Private/Teacher
const getByClassAndDate = async (req, res) => {
  try {
    const { classId, date } = req.params;
    const attendance = await Attendance.findOne({ class: classId, date })
      .populate("records.student", "firstName lastName rollNumber");

    if (!attendance) {
      // Return empty records with all students of the class
      const classData = await Class.findById(classId).populate("students", "firstName lastName rollNumber");
      const students = classData.students.map(s => ({
        studentId: s._id,
        name: `${s.firstName} ${s.lastName}`,
        rollNumber: s.rollNumber,
        status: "present"
      }));
      return res.status(200).json(students);
    }

    res.status(200).json(attendance.records);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get attendance for a student by month/year
// @route   GET /api/attendance/student/:studentId
// @access  Private/Student
const getByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { month, year } = req.query;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const attendances = await Attendance.find({
      class: student.class,
      date: { $gte: startDate, $lte: endDate }
    });

    const result = {};
    attendances.forEach(att => {
      const record = att.records.find(r => r.student.toString() === studentId);
      if (record) {
        result[att.date.toISOString().split("T")[0]] = record.status;
      }
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get attendance summary for a class over a date range
// @route   GET /api/attendance/summary/class/:classId
// @access  Private/Admin
const getSummary = async (req, res) => {
  try {
    const { classId } = req.params;
    const { start, end } = req.query;

    const startDate = new Date(start);
    const endDate = new Date(end);

    const attendances = await Attendance.find({
      class: classId,
      date: { $gte: startDate, $lte: endDate }
    }).populate("records.student", "firstName lastName rollNumber");

    const studentsMap = new Map();

    attendances.forEach(att => {
      att.records.forEach(record => {
        const studentId = record.student._id.toString();
        if (!studentsMap.has(studentId)) {
          studentsMap.set(studentId, {
            studentId,
            name: `${record.student.firstName} ${record.student.lastName}`,
            rollNumber: record.student.rollNumber,
            present: 0,
            absent: 0,
            late: 0
          });
        }
        const stats = studentsMap.get(studentId);
        if (record.status === "present") stats.present++;
        else if (record.status === "absent") stats.absent++;
        else if (record.status === "late") stats.late++;
      });
    });

    const summary = Array.from(studentsMap.values()).map(s => ({
      ...s,
      total: s.present + s.absent + s.late,
      percentage: ((s.present / (s.present + s.absent + s.late)) * 100).toFixed(1)
    }));

    res.status(200).json({ totalDays: attendances.length, summary });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { markAttendance, getByClassAndDate, getByStudent, getSummary };