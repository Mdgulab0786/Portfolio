import { Router } from "express";
import Contact from "../models/Contact.js";
import { requireAuth } from "./auth.js";

const router = Router();

// Public: submit contact
router.post("/", async (req, res) => {
  try {
    const doc = await Contact.create({ ...req.body, status: "new" });
    res.status(201).json(doc);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Failed to submit contact" });
  }
});

// Protected: list contacts
router.get("/", requireAuth, async (_req, res) => {
  const items = await Contact.find().sort({ createdAt: -1 }).lean();
  const stats = {
    total: items.length,
    unread: items.filter((i) => i.status !== "read").length,
    read: items.filter((i) => i.status === "read").length,
  };
  res.json({ items, stats });
});

// Protected: mark as read
router.patch("/:id/read", requireAuth, async (req, res) => {
  const { id } = req.params;
  const updated = await Contact.findByIdAndUpdate(
    id,
    { status: "read" },
    { new: true }
  );
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

// Protected: delete
router.delete("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const del = await Contact.findByIdAndDelete(id);
  if (!del) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

export default router;
