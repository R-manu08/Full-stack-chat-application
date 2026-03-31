import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import xss from "xss-clean";
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config();

const requiredEnv = ["MONGODB_URI", "JWT_SECRET", "PORT"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
  console.error(`ERROR: Missing required environment variables: ${missingEnv.join(", ")}`);
  console.warn("Please check your .env file in the backend directory.");
}

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Security Middlewares
app.use(helmet()); // Set security HTTP headers
app.use(mongoSanitize()); // Data sanitization against NoSQL query injection
app.use(xss()); // Data sanitization against XSS
app.use(hpp()); // Prevent HTTP parameter pollution

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/api/auth", limiter);

app.use(express.json({ limit: "10kb" })); // Body parser, limiting data size
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  cors({
    origin: ["http://localhost:5173", "http://10.223.152.181:5173"], 
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    
  })
}
app.options("*", cors());

server.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
  connectDB();
});