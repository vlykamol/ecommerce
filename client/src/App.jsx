import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Dashbord from "./components/Dashbord";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";

function App() {
  return (
    <CartProvider>
    <div className="flex flex-col w-full min-h-screen text-white">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/" element={<Dashbord />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
    </div>
    </CartProvider>
  );
}

export default App;
