"use client";

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { LuChevronsUpDown } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { ExamContext } from "../../context/ExamContext";
import useApi from "../../hooks/useApi";

function ExamsTable({ exams, isAdmin }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await sendRequest("users/search", "POST", {
                medical_record_number: searchQuery,
            });
            setSearchResults(response);
        } catch (error) {
            console.error("Error searching exams:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

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
            fetchExams();
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
            <form className="max-w-md ml-auto my-2" onSubmit={handleSearch}>
                <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search MRN or Patient ID"
                        value={searchQuery}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Search
                    </button>
                </div>
            </form>

            {loading && <p>Loading...</p>}
            <div>
                {searchResults.map((exam) => (
                    // Render search results here
                    <div key={exam.id}>{/* Display exam information */}</div>
                ))}
            </div>

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
                                                className="inline-flex items-center px-7 py-2.5 text-sm font-medium text-center text-white bg-green-700  hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
