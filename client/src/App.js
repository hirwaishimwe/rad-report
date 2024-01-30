import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Exams } from "./pages/Exams";
import { Admin } from "./pages/Admin";
import { Detail } from "./pages/Detail";
import { useApi } from './hooks/use-api';
import Navbar from './pages/components/NavBar'

function App() {
  const { response } = useApi();

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Exams />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/COVID-19-AR-16406504" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
