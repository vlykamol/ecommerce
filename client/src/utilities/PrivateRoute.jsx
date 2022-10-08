import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

export default function PrivateRoute({children}) {
  
  const {user} = useAuth()

  return user.email ? children : <Navigate to="/login" />
}
