import React from "react";

const PatientExamInfo = ({ exam }) => {
    const {
        pro_nouns,
        medical_record_number,
        latest_bmi,
        latest_weight,
        age,
        icu_admit,
        icu_admits_count,
        zip_code,
        sex,
        exam_id,
        mortality,
        png_filename,
    } = exam;

    return (
        <div className=" container mx-auto mt-9">
            <div className="info-section">
                <h2 className="text-2xl font-bold mb-4">Patient Information</h2>
                <dl className="grid grid-cols-2 gap-4">
                    <div>
                        <dt className="font-bold">Patient ID:</dt>
                        <dd>{medical_record_number}</dd>
                    </div>
                    <div>
                        <dt className="font-bold">Age:</dt>
                        <dd>{age}</dd>
                    </div>
                    <div>
                        <dt className="font-bold">Sex:</dt>
                        <dd>{sex}</dd>
                    </div>
                    <div>
                        <dt className="font-bold">Pro-nouns:</dt>
                        <dd>{pro_nouns}</dd>
                    </div>
                    <div>
                        <dt className="font-bold">Weight:</dt>
                        <dd>{latest_weight}</dd>
                    </div>
                    <div>
                        <dt className="font-bold">BMI:</dt>
                        <dd>{latest_bmi}</dd>
                    </div>
                    <div>
                        <dt className="font-bold">ICU Admits:</dt>
                        <dd>{icu_admits_count}</dd>
                    </div>
                    <div>
                        <dt className="font-bold">Zip Code:</dt>
                        <dd>{zip_code}</dd>
                    </div>
                    <div>
                        <dt className="font-bold">Exam ID:</dt>
                        <dd>{exam_id}</dd>
                    </div>
                    <div>
                        <dt className="font-bold">ICU Admit:</dt>
                        <dd>{icu_admit}</dd>
                    </div>
                    <div>
                        <dt className="font-bold">Mortality:</dt>
                        <dd>{mortality}</dd>
                    </div>
                </dl>
            </div>

            <div className="info-section">
                <h2 className="text-2xl font-bold mb-4">Exam Details</h2>
                <dl>
                    <div>
                        <dt className="font-bold">Image URL:</dt>
                        <dd className="mb-3">
                            <a
                                href={png_filename}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline "
                            >
                                View Image
                            </a>
                        </dd>
                    </div>
                    <div className="exam-image-container">
                        <img
                            src={png_filename}
                            alt="x-ray result photography"
                            className="w-full"
                        />
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default PatientExamInfo;
