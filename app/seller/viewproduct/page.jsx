import SellerProductCard from '@/components/SellerProductcard'
import { cookies } from 'next/headers'

import React from 'react'


const ViewProduct = async() => {
  
    const fetchData=async()=>{
    try {
        const res=await fetch(`${process.env.NEXTAUTH_URL}/api/seller/viewproducts`,{cache:'no-store',headers:{
            Cookie:(await cookies()).toString()
        }})
        if(!res.ok){
            throw new Error('failed to fetch')
        }
        const data=await res.json()
       
        return data
    } catch (error) {
        console.log(error.message)
        return []
    }
}
  const products=await fetchData() 
  return (
    <div className='flex flex-col gap-2 mx-3 my-5'>
        {products.map(p=>(
    <SellerProductCard key={p._id} product={p}/>
   
        ))}
   
    </div>
  )
}

export default ViewProduct