import express from "express";
import { checkAuth, login, logout, signup, updateProfile, getNetworkIp, countUsers, addSampleUsers } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// TEMPORARY: Add sample users for testing
router.post("/add-sample-users", addSampleUsers);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);
router.get("/network-ip", getNetworkIp);

// TEMPORARY: Get count of registered users
router.get("/count-users", countUsers);

export default router;
