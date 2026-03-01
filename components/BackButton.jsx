import Link from 'next/link'
import React from 'react'

import { FiArrowLeft } from 'react-icons/fi'

const BackButton = ({location}) => {
  return (
    <Link href={location} className='bg-white p-2 flex gap-1 w-fit items-center text-blue-500 capitalize'>
      <FiArrowLeft/>
      <p >Back</p>
    </Link>
  )
}

export default BackButton
