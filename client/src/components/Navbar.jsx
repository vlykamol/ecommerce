import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
export default function Navbar() {
  return (
    <div className="flex justify-between items-end w-full h-min bg-blue-900 p-2 text-white">
      <Link className='mx-1 underline' to={'/'} >eCommerce</Link>
      <SearchBar />
      <div>
      <Link className="mx-1" to={'/cart'}>Cart</Link>
      <Link className="" to={'/profile'}>Profile</Link>
      </div>
    </div>
  )
}
