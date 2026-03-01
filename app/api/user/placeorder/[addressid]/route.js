import connectDB from "@/config/config"
import cart from "@/models/Cart"
import Order from "@/models/Order"
import authOptions from "@/utils/authOptions"
import { getServerSession } from "next-auth"

export const POST=async(request,{params})=>{
    try {
        await connectDB()
        const {addressid}=await params
        const session=await getServerSession(authOptions)
        if(!session||!session.user){
            return new Response(JSON.stringify({message:'unauthorization'}),{status:401})
        }
        const cartproducts=await cart.find({user:session.user.id})
        for(let cartproduct of cartproducts){
            await Order.create({
                product:cartproduct.product,
                count:cartproduct.count,
                user:session.user.id,
                address:addressid,
                payment:"COD"
            })
        }
        await cart.deleteMany({user:session.user.id})
        return new Response({status:200})
    } catch (error) {
        return new Response({status:500})
    }
}