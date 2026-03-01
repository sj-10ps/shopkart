import SellerOrderCard from '@/components/SellerOrderCard'
import { cookies } from 'next/headers'
import React from 'react'

const ViewOrders = async() => {
  const fetchData=async()=>{
    const res=await fetch(`${process.env.NEXTAUTH_URL}/api/seller/vieworders`,{headers:{
      Cookie:(await cookies()).toString()
    }})
    const data=await res.json()
    return data
  }
  const orders=await fetchData()
  return (
    <div className='mt-5 mx-3 flex flex-col gap-2'>
      {orders.map(o=>(
        <SellerOrderCard key={o._id} order={o}/>
      ))}
    </div>
  )
}

export default ViewOrders