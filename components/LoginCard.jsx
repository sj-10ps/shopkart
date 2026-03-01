"use client"
import React from 'react'
import { signIn } from 'next-auth/react'
import { FaGoogle } from 'react-icons/fa'

const LoginCard = () => {
  return (
    <div className='bg-white shadow-2xl rounded-lg p-4 py-6 flex flex-col items-center gap-4'>
       <h2 className='text-2xl text-center capitalize font-bold'>sign in to continue</h2>
       <button onClick={()=>signIn("google")} className='flex gap-2 items-center bg-gray-200 p-2 shadow-xl rounded-full hover:scale-95'><FaGoogle color='blue'/>continue with google</button>
    </div>
  )
}

export default LoginCard
