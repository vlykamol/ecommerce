import axios from "axios";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { types, useAuth, uri } from "../context/AuthContext";
import Address from "../components/Address";
import Orders from "../components/Orders";

export default function Profile() {
  const { user, state , dispatch } = useAuth();
  const { profile } = state
  const [isEditable, setIsEditable] = useState(false);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const contactRef = useRef();
  const dobRef = useRef();

  useEffect(() => {
    if(!profile.firstName) return
    firstNameRef.current.value = profile.firstName,
    lastNameRef.current.value = profile.lastName,
    contactRef.current.value = profile.contact,
    dobRef.current.value = profile.DOB 
  }, [profile])

  const updateProfile = (e) => {
    e.preventDefault();
    axios
      .post(`${uri}/user/profile`, {
        firstName: firstNameRef.current.value,
        lastName : lastNameRef.current.value,
        contact : contactRef.current.value,
        DOB : dobRef.current.value
      } ,{
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        }
      })
      .then((res) => {
        dispatch({
          type: types.SET_PROFILE,
          payload : {
            firstName : res.data.firstName,
            lastName : res.data.lastName,
            contact : res.data.contact,
            DOB : res.data.DOB.split('T')[0]
          }
        })
        setIsEditable((e) => (e = !e));
      })
      .catch((err) => console.log(err));
  };


  return (
    <div className="flex grow justify-center p-2 gap-1 flex-col sm:flex-row">
      <form
        onSubmit={(e) => updateProfile(e)}
        className="bg-white/25 flex flex-col p-2 gap-2 w-full sm:w-96 h-min"
      >
        <div className="w-full flex justify-between p-2">
          <h1 className="text-xl underline">Profile</h1>
          {isEditable ? (
            <></>
          ) : (
            <button
              onClick={() => setIsEditable((e) => (e = !e))}
              className="bg-blue-600 p-1 rounded"
            >
              edit profile
            </button>
          )}
        </div>
        <label className="underline" htmlFor="firstName">First Name : </label>
        <input
          className={`${
            isEditable ? "border-b-2 bg-white/40" : ""
          } rounded p-1 bg-transparent`}
          ref={firstNameRef}
          type="text"
          readOnly={!isEditable}
          required
        />
        <label className="underline" htmlFor="lastName">Last Name : </label>
        <input
          className={`${
            isEditable ? "border-b-2 bg-white/40" : ""
          } rounded p-1 bg-transparent`}
          ref={lastNameRef}
          type="text"
          readOnly={!isEditable}
          required
        />
        <div className="underline">Email : </div>
        <div className="p-1">{user.email}</div>
        <label className="underline" htmlFor="contactNumber">Contact Number : </label>
        <input
          className={`${
            isEditable ? "border-b-2 bg-white/40" : ""
          } rounded p-1 bg-transparent`}
          ref={contactRef}
          type="text"
          pattern="[7-9]{1}[0-9]{9}"
          readOnly={!isEditable}
          required
        />
        <label className="underline" htmlFor="dateBirth">Date of Birth : </label>
        <input
          className={`${
            isEditable ? "border-b-2 bg-white/40" : ""
          } rounded p-1 bg-transparent`}
          ref={dobRef}
          type="date"
          readOnly={!isEditable}
          required
        />
        {isEditable ? (
            <button type="submit" className="bg-blue-600 p-1 rounded">
              save profile
            </button>) : <></>}
      </form>
      <Address />
      <Orders />
    </div>
  );
}
