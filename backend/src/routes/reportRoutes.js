const express = require("express");
const router = express.Router();
const {
  generateAttendanceReport,
  generateGradeReport,
  exportToExcel,
  printReport,
} = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Protected routes - Admin and Teacher can access reports
router.use(protect);
router.use(authorize("admin", "teacher"));

router.get("/attendance", generateAttendanceReport);
router.get("/grades", generateGradeReport);
router.post("/export", exportToExcel);
router.get("/:reportId/print", printReport);

module.exports = router;
