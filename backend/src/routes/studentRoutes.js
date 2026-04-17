const express = require("express");
const router = express.Router();
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentsByClass,
} = require("../controllers/studentController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Protected routes
router.use(protect);

// Admin only
router.route("/")
  .get(authorize("admin"), getStudents)
  .post(authorize("admin"), createStudent);

router.get("/class/:classId", authorize("admin", "teacher"), getStudentsByClass);

router.route("/:id")
  .get(authorize("admin", "teacher"), getStudentById)
  .put(authorize("admin"), updateStudent)
  .delete(authorize("admin"), deleteStudent);

module.exports = router;