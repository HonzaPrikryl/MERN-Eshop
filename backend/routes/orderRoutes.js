import express from "express";
import { protect } from "../middleware/jwt.js";
import { postNewOrder } from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(protect, postNewOrder);

export default router;
