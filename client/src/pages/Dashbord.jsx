import React from 'react'
import Page from '../components/Page';
import Sorting from "../components/Sorting";

export default function Dashbord() {
  return (
    <div className='w-full h-full grow flex p-4 bg-white/75 gap-4'>
      <Sorting />
      <Page />
    </div>
  )
}
