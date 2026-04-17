const Attendance = require("../models/Attendance");
const Grade = require("../models/Grade");
const Student = require("../models/Student");
const Class = require("../models/Class");
const { Parser } = require("json2csv");

// @desc    Generate attendance report (JSON or CSV)
// @route   GET /api/reports/attendance
// @access  Private/Admin
const generateAttendanceReport = async (req, res) => {
  try {
    const { classId, start, end, format = "json" } = req.query;

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

    const reportData = Array.from(studentsMap.values()).map(s => ({
      ...s,
      totalDays: s.present + s.absent + s.late,
      percentage: ((s.present / (s.present + s.absent + s.late)) * 100).toFixed(1)
    }));

    if (format === "csv") {
      const fields = ["name", "rollNumber", "present", "absent", "late", "totalDays", "percentage"];
      const parser = new Parser({ fields });
      const csv = parser.parse(reportData);
      res.header("Content-Type", "text/csv");
      res.attachment(`attendance_report_${Date.now()}.csv`);
      return res.send(csv);
    }

    res.status(200).json({ title: "Attendance Report", data: reportData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Generate grade report
// @route   GET /api/reports/grades
// @access  Private/Admin
const generateGradeReport = async (req, res) => {
  try {
    const { classId, term } = req.query;

    const students = await Student.find({ class: classId }).select("firstName lastName rollNumber");
    const grades = await Grade.find({ class: classId, term }).populate("subject");

    const reportData = students.map(student => {
      const studentGrades = grades.filter(g => g.student.toString() === student._id.toString());
      const average = studentGrades.length
        ? (studentGrades.reduce((sum, g) => sum + g.score, 0) / studentGrades.length).toFixed(1)
        : 0;
      return {
        name: `${student.firstName} ${student.lastName}`,
        rollNumber: student.rollNumber,
        subjects: studentGrades.map(g => ({ subject: g.subject.name, score: g.score, grade: g.grade })),
        average
      };
    });

    res.status(200).json({ title: `Grade Report - Term ${term}`, data: reportData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Export any report to Excel (CSV fallback)
// @route   POST /api/reports/export
// @access  Private/Admin
const exportToExcel = async (req, res) => {
  try {
    const { reportType, filters } = req.body;

    let data = [];
    if (reportType === "attendance") {
      const { classId, start, end } = filters;
      const attendances = await Attendance.find({
        class: classId,
        date: { $gte: new Date(start), $lte: new Date(end) }
      }).populate("records.student", "firstName lastName rollNumber");
      // Flatten data...
      data = attendances.flatMap(att =>
        att.records.map(r => ({
          date: att.date.toISOString().split("T")[0],
          student: `${r.student.firstName} ${r.student.lastName}`,
          rollNumber: r.student.rollNumber,
          status: r.status
        }))
      );
    } else if (reportType === "grades") {
      const { classId, term } = filters;
      const grades = await Grade.find({ class: classId, term }).populate("student", "firstName lastName rollNumber");
      data = grades.map(g => ({
        student: `${g.student.firstName} ${g.student.lastName}`,
        rollNumber: g.student.rollNumber,
        subject: g.subject,
        score: g.score,
        grade: g.grade,
        term: g.term
      }));
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "No data to export" });
    }

    const fields = Object.keys(data[0]);
    const parser = new Parser({ fields });
    const csv = parser.parse(data);
    res.header("Content-Type", "text/csv");
    res.attachment(`${reportType}_report_${Date.now()}.csv`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get printable report HTML
// @route   GET /api/reports/:reportId/print
// @access  Private/Admin
const printReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    // This would typically fetch a saved report from DB
    // For demo, return a simple HTML
    const html = `
      <html>
        <head><title>Report</title></head>
        <body>
          <h1>Student Report</h1>
          <p>Report ID: ${reportId}</p>
          <p>Generated: ${new Date().toLocaleString()}</p>
        </body>
      </html>
    `;
    res.send(html);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  generateAttendanceReport,
  generateGradeReport,
  exportToExcel,
  printReport
};