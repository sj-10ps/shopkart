import connectDB from "@/config/config"
import Order from "@/models/Order"
import Product from "@/models/Product"
import Seller from "@/models/Seller"
import authOptions from "@/utils/authOptions"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const GET=async()=>{
    try {
        await connectDB()
        
      
        const session=await getServerSession(authOptions)
        if(!session||!session.user){
            return NextResponse.json('unauthorized',{status:401})
        } 
        const SellerData=await Seller.findOne({owner:session.user.id})
   
        const productData=await Product.find({addedBy:SellerData._id})

        const productsIds=productData.map(p=>p._id)
    
        const data=await Order.find({product:{$in:productsIds}}).populate('product').populate('address')
        return NextResponse.json(data,{status:200})
    } catch (error) {
          return NextResponse.json({message:error.message},{status:500})
    }
}