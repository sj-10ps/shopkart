import CategoryBar from '@/components/CategoryBar'
import HeroImageSlider from '@/components/HeroImageSlider'
import React from 'react'

const UserHome = () => {
  return (
    <div className='flex flex-col gap-4 items-center'>
       <div className='flex flex-col gap-2 bg-white p-4 rounded-md mt-5'>
        <h2 className='text-2xl font-bold capitalize '>Search Using Categories</h2>
        <CategoryBar/>
      </div>
      <div className='w-full max-w-2xl mx-2'>
       <HeroImageSlider/>
      </div>
     
      
    </div>
  )
}

export default UserHome
