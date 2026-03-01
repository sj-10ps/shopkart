"use client"
import { addToWishlist, getWishlistbyid, removeFromWishlist } from '@/redux/wishlistSlice'
import React, { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import LoadingComponent from './LoadingComponent'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import AddtoWishlistButton from './AddtoWishlistButton'
import { FiShoppingCart } from 'react-icons/fi'
import { addtoCart, removefromcart } from '@/redux/cartSlice'


const AddtoCart = ({data}) => {
   const {data:session}=useSession()
    const [count,Setcount]=useState(1)
    const [loading,setLoading]=useState(false)
    const [cartdata,setData]=useState([])
    const [refresh,setrefresh]=useState(false)
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetchData=async()=>{
            setLoading(true)
            try {
                const res=await fetch(`/api/user/cart`)
                if(!res.ok){
                    throw new Error("failed to fetch")
                }
                const data=await res.json()
           
                setData(data)
            } catch (error) {
                console.log(error.error)
            }finally{
                setLoading(false)
            }
        }
        fetchData()
    },[refresh])
    const handleadd=async()=>{
      const res=await dispatch(addtoCart({productId:data._id,count:count})).unwrap()
       toast(res)
           setrefresh(prev=>!prev)
     
 
    }
    const handledelete=async()=>{
       const res=await dispatch(removefromcart(data._id)).unwrap()
       Setcount(1)
       toast(res)
         setrefresh(prev=>!prev)
       
       
    }

    if(session.user.id===data.addedBy.owner){
      return(
        <div className='bg-white p-5'>
              You cant order your own product
        </div>
      )
    }

      if(loading){
    return(
     <LoadingComponent/>
    )
   
   }
 
  return (
    <div className='bg-white p-4 shadow-xl rounded-lg '>  
      <AddtoWishlistButton data={data}/>
    
         <div className='bg-gray-200 rounded-md shadow-inner p-2 flex flex-col gap-1 mt-4'>
            {
            !cartdata.some(c=>c.product._id===data._id)?

            (
                <>
                <div className='self-center flex items-center gap-2 my-2'>
                    <button className='h-8 w-8 rounded-full flex justify-center items-center bg-white' onClick={()=>Setcount(prev=>prev-1)} disabled={count===1}>-</button>
               <p>{count}</p>
                    <button className='h-8 w-8 rounded-full flex justify-center items-center bg-white' onClick={()=>Setcount(prev=>prev+1)} disabled={count===15}>+</button>
                </div>
              <button onClick={handleadd} className='btn-primary'><FiShoppingCart/> Add to cart</button>
                </>
            ):(
                    <button onClick={handledelete}  className='btn-tertiary'><FiShoppingCart/> remove from cart</button>
            )}

                
            </div>
    </div>
  )
}

export default AddtoCart
