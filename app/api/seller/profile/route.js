import connectDB from "@/config/config"
import Seller from "@/models/Seller"
import authOptions from "@/utils/authOptions"
import { getServerSession } from "next-auth"
import { json } from "zod"



export const GET=async()=>{
try {
    await connectDB()
    const session=await getServerSession(authOptions)
    if(!session||!session.user){
        return new Response(JSON.stringify({message:'unauthorized'}),{status:401})
    }
    const userId=session.user.id
    const data=await Seller.findOne({owner:userId})
    if(!data){
        return new Response(JSON.stringify({message:'No Details found'}),{status:404})
    }
    console.log(data)
    return new Response(JSON.stringify({data:data}),{status:200})
} catch (error) {
    console.log(error)
    return new Response({status:500})
}
}