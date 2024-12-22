import { Routes, Route } from 'react-router-dom';
import CardList from "./components/CardList";
import Login from "./components/Login";
import Cart from "./components/Cart";
import ProductSpec from "./components/ProductSpec";
import WishList from './components/WishList';
import Frame from './components/Frame';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
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
