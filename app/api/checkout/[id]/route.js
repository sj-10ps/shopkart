import connectDB from "@/config/config"
import Order from "@/models/Order"
import authOptions from "@/utils/authOptions"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const PUT=async(request,{params})=>{
    try {
        await connectDB()
        const {id}=await params
        const session=await getServerSession(authOptions)
        if(!session||!session.user){
            return NextResponse.json({message:'unauthorized'},{status:401})
        }
        await Order.findByIdAndUpdate(id,{payment:'done'})
        return NextResponse.json({message:'Payment succesful'},{status:200})
    } catch (error) {
         return NextResponse.json({message:error.message},{status:500})
    }
}