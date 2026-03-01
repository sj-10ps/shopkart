import connectDB from "@/config/config"
import Product from "@/models/Product"

export const GET=async()=>{
    try {
        await connectDB()
        const categories=await Product.distinct("category")
        return new Response(JSON.stringify(categories),{status:200})
    } catch (error) {
        console.log(error.message)
        return new Response(JSON.stringify(error),{status:500})
    }
}