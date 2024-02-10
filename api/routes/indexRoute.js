import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controller/userController.js";

import express from "express";
import getApiStatus from "../controller/indexController.js";

const router = express.Router();

router.get("/api", getApiStatus);
router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);
router.delete("/users/:userId", deleteUserById);
router.patch("/users/:userId", updateUserById);

export default router;

/**
 * TODO: upload img to an api like s3 or cloudinary and retrieve it
 * TODO: UML || Arch documentation
 */
