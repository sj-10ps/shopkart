import React from 'react'
import {FaExclamationTriangle} from 'react-icons/fa'
const NotFound = () => {
  return (
    <div className='inset-0 h-screen flex justify-center items-center bg-black'>
        <div className='flex flex-col gap-2 items-center'>
            <FaExclamationTriangle color='yellow' size={80}/>
            <p className='uppercase font-bold text-red-500'>404 Page-not-found</p>
        </div>
      
    </div>
  )
}

export default NotFound