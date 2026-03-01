import connectDB from "@/config/config"
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
    const sellerdata=await Seller.findOne({owner:session.user.id})
    const data=await Product.find({addedBy:sellerdata._id})
    return NextResponse.json(data,{status:200})
 } catch (error) {
     return NextResponse.json({status:500})
 }
}