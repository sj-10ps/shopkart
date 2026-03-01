import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchSellerProfileData=createAsyncThunk(
    "seller/fetchprofile",
    async(_,{rejectWithValue})=>{
        try {
            const res=await fetch(`/api/seller/profile`)
            
        const data=await res.json()
        if(!res.ok){
            return rejectWithValue(data.message)
        }
     
        return data.data
        } catch (error) {
            console.log(error)
             return rejectWithValue(data.message)
        }
    }
)

const sellerSlice=createSlice({
    name:'seller',
    initialState:{
        loading:false,
        success:false,
        profileData:null,
        error:null
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchSellerProfileData.pending,(state,action)=>{
            state.loading=true
            state.success=false
        })
        .addCase(fetchSellerProfileData.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.profileData=action.payload
        })
         .addCase(fetchSellerProfileData.rejected,(state,action)=>{
              state.loading = false;
        state.success = false;
        state.error = action.payload;
        })
      
    }
})

export default sellerSlice.reducer
