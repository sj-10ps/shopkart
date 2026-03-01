import connectDB from "@/config/config"
import Product from "@/models/Product"
import Seller from "@/models/Seller"

export const GET=async(request,{params})=>{
try {
    await connectDB()
    const {id}=await params
    const data=await Product.findOne({_id:id}).populate('addedBy')
   
    return new Response(JSON.stringify(data),{status:200}) 
} catch (error) {
    return new Response(JSON.stringify({message:error.message}),{status:500})
}
}