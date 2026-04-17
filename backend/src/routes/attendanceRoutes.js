const express = require("express");
const router = express.Router();
const {
  markAttendance,
  getByClassAndDate,
  getByStudent,
  getSummary,
} = require("../controllers/attendanceController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Protected routes
router.use(protect);

// Teacher routes
router.post("/", authorize("teacher", "admin"), markAttendance);
router.get("/class/:classId/date/:date", authorize("teacher", "admin"), getByClassAndDate);
router.get("/summary/class/:classId", authorize("admin"), getSummary);

// Student route
router.get("/student/:studentId", authorize("student", "teacher", "admin"), getByStudent);

module.exports = router;