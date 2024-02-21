"use client";

import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";

import { ExamContext } from "../../context/ExamContext";
import { LuChevronsUpDown } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import useApi from "../../hooks/useApi";

import {ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ExamsTable({ exams, isAdmin }) {
    const { fetchExams } = useContext(ExamContext);
    const navigate = useNavigate();
    const { sendRequest } = useApi();
    const [sortingCriteria, setSortingCriteria] = useState({
        column: "",
        direction: "asc",
    });

    function handleUpdate(id) {
        navigate(`/update-exam/${id}`);
    }

    async function handleDelete(id) {
        const response = await sendRequest(`users/${id}`, "DELETE");
        if (response) {
            toast.warn(`Exam ${id} has been deleted!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true, 
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
                setTimeout(() => {
                    navigate("/admin");
                    fetchExams();
                  }, 1500);

        }
    }
    const handleSort = (column) => {
        setSortingCriteria((prevCriteria) => ({
            column,
            direction:
                prevCriteria.column === column &&
                prevCriteria.direction === "asc"
                    ? "desc"
                    : "asc",
        }));
    };

    const sortedExams = exams.sort((a, b) => {
        const column = sortingCriteria.column;
        const direction = sortingCriteria.direction === "asc" ? 1 : -1;
        if (!column) return 0;

        if (a[column] < b[column]) return -1 * direction;
        if (a[column] > b[column]) return 1 * direction;
        return 0;
    });

    return (
        <div className="overflow-x-auto max-w-9xl ">
            <div className="max-w-9xl overflow-hidden overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-400 ">
                    <thead className="bg-gray-900">
                        <tr>
                            <th
                                onClick={() =>
                                    handleSort("medical_record_number")
                                }
                                className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
                            >
                                Patient ID{" "}
                                <LuChevronsUpDown
                                    style={{
                                        display: "inline-block",
                                        verticalAlign: "middle",
                                    }}
                                />
                            </th>
                            <th
                                onClick={() => handleSort("exam_id")}
                                className="px-6 py-3 hover:bg-gray-300 cursor-pointer bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Exam ID{" "}
                                <LuChevronsUpDown
                                    style={{
                                        display: "inline-block",
                                        verticalAlign: "middle",
                                    }}
                                />
                            </th>
                            <th className="px-6 py-3 bg-gray-200 hover:bg-gray-300 cursor-pointer text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Image
                            </th>
                            <th
                                onClick={() => handleSort("age")}
                                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 cursor-pointertext-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Age
                                <LuChevronsUpDown
                                    style={{
                                        display: "inline-block",
                                        verticalAlign: "middle",
                                    }}
                                />
                            </th>
                            <th
                                onClick={() => handleSort("sex")}
                                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 cursor-pointer text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Sex{" "}
                                <LuChevronsUpDown
                                    style={{
                                        display: "inline-block",
                                        verticalAlign: "middle",
                                    }}
                                />
                            </th>
                            <th
                                onClick={() => handleSort("pro_nouns")}
                                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 cursor-pointer text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Pro Nouns{" "}
                                <LuChevronsUpDown
                                    style={{
                                        display: "inline-block",
                                        verticalAlign: "middle",
                                    }}
                                />
                            </th>
                            <th
                                onClick={() => handleSort("latest_bmi")}
                                className="px-6 py-3 bg-gray-200  hover:bg-gray-300 cursor-pointer text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                BMI
                                <LuChevronsUpDown
                                    style={{
                                        display: "inline-block",
                                        verticalAlign: "middle",
                                    }}
                                />
                            </th>
                            <th
                                onClick={() => handleSort("latest_weight")}
                                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 cursor-pointer text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Weight{" "}
                                <LuChevronsUpDown
                                    style={{
                                        display: "inline-block",
                                        verticalAlign: "middle",
                                    }}
                                />
                            </th>
                            <th
                                onClick={() => handleSort("zip_code")}
                                className="px-6 py-3 bg-gray-200  hover:bg-gray-300 cursor-pointer text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Zip Code
                                <LuChevronsUpDown
                                    style={{
                                        display: "inline-block",
                                        verticalAlign: "middle",
                                    }}
                                />
                            </th>
                            <th
                                onClick={() => handleSort("mortality")}
                                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 cursor-pointer text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Mortality{" "}
                                <LuChevronsUpDown
                                    style={{
                                        display: "inline-block",
                                        verticalAlign: "middle",
                                    }}
                                />
                            </th>
                            <th
                                onClick={() => handleSort("icu_admit")}
                                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 cursor-pointer text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                ICU Admit{" "}
                                <LuChevronsUpDown
                                    style={{
                                        display: "inline-block",
                                        verticalAlign: "middle",
                                    }}
                                />
                            </th>
                            <th
                                onClick={() => handleSort("icu_admits_count")}
                                className="px-6 py-3 bg-gray-200  hover:bg-gray-300 cursor-pointer text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                ICU Admits{" "}
                                <LuChevronsUpDown
                                    style={{
                                        display: "inline-block",
                                        verticalAlign: "middle",
                                    }}
                                />
                            </th>
                            {isAdmin && (
                                <th className="px-6 py-3 bg-gray-200"></th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                        {exams.map((exam, index) => {
                            if (!exam) {
                                console.warn(`Exam at index ${index} is`, exam);
                                return null;
                            }

                            const {
                                medical_record_number,
                                pro_nouns,
                                exam_id,
                                png_filename,
                                age,
                                sex,
                                latest_bmi,
                                latest_weight,
                                zip_code,
                                mortality,
                                icu_admit,
                                icu_admits_count,
                                _id,
                            } = exam;

                            return (
                                <tr
                                    key={_id}
                                    className={
                                        index % 2 === 0 ? "bg-gray-50" : ""
                                    }
                                >
                                    <td className="px-3 py-4 whitespace-nowrap">
                                        <Link
                                            to={`/patient/${medical_record_number}`}
                                            className="text-blue-500 hover:underline"
                                        >
                                            {medical_record_number}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link
                                            to={`/exam/${_id}`}
                                            className="text-blue-500 hover:underline"
                                        >
                                            {exam_id}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img
                                            src={png_filename}
                                            alt={`Exam for ${medical_record_number}`}
                                            className="h-12 w-12 rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {age}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {sex.toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {pro_nouns}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {latest_bmi}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {latest_weight}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {zip_code}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {mortality}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {icu_admit}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {icu_admits_count}
                                    </td>
                                    {isAdmin && (
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() =>
                                                    handleUpdate(_id)
                                                }
                                                type="button"
                                                className="inline-flex items-center px-7 py-2.5 text-sm font-medium text-center text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                Update{" "}
                                                <span className="mx-1">
                                                    <TbEdit />
                                                </span>
                                            </button>
                                            <button
                                            
                                                onClick={() =>
                                                    handleDelete(_id)
                                                }
                                                type="button"
                                                className="inline-flex items-center mx-2 px-7 py-2.5 text-sm font-medium text-center text-white bg-red-700  hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                            >
                                                Delete{" "}
                                                <span className="mx-1">
                                                    {" "}
                                                    <RiDeleteBinLine />
                                                    <ToastContainer
                                                        position="top-right"
                                                        autoClose={5000}
                                                        hideProgressBar={false}
                                                        newestOnTop={false}
                                                        closeOnClick
                                                        rtl={false}
                                                        pauseOnFocusLoss
                                                        draggable
                                                        pauseOnHover
                                                        theme="light"
                                                        transition="Bounce"
                                                    />
{/* Same as */}
<ToastContainer />
                                                </span>
                                                
                                            </button>
                                            
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ExamsTable;
