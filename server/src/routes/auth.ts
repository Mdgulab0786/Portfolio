import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { Request, Response, NextFunction } from "express";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "";

function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer "))
    return res.status(401).json({ error: "Unauthorized" });
  const token = auth.substring(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { email: string };
    (req as any).user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH)
    return res.status(500).json({ error: "Admin credentials not configured" });

  if (email !== ADMIN_EMAIL)
    return res.status(401).json({ error: "Invalid credentials" });
  const ok = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });
  return res.json({ token });
});

router.get("/me", requireAuth, (req, res) => {
  const user = (req as any).user;
  res.json({ user });
});

export { requireAuth };
export default router;
