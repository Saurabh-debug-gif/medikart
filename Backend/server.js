import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import medicineRouter from "./routes/medicineroute.js";
import orderRouter from "./routes/orderroute.js";
import userRouter from "./routes/userroute.js";
import { connectDB } from "./config/db.js";

// Load environment variables
dotenv.config();

// App config 
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB connection 
connectDB();

// Serve uploads folder so images are accessible via URL
app.use("/uploads", express.static("uploads"));

// API endpoints 
app.use("/api/medicine", medicineRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);
app.use("/images",express.static('uploads'))

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`✅ Server started on http://localhost:${port}`);
});
