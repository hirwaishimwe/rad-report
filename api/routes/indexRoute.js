import {
  PatchUserById,
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controller/userController.js";

import { deleteAllPatients } from "../controller/deletePatients.js";
import express from "express";
import getApiStatus from "../controller/indexController.js";

const router = express.Router();

router.get("/api", getApiStatus);
router.post("/api/users", createUser);
router.get("/api/users", getAllUsers);
router.get("/api/users/:userId", getUserById);
router.put("/api/users/:userId", updateUserById);
router.patch("/api/users/:userId", PatchUserById);
router.delete("/api/users/:userId", deleteUserById);
router.delete("/api/users/deleteDatabase/:secret_code", (req, res) => {
  const { secret_code } = req.params;
  if (secret_code !== process.env.DELETE_DATABASE_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  deleteAllPatients(req, res);
});

export default router;

/**
 * TODO: upload img to an api like s3 or cloudinary and retrieve it
 * TODO: UML || Arch documentation
 */
