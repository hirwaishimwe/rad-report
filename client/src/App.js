import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Exams } from "./pages/Exams";
import { Admin } from "./pages/Admin";
import ExamDetails from "./pages/ExamDetails";
import { useApi } from './hooks/use-api';
import Navbar from './pages/components/NavBar'
import PatientDetails from './pages/PatientDetails';

function App() {
  const { response } = useApi();

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Exams />} />
        <Route path="/exam/:examId" element={<ExamDetails />} />
        <Route path="/patient/:patientId" element={<PatientDetails />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
