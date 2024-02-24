// Create User and validating user data

import {body, validationResult} from "express-validator";

import Exam from "../models/examModel.js";
import User from  "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken'

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET_KEY, {expiresIn: '20d' })
  }

//creating user with test
export const createUser = asyncHandler(async (req, res) => {
  await Promise.all([
    body("medical_record_number")
      .notEmpty()
      .withMessage("Please enter a valid patient identification"),
    body("age")
      .isInt({
        min: 0,
        max: 120,
      })
      .withMessage("Please enter a valid age between 0 and 120"),
    body("sex").isIn(["M", "F"]).withMessage("Please enter a valid sex (M/F)"),
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

    const userData = req.body;
    userData.age = parseInt(userData.age);
    const userExists = await Exam.findOne({
        medical_record_number: userData.medical_record_number,
        sex: userData.sex,
        age: userData.age,
        pro_nouns: userData.pro_nouns,
        zip_code: userData.zip_code,
        latest_bmi: userData.latest_bmi,
        latest_weight: userData.latest_weight,
        png_filename: userData.png_filename,
        exam_id: userData.exam_id,
        icu_admit: userData.icu_admit,
        mortality: userData.mortality,
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
    try {
        const users = await Exam.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
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

// Delete a User
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

// PATCH
export const patchUserById = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const userBody = req.body;

    try {
        const user = await Exam.findByIdAndUpdate(userId, userBody, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return res.status(404).json({
                error: "User not found",
                message: "User not found for the provided Id",
            });
        }
        res.status(200).json({
            message: "User updated successfully",
            user: user,
        });
    } catch (error) {
        res.status(500).json({
            error: "Server Error",
            message: "There was a problem updating the user",
        });
    }
});

//Conteroller for Auth 
export const loginUser = async (req, res) => {
  const {username, password} = req.body
  try{
    const user = await User.login(username,password)
    const token = createToken(user._id)
    res.status(200).json({username, token})
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

export const registerUser = async (req, res) => {
  const {username, password} = req.body 
  try{
    const user = await User.register(username, password)
    const token = createToken(user._id)
    res.status(200).json({username, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }   
}
