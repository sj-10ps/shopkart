import connectDB from "@/config/config"
import cart from "@/models/Cart"
import authOptions from "@/utils/authOptions"
import { getServerSession } from "next-auth"

export const POST=async(request,{params})=>{
  try {
    await connectDB()
  
    const {productId}=await params
    const {count}=await request.json()
    const session=await getServerSession(authOptions)
    if(!session||!session.user){
        return new Response(JSON.stringify({message:'no session found'}),{status:401})
    }
    const isexisting=await cart.findOne({product:productId,user:session.user.id})
    if(isexisting){
        return new Response(JSON.stringify({message:'already existing'}),{status:200})
    }
    await cart.create({
        product:productId,
        user:session.user.id,
        count:count
    })
     return new Response(JSON.stringify({message:'Added'}),{status:200})
  } catch (error) {
       return new Response({status:500})
  }
}



export const DELETE=async(request,{params})=>{
  try {
    await connectDB()
  
    const {productId}=await params
    const session=await getServerSession(authOptions)
    if(!session||!session.user){
        return new Response(JSON.stringify({message:'no session found'}),{status:401})
    }
    const isexisting=await cart.findOne({product:productId,user:session.user.id})
    if(isexisting.user.toString()===session.user.id.toString()){
       await cart.deleteOne({
         product:productId
         
       })
        return new Response(JSON.stringify({message:'removed'}),{status:200})
    }
   
    
  } catch (error) {
       return new Response({status:500})
  }
}


export const PUT=async(request,{params})=>{
  try {
    await connectDB()
  
    const {productId}=await params
    
    
    const {searchParams}=new URL(request.url)
    const action=searchParams.get("action")
    const session=await getServerSession(authOptions)
    if(!session||!session.user){
        return new Response(JSON.stringify({message:'no session found'}),{status:401})
    }
    if(action==="add"){
           await cart.findByIdAndUpdate(productId,{$inc:{count:1}})
          return new Response(JSON.stringify({message:'updated'}),{status:200})
    }else{
       
        const cartItem=await cart.findById(productId)
        if(cartItem.count===1){
            await cartItem.deleteOne({_id:productId})
        }
        cartItem.count-=1
        await cartItem.save()
        
          return new Response(JSON.stringify({message:'updated'}),{status:200})
    }
  } catch (error) {
       return new Response({status:500})
  }
}

