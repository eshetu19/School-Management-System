const Registration = require("../models/Registration");
const Student = require("../models/Student");
const User = require("../models/User");

// @desc    Submit new registration
// @route   POST /api/registrations
// @access  Public
const submitRegistration = async (req, res) => {
  try {
    const {
      firstName, lastName, dateOfBirth, gender, address,
      email, phone, parentName, parentPhone, previousSchool,
      gradeApplying
    } = req.body;

    // Check if email already registered
    const existing = await Registration.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "This email has already been registered" });
    }

    const registration = await Registration.create({
      firstName, lastName, dateOfBirth, gender, address,
      email, phone, parentName, parentPhone, previousSchool,
      gradeApplying,
      documents: req.file ? req.file.path : null,
      status: "pending"
    });

    res.status(201).json({ success: true, message: "Registration submitted successfully", id: registration._id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all registrations (filter by status)
// @route   GET /api/registrations
// @access  Private/Admin
const getAllRegistrations = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status) query.status = status;

    const registrations = await Registration.find(query).sort({ submittedDate: -1 });
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get single registration by ID
// @route   GET /api/registrations/:id
// @access  Private/Admin
const getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }
    res.status(200).json(registration);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Approve registration and create student account
// @route   POST /api/registrations/:id/approve
// @access  Private/Admin
const approveRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    // Create user account
    const user = await User.create({
      name: `${registration.firstName} ${registration.lastName}`,
      email: registration.email,
      password: "student123", // default password, should be changed on first login
      role: "student"
    });

    // Create student record
    const student = await Student.create({
      user: user._id,
      firstName: registration.firstName,
      lastName: registration.lastName,
      email: registration.email,
      phone: registration.phone,
      parentName: registration.parentName,
      parentPhone: registration.parentPhone,
      address: registration.address,
      dateOfBirth: registration.dateOfBirth,
      gender: registration.gender,
      joinDate: new Date(),
      class: registration.gradeApplying
    });

    // Update registration status
    registration.status = "approved";
    await registration.save();

    res.status(200).json({ success: true, message: "Registration approved and student created", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Reject registration
// @route   POST /api/registrations/:id/reject
// @access  Private/Admin
const rejectRegistration = async (req, res) => {
  try {
    const { reason } = req.body;
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    registration.status = "rejected";
    registration.rejectionReason = reason || "No reason provided";
    await registration.save();

    res.status(200).json({ success: true, message: "Registration rejected" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  submitRegistration,
  getAllRegistrations,
  getRegistrationById,
  approveRegistration,
  rejectRegistration
};