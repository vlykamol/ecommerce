import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./utilities/PrivateRoute";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import Dashbord from "./pages/Dashbord";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./pages/Profile";

function App() {
  return (
    <CartProvider>
      <AuthProvider>
      <div className="flex flex-col w-full min-h-screen text-white">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Dashbord />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          </Routes>
          <Footer />
      </div>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
