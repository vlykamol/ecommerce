import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext';

export default function Address() {

  const { user } = useAuth()

  const [isAddressEditable, setIsAddressEditable] = useState(false);

  const addressLine1Ref = useRef()
  const addressLine2Ref = useRef()
  const cityRef = useRef()
  const postalCodeRef = useRef()
  const countryRef = useRef()

  useEffect(() => {
    axios
    .get("http://localhost:8080/user/address", {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
    .then((res) => {
      addressLine1Ref.current.value = res.data.addressLine1;
      addressLine2Ref.current.value = res.data.addressLine2;
      cityRef.current.value = res.data.city;
      postalCodeRef.current.value = res.data.postalCode;
      countryRef.current.value = res.data.country
    })
    .catch((err) => console.log(err));
  }, [isAddressEditable])

  const updateAddress = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/user/address", {
        addressLine1 : addressLine1Ref.current.value,
        addressLine2 : addressLine2Ref.current.value,
        city : cityRef.current.value,
        postalCode : postalCodeRef.current.value,
        country : countryRef.current.value
      } ,{
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        }
      })
      .then((res) => {
        addressLine1Ref.current.value = res.data.addressLine1;
        addressLine2Ref.current.value = res.data.addressLine2;
        cityRef.current.value = res.data.city;
        postalCodeRef.current.value = res.data.postalCode;
        countryRef.current.value = res.data.country
        setIsAddressEditable((e) => (e = !e));
      })
      .catch((err) => console.log(err));
  }

  return (
    <form className="bg-white/25 flex flex-col p-2 gap-2 w-full sm:w-96" onSubmit={(e) => updateAddress(e)}>
          <div className='w-full flex justify-between p-2'>
            <h1 className='text-xl underline'>Address</h1>
            {isAddressEditable ? (<></>
            ) : (
              <button
                onClick={() => setIsAddressEditable((e) => (e = !e))}
                className="bg-blue-600 p-1 rounded"
              >
                edit Address
              </button>
            )}
          </div>
          <label className="underline" htmlFor="addressLine1">Address Line 1: </label>
          <input className={`${
            isAddressEditable ? "border-b-2 bg-white/40" : ""
          } rounded p-1 bg-transparent`} type="text" ref={addressLine1Ref} readOnly={!isAddressEditable} required/>
          <label className="underline" htmlFor="addressLine2">Address Line 2: </label>
          <input className={`${
            isAddressEditable ? "border-b-2 bg-white/40" : ""
          } rounded p-1 bg-transparent`} type="text" ref={addressLine2Ref} readOnly={!isAddressEditable} required/>
          <label className="underline" htmlFor="city">City : </label>
          <input className={`${
            isAddressEditable ? "border-b-2 bg-white/40" : ""
          } rounded p-1 bg-transparent`} type="text" ref={cityRef} readOnly={!isAddressEditable} required/>
          <label className="underline" htmlFor="postalCode">Postal code : </label>
          <input className={`${
            isAddressEditable ? "border-b-2 bg-white/40" : ""
          } rounded p-1 bg-transparent`} type="text" pattern="[0-9]{6}" ref={postalCodeRef} readOnly={!isAddressEditable} required/>
          <label className="underline" htmlFor="country">Country : </label>
          <input className={`${
            isAddressEditable ? "border-b-2 bg-white/40" : ""
          } rounded p-1 bg-transparent`} type="text" ref={countryRef} readOnly={!isAddressEditable} required/>
          {isAddressEditable ? (
            <button type="submit" className="bg-blue-600 p-1 rounded">
              save profile
            </button>) : <></>}
      </form>
  )
}
