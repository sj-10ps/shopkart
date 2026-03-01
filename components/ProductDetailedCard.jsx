
import { addToWishlist } from '@/redux/wishlistSlice'
import Image from 'next/image'
import React from 'react'
import { FaHeart, FaRupeeSign } from 'react-icons/fa'



const ProductDetailedCard = ({data}) => {
  
  
  return (
    <div className='bg-white rounded-lg p-2 flex md:flex-row flex-col gap-6 shadow-xl'>
      <div className='h-84 w-50 relative'>
        <Image src={data.image[0]} fill alt=''/>
        <div className='absolute bg-white shadow-2xl p-2 right-2 px-4  rounded-md'>
           <p className='flex gap-1 items-center text-red-800 text-lg'><FaRupeeSign/> {data.price}</p>
        </div>
      </div>
       <div className='flex flex-col gap-2 '>
   
        <p className='text-2xl font-bold text-cyan-600'>{data.title}</p>
        <div className='flex flex-col gap-4 '>
           {data.description.split(',').map((d,i)=>(
            <p key={i} className='max-w-3xl'>{d}</p>
           ))} 
        </div>
     
        
        
      
       </div>
    </div>  
  )
}

export default ProductDetailedCard
