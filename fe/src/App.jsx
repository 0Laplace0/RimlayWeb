import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [message, setMessage] = useState('กำลังโหลดข้อมูลจาก Backend...');

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage('เกิดข้อผิดพลาดในการเชื่อมต่อ Backend'));
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-[#0d0d11] text-white flex flex-col w-full"> 
          <Navbar />
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center w-full">
            <h1 className="text-4xl font-extrabold text-amber-500 mb-6 tracking-wide drop-shadow-md">
              React Frontend
            </h1>
            <p className="text-lg text-emerald-400 font-semibold bg-emerald-950/20 border border-emerald-500/30 px-6 py-3 rounded-xl inline-block backdrop-blur-sm">
              {message}
            </p>
          </div>
        </div>
      } />

      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;