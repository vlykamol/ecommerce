import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Dashbord from './components/Dashbord';
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {

  return (
    <div className='flex flex-col w-full h-screen'>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<Signup />} />
        <Route path='/' element={<Dashbord />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
