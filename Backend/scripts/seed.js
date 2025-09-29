import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import Medicine from "../models/medicinemodel.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("MONGO_URI is not set in .env");
    process.exit(1);
  }

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");

  const jsonPath = path.join(__dirname, "medicines.json");
  if (!fs.existsSync(jsonPath)) {
    console.error("Dataset file not found:", jsonPath);
    process.exit(1);
  }

  const raw = fs.readFileSync(jsonPath, "utf-8");
  const items = JSON.parse(raw);

  let inserted = 0;
  for (const item of items) {
    const exists = await Medicine.findOne({ name: item.name }).lean();
    if (exists) continue;
    await Medicine.create({
      name: item.name,
      description: item.description || "",
      price: item.price,
      category: item.category || "",
      image: item.image || null,
    });
    inserted += 1;
  }

  console.log(`Seeding complete. Inserted ${inserted} new items.`);
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error(err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});
