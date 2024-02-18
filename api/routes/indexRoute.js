import {
    createUser,
    deleteUserById,
    getAllUsers,
    getUserById,
    patchUserById,
} from "../controller/userController.js";

import express from "express";
import getApiStatus from "../controller/indexController.js";

const router = express.Router();

router.get("/api", getApiStatus);
router.post("/api/users", createUser);
router.get("/api/users", getAllUsers);
router.get("/api/users/:userId", getUserById);
router.patch("/api/users/:userId", patchUserById);
router.delete("/api/users/:userId", deleteUserById);

export default router;
