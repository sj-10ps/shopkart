"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { SiGmail } from "react-icons/si";
import { FiHeart, FiLogOut, FiShoppingCart } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import { MdBusiness } from "react-icons/md";
import { FaEye, FaSpinner } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchSellerProfileData } from '@/redux/sellerSlice';


const ProfileCard = ({data,signOut}) => {
  const router=useRouter();
  const {loading,profileData}=useSelector(state=>state.seller)
  const dispatch=useDispatch()

  
  useEffect(()=>{
    if(!profileData){
           dispatch(fetchSellerProfileData())
    }
  
  },[profileData,dispatch])
  console.log(profileData)
  if(loading){
    return(
        <FaSpinner className='animate-spin'/>
    )
  }
  return (
    <div className='bg-white shadow-lg flex flex-col md:flex-row gap-2 p-5  rounded-lg'>
       <div className='h-48 w-48 overflow-hidden relative rounded-full '>
        <Image src={data.image} fill alt=''/>
       </div>
       <div className='bg-gray-100 shadow-inner p-4 rounded-sm flex flex-col gap-2'>
          <p className='capitalize text-cyan-700 font-semibold'>{data.name}</p>
          <p className='flex gap-1 items-center'><SiGmail/> {data.email}</p>
          <div className='flex gap-2 mt-auto justify-between'>
            <button className='btn-primary' onClick={()=>router.push('/user/ordercheckout')}>
                     <FaEye/>  View orders  
                    </button>
              <button onClick={()=>{router.push('/user/wishlist')}} className='btn-secondary'><FiHeart/> View Wishlist</button>
          </div>
          <button onClick={()=>signOut()} className='btn-tertiary'><FiLogOut/>Logout</button>
          {profileData?(
            profileData.verified?(
            <button onClick={()=>router.push('/seller/profile')} className='btn-secondary bg-cyan-950 hover:scale-100' ><MdBusiness/>View Seller Profile</button>

            ):(
             <button onClick={()=>router.push('/user/sellerapply')} className='btn-secondary bg-cyan-950 hover:scale-100' disabled><MdBusiness/>Application Pending</button>
  
            )
            
    
          ):(
           <button onClick={()=>router.push('/user/sellerapply')} className='btn-secondary bg-cyan-950'><MdBusiness/>Apply For Seller Account</button>
          )
          }
       </div>
      
    </div>
  )
}

export default ProfileCard
