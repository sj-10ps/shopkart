import connectDB from "@/config/config"
import Product from "@/models/Product"
import authOptions from "@/utils/authOptions"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const PUT=async(request,{params})=>{
    try {
        await connectDB()
        const {id}=await params
        const defaultcount=await request.json()
    
      
        const session=await getServerSession(authOptions)
        if(!session||!session.user){
            return NextResponse.json('unauthorized',{status:401})
        } 
        await Product.findByIdAndUpdate(id,{count:defaultcount})
        return NextResponse.json({message:'updated'},{status:200})
    } catch (error) {
          return NextResponse.json({message:error.message},{status:500})
    }
}