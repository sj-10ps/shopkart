import connectDB from "@/config/config"
import Order from "@/models/Order"
import Product from "@/models/Product"
import authOptions from "@/utils/authOptions"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const PUT=async(request,{params})=>{
    try {
        await connectDB()
        console.log("eghvfyfyuwef")
        const {id}=await params
        const defaultstatus=await request.json()
    
      
        const session=await getServerSession(authOptions)
        if(!session||!session.user){
            return NextResponse.json('unauthorized',{status:401})
        } 
        await Order.findByIdAndUpdate(id,{status:defaultstatus})
        return NextResponse.json({message:'updated'},{status:200})
    } catch (error) {
          return NextResponse.json({message:error.message},{status:500})
    }
}