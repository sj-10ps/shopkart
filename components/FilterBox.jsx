import { fetchCategories } from '@/redux/categorySlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const FilterBox = ({field,setField,handleSearch}) => {
const {categories}=useSelector(state=>state.category)
const dispatch=useDispatch()
useEffect(() => {
  if (!categories || categories.length === 0) {
    dispatch(fetchCategories());
  }
}, [dispatch]);

  return (
    <div className='flex flex-col gap-2 bg-white rounded-sm p-4 shadow-xl animate-slideFromTop'>
          <div className='relative'>
            <input type="text"  className='w-full p-2 pl-10 bg-white rounded-xl outline-1 focus:outline-3 outline-blue-700 px-4' value={field.search} placeholder='Search products...' onChange={(e)=>setField(prev=>({...prev,search:e.target.value}))} />
          <input type="submit" value='search' className='absolute right-0 md:w-sm rounded-r-xl hover:opacity-85 bg-blue-400 text-center text-blue-950 p-2' onClick={handleSearch}/> 
          </div> 
      
       <label htmlFor='category' className='form-label'>category</label>
       <select className='form-input' value={field.category} onChange={(e)=>setField(prev=>({...prev,category:e.target.value}))}>
        <option value={'All'}>All</option>
        {categories.map((c,index)=>(
         <option key={index} value={c}>{c}</option>
        ))}
       
       </select>
       <label htmlFor="rating" className='form-label'>Rating</label>
       <select className='form-input' value={field.rate} onChange={(e)=>setField(prev=>({...prev,rate:e.target.value}))}>
          <option>All</option>
        {Array.from({length:5}).map((_,i)=>(
            <option  key={i} value={i+1}>{i+1}</option>
        ))}
       </select>
       <label htmlFor="rate" className='form-label'>rate</label>
       <div className='flex gap-1'>
        <input type="range" min={0} step={500} max={100000} value={field.price}  onChange={(e)=>setField(prev=>({...prev,price:e.target.value}))} className='form-input w-full outline-0'/> 
        <span>Rs.{field.price}</span>
       </div>
  
    </div>
  )
}

export default FilterBox
