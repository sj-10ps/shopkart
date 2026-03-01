import mongoose from "mongoose";


let isConnected=false;
const connectDB=async()=>{
    try {
        const mongourl=process.env.MONGO_URL
        if(!mongourl){
            throw new Error("Mongourl not found")
        }

        if(isConnected){  
         console.log("Db already connected")
         return
        }
        mongoose.connect(mongourl)
        isConnected=true 
        console.log("database connected")      
        
    } catch (error) {
        console.log(error)
    }
}

export default connectDB