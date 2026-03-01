"use client"
import Addresses from '@/components/Addresses'
import BackButton from '@/components/BackButton'
import CartItem from '@/components/CartItem'
import LoadingComponent from '@/components/LoadingComponent'
import { fetchcartdata } from '@/redux/cartSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { FiArrowLeft, FiShoppingBag } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const CartPage = () => {
  const dispatch=useDispatch()
  const [refresh,setrefresh]=useState(false)
  const [addressshown,setaddressshown]=useState(false)
  const router=useRouter()
  
  const {cartloading,cartData,cartsuccess}=useSelector(state=>state.cart)

useEffect(()=>{
  dispatch(fetchcartdata())
  console.log()
},[dispatch,refresh])



if(cartloading){
  return(
    <LoadingComponent/>
  )
}

let totalamounts = 0;
for (let item of cartData) {
  totalamounts += item.count*item.product.price;
}






  return (
    <div className='flex  md:flex-row flex-col-reverse  mt-2  mx-2 gap-4'>
     {addressshown&&(
      <div className='absolute inset-0   z-10 min-h-screen flex flex-col gap-2  w-screen  bg-transparent backdrop-blur-sm px-5  cursor-pointer'>
       <div className='bg-white p-2 rounded-md flex items-center mt-10 w-fit text-blue-700' onClick={()=>setaddressshown(prev=>!prev)}>
          <FiArrowLeft/>
              <p >Back</p>
       </div>

       <Addresses/>
      </div>
     )}

    <div className='flex flex-col  gap-2'>
     
      {cartData.map((c)=>(
        <CartItem data={c.product} count={c.count} key={c._id} cartId={c._id} setrefresh={setrefresh}/>
      ))}
      <div>

      </div>
    </div>
    <div className='bg-white p-2 h-fit flex flex-col gap-2'>
       <div className='bg-white p-2 flex gap-2 shadow-xl rounded-lg max-w-fit'>
       <p className='text-lg font-bold'>Total Cart Amount:</p>
       <span className='text-red-400'>{totalamounts}</span>
      </div>
       <button
            className="btn-primary p-2"
            onClick={(e) => {
              e.stopPropagation();
              if(totalamounts===0){
                toast.error("Add items to the cart")
                return
              }
              setaddressshown(prev=>!prev)
      
            }}
          >
           <FiShoppingBag/> Place order
          </button>
          <button className='btn-tertiary' onClick={()=>router.push('/user/ordercheckout')}>
           <FaEye/>  View orders  
          </button>
    </div>
        </div>
  )
}

export default CartPage
