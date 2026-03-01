import CompanyProfileCard from '@/components/CompanyProfileCard'
import SellerButtons from '@/components/SellerButtons'
import React from 'react'


const CompanyProfile = () => {
  return (
    <div >
        <div className='mt-20'>
  <CompanyProfileCard/>
        </div>
       
        <SellerButtons/>
    
    </div>
  )
}

export default CompanyProfile
