import mongoose from "mongoose";

const SellerSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: true,
   
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    
    },

    email: {
      type: String,
      required: true,
    
    },

    phone: {
      type: String,
      required: true,

    },

    gstNumber: {
      type: String,
      required: true,
     
    },

    businessAddress: {
      street:{
        type:String
      },
      city:{
        type:String
      },
      state:{
        type:String,
        required:true
      },
      zipcode:{
        type:String,
        required:true
      },
      country:{
        type:String
      }
    },

    bankAccount: {
      accountNumber: {
        type: String,
        required: true,
      },
      ifsc: {
        type: String,
        required: true,
    
      },
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true
  }
);

const Seller =
  mongoose.models.Seller || mongoose.model("Seller", SellerSchema);

export default Seller;