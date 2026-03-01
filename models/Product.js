import mongoose from "mongoose"

const ProductSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    description:{
        type:String,
       
    },
    category:{
        type:String,
        required:true
    },
    image:[{
        type:String,
        required:true
    }],
    rate:{
        type:String,
        default:0
    },
   
    count:{
       type:String,
       required:true
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Seller'
    }

},{
    timestamps:true
})


const Product=mongoose.models.Product||mongoose.model("Product",ProductSchema)
export default Product