import { Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import CartFloatButton from './components/CartFloatButton.jsx';
import Home from './pages/Home';
import Topup from './pages/Topup';
import Shop from './pages/Shop';
import AccumulateShop from './pages/AccumulateShop';
import Leaderboard from './pages/Leaderboard';
import Backoffice from './pages/Backoffice';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/topup" element={<Topup />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/accumulate-shop" element={<AccumulateShop />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/backoffice" element={<Backoffice />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      
      <CartFloatButton />
    </CartProvider>
  );
}

export default App;