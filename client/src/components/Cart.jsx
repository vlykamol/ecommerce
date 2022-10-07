import React from 'react'
import { useCart } from '../context/CartContext'
import Billing from './Billing';
import CartItemCard from './CartItemCard';
import ItemCard from './ItemCard';

export default function Cart() {
  const { state } = useCart()
  const { cart } = state
  return (
    <div className="w-full flex grow">
      <div className='w-2/3 max-h-screen flex flex-col gap-2 p-2 overflow-auto'>
        <div className='text-black border-b-2 border-black p-1 text-center text-xl font-bold'>Cart</div>
        {cart.map((p, key) => {
          return <CartItemCard key={key} product = {p} />
        })}
      </div>
      <Billing />
    </div>
  )
}
