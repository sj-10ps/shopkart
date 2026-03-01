"use client"
import Image from "next/image"
import { useState } from "react"
import { FaArrowAltCircleDown } from "react-icons/fa"
import { toast } from "react-toastify"

const SellerOrderCard = ({ order }) => {
  const { product, address, count, status } = order
  const [showupdate,setshowupdate]=useState(false)
  const [defaultstatus,setStatus]=useState('')
  const handleUpdate=async()=>{
   try {
    const res=await fetch(`/api/seller/updateorder/${order._id}`,{method:"PUT",body:JSON.stringify(defaultstatus),headers:{
        "Content-Type":'application/json'
    }})
    if(!res.ok){
        throw new Error('failed to fetch')
    }
    toast.success("successfully updated")
   } catch (error) {
    console.log(error)
   }
  }
  return (
    <div className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border w-full max-w-2xl">
      
      {/* Product Image */}
      <div className="relative w-24 h-24 shrink-0">
        <Image
          src={product.image[0]}
          alt={product.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Order Details */}
      <div className="flex-1 space-y-1">
        <h3 className="font-semibold text-lg">{product.title}</h3>

        <p className="text-sm text-gray-600">
          Category: {product.category}
        </p>

        <p className="text-sm">
          Price: <span className="font-medium">₹{product.price}</span>
        </p>

        <p className="text-sm">
          Quantity ordered: <span className="font-medium">{count}</span>
        </p>

<div className="flex gap-2">
   
        <button 
          className={` gap-2 text-xs px-2 flex items-center py-1 rounded-full cursor-pointer ${
            status === "Delivered"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status} 

          
        </button>
        <button onClick={()=>setshowupdate(prev=>!prev)} className="text-blue-600 flex gap-1 items-center">Change Status <FaArrowAltCircleDown/></button>
        </div>


        {showupdate&&(
            <div className="bg-white rounded-md p-2 flex gap-2">
                   <select name="status" id="" className="form-input w-full" value={defaultstatus} onChange={(e)=>setStatus(e.target.value)}>
                      <option value="packing" >Packing Order</option>
                         <option value="delivering" >Out For Delivery</option>
                               <option value="delivered" >Delivered</option>
                   </select>
                   <button className="btn-secondary" onClick={handleUpdate}>Submit</button>
            </div>
          )}
      </div>

      {/* Address */}
      <div className="text-sm text-gray-600 max-w-xs">
        <p className="font-medium text-gray-800">{address.name}</p>
        <p>{address.phone}</p>
        <p>
          {address.area}, {address.city}
        </p>
        <p>
          {address.state}, {address.country}
        </p>
        <p>PIN: {address.zipcode}</p>
      </div>
    </div>
  )
}

export default SellerOrderCard