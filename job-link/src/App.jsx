import { Route, Routes } from 'react-router-dom';
import RegisterForm from './pages/register/RegisterForm';
import './App.css'

function App() {
  return (
    <>
      <div className="page">
        <Routes>
          <Route path="/" element={<RegisterForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
