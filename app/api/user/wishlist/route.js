import connectDB from "@/config/config"
import wishlist from "@/models/Wishlist"
import authOptions from "@/utils/authOptions"
import { getServerSession } from "next-auth"

export const GET=async()=>{
    try {
        await connectDB()
        const session=await getServerSession(authOptions)
        if(!session||!session.user){
            return new Response(JSON.stringify({message:'unauthorized'}),{status:401})
        }
        const userId=await session.user.id
        const data=await wishlist.find({user:userId}).populate('product')
        return new Response(JSON.stringify({data:data}),{status:200})
    } catch (error) {
        return new Response(JSON.stringify({message:error.message}),{status:500})
    }
}