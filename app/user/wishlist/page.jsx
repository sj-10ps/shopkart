"use client"

import AddtoWishlistButton from '@/components/AddtoWishlistButton'
import LoadingComponent from '@/components/LoadingComponent'
import ProductMiniCard from '@/components/ProductMiniCard'
import { getwishlist } from '@/redux/wishlistSlice'
import React, { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

const Wishlist = () => {
    const {dataloading,data}=useSelector(state=>state.wishlist)
    const dispatch=useDispatch()
    useEffect(()=>{
      
        dispatch(getwishlist())
       
    },[])
    
   if(dataloading){
     <LoadingComponent />
   }
  return (
    <div className='mx-5 my-5 flex flex-col gap-3'>
      {data.map((d)=>(
        <div key={d._id} className='w-full max-w-4xl flex gap-1'>
              <ProductMiniCard data={d.product} />
        </div>
        
      ))}
   
    </div>
  )
}

export default Wishlist
