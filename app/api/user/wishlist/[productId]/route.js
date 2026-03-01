import connectDB from "@/config/config"

import wishlist from "@/models/Wishlist"
import authOptions from "@/utils/authOptions"
import { getServerSession } from "next-auth"


export const GET=async(request,{params})=>{
    try {
        await connectDB()
        const {productId}=await params
        const session=await getServerSession(authOptions)
        if(!session||!session.user){
            return new Response(JSON.stringify({message:'unauthorized'}),{status:401})
        }
        const userId=session.user.id
        const existing=await wishlist.findOne({product:productId,user:userId})
        if(!existing){
            return new Response(JSON.stringify({existing:false}),{status:200})
        }
        return new Response(JSON.stringify({existing:true}),{status:200})
    } catch (error) {
         return new Response(JSON.stringify({message:error.message}),{status:200})
    }
}

export const PUT=async(request,{params})=>{
    try {
        await connectDB()
        const session=await getServerSession(authOptions)
        const {productId}=await params
        console.log(productId)
        if(!session||!session.user){
            return new Response(JSON.stringify({message:"unauthorized"}),{status:401})
        }
  
        const userId=session.user.id
        const ifexist=await wishlist.findOne({product:productId,user:userId})
        if(ifexist){
              return new Response(JSON.stringify({message:"already existing"}),{status:200})
        }
        await wishlist.create({
            product:productId,
            user:userId
        })
        return new Response(JSON.stringify({message:"Added succesfully"}),{status:200})
        
    } catch (error) {
          console.log(error.message)
          return new Response(JSON.stringify({message:"failed to add"}),{status:500})
    }
}


export const DELETE=async(request,{params})=>{
    try {
        await connectDB()
        const session=await getServerSession(authOptions)
        const {productId}=await params
        console.log(productId)
        if(!session||!session.user){
            return new Response(JSON.stringify({message:"session not found"}),{status:401})
        }
        const userId=session.user.id
        const product=await wishlist.findOne({
            product:productId
        })
        if (!product) {
            return new Response(JSON.stringify({ message: "Product not found" }), { status: 404 });
        }
        if(product.user.toString()!==userId.toString()){
              return new Response(JSON.stringify({message:"unauthorized user"}),{status:403})
        }
        await wishlist.deleteOne({product:productId})
        return new Response(JSON.stringify({message:"removed succesfully"}),{status:200})
        
    } catch (error) {
          return new Response(JSON.stringify({message:"failed to remove"}),{status:500})
    }
}