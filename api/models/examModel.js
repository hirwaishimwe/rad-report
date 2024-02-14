import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
    {
        medical_record_number: {
            type: String,
            required: [true, "Please enter a valid patient identification"],
            unique: true,
        },
        age: {
            type: Number,
            required: [true, "Please enter the patient's age"],
            min: 0,
            max: 120,
        },
        sex: {
            type: String,
            required: [true, "Please enter the patient's sex"],
            enum: ["M", "F"],
        },
        pro_nouns: {
            type: String,
            required: [true, "Please provide the patient's pronouns"],
            enum: ["He/Him", "She/Her", "They/Them", "Other"],
        },
        zip_code: {
            type: String,
            required: [true, "Please enter the patient's ZIP Code"],
        },
        latest_bmi: {
            type: Number,
            required: [true, "Please enter the patient's most recent BMI"],
        },
        latest_weight: {
            type: Number,
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
        icu_admit: {
            type: String,
            required: [true, "Please confirm need for an ICU transfer (Y/N)"],
            enum: ["Y", "N"],
        },
        icu_admits_count: {
            type: Number,
            required: [
                true,
                "Please specify the total instances of ICU transfers",
            ],
        },
        mortality: {
            type: String,
            required: [true, "Please indicate the mortality status (Y/N)"],
            enum: ["Y", "N"],
        },
    },
    {timestamps: true},
);

export default mongoose.model("Exam", examSchema);
