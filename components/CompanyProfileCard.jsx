"use client"
import React, { useEffect } from "react"
import { MdVerified, MdBusiness } from "react-icons/md"
import { FiPhone, FiMail } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { FaSpinner } from "react-icons/fa"
import { fetchSellerProfileData } from "@/redux/sellerSlice"

const CompanyProfileCard = () => {

   const {loading,profileData}=useSelector(state=>state.seller)
   const dispatch=useDispatch()
   const { storeName, email, phone, gstNumber, businessAddress, bankAccount, verified } = profileData ||{}
   useEffect(()=>{
     if(profileData===null){
        dispatch(fetchSellerProfileData())
     }
   },[dispatch])
  
  if(loading){
    return(
        <FaSpinner className="animate-spin"/>
    )
  }
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-6 flex flex-col gap-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MdBusiness className="text-cyan-700" /> {storeName}
        </h2>
        {verified && (
          <span className="flex items-center gap-1 text-green-600 font-semibold">
            <MdVerified /> Verified
          </span>
        )}
      </div>

      {/* Contact info */}
      <div className="flex flex-col md:flex-row gap-4">
        <p className="flex items-center gap-1"><FiMail /> {email}</p>
        <p className="flex items-center gap-1"><FiPhone /> {phone}</p>
        <p>GST: {gstNumber}</p>
      </div>

      {/* Address */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
        <h3 className="font-semibold mb-1">Business Address</h3>
        <p>{businessAddress?.street}, {businessAddress?.city}</p>
        <p>{businessAddress?.state} - {businessAddress?.zipcode}</p>
        <p>{businessAddress?.country}</p>
      </div>

      {/* Bank info */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
        <h3 className="font-semibold mb-1">Bank Account</h3>
        <p>Account Number: {bankAccount?.accountNumber}</p>
        <p>IFSC: {bankAccount?.ifsc}</p>
      </div>
    </div>
  )
}

export default CompanyProfileCard