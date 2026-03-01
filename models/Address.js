import mongoose, { Schema } from "mongoose"
import { models,model } from "mongoose"

const AddressSchema=Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:String
    },
    phone:{
        type:String
    },
    landmark:{
      type:String
    },
    area:{
        type:String
    },
    city:{
        type:String
    },
    district:{
        type:String
    },
    state:{
        type:String
    },
    country:{
        type:String
    },
    zipcode:{
        type:String
    }
})

// if (mongoose.models.Address) {
//   delete mongoose.models.Address;
// }

const Address=models.Address||model("Address",AddressSchema)
export default Address