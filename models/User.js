import { Schema } from "mongoose"
import { models,model } from "mongoose"

const userSchema=Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    image:{
         type:String,
    }
})

const User=models.User||model("User",userSchema)
export default User