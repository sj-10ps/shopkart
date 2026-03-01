"use client"
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const NavSearchBar = ({setSearch,handlesubmit}) => {
 


  return (
    <div className='relative'>
      <form action="" onSubmit={handlesubmit}>
           
    
            <input type="text" name='name' className='w-full p-2 pl-10 bg-white rounded-xl outline-1 focus:outline-3 outline-blue-700 px-4' placeholder='Search products...' onChange={(e)=>setSearch(e.target.value)} />
          <input type="submit" value='search' className='absolute right-0 md:w-sm rounded-r-xl hover:opacity-85 bg-blue-400 text-center text-blue-950 p-2'/> 
              </form>
          </div> 
  )
}

export default NavSearchBar
