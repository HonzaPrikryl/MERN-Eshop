import express from "express";
import {
  auth,
  getUserProfile,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/jwt.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(auth);
router.route("/profile").get(protect, getUserProfile);

export default router;
