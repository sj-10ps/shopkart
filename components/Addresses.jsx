"use client";
import { fetchaddress } from "@/redux/addressSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "./LoadingComponent";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import { FaPlus } from "react-icons/fa";

const Addresses = () => {
  const { loading, addressdata } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const [showform,setshowform]=useState(false)
  const [refresh,setRefresh]=useState(false)
  useEffect(() => {
    dispatch(fetchaddress());
  }, [dispatch,refresh]);

  return (
    <div className="bg-white shadow-xl p-2 flex flex-col gap-2 relative">
      <div className="m-3">
        {loading ? (
          <LoadingComponent />
        ) : addressdata.length === 0 ? (
          <div>No Saved Addresses found</div>
        ) : (
          <div className="flex flex-col gap-2">
            <h2>Choose an address</h2>
            {addressdata.map((a) => (
              <AddressCard key={a._id} data={a} />
            ))}
          </div>
        )}
      </div>
     <div>
        
     </div>
     <button onClick={()=>setshowform(prev=>!prev)} className="self-center flex items-center gap-1 btn-primary"><FaPlus/>Add Address</button>
      {showform&&(
        <AddressForm setRefresh={setRefresh}/>
      )}
     
    </div>
  );
};

export default Addresses;
