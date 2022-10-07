import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { state : {cart} } = useCart()
  return (
    <div className="flex justify-between items-center w-full h-min bg-blue-900 p-2 text-white sticky top-0">
      <Link className='mx-1 underline' to={'/'} >eCommerce</Link>
      <SearchBar />
      <div className="flex gap-1 justify-center items-center">
      <Link className="mx-1 bg-sky-300 text-black p-1 rounded" to={'/cart'}>Cart : {cart.length}</Link>
      <Link className="" to={'/profile'}>Profile</Link>
      </div>
    </div>
  )
}
