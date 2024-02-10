// Create User and validating user data
import { body, validationResult } from "express-validator";

import asyncHandler from "express-async-handler";
import Exam from "../models/examModel.js";

export const createUser = asyncHandler(async (req, res) => {
  await Promise.all([
    body("patient_id")
      .notEmpty()
      .withMessage("Please enter a valid patient identification"),
    body("age")
      .isInt({
        min: 0,
        max: 120,
      })
      .withMessage("Please enter a valid age between 0 and 120"),
    body("sex").isIn(["M", "F"]).withMessage("Please enter a valid sex (M/F)"),
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
    return res.status(400).json({ errors: errors.array() });
  }

  // Proceed with user creation if validation passes
  const userData = req.body;
  const userExists = await Exam.findOne({ patient_id: userData.patient_id });

  if (userExists) {
    return res.status(400).json({
      error: "User already exists",
      message: "User with the provided patient ID already exists",
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
  const { userId } = req.params;
  const user = await Exam.findById(userId);
  if (!user) {
    res.status(404).json({
      error: "User not found",
      message: "User not found for the provided ID",
    });
  } else {
    res.status(200).json(user);
  }
});

// Delete a User's Record
export const deleteUserbyId = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await Exam.findOneAndDelete({ _id: userId});
  if (!user){
  return res.status(404).json({error: "User not found"})
  } else 
   res.status(200).json(user)
  })

// Update a User's Record 
export const updateUserbyId = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await Exam.findOneAndUpdate({ _id: userId}, {
    ...req.body
  } );
  if (!user){
    return res.status(404).json({error: "User not found"})
    } else 
     res.status(200).json(user)  
}) 
