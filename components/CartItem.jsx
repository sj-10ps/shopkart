import { fetchcartdata, updatecart } from "@/redux/cartSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import { HiChevronDoubleRight } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

const CartItem = ({ data, count ,cartId,setrefresh}) => {


  const dispatch = useDispatch();
  const router = useRouter();
  const handleincrement = async(e) => {
    e.stopPropagation();
    await dispatch(updatecart({productId:cartId,action:"add"})).unwrap()
    
    setrefresh(prev=>!prev)
    

  };

    const handledecrement = async(e) => {
    e.stopPropagation();
    await dispatch(updatecart({productId:cartId,action:"remove"})).unwrap()
    setrefresh(prev=>!prev)

    
  
  };


  return (
    <div
      className="bg-white p-2 shadow-xl rounded-lg flex md:flex-row flex-col gap-5 hover:-translate-y-2 duration-500"
      onClick={() => router.push(`/user/products/${data._id}`)}
    >
      <div className="h-48 md:w-48 w-full relative">
        <Image
          src={data.image[0]}
          fill
          alt=""
          className="object-contain"
        ></Image>
        <p className="absolute bg-red-400 p-1 rounded-sm right-0 text-blue-950">
          Rs. {data.price}
        </p>
      </div>
      <div className="bg-gray-200 rounded-md shadow-inner p-2 flex flex-col gap-2 w-full">
        <p className="capitalize font-bold text-cyan-600">{data.title}</p>
        <p className="flex items-center gap-1 bg-green-500 w-fit px-2 rounded-md text-white">
          <FaStar /> {data.rate}
        </p>
        <ul>
          {data.description
            .split(",")
            .slice(0, 4)
            .map((d, i) => (
              <li key={i} className="flex items-center md:max-w-xl ">
                {" "}
                <HiChevronDoubleRight />
                {d}
              </li>
            ))}
        </ul>
        <p className="bg-white p-2 w-fit rounded-lg">
          <span className="font-bold">Count:</span> {count}
        </p>
        <div className="bg-gray-200 rounded-md shadow-inner p-2 flex flex-col gap-1 mt-4">
          <div className="self-center flex items-center gap-2 my-2">
            <button
              className="h-8 w-8 rounded-full flex justify-center items-center bg-white"
              onClick={handledecrement}
            >
              -
            </button>
            <p>{count}</p>
            <button
              className="h-8 w-8 rounded-full flex justify-center items-center bg-white"
              onClick={handleincrement}
              disabled={count === 15}
            >
              +
            </button>
          </div>
          <p>Total Amount: {count * data.price}</p>
        
        </div>
      </div>
    </div>
  );
};

export default CartItem;
