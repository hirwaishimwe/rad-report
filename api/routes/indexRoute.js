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
router.delete("/api/users/deleteDatabase/:secret_code", async (req, res) => {
  const { secret_code } = req.params;
  if (secret_code !== process.env.DELETE_DATABASE_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    await deleteAllPatients();
    console.info("All patients deleted successfully.");
    res.status(200).json({ message: "All patients deleted successfully." });
  } catch (error) {
    console.error("Error deleting patients:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


export default router;

