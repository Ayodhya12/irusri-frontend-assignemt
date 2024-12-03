import "./App.css";
import { Routes, Route } from "react-router-dom";
import Products from "./pages/products";
import Cart from "./pages/cart";
import LoginForm from "./pages/login";
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
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
