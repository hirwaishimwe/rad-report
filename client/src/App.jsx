/* eslint-disable react/jsx-no-undef */
import "./App.css";

import { Route, Routes } from "react-router-dom";
import {
    AboutUs,
    Admin,
    CreateExam,
    ExamDetails,
    Exams,
    PageNotFound,
    PatientDetails,
    UpdateExam,
} from "./pages";

import { ExamProvider } from "./context/ExamContext";
import { NavbarWithMegaMenu } from "./pages/components/navBar/NavBar";

function App() {
    return (
        <ExamProvider>
            <div className="App">
                <NavbarWithMegaMenu />
                <Routes>
                    <Route path="/" element={<Exams />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/exam/:examId" element={<ExamDetails />} />
                    <Route
                        path="/patient/:patientId"
                        element={<PatientDetails />}
                    />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/create-exam" element={<CreateExam />} />
                    <Route
                        path="/update-exam/:examId"
                        element={<UpdateExam />}
                    />
                    <Route path="/*" element={<PageNotFound />} />
                </Routes>
            </div>
        </ExamProvider>
    );
}

export default App;
