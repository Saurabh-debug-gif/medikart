import Order from "../models/ordermodel.js";
import Medicine from "../models/medicinemodel.js";

export const createOrder = async (req, res) => {
  try {
    const { items, customer, deliveryFee = 2 } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Items required" });
    }
    if (!customer) {
      return res.status(400).json({ success: false, message: "Customer required" });
    }

    // Try to hydrate price from DB; if not found, trust provided price (to support static dataset ids)
    const ids = items.filter(i => i.medicineId).map((i) => i.medicineId);
    const medicines = ids.length ? await Medicine.find({ _id: { $in: ids } }) : [];
    const priceById = new Map(medicines.map((m) => [String(m._id), m.price]));

    const normalizedItems = items.map((i) => {
      const hydrated = priceById.get(String(i.medicineId));
      const price = hydrated != null ? hydrated : i.price;
      if (price == null) {
        throw new Error("Price missing for item");
      }
      return { medicineId: i.medicineId || null, quantity: i.quantity, price };
    });

    const subtotal = normalizedItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
    const total = subtotal + Number(deliveryFee || 0);

    const order = await Order.create({ items: normalizedItems, subtotal, deliveryFee, total, customer });
    return res.json({ success: true, data: order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Error creating order" });
  }
};

export const listOrders = async (_req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: orders });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Error" });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Not found" });
    return res.json({ success: true, data: order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Error" });
  }
};
