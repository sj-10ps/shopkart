"use server"
import connectDB from "@/config/config";
import Seller from "@/models/Seller";
import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { email, z } from "zod";


const applicationSchema = z.object({

  storeName: z.string().min(2, "Minimum 2 letters required"),
  email: z.string().email("Invalid email"), 
  phone: z.string().length(10, "Phone number must be exactly 10 digits"),
  gstNumber: z.string().min(6, "6 letters required atleast"),
  accountNumber: z.string().min(10, "10 letter minimum required"),


  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipcode: z.string().min(6,"6 numbers required"),
  country: z.string().min(1, "Country is required"),
  

  ifsc: z.string(),
});


export async function SellerApplicationAction(prevState,formData){
   const data={
    storeName:formData.get('storeName'),
    email:formData.get('email'),
    phone:formData.get('phone'),
    gstNumber:formData.get('gstNumber'),
    accountNumber:formData.get('accountNumber'),
    street:formData.get('street'),
    city:formData.get('city'),
    state:formData.get('state'),
    zipcode:formData.get('zipcode'),
    country:formData.get('country'),
    ifsc:formData.get('ifsc')
   }
   console.log(data)

   const result=applicationSchema.safeParse(data)
   if(!result.success){
    return {
        errors:result.error.flatten().fieldErrors,
        input:data
    }
   }

   try {
    const session=await getServerSession(authOptions)
    await connectDB()
    if(!session||!session.user){
       return{
        error:"unauthorized",
        input:data
       }
    }
    const userId=session.user.id
    if(userId){
        await Seller.create({
            storeName:result.data.storeName,
            owner:userId,
            email:result.data.email,
            phone:result.data.phone,
            gstNumber:result.data.gstNumber,
            businessAddress:{
                street:result.data.street,
                city:result.data.city,
                state:result.data.state,
                zipcode:result.data.zipcode,
                country:result.data.country
            },
            bankAccount:{
                accountNumber:result.data.accountNumber,
                ifsc:result.data.ifsc
            }
        })
        return{
            input:{},
            success:true,
            errors:{}
        }
    }
   } catch (error) {
    console.log(error)
    return{
        error:error,
        input:data,
        
    }
   }
}