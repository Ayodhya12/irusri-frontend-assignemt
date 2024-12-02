import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Products from "./pages/products";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Logout from "./pages/logout";
import AppNavbar from "./components/navbar";
import { CartProvider } from "./context/cartContext";
import RegistrationForm from "./pages/registration";
import "./styles/styles.css";

function App() {
  return (
    <div>
      <CartProvider>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
