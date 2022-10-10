import { createContext, useContext, useState } from "react";
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'
import useSessionStorage from "../utilities/useSessionStorage";
import { useEffect } from "react";


const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({children}){

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [user, setUser] = useSessionStorage('user', {})


  const signup = (firstName, lastName, email, password) => {
    setLoading(true)
    setMessage('');
    axios.post('http://localhost:8080/auth/signup',  {firstName, lastName, email, password}).then(res => {
      console.log(res)
      navigate('/login')
    }).catch(err => {
      console.log("err", err);
      setMessage('error while signing up')
    })
    setLoading(false)
  }

  const login = (email, password) => {
    setLoading(true)
    setMessage('');
    axios.post('http://localhost:8080/auth/login',  {email, password}).then(res => {
      console.log(res)
      setUser(res.data)
      navigate('/')
    }).catch(err => {
      console.log("err", err);
      setMessage('error while login')
    })
    setLoading(false)
  }

  const logout = () => {
    sessionStorage.clear()
  }

  const value = {
    user,
    message,
    setMessage,
    signup,
    login
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}