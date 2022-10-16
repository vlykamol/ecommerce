import React from 'react'
import { useCart, types } from '../context/CartContext'
import Billing from '../components/Billing';
import CartItemCard from '../components/CartItemCard';
import { Link } from 'react-router-dom';

export default function Cart() {

  
  const { state } = useCart()
  const { cart } = state

  // console.log('cart--', cart);
  
  return (
    <div className="w-full flex flex-col sm:flex-row grow">
      <div className='w-full sm:w-2/3 max-h-screen flex flex-col gap-2 p-2 overflow-auto'>
        <div className='text-black border-b-2 border-black p-1 text-center text-xl font-bold'>Cart</div>
        <div>add <Link className='underline' to={'/'}>items</Link>  to cart </div>
        {cart.map((p, key) => {
          return <CartItemCard key={key} product = {p} />
        })}
      </div>
      <Billing />
    </div>
  )
}
