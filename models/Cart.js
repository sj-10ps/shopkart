import mongoose, { models } from "mongoose"


const cartSchema=mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    count:{
        type:Number,
        default:1
    }
},{
    timestamps:true
})


const cart=mongoose.models.Cart||mongoose.model("Cart",cartSchema)
export default cart