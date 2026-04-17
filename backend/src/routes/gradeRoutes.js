const express = require("express");
const router = express.Router();
const {
  getByStudent,
  getByClassAndSubject,
  createOrUpdate,
  deleteGrade,
  getAverage,
} = require("../controllers/gradeController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Protected routes
router.use(protect);

// Teacher routes
router.get("/class/:classId/subject/:subject/term/:term", authorize("teacher", "admin"), getByClassAndSubject);
router.post("/", authorize("teacher", "admin"), createOrUpdate);
router.delete("/:id", authorize("teacher", "admin"), deleteGrade);

// Student routes
router.get("/student/:studentId", authorize("student", "teacher", "admin"), getByStudent);
router.get("/student/:studentId/average", authorize("student", "teacher", "admin"), getAverage);

module.exports = router;