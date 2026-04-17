const express = require("express");
const router = express.Router();
const {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  assignSubject,
} = require("../controllers/teacherController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Protected routes
router.use(protect);

// Admin only
router.route("/")
  .get(authorize("admin"), getTeachers)
  .post(authorize("admin"), createTeacher);

router.post("/:id/assign-subject", authorize("admin"), assignSubject);

router.route("/:id")
  .get(authorize("admin"), getTeacherById)
  .put(authorize("admin"), updateTeacher)
  .delete(authorize("admin"), deleteTeacher);

module.exports = router;