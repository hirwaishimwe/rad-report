import {
    createUser,
    deleteUserById,
    getAllUsers,
    getUserById,
    patchUserById,
} from "../controller/userController.js";

import express from "express";
import getApiStatus from "../controller/indexController.js";

/**
 * @swagger
 * /api:
 *  get:
 *      description: Use to get api status
 *      response:
 *          "200":
 *              description: A Successful response
 */

/**
 * @swagger
 * /api/users/{userId}:
 *   patch:
 *     summary: Update user by ID
 *     description: Update user information by their ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               medical_record_number:
 *                 type: string
 *               age:
 *                 type: integer
 *                 format: int32
 *               sex:
 *                 type: string
 *                 enum: [M, F]
 *               pro_nouns:
 *                 type: string
 *               zip_code:
 *                 type: string
 *               latest_bmi:
 *                 type: number
 *               latest_weight:
 *                 type: number
 *               png_filename:
 *                 type: string
 *               exam_id:
 *                 type: string
 *               icu_admit:
 *                 type: string
 *                 enum: [Y, N]
 *               icu_admits_count:
 *                 type: integer
 *                 format: int32
 *               mortality:
 *                 type: string
 *                 enum: [Y, N]
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/Exam'
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
 */

const router = express.Router();

router.get("/api", getApiStatus);
router.post("/api/users", createUser);
router.get("/api/users", getAllUsers);
router.get("/api/users/:userId", getUserById);
router.patch("/api/users/:userId", patchUserById);
router.delete("/api/users/:userId", deleteUserById);

export default router;
