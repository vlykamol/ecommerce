import React from 'react'
import { useReducer } from 'react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { types } from '../context/CartContext'

export default function Sorting() {
  const { products, dispatch, category } = useCart()
  const [rating, setRating] = useState(5)
  
  return (
    <div className='flex z-0 sm:flex-col w-full sm:w-96 h-min sm:items-start gap-2 bg-black/50 p-2 sticky top-16 overflow-auto rounded'>
      <div className='flex sm:flex-col gap-1 min-w-max sm:min-w-full'>
        <div>categories</div>
        <div className='flex sm:flex-wrap gap-1'>
        {category.map((c, i) => {
          return <button onClick={() => {
            dispatch({
              type : types.BY_CATEGORY,
              payload : c
            })
          }}  className='bg-white text-black rounded-2xl px-2 py-1 min-w-max sm:w-min' key={i}>{c}</button>
        })}
        </div>
      </div>
      <div className='flex sm:flex-col sm:w-full gap-2'>
      <button className='bg-white text-black rounded-2xl px-2 py-1 min-w-max sm:w-min' onClick={() => dispatch({
        type: types.BY_PRICE,
        payload : true
      })}>By price</button>
      <button className='bg-white text-black rounded-2xl px-2 py-1 min-w-max sm:w-min' onClick={() => dispatch({
        type: types.BY_RATING,
        payload : true
      })}>By rating</button>
      <button className='bg-white text-black rounded-2xl px-2 py-1 min-w-max sm:w-min' onClick={() => dispatch({
        type: types.ASCENDING,
        payload : true
      })}>ascending</button>
      <button className='bg-white text-black rounded-2xl px-2 py-1 min-w-max sm:w-min' onClick={() => dispatch({
        type: types.DESCENDING,
        payload : false
      })}>descending</button>
      <button className='bg-white text-black rounded-2xl px-2 py-1 min-w-max sm:w-min' onClick={() => dispatch({
        type: types.CLEAR_FILTERS,
        payload : products
      })}>clear filters</button>
      </div>
    </div>
  )
}
