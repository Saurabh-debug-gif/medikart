import express from "express";
import { addmedicine, listmedicine, removeMedicine } from "../controllers/medicinecontroller.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const medicineRouter = express.Router();

// Ensure uploads folder exists
const uploadPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
medicineRouter.post("/add", upload.single("image"), addmedicine);
medicineRouter.get("/list", listmedicine);
medicineRouter.post("/remove", removeMedicine);

export default medicineRouter;
