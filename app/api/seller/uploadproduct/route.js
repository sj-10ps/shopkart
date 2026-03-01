import cloudinary from "@/config/cloudinary"
import connectDB from "@/config/config"
import Product from "@/models/Product"
import Seller from "@/models/Seller"
import authOptions from "@/utils/authOptions"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const POST=async(req)=>{
    try {
        await connectDB()
        const data = await req.formData();
        
        const title = data.get("title");
        const price = data.get("price");
        const description = data.get("description");
        const category = data.get("category");
        const count = data.get("count");
        const images = data.getAll("image"); // Gets all files appended as 'image'
        console.log(title)
        const session=await getServerSession(authOptions)
        if(!session||!session.user){
             return NextResponse.json('unauthorized',{status:401})
        }
        const sellerData=await Seller.findOne({owner:session.user.id})
        const uploadedImages=[]
        for(let i of images){
            const imgbuffer=Buffer.from(await i.arrayBuffer())
            await new Promise((resolve,reject)=>{
                const stream=cloudinary.uploader.upload_stream({folder:'shopkart'},(error,result)=>{
                    if(error){
                        reject('failed to upload')
                    }else{
                        uploadedImages.push(result.secure_url)
                        resolve(result)
                    }
                })

                stream.end(imgbuffer)
            })
        }
        await Product.create({
           title,
           price,
           description,
           category,
           image:uploadedImages,
           count,
           addedBy:sellerData._id
        })
        return NextResponse.json({message:"succesfully added"},{status:200})
    } catch (error) {
          return NextResponse.json(error.message,{status:500})
    }
}