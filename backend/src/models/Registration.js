const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    address: String,
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: String,
    parentName: String,
    parentPhone: String,
    previousSchool: String,
    gradeApplying: {
      type: String,
      required: true,
    },
    documents: String, // URL or path to uploaded file
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    rejectionReason: String,
    submittedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Registration", registrationSchema);