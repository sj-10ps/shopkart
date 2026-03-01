import mongoose, { models } from "mongoose"


const wishlistSchema=mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
   
},{
    timestamps:true
})


const wishlist=mongoose.models.Wishlist||mongoose.model("Wishlist",wishlistSchema)
export default wishlist