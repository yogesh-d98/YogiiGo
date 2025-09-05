import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { connectDB } from "./config/mongo";
import routes from "./routes";  // Correct ✅

config();
const app: Application = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
connectDB();

// Routes
app.use("/api/v1", routes);

// Health Check API
app.get("/healthz", (_, res) => {
  res.status(200).json({ statusCode:200,success: true, message: "YogiiGo Server is Running 🚀" });
});

export default app;
