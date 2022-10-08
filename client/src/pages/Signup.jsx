import React, { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup, message, setMessage } = useAuth();

  const firstNameRef = useRef();
  const lasrNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handelSignUp = (e) => {
    e.preventDefault();
    setMessage('');
    if(passwordRef.current.value != confirmPasswordRef.current.value) {
      setMessage(`password doesn't match`);
      return
    }

    signup(firstNameRef.current.value,
      lasrNameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value);
  };

  return (
    <div className="grow flex justify-center items-center">
      <div className="bg-black/80 p-2 w-full md:w-72 h-auto rounded">
        <form
          onSubmit={(e) => handelSignUp(e)}
          className="flex flex-col gap-2"
          autoComplete="false"
        >
          <h1>Sign Up</h1>
          {message && <h1>{message}</h1>}
          <label htmlFor="email">First Name</label>
          <input
            ref={firstNameRef}
            className="rounded p-1 focus:outline-none text-black"
            type="text"
            placeholder="abc"
            pattern="[a-z]{3,8}$"
            required
          />

          <label htmlFor="email">Last Name</label>
          <input
            ref={lasrNameRef}
            className="rounded p-1 focus:outline-none text-black"
            type="text"
            placeholder="xyz"
            pattern="[a-z]{3,8}$"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            className="rounded p-1 focus:outline-none text-black"
            type="text"
            placeholder="abc@xyz.com"
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

          <label htmlFor="password">Confirm Password</label>
          <input
            ref={confirmPasswordRef}
            className="rounded p-1 focus:outline-none text-black"
            type="password"
            placeholder="!password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}$"
            required
          />
          <button className="bg-blue-300 text-black p-1 mt-1">login</button>
        </form>
        <div className="text-center py-2">
          Already have an account? &nbsp;
          <Link className="text-blue-500 underline" to={"/login"}>
            login
          </Link>
        </div>
      </div>
    </div>
  );
}
