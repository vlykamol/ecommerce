import React from 'react'
import { useCart } from '../context/CartContext'
import { types } from '../context/CartContext'

export default function SearchBar() {

  const { dispatch } = useCart()
  return (
    <div className='bg-white text-black rounded p-1'>
      <input onChange={(e) => dispatch({
        type : types.SEARCH_QUERY,
        payload : e.target.value
      })} type="text" className='bg-transparent focus:outline-none'/>
      {/* <button className='bg-transparent focus:outline-none'>search</button> */}
    </div>
  )
}
