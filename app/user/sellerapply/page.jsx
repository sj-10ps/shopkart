import SellerApplicationForm from '@/components/SellerApplicationForm'
import React from 'react'

const SellerApplication = () => {
  return (
    <div className='min-h-[calc(100vh-80px)] flex items-center justify-center'>
        <div  className='w-full max-w-2xl mx-5 my-10'>
                <SellerApplicationForm/>
        </div>

    </div>
  )
}

export default SellerApplication
