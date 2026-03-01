"use client"
import React, { useEffect, useState } from 'react'
import FilterBox from './FilterBox'
import { FaArrowCircleDown, FaArrowCircleUp, FaBars, FaHamburger } from 'react-icons/fa'
import { useSearchParams } from 'next/navigation'
import ProductMiniCard from './ProductMiniCard'
import PaginationButtons from './PaginationButtons'
import LoadingComponent from './LoadingComponent'


const ProductsComponent = () => {

    const [refetch,setReFetch]=useState(false)
    const [showFilter,setShowFilter]=useState(false)
    const searchParams=useSearchParams()
    const searchdefault=searchParams.get('search')
    const categoryDefault=searchParams.get('category')
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
  const [field,setField]=useState({
    category:categoryDefault??'All',
    rate:"All",
    price:"0",
    search:searchdefault??''
  })

  const [page,setPage]=useState(1)
  const [pagesize,setpagesize]=useState(6)
  const [count,setCount]=useState(0)




  useEffect(()=>{
   const query=`/api/user/products?search=${field.search}&category=${field.category}&rate=${field.rate}&price=${field.price}&page=${page}&pagesize=${pagesize}`
  
     const fetchdata=async()=>{
    setLoading(true)
    try {
        const res=await fetch(query)
        if(!res.ok){
            throw new Error('couldnt fetch')
        }
        const result=await res.json()
        setData(result.data)
        setCount(result.count)
        setc
    } catch (error) {
        console.log(error)
    }finally{
        setLoading(false)
    }
   }
   fetchdata()
  },[refetch,page])

  const handleSearch=()=>{
    setReFetch(prev=>!prev)
  }
  return (
    <div className='flex flex-col gap-2'>

        <div className='w-full max-w-3xl mx-auto'>
             <button className='flex items-center gap-2 bg-white p-2 rounded-lg shadow-2xl mb-2' onClick={()=>setShowFilter(prev=>!prev)}>{!showFilter?(<FaArrowCircleDown size={20}/>):(<FaArrowCircleUp size={20}/>)}Filter</button>
             {showFilter&&(
                 <FilterBox field={field} setField={setField} handleSearch={handleSearch}/>
             )}
        </div>
        <div className='mx-5  grid md:grid-cols-2 grid-cols-1 gap-2 '>
          {loading&&(
            <LoadingComponent/>
          )}
            {data.map((d)=>(
               <ProductMiniCard key={d._id} data={d}/>
            ))}
        
        </div>
        <div className='max-w-sm mx-auto mt-3'>
            <PaginationButtons page={page} pageSize={pagesize} count={count} setPage={setPage}/>
        </div>

    </div>
  )
}

export default ProductsComponent
