import React from 'react'
import Page from './Page';
import Sorting from "./Sorting";

export default function Dashbord() {
  return (
    <div className='w-full h-full grow flex'>
      <Sorting />
      <Page />
    </div>
  )
}
