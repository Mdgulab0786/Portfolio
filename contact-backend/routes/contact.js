// routes/contact.js
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const jwt = require("jsonwebtoken");

// POST - Save contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, company, subject, message, budget, timeline, projectType } = req.body;
    const newContact = new Contact({ name, email, phone, company, subject, message, budget, timeline, projectType });
    await newContact.save();
    res.status(201).json({ message: "Contact saved!" });
  } catch (error) {
    console.error("POST error:", error);
    res.status(500).json({ error: "Error saving contact" });
  }
});

// GET - Get all contacts (admin only)
router.get("/", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(403).json({ error: "Forbidden" });

    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("GET error:", error);
    res.status(403).json({ error: "Invalid token" });
  }
});

module.exports = router;
