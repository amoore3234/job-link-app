import { Route, Routes } from 'react-router-dom';
import RegisterForm from './pages/register/RegisterForm';
import LoginForm from './pages/login/LoginForm';
import RegisterSuccess from './pages/register/RegisterSuccess';
import LandingPage from './pages/landing/LandingPage';
import './App.css'

function App() {
  return (
    <>
      <div className="page">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/register/success" element={<RegisterSuccess />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
