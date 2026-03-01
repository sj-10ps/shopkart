import connectDB from "@/config/config"
import cart from "@/models/Cart"
import authOptions from "@/utils/authOptions"
import { getServerSession } from "next-auth"

export const GET=async()=>{
    try {
        await connectDB()
        const session=await getServerSession(authOptions)
        if(!session||!session.user){
            return new Response(JSON.stringify({message:'unauthorized'}),{status:401})
        }
      
        const data=await cart.find({user:session.user.id}).populate('product')
        return new Response(JSON.stringify(data))
    } catch (error) {
             return new Response(JSON.stringify(error.message),{status:500})
    } 
}