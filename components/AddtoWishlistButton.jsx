import { addToWishlist, getWishlistbyid, removeFromWishlist } from '@/redux/wishlistSlice'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const AddtoWishlistButton = ({data}) => {
      const dispatch=useDispatch()
      const {success,loading,existing}=useSelector(state=>state.wishlist)
      const [wishrefresh,setwishrefresh]=useState(false)
      const {data:session}=useSession()
      const router=useRouter()
   
    useEffect(()=>{
    dispatch(getWishlistbyid(data._id))
        
    },[data._id, dispatch,wishrefresh])

     const handleWishlist=async(type)=>{
    let res
    if(!session){
        toast.error("please login")
        return router.push('/user/profile')
    }
    if(type==="add"){
      res=await dispatch(addToWishlist(data._id)).unwrap()
    }else{
    res=await dispatch(removeFromWishlist(data._id)).unwrap()
    }

     setwishrefresh(prev=>!prev)
    toast.success(res)
  
  }
  return (
    <div>
           {!existing?(
                   <button onClick={()=>handleWishlist('add')} className='bg-red-500 p-2 rounded-lg text-white hover:-translate-y-1 duration-300 flex gap-1 items-center justify-center text-lg w-full relative'>
              <FaHeart/>Add To Wishlist
              </button>
               ):(
                   <button onClick={()=>handleWishlist('remove')} className='bg-gray-500 p-2 rounded-lg text-white hover:-translate-y-1 duration-300 flex gap-1 items-center justify-center text-lg w-full relative'>
              <FaHeart/>Remove From Wishlist
              </button>
               )}
    </div>
  )
}

export default AddtoWishlistButton