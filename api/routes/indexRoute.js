import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controller/userController.js";

import getApiStatus from "../controller/indexController.js";

const router = express.Router();

router.get("/api", getApiStatus);
router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);

export default router;

/**
 * TODO: Update, Patch, delete user in the REST API
 * TODO: unit testing
 * TODO: UML || Arch documentation
 *
 */
