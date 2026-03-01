import OrdersCard from '@/components/OrdersCard'
import { cookies } from 'next/headers'
import React from 'react'

const fetchData=async()=>{
  try {
    const res=await fetch(`${process.env.NEXTAUTH_URL}/api/user/orders`,{headers:{
        Cookie:(await cookies()).toString()
    },cache:'no-store'})   
    if(!res.ok){
        throw new Error('failed to fetch...')
    }
    const data=await res.json()
    return data
  } catch (error) {
     console.log(error.message)
      return []; 
  }
}

const Orders = async() => {
    const orders=await fetchData()
  
  return (
    <div className='flex flex-col gap-2 my-5 mx-2'>
      {orders.map((o)=>(
        <OrdersCard key={o._id} order={o}/>
      ))}
    </div>
  )
}

export default Orders
