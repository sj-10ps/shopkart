"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEdit, FaTrash, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

const SellerProductCard = ({ product }) => {
    const router=useRouter()
  const {
    title,
    price,
    category,
    image,
    rate,
    count,
  } = product;
  const [defaultcount,setCount]=useState(count??'')
  const onEdit=async()=>{
   try {
     const res=await fetch(`/api/seller/updateproduct/${product._id}`,{method:"PUT",body:JSON.stringify(defaultcount),headers:{
        "Content-Type":'application/json'
     }})
     if(!res.ok){
        toast.error("couldnt update")
     }
     const data=await res.json()
     toast.success(data.message)
     router.refresh()
   } catch (error) {
      console.log(error.message)
   }
  }

  return (
    <div className="flex gap-4 bg-white border rounded-xl shadow-sm p-4 hover:shadow-md transition w-full max-w-2xl">
      
 
      <div className="h-48 w-48 relative">
       <Image
        src={image[0]}
        alt={title}
        fill
        
      />
       {/* <button
            onClick={() => onDelete(product._id)}
            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 absolute -left-2 -top-2"
          >
            <FaTrash />
          </button> */}
      </div>
     

      <div className="flex-1 space-y-1">
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>

        <p className="text-sm text-gray-500">
          Category: {category}
        </p>

        <div className="flex items-center gap-1 text-yellow-500">
          <FaStar />
          <span className="text-sm text-gray-700">
            {rate || "0"}
          </span>
        </div>

        <p className="text-sm text-gray-600">
          Stock:{" "}
          <span
            className={`font-medium ${
              Number(count) > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {count}
          </span>
        </p>
      </div>

   
      <div className="flex flex-col justify-between items-end">
        <p className="text-lg font-bold text-black">
          ₹{price}
        </p>

        <div className="flex gap-2">
            <input type="text" placeholder="Update count" value={defaultcount} onChange={(e)=>setCount(e.target.value)} className="form-input"></input>
          <button
            onClick={onEdit}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FaEdit />
          </button>

         
        </div>
      </div>
    </div>
  );
};

export default SellerProductCard;