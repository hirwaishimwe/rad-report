import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controller/userController.js";

import express from "express";
import getApiStatus from "../controller/indexController.js";

const router = express.Router();

router.get("/api", getApiStatus);
router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);

export default router;

/**
 * TODO: Update, Patch, delete user in the REST API
 * TODO: upload img to an api like s3 or cloudinary and retrieve it
 * TODO: unit testing
 * TODO: UML || Arch documentation
 *
 */