const express = require("express");
const router = express.Router();
const {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  assignStudent,
  getClassStudents,
} = require("../controllers/classController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Protected routes
router.use(protect);

// Admin only
router.route("/")
  .get(authorize("admin"), getClasses)
  .post(authorize("admin"), createClass);

router.post("/:id/assign-student", authorize("admin"), assignStudent);

router.get("/:id/students", authorize("admin", "teacher"), getClassStudents);

router.route("/:id")
  .get(authorize("admin", "teacher"), getClassById)
  .put(authorize("admin"), updateClass)
  .delete(authorize("admin"), deleteClass);

module.exports = router;