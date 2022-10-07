import React from 'react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { types } from '../context/CartContext'

export default function Sorting() {
  const { dispatch, category } = useCart()
  const [rating, setRating] = useState(5)
  return (
    <div className='flex flex-col w-60 items-start gap-2 bg-black/50 p-2'>
      <button className='bg-white text-black px-2 py-1' onClick={() => dispatch({
        type: types.BY_PRICE,
        payload : true
      })}>By price</button>
      <div className='flex flex-wrap gap-1'>
        <div>categories</div>
        {category.map((c, i) => {
          return <button className='bg-white text-black rounded-2xl px-2 py-1' key={i}>{c}</button>
        })}
      </div>
      
      <button className='bg-white text-black px-2 py-1' onClick={() => dispatch({
        type: types.BY_RATING,
        payload : rating
      })}>By rating</button>
      <button className='bg-white text-black px-2 py-1' onClick={() => dispatch({
        type: types.ASCENDING,
        payload : true
      })}>ascending</button>
      <button className='bg-white text-black px-2 py-1' onClick={() => dispatch({
        type: types.DESCENDING,
        payload : false
      })}>descending</button>
      <button className='bg-white text-black px-2 py-1' onClick={() => dispatch({
        type: types.CLEAR_FILTERS,
        payload : true
      })}>clear filters</button>
    </div>
  )
}
