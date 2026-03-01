"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaCompass, FaEye, FaPlus } from 'react-icons/fa'

const SellerButtons = () => {
    const router=useRouter()
  return (
    <div className='bg-white flex gap-2 flex-col mx-auto w-full max-w-2xl mt-5 p-5 shadow-xl'>
    <button className='btn-primary' onClick={()=>router.push('/seller/addproduct')}><FaPlus/>Add Products</button>
        <button className='btn-secondary' onClick={()=>router.push('/seller/viewproduct')}><FaEye/>View Products</button>
        <button className='btn-tertiary' onClick={()=>router.push('/seller/vieworders')}><FaCompass/> Manage Orders</button>
        </div>
  )
}

export default SellerButtons
