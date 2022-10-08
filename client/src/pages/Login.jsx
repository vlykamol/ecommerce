import React, { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, message, setMessage } = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handelLogin = (e) => {
    setMessage('')
    e.preventDefault();
    login(emailRef.current.value, passwordRef.current.value);
  };

  return (
    <div className="grow flex justify-center items-center">
      <div className="bg-black/80 p-2 w-full md:w-72 h-auto rounded" >
      <form
        onSubmit={(e) => handelLogin(e)}
        className="flex flex-col gap-1"
        autoComplete="false"
      >
        <h1>Login</h1>
        {message && <h1>{message}</h1>}
        <label htmlFor="email">Email</label>
        <input
          ref={emailRef}
          className="rounded p-1 focus:outline-none text-black"
          type="text"
          placeholder="abc@gmail.com"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          className="rounded p-1 focus:outline-none text-black"
          type="password"
          placeholder="!password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}$"
          required
        />
        <button className="bg-blue-300 text-black p-1 mt-1">
          login
        </button>
      </form>
      <div className="text-center py-2">
          Don't have an account? &nbsp;
          <Link className='text-blue-500 underline' to={'/signup'} >sign up</Link>
      </div>
      </div>
    </div>
  );
}
