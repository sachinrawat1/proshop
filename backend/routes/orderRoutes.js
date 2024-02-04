import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getMyOrders,
  GetAllOrder,
  UpdateOrderToDelivered,
  UpdateOrderToPaid,
  getOrderByID,
} from "../controllers/orderController.js";
const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, GetAllOrder);
router.route("/mine").post(protect, getMyOrders);
router.route("/:id").post(protect, admin, getOrderByID);
router.route("/:id/pay").put(protect, admin, UpdateOrderToDelivered);
router.route("/:id/pay").put(protect, admin, UpdateOrderToDelivered);

export default router;
