import React from 'react'

export default function SearchBar() {
  return (
    <div className='bg-white text-black rounded p-1'>
      <input type="text" className='bg-transparent focus:outline-none'/>
      <button className='bg-transparent focus:outline-none'>search</button>
    </div>
  )
}
