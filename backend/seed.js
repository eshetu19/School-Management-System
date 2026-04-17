const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./src/models/User");

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const accounts = [
      {
        name: "Admin User",
        email: "admin@school.com",
        password: "admin123",
        role: "admin",
      },
      {
        name: "Teacher User",
        email: "teacher@school.com",
        password: "teacher123",
        role: "teacher",
      },
      {
        name: "Student User",
        email: "student@school.com",
        password: "student123",
        role: "student",
      },
    ];

    for (const account of accounts) {
      const hashedPassword = await bcrypt.hash(account.password, 10);
      await User.findOneAndUpdate(
        { email: account.email },
        {
          name: account.name,
          email: account.email,
          password: hashedPassword,
          role: account.role,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
    }

    console.log("Seed users created or updated!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();
