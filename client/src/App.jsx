import "./App.css";

import { Route, Routes } from "react-routerg-dom";

import AboutUs from "./pages/AboutUs";
import Admin from "./pages/Admin";
import CreateExam from "./pages/CreateExam";
import ExamDetails from "./pages/ExamDetails";
import { ExamProvider } from "./context/ExamContext";
import Exams from "./pages/Exams";
import Navbar from "./pages/components/NavBar";
import PageNotFound from "./PageNotFound";
import PatientDetails from "./pages/PatientDetails";
import UpdateExam from "./pages/UpdateExam";

function App() {
    return (
        <ExamProvider>
            <div className="App">
                <Navbar />
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
