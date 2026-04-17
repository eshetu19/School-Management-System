const { body, param, query, validationResult } = require("express-validator");

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

// Auth validation rules
const validateLogin = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  validate,
];

const validateRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("role").optional().isIn(["admin", "teacher", "student"]).withMessage("Invalid role"),
  validate,
];

const validateChangePassword = [
  body("currentPassword").notEmpty().withMessage("Current password is required"),
  body("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters"),
  validate,
];

// Student validation rules
const validateStudent = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("rollNumber").optional(),
  body("class").optional(),
  validate,
];

// Teacher validation rules
const validateTeacher = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("subject").optional(),
  validate,
];

// Class validation rules
const validateClass = [
  body("className").notEmpty().withMessage("Class name is required"),
  body("section").notEmpty().withMessage("Section is required"),
  validate,
];

// Attendance validation rules
const validateAttendance = [
  body("classId").notEmpty().withMessage("Class ID is required"),
  body("date").isISO8601().withMessage("Valid date is required"),
  body("attendanceData").isArray().withMessage("Attendance data must be an array"),
  validate,
];

// Grade validation rules
const validateGrade = [
  body("studentId").notEmpty().withMessage("Student ID is required"),
  body("classId").notEmpty().withMessage("Class ID is required"),
  body("subject").notEmpty().withMessage("Subject is required"),
  body("term").notEmpty().withMessage("Term is required"),
  body("score").isInt({ min: 0, max: 100 }).withMessage("Score must be between 0 and 100"),
  validate,
];

// ID param validation
const validateIdParam = [
  param("id").isMongoId().withMessage("Invalid ID format"),
  validate,
];

// Pagination validation
const validatePagination = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
  query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100"),
  validate,
];

module.exports = {
  validate,
  validateLogin,
  validateRegister,
  validateChangePassword,
  validateStudent,
  validateTeacher,
  validateClass,
  validateAttendance,
  validateGrade,
  validateIdParam,
  validatePagination,
};