const mongoose = require("mongoose");

const examSchema = mongoose.Schema(
  {
    patient_id: {
      type: String,
      required: [true, "Please enter a valid patient identification"],
      minLength: 8,
      unique: true,
    },
    age: {
      type: Number,
      required: [true, "Please enter the patient's age"],
      maxLength: 3,
    },
    sex: {
      type: String,
      required: [true, "Please enter the patient's sex"],
      maxLength: 1,
    },
    zip_code: {
      type: Number,
      required: [true, "Please enter the patient's ZIP Code"],
      minLength: 3,
    },
    latest_bmi: {
      type: Number,
      required: [true, "Please enter the patient's most recent BMI"],
    },
    latest_weight: {
      type: String,
      required: [true, "Please enter the patient's most recent weight"],
    },
    png_filename: {
      type: String,
      required: [true, "Please upload the patient's x-ray image"],
    },
    exam_id: {
      type: String,
      required: [true, "Please enter the patient's exam identification"],
    },
    icu: {
      type: String,
      required: [true, "Please confirm need for an ICU transfer (Y/N)"],
    },
    icu_admit: {
      type: Number,
      required: [true, "Please specify the total instances of ICU transfers"],
    },
    mortality: {
      type: String,
      required: [true, "Please indicate the mortality status (Y/N)"],
    },
  },
  { timestamps: true }
)


module.exports = mongoose.model("Exam", examSchema)
