import connectDB from "@/config/config"
import Order from "@/models/Order"
import authOptions from "@/utils/authOptions"
import { getServerSession } from "next-auth"
import Product from "@/models/Product"
import Address from "@/models/Address"

export const GET=async()=>{
    try {
        await connectDB()
        const session=await getServerSession(authOptions)
        if(!session||!session.user){
            return new Response('unauthorized',{status:401})
        }
        const data=await Order.find({user:session.user.id}).populate('product').populate('address')
        return new Response(JSON.stringify(data),{status:200})
    } catch (error) {
        return new Response(JSON.stringify(error.message),{status:500})
    }
}