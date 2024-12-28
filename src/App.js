import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import CardList from "./components/CardList";
import Login from "./components/Login";
import Cart from "./components/Cart";
import ProductSpec from "./components/ProductSpec";
import WishList from './components/WishList';
import Frame from './components/Frame';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirectTo = params.get('redirectTo');

    if (redirectTo) {
      navigate(redirectTo, { replace: true });
    }
  }, [location, navigate]);

  return (
    <Frame>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<ProtectedRoute><CardList /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/productSpec" element={<ProtectedRoute><ProductSpec /></ProtectedRoute>} />
        <Route path="/wishList" element={<ProtectedRoute><WishList /></ProtectedRoute>} />
      </Routes>
    </Frame>
  );
}

export default App;
