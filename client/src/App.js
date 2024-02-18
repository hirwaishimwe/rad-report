import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ExamProvider } from './context/ExamContext';
import Exams from "./pages/Exams";
import Admin from "./pages/Admin";
import ExamDetails from "./pages/ExamDetails";
import Navbar from './pages/components/NavBar'
import PatientDetails from './pages/PatientDetails';
import CreateExam from './pages/CreateExam';
import UpdateExam from './pages/UpdateExam';
import PageNotFound from './PageNotFound';
import AboutUs from "./pages/AboutUs";


function App() {

  return (
    <ExamProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Exams />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/exam/:examId" element={<ExamDetails />} />
          <Route path="/patient/:patientId" element={<PatientDetails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/create-exam" element={<CreateExam />} />
          <Route path="/update-exam/:examId" element={<UpdateExam />} />
          <Route path="/*" element={<PageNotFound />} />

        </Routes>
      </div>
    </ExamProvider>

  );
}

export default App;
