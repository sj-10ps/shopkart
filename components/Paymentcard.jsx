"use client"
import { fetchData } from 'next-auth/client/_utils';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaMoneyBill } from 'react-icons/fa'
import { toast } from 'react-toastify';



const Paymentcard = ({ orderId }) => {
  const [loading, setLoading] = useState(false);
  const searchParams=useSearchParams()
  const action=searchParams.get("action")
  const id=searchParams.get('id')
  const router=useRouter()
  const updateStatus=async()=>{
    try {
        const res=await fetch(`/api/checkout/${id}`,{method:"PUT"})
        if(!res.ok){
            throw new Error("failed to update")
        }
        toast.success("updated successfully")
    } catch (error) {
        toast.error(error.message)
    }
  }
  
  useEffect(()=>{
    if(action==="success"){
        updateStatus()
        router.push('/user/ordercheckout')
    }
  },[action])

  const handlepayment = async () => {
    setLoading(true);
    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ orderId }),
    });
    
    const { url } = await res.json();
    if (url) window.location.href = url; // Redirect to Stripe
    
    setLoading(false);
  }

  return (
    <button className="btn-primary" onClick={handlepayment} disabled={loading||action==="success"}>
      <FaMoneyBill/> {loading ? "Connecting..." : "Pay Now"}
    </button>
  )
}

export default Paymentcard;