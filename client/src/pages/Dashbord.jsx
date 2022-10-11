import React from 'react'
import Page from '../components/Page';
import Sorting from "../components/Sorting";

export default function Dashbord() {
  return (
    <div className='w-full z-0 h-full grow flex flex-col sm:flex-row p-4 gap-4'>
      <Sorting />
      <Page />
    </div>
  )
}
