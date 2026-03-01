"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaGem, FaMicrochip, FaSpinner } from "react-icons/fa"
import { fetchCategories } from '@/redux/categorySlice'
import { GiDress, GiTShirt } from "react-icons/gi";
import { useRouter } from 'next/navigation'


const CategoryBar = () => {
  const dispatch=useDispatch()
  const router=useRouter()
  const {categories,loading}=useSelector(state=>state.category)
  useEffect(()=>{
   if(categories.length===0){
     dispatch(fetchCategories())
   }
   
  },[dispatch,categories])

  if(loading){
    return(
        <FaSpinner className="animate-spin"/>
    )
  }

  const getCategoryIcon=(c)=>{
     switch(c){
        case "electronics":return  <FaMicrochip/>;
        case "jewelery":return  <FaGem/>;
        case "men's clothing":return <GiTShirt/>;
        case "women's clothing":return <GiDress/>
     }
  }
  return (
    <div className={` p-2 grid md:grid-cols-6 grid-cols-3 gap-6`}>
   
     {categories.map((c,index)=>(
        <button onClick={()=>router.push(`/user/products?category=${c}`)} key={index} className="bg-cyan-400 shadow-2xl rounded-md p-5 flex items-center md:flex-row flex-col  gap-2 hover:opacity-60 hover:-translate-y-2 duration-500">
           {getCategoryIcon(c)}
          <p>{c}</p>
        </button>
     ))}
      
    </div>
  )
}

export default CategoryBar
