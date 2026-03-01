import Image from "next/image";
import React from "react";
import { FaCashRegister } from "react-icons/fa";
import Paymentcard from "./Paymentcard";

const OrdersCard = ({ order }) => {
  const { product, address, count, createdAt } = order;

  return (
    <div className="w-full bg-white rounded-xl shadow-md p-4 flex flex-col gap-4 md:flex-row">
      
      {/* Product Image */}
      <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden border relative">
        <Image
          src={product?.image?.[0]}
          alt={product?.title}
          fill
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {product?.title}
        </h2>

        <p className="text-sm text-gray-500">
          Category: {product?.category}
        </p>

        <div className="flex items-center gap-4 text-sm">
          <span className="font-medium text-green-600">
            ₹{product?.price}
          </span>
          <span className="text-gray-600">
            Qty: {count}
          </span>
        </div>
         <p className="text-xs text-gray-400">
          Total: {product.price*count}
        </p>

        <p className="text-xs text-gray-400">
          Ordered on: {new Date(createdAt).toLocaleDateString()}
        </p>
         <p className="text-xs text-gray-400">
          Order Status: {order.status}
        </p>
        {order.payment==="done"?(
         <div className="btn-tertiary w-fit hover:scale-100">
            payment done
         </div>
        ):(
            <Paymentcard orderId={order._id}/>
        )}
        
      </div>

      {/* Address */}
      <div className="w-full md:w-72 bg-gray-50 rounded-lg shadow-inner p-3 text-sm">
        <p className="font-semibold text-gray-700 mb-1">
          Delivery Address
        </p>

        <p className="text-gray-600">
          {address?.name}, {address?.phone}
        </p>

        <p className="text-gray-600">
          {address?.area}, {address?.landmark}
        </p>

        <p className="text-gray-600">
          {address?.city}, {address?.district}
        </p>

        <p className="text-gray-600">
          {address?.state} - {address?.zipcode}
        </p>
      </div>
    </div>
  );
};

export default OrdersCard;