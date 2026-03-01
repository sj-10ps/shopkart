"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaLocationArrow } from 'react-icons/fa'
import { toast } from 'react-toastify'

const AddressCard = ({data}) => {
  const [alert,setalert]=useState(false)
  const router=useRouter()
  const handleSubmit=async()=>{
     try {
      //passing addresssid
      const res=await fetch(`/api/user/placeorder/${data._id}`,{method:"POST"})
      if(!res.ok){
        throw new Error('failed to fetch..')
      }
      router.push('/user/ordercheckout')
      
     } catch (error) {
      console.log(error.message)
     }
  }
  return (
     <>
    <div className='bg-gray-300 p-2  w-fit rounded-md shadow-inner hover:scale-105' onClick={()=>setalert(prev=>!prev)}>
     <FaLocationArrow/>
      <p className='text-cyan-700'>{data.name}</p>
        <p className=''>{data.phone}</p>
          <p className='capitalize'>{data.area},{data.city},{data.landmark}</p>


     
    </div>
   {alert&&(
        <div className=' fixed inset-0 h-screen flex flex-col justify-center items-center backdrop-blur-xl'>
            <div className='bg-gray-300 p-2 rounded-lg py-6 shadow-xl flex flex-col gap-5'>
                 <button className='text-left text-blue-600 ' onClick={()=>setalert(prev=>!prev)}>Back</button>
               <p>Proceed to checkout</p>
            
               <button className='btn-tertiary w-full' onClick={handleSubmit}>Continue</button>
              </div>  
        </div>
      )}
     </>
  )
}

export default AddressCard