import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Products from "./pages/products";
import Cart from "./pages/cart";
import Login from "./pages/login";
import AppNavbar from "./components/navbar";

function App() {
  return (
    <div>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
