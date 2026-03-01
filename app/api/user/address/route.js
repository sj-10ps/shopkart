import connectDB from "@/config/config"
import Address from "@/models/Address"
import authOptions from "@/utils/authOptions"
import { getServerSession } from "next-auth"

export const GET=async()=>{
    try {
        await connectDB()
        const session=await getServerSession(authOptions)
        if(!session||!session.user){
            return new Response(JSON.stringify({message:'unauthorized'}),{status:401})
        }
        const data=await Address.find({user:session.user.id})
        return new Response(JSON.stringify(data),{status:200})
    } catch (error) {
         return new Response(JSON.stringify({message:error.message}),{status:500})
    }
}

export const POST=async(request)=>{
    try {
        await connectDB()
        const session=await getServerSession(authOptions)
        if(!session||!session.user){
            return new Response(JSON.stringify({message:'unauthorized'}),{status:401})
        }
        const {name,phone,landmark,area,city,district,state,country,zipcode}= await request.json()
   
         await Address.create({
            name,
            phone,
            landmark,
            area,
            city,
            district,
            state,
            country,
            zipcode,
            user:session.user.id
         })
        return new Response(JSON.stringify({message:'successfully added'}),{status:200})
    } catch (error) {
         return new Response(JSON.stringify({message:error.message}),{status:500})
    }
}