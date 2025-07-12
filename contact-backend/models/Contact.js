const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  subject: String,
  message: String,
  budget: String,
  timeline: String,
  projectType: String
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);