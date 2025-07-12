const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin"); // ✅ Make sure A is capital

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const username = "admin";
    const plainPassword = "admin123";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const existing = await Admin.findOne({ username }); // ✅ Error yahin aa raha tha
    if (existing) {
      console.log("Admin already exists.");
      process.exit();
    }

    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();
    console.log("✅ Admin user created successfully.");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Error connecting to DB:", err);
    process.exit();
  });
