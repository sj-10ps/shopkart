"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCartPlus, FaSearch, FaUser } from "react-icons/fa";
import NavSearchBar from "./NavSearchBar";
import { HiOutlineUserCircle } from "react-icons/hi2";
import Link from "next/link";
import {useSession} from 'next-auth/react'
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchcartdata } from "@/redux/cartSlice";

 

const PublicNavBar = () => {
  const {data:session} =useSession()
  const location=usePathname()
  const router=useRouter()
  const [search,setSearch]=useState('')
  const dispatch=useDispatch()
  const {cartloading,cartCount}=useSelector(state=>state.cart)
  const handlesubmit=(e)=>{
      e.preventDefault()
      if(search.trim()===""){
        router.push('/user/products')
        
      }else{
        router.push(`/user/products?search=${search}`)
      }
  }
  useEffect(()=>{
  dispatch(fetchcartdata())
  },[dispatch])

     
   
  return (
    <div className="bg-cyan-700 p-4 flex justify-between gap-3">
      <div className="h-8 w-13 relative shadow-xl ">
       <Image src="/logo.png" alt="Logo" fill className="object-contain"  onClick={()=>router.push('/user')}/>
      </div>

      {location!=='/user/products'&&(
        <div className="w-[70%]">
        <NavSearchBar setSearch={setSearch} handlesubmit={handlesubmit}/>
       
      </div>
      )}


     

      <div className="flex gap-2 items-center">
        {session ? (
          <>
           <Link href={'/user/profile'} className={`${location==="/user/profile"?'ring-1 ring-red-500 scale-125 duration-200':'text-white' } h-9 w-9 relative rounded-full overflow-hidden`}>
         
            <Image src={session.user.image} alt="" fill ></Image>

        
           </Link> 
           <Link href={'/user/cart'} className={`${location==="/user/cart"?'text-red-500 scale-125 duration-200':'text-white relative ' }`}>
            <FaCartPlus  size={30} />
            
                 {cartloading?(
                  <div className="bg-blue-800 p-2 animate-ping h-4 w-4 rounded-full absolute top-0">
             
            </div>
                ):(
                  <div className=" h-5 w-5 rounded-full absolute -top-3 -right-1 bg-white text-black text-sm flex justify-center ">
                {cartCount}
             
            </div>
                )}
            
            
            </Link>
          </>
        ) : (
            <div>
            <Link href='/user/profile'> <HiOutlineUserCircle size={40} className="cursor-pointer text-white hover:text-red-700 focus:text-red"/></Link> 
            </div>
        )}

        
      </div>
    </div>
  );
};

export default PublicNavBar;
