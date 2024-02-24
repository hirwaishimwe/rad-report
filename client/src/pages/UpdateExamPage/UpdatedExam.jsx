import "react-toastify/dist/ReactToastify.css";

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";

import { Spinner } from "flowbite-react";
import { ExamContext } from "../../context/ExamContext";
import useApi from "../../hooks/useApi";

const UpdatedExam = () => {
  const { examsData } = useContext(ExamContext);
  const { sendRequest } = useApi();
  const { examId } = useParams();
  const navigate = useNavigate();
  const [examData, setExamData] = useState({
    medical_record_number: "",
    age: "",
    sex: "",
    pro_nouns: "",
    zip_code: "",
    latest_bmi: "",
    latest_weight: "",
    png_filename: "",
    exam_id: "",
    icu_admit: "",
    icu_admits_count: "",
    mortality: "",
  });
  const [errors, setErrors] = useState({});
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exam = examsData.find(exam => exam._id === examId);
        if (exam) {
          setExamData(exam);
        }
      } catch (error) {
        console.error("Error fetching exams:", error.message);
      }
    };

    fetchData();
  }, [examsData, examId]);

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!examData.medical_record_number) {
      newErrors.medical_record_number = "Medical Record Number is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) return;

    setUpdating(true);

    try {
      const updatedExam = await sendRequest(
        `users/${examId}`,
        "PATCH",
        examData
      );
      if (updatedExam) {
        console.log("UpdatedExam:", updatedExam.message);
        toast.success(updatedExam.message);
        setTimeout(() => {
          setUpdating(false);
          navigate("/admin");
        }, 1500);
      }
    } catch (error) {
      console.error("Error updating exam:", error.message);
      toast.error(error.message);
    }
  };

  const handleChange = e => {
    setExamData({ ...examData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="medical_record_number"
          >
            Medical Record Number
          </label>
          <input
            className={`shadow appearance-none border ${
              errors.medical_record_number
                ? "border-red-500"
                : "border-gray-300"
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="medical_record_number"
            type="text"
            placeholder="Medical Record Number"
            name="medical_record_number"
            value={examData.medical_record_number}
            onChange={handleChange}
          />
          {errors.medical_record_number && (
            <p className="text-red-500 text-xs italic">
              {errors.medical_record_number}
            </p>
          )}
        </div>

        {/* Add more form fields here */}

        <div className="flex items-center justify-between">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              updating && "opacity-50 cursor-not-allowed"
            }`}
            type="submit"
            disabled={updating}
          >
            {updating ? (
              <span className="flex items-center">
                <Spinner className="mx-1" size="sm" /> Updating...
              </span>
            ) : (
              "Update Exam"
            )}
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={1200}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default UpdatedExam;
