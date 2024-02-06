import UserController from "../controllers/user-controller.js";
import express from "express";

const router = express.Router();

router.get("/", UserController);

export default router;
