
import Sellerinfo from '@/components/Sellerinfo'
import ProductDetailedCard from '@/components/ProductDetailedCard'
import React from 'react'
import AddtoCart from '@/components/AddtoCart'
import { useSession } from 'next-auth/react'

const fetchData=async(id)=>{
  
    try {
        const res=await fetch(`${process.env.NEXTAUTH_URL}/api/user/products/${id}`)
        if(!res.ok){
            throw new Error('failed to fetch')
        }
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const ProductDetails =async ({params}) => {
 
    
  const {id}=await params
  console.log(id)
  const data=await fetchData(id)
  console.log(data)
  
  return (
    <div className='flex flex-col md:flex-row  mt-10 gap-2'>
        <div className= 'px-2 w-full max-w-5xl'>
          <ProductDetailedCard data={data}/>
        </div>
        
        <div className='mx-2 flex flex-col gap-2'>
            <Sellerinfo data={data}/>
            <AddtoCart data={data}/>
         
        </div>
   
      
    </div>
  )
}

export default ProductDetails
