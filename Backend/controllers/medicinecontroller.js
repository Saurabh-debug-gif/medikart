import Medicine from "../models/medicinemodel.js";
import fs from "fs";

// Add medicine item
const addmedicine = async (req, res) => {
  try {
    const image_filename = req.file?.filename;

    const medicine = new Medicine({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await medicine.save();
    res.json({ success: true, message: "Medicine Added", data: medicine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding medicine" });
  }
};

// Get all medicines
const listmedicine = async (req, res) => {
  try {
    const medicines = await Medicine.find({});
    res.json({ success: true, data: medicines });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Remove medicine
const removeMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.body.id);

    if (!medicine) {
      return res.status(404).json({ success: false, message: "Medicine not found" });
    }

    // delete file from uploads if exists
    fs.unlink(`uploads/${medicine.image}`, (err) => {
      if (err) console.warn("Image not found or already deleted:", err.message);
    });

    await Medicine.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Medicine Removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error removing medicine" });
  }
};



export { addmedicine, listmedicine, removeMedicine };
