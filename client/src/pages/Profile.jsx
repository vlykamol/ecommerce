import axios from "axios";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const [isEditable, setIsEditable] = useState(false);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const contactRef = useRef();
  const dobRef = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/profile", {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        firstNameRef.current.value = res.data.firstName;
        lastNameRef.current.value = res.data.lastName;
        contactRef.current.value = res.data.contact;
        dobRef.current.value = res.data.DOB.split('T')[0];
      })
      .catch((err) => console.log(err));
  }, []);

  const updateProfile = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/user/profile", {
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
        console.log('updated data',res.data);
        firstNameRef.current.value = res.data.firstName;
        lastNameRef.current.value = res.data.lastName;
        contactRef.current.value = res.data.contact;
        dobRef.current.value = res.data.DOB.split('T')[0];
        setIsEditable((e) => (e = !e));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex grow flex-col">
      <form
        onSubmit={(e) => updateProfile(e)}
        className="bg-white/25 flex flex-col p-2"
        id="profileForm"
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
    </div>
  );
}
