import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAuth, uri } from '../context/AuthContext'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const { user, state : {profile}} =useAuth()
  
  useEffect(() => {
    if(!profile._id) return

    axios
    .get(`${uri}/user/orders`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
    .then((res) => {
      setOrders(res.data)
    })
    .catch((err) => console.log(err));
  }, [profile])

  return (
    <div className="bg-white/25 flex flex-col p-2 gap-2 w-full sm:w-96  sm:max-h-96">
      <h1 className='text-xl underline'>Orders</h1>
      <div className='flex flex-col gap-2 overflow-auto'>
      {orders.map((order, key) => {
        return <div className='bg-black/20 p-1' key={key}>
          <div>Order Id : {order._id}</div>
          {order.products.map((p,  key) => {
            return <div key={key}>
              <div>product : {p._id}</div>
              <div>quantity : {p.quantity}</div>
            </div>
          })}
        </div>
      })}
      </div>
    </div>
  )
}
