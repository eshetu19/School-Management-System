const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  submitRegistration,
  getAllRegistrations,
  getRegistrationById,
  approveRegistration,
  rejectRegistration,
} = require("../controllers/registrationController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Public route - anyone can submit registration
router.post("/", upload.single("documents"), submitRegistration);

// Protected routes - Admin only
router.use(protect);
router.use(authorize("admin"));

router.get("/", getAllRegistrations);
router.get("/:id", getRegistrationById);
router.post("/:id/approve", approveRegistration);
router.post("/:id/reject", rejectRegistration);

module.exports = router;