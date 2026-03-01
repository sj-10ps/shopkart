import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaStar } from 'react-icons/fa'
import { HiChevronDoubleRight } from 'react-icons/hi2'

const ProductMiniCard = ({data}) => {
  const router=useRouter()
  
  return (
    <div className='bg-white p-2 shadow-xl rounded-lg flex md:flex-row flex-col gap-5 hover:-translate-y-2 duration-500' onClick={()=>router.push(`/user/products/${data._id}`)}>
      <div className='h-48 md:w-48 w-full relative'>
        <Image src={data.image[0]} fill alt='' className='object-contain'></Image>
          <p className='absolute bg-red-400 p-1 rounded-sm right-0 text-blue-950'>Rs. {data.price}</p>
      </div>
      <div className='bg-gray-200 rounded-md shadow-inner p-2 flex flex-col gap-2 w-full'>
        <p className='capitalize font-bold text-cyan-600'>{data.title}</p>
        <p className='flex items-center gap-1 bg-green-500 w-fit px-2 rounded-md text-white'><FaStar/> {data.rate}</p>
        <ul >
          {data.description.split(',').slice(0,4).map((d,i)=>(

        
            <li key={i} className='flex items-center md:max-w-xl ' >  <HiChevronDoubleRight/>{d}</li>
        ))}
        </ul>
       
      </div>
    </div>
  )
}

export default ProductMiniCard
