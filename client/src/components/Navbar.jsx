import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { user, logout } = useAuth()
  const {
    state: { cart },
  } = useCart();
  const [isActive, setIsActive] = useState(true)
 
  return (
    <div className="z-50 sticky top-0">
      <div className="flex justify-between items-center w-full h-min bg-blue-900 p-2 text-white gap-1">
      <Link className="underline bg-sky-300 text-black p-1 rounded" to={"/"}>
        eCommerce
      </Link>
      <SearchBar />
        <button className="bg-sky-300 text-black p-1 rounded" onClick={() => setIsActive(e => e = !e)}>menu</button>
        </div>
      <div onClick={() => setIsActive(e => e = !e)} className={`absolute bg-black/60 w-full sm:w-96 h-min sm:right-0 top-full p-2 flex flex-col gap-1 ${isActive ? 'hidden' : ''}`}>
          <Link className="bg-sky-300 text-black p-1 rounded" to={"/cart"} >
            Cart : {cart.length}
          </Link>
          <Link className="bg-sky-300 text-black p-1 rounded" to={"/profile"} >
            Profile
          </Link>
          {user.accessToken && <button className="bg-sky-300 text-black p-1 rounded" 
            onClick={() => {
              logout()
              }} >
            log Out
          </button>}
        </div>
    </div>
  );
}
