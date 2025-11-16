import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import contactsRouter from "./routes/contacts.js";

// Resolve file/dir to load .env from server directory even when started from repo root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

// Destructure all required environment variables once
const {
  PORT: PORT_ENV,
  CLIENT_ORIGIN,
  MONGODB_URI,
  JWT_SECRET,
  ADMIN_EMAIL,
  ADMIN_PASSWORD_HASH,
  NODE_ENV,
} = process.env;

const PORT = PORT_ENV ? Number(PORT_ENV) : 4000;
const ORIGIN = CLIENT_ORIGIN || "http://localhost:5173";

// Validate required environment variables
const missing: string[] = [];
if (!MONGODB_URI) missing.push("MONGODB_URI");
if (!JWT_SECRET) missing.push("JWT_SECRET");
if (!ADMIN_EMAIL) missing.push("ADMIN_EMAIL");
if (!ADMIN_PASSWORD_HASH) missing.push("ADMIN_PASSWORD_HASH");

if (missing.length) {
  console.error(`Missing required env vars: ${missing.join(", ")}`);
  process.exit(1);
}

// Helpful startup summary (omit secrets)
console.log("[Config]", {
  PORT,
  ORIGIN,
  NODE_ENV,
  MONGODB_URI: MONGODB_URI?.replace(/:\/\/.+@/, "://****:****@"), // hide credentials
  ADMIN_EMAIL,
});

// Middleware
app.use(
  cors({
    origin: NODE_ENV === "production" ? true : ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

// Serve client build (SPA) in production
// Resolve path to client dist whether running from src (dev) or dist (prod)
const CLIENT_DIST = path.resolve(__dirname, "../../dist");

app.use(express.static(CLIENT_DIST));

// SPA fallback: send index.html for non-API GET routes
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/"))
    return res.status(404).json({ error: "Not found" });
  res.sendFile(path.join(CLIENT_DIST, "index.html"));
});

mongoose
  .connect(MONGODB_URI as string)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`API listening on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
    process.exit(1);
  });

// Global error / rejection handlers for visibility
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection", err);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception", err);
});
