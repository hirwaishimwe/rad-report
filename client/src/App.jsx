import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ExamProvider } from './context/ExamContext';
import Exams from "./pages/examsPage/Exams";
import Admin from "./pages/adminPage/Admin";
import ExamDetails from "./pages/components/patientExamInfo/PatientExamInfo";
import Navbar from './pages/components/navBar/NavBar.jsx'
import PatientDetails from './pages/patientDetailsPage/PatientDetails';
import CreateExam from './pages/createExamPage/CreateExam';
import UpdateExam from './pages/UpdateExamPage/UpdateExam';
import PageNotFound from './pages/pageNotFoundPage/PageNotFound';
import AboutUs from "./pages/aboutPage/AboutUs";
import Login from "./pages/loginPage/Login"
import Register from './pages/registerPage/Register.jsx';


function App() {

  return (
    

      <ExamProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/exam" element={<Exams />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/exam/:examId" element={<ExamDetails />} />
            <Route path="/patient/:patientId" element={<PatientDetails />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/create-exam" element={<CreateExam />} />
            <Route path="/update-exam/:examId" element={<UpdateExam />} />
            <Route path="/*" element={<PageNotFound />} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login />} />

          </Routes>
        </div>
      </ExamProvider>
  


  );
}

export default App;
