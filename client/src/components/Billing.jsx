import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Billing() {
  const {state : {cart}, amount } = useCart()
  return (
    <div className='w-1/3 p-2 bg-white/75 text-black border-l-2 flex flex-col justify-between'>
      <div className='flex flex-col gap-1'>
        <div className='border-b-2 border-black p-1 text-center text-xl font-bold'>Billing</div>
        {cart.map((p, key) => {
          return (
            <div key={key} className='border-b-2 border-black'>
              <div>{p.title}</div>
              <div>Qty : {p.qty}</div>
              <div>Price : {(p.price * p.qty).toFixed(2)}</div>
            </div>
          )
        })}
      </div>
      <div className='p-2 flex justify-between'>
        <div>Total amount: {amount}</div>
        <button className='bg-lime-600 p-1 rounded'>check out</button>
      </div>
      
    </div>
  )
}
