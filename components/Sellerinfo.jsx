import React from 'react'

const Sellerinfo = ({data}) => {
  return (
    <div className='bg-white rounded-md p-4 shadow-lg flex flex-col'>
      <p className='text-cyan-700 font-bold'>Seller Name: <span className='text-black font-medium capitalize'>{data.addedBy.storeName}</span> </p>
       <a href={`mailto:${data.addedBy.email}`} className='text-cyan-700 font-bold'>Seller Email: <span className='text-blue-500 font-medium'>{data.addedBy.email}</span> </a>
    </div>
  )
}

export default Sellerinfo
