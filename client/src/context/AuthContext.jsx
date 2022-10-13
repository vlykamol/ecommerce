import { createContext, useContext, useEffect, useState } from "react";
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'
import useSessionStorage from "../utilities/useSessionStorage";
import { useReducer } from "react";
import profileReducer from "./ProfileReducer";


const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

export const types = {
  SET_PROFILE : 'setProfile',
  SET_ADDRESS : 'setAddress'
}

export function AuthProvider({children}){

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [user, setUser] = useSessionStorage('user', {})

  const [state, dispatch] = useReducer(profileReducer, {
    profile : {},
    address : {}
  })


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
    setUser({})
    dispatch({
      type: types.SET_PROFILE,
      payload : {}
    })
  }

  useEffect(() => {
    if(!user.accessToken) return
    axios
      .get("http://localhost:8080/user/profile", {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        dispatch({
          type: types.SET_PROFILE,
          payload : {
            _id: res.data._id,
            firstName : res.data.firstName,
            lastName : res.data.lastName,
            contact : res.data.contact,
            DOB : res.data.DOB.split('T')[0]
          }
        })
      })
      .catch((err) => console.log(err));
  }, [user]);

  const value = {
    user,
    message,
    state,
    dispatch,
    setMessage,
    signup,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}