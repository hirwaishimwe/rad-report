import "./App.css";

import { Route, Routes } from "react-router-dom";

import { ExamProvider } from "./context/ExamContext";
import AboutUs from "./pages/aboutPage/AboutUs";
import Admin from "./pages/adminPage/Admin";
import Navbar from "./pages/components/navBar/NavBar.jsx";
import PatientExamInfo from "./pages/components/patientExamInfo/PatientExamInfo";
import CreateExam from "./pages/createExamPage/CreateExam";
import Exams from "./pages/examsPage/Exams";
import Login from "./pages/loginPage/Login";
import PageNotFound from "./pages/pageNotFoundPage/PageNotFound";
import PatientDetails from "./pages/patientDetailsPage/PatientDetails";
import Register from "./pages/registerPage/Register.jsx";
import UpdateExam from "./pages/updateExamPage/UpdateExam.jsx";

function App() {
  return (
    <ExamProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/exam" element={<Exams />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/exam/:examId" element={<PatientExamInfo />} />
          <Route path="/patient/:patientId" element={<PatientDetails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/create-exam" element={<CreateExam />} />
          <Route path="/update-exam/:examId" element={<UpdateExam />} />
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </ExamProvider>
  );
}

export default App;
