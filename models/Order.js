import mongoose, { models } from "mongoose"


const OrderSchema=mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    address:{
       type:mongoose.Schema.Types.ObjectId,
        ref:"Address"
    },
    count:{
        type:Number,
        default:1
    },
    status:{
        type:String,
        default:'Order placed'
    },
    payment:{
        type:String,
        default:'COD'
    }
},{
    timestamps:true
})




const Order=mongoose.models.Order||mongoose.model("Order",OrderSchema)
export default Order