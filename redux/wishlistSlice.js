

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

export const getwishlist=createAsyncThunk(
    "wishlist/getwishlist",
    async(_,{rejectWithValue})=>{
        try {
            const res=await fetch('/api/user/wishlist')
            const data=await res.json()
            if(!res.ok){
                return rejectWithValue(data.message)
            }
            return data.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const getWishlistbyid=createAsyncThunk(
    'wishlist/getWishlistbyid',
    async(productId,{rejectWithValue})=>{
        try {
            const res=await fetch(`/api/user/wishlist/${productId}`)
            const data=await res.json()
            if(!res.ok){
                return rejectWithValue(data.message)
            }
            return data.existing
        } catch (error) {
             return rejectWithValue(error.message)
        }
    }
)

export const addToWishlist=createAsyncThunk(
    "wishlist/addtowishlist",
    async(productId,{rejectWithValue})=>{
      try {
        const res=await fetch(`/api/user/wishlist/${productId}`,{method:'PUT'})
        const data=await res.json()
        if(!res.ok){
          return rejectWithValue(data.message)
        }
        return data.message
      } catch (error) {
        return rejectWithValue(error.message)
      }
    }
)

export const removeFromWishlist=createAsyncThunk(
    "wishlist/removefromwishlist",
    async(productId,{rejectWithValue})=>{
      try {
        const res=await fetch(`/api/user/wishlist/${productId}`,{method:'DELETE'})
        const data=await res.json()
        if(!res.ok){
          return rejectWithValue(data.message)
        }
        return data.message
      } catch (error) {
        return rejectWithValue(error.message)
      }
    }
)

const wishlistSlice=createSlice({
    name:'wishlist',
    initialState:{
     message:'',
     messageerror:null,
     loading:false,
     success:false,
     existing:false,
     dataerror:null,
     dataloading:false,
     datasuccess:false,
     data:[]
    },
    extraReducers:(builder)=>{
     builder
     .addCase(addToWishlist.fulfilled,(state,action)=>{
        state.message=action.payload
     })
      .addCase(addToWishlist.rejected,(state,action)=>{
           state.error=action.payload
     })
     .addCase(removeFromWishlist.fulfilled,(state,action)=>{
        state.message=action.payload
     })
      .addCase(removeFromWishlist.rejected,(state,action)=>{
           state.error=action.payload
     })
        .addCase(getWishlistbyid.fulfilled,(state,action)=>{
        state.existing=action.payload
        state.success=true
        state.loading=false
     })
      .addCase(getWishlistbyid.pending,(state,action)=>{
        state.loading=true
        state.success=false

     })
      .addCase(getWishlistbyid.rejected,(state,action)=>{
           state.success=false
           state.loading=false
           state.error=action.payload
     })

      .addCase(getwishlist.fulfilled,(state,action)=>{
        state.data=action.payload
        state.datasuccess=true
        state.dataloading=false
     })
      .addCase(getwishlist.pending,(state,action)=>{
        state.dataloading=true
        state.datasuccess=false

     })
      .addCase(getwishlist.rejected,(state,action)=>{
           state.datasuccess=false
           state.dataloading=false
           state.dataerror=action.payload
     })
    }
})

export const WishlistReducer=wishlistSlice.reducer


