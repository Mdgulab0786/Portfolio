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

  // Basic sanity check: ensure hash looks like bcrypt to avoid plaintext misconfig
  const looksHashed = /^\$2[aby]\$/.test(ADMIN_PASSWORD_HASH);
  if (!looksHashed) {
    return res
      .status(500)
      .json({
        error: "Server configuration error: admin password hash invalid",
      });
  }

  // Normalize inputs to avoid common mistakes (extra spaces, case differences)
  const inputEmail = String(email).trim().toLowerCase();
  const storedEmail = String(ADMIN_EMAIL).trim().toLowerCase();
  const inputPassword = String(password).trim();

  if (inputEmail !== storedEmail)
    return res.status(401).json({ error: "Invalid credentials" });
  if (process.env.NODE_ENV !== "production") {
    console.log("[Auth Debug] Login attempt", {
      email: inputEmail,
      storedEmail,
    });
    console.log(
      "[Auth Debug] Hash prefix/len",
      ADMIN_PASSWORD_HASH.substring(0, 12),
      ADMIN_PASSWORD_HASH.length
    );
  }
  const ok = await bcrypt.compare(inputPassword, ADMIN_PASSWORD_HASH);
  if (process.env.NODE_ENV !== "production") {
    console.log("[Auth Debug] bcrypt.compare", ok);
  }
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ email: storedEmail }, JWT_SECRET, {
    expiresIn: "7d",
  });
  return res.json({ token });
});

router.get("/me", requireAuth, (req, res) => {
  const user = (req as any).user;
  res.json({ user });
});

// Debug endpoint (only enabled outside production) to verify loaded admin creds
router.get("/debug", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ error: "Forbidden" });
  }
  return res.json({
    adminEmail: ADMIN_EMAIL || null,
    hashPrefix: ADMIN_PASSWORD_HASH
      ? ADMIN_PASSWORD_HASH.substring(0, 12)
      : null,
    hashLength: ADMIN_PASSWORD_HASH.length || 0,
    jwtConfigured: !!process.env.JWT_SECRET,
  });
});

export { requireAuth };
export default router;
