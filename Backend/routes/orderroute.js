import express from "express";
import { createOrder, listOrders, getOrder } from "../controllers/ordercontroller.js";

const orderRouter = express.Router();

orderRouter.post("/", createOrder);
orderRouter.get("/", listOrders);
orderRouter.get("/:id", getOrder);

export default orderRouter;
