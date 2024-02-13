// Create User and validating user data

import {body, validationResult} from "express-validator";

import Exam from "../models/examModel.js";
import asyncHandler from "express-async-handler";

//creating user with test
export const createUser = asyncHandler(async (req, res) => {
    await Promise.all([
        body("age")
            .isInt({
                min: 0,
                max: 120,
            })
            .withMessage("Please enter a valid age between 0 and 120"),
        body("sex")
            .isIn(["M", "F"])
            .withMessage("Please enter a valid sex (M/F)"),
        body("pro_nouns")
            .notEmpty()
            .withMessage("Please provide the patient's pronouns"),
        body("zip_code")
            .notEmpty()
            .withMessage("Please enter the patient's ZIP Code"),
        body("latest_bmi")
            .notEmpty()
            .withMessage("Please enter the patient's most recent BMI"),
        body("latest_weight")
            .notEmpty()
            .withMessage("Please enter the patient's most recent weight"),
        body("png_filename")
            .notEmpty()
            .withMessage("Please upload the patient's x-ray image"),
        body("exam_id")
            .notEmpty()
            .withMessage("Please enter the patient's exam identification"),
        body("icu_admit")
            .isIn(["Y", "N"])
            .withMessage("Please confirm need for an ICU transfer (Y/N)"),
        body("icu_admits_count")
            .notEmpty()
            .withMessage("Please specify the total instances of ICU transfers"),
        body("mortality")
            .isIn(["Y", "N"])
            .withMessage("Please indicate the mortality status (Y/N)"),
    ]);

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // Proceed with user creation if validation passes
    const userData = req.body;
    const userExists = await Exam.findOne({
        medical_record_number: userData.medical_record_number,
    });

    if (userExists) {
        return res.status(400).json({
            error: "User already exists",
            message: "User with the provided patient Id already exists",
        });
    }

    const newUser = new Exam(userData);
    await newUser.save();

    res.status(201).json({
        message: "User created successfully",
        user: newUser,
    });
});

// Get All Users
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await Exam.find();
    res.status(200).json(users);
});

// Get User by ID
export const getUserById = asyncHandler(async (req, res) => {
    const {userId} = req.params;
    const user = await Exam.findById(userId);
    if (!user) {
        res.status(404).json({
            error: "User not found",
            message: "User not found for the provided Id",
        });
    } else {
        res.status(200).json(user);
    }
});

// Update a User's Record
export const updateUserById = asyncHandler(async (req, res) => {
    const userId = req.params.Id;
    const userData = req.body;

    try {
        const update = await Exam.findByIdAndUpdate(userId, userData, {
            new: true,
        });

        if (!update) {
            return res.status(404).json({
                error: "User was not found",
                message: "User not found for the provided id",
            });
        }
        res.status(200).json({
            message: "user data was updated successfully",
            user: update,
        });
    } catch (e) {
        res.status(500).json({
            error: "Server Error",
            message: "There was a problem updating the user",
        });
    }
});

//patch aka only update some of the ser data not all the data, save on operation cost and speed
export const PatchUserById = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const userData = req.body;

    try {
        const patchedUser = await Exam.findByIdAndUpdate(userId, userData, {
            new: true,
        });
        if (!patchedUser) {
            return res.status(404).json({
                error: "User not found",
                message: "User not found for the provided Id",
            });
        }
        res.status(200).json({
            message: "User patched successfully",
            user: patchedUser,
        });
    } catch (e) {
        res.status(500).json({
            error: "Server Error",
            message: "There was a problem patching the user",
        });
    }
});

// Delete a User's Record
export const deleteUserById = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    try {
        const deletedUser = await Exam.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({
                error: "User not found",
                message: "User not found for the provided Id",
            });
        }
        res.status(200).json({message: "User deleted successfully"});
    } catch (e) {
        res.status(500).json({
            error: "Server Error",
            message: "There was a problem deleting the user",
        });
    }
});
