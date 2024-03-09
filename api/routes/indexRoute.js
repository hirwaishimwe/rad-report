import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  loginUser,
  patchUserById,
  registerUser,
} from "../controller/userController.js";

import express from "express";
import getApiStatus from "../controller/indexController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.post("/api/login", loginUser);
router.post("/api/register", registerUser);
router.get("/api", getApiStatus);

router.use(["/api/users", "/api/users/:userId"], requireAuth);

router.post("/api/users", createUser);
router.get("/api/users", getAllUsers);
router.get("/api/users/:userId", getUserById);
router.patch("/api/users/:userId", patchUserById);
router.delete("/api/users/:userId", deleteUserById);

export default router;
