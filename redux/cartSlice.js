const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
export const updatecart=createAsyncThunk(
    "cart/updatecart",
    async({productId,action},{rejectWithValue})=>{
        try {
            const res=await fetch(`/api/user/cart/${productId}?action=${action}`,{method:'PUT'})
            const data=res.json()
            if(!res.ok){
                return rejectWithValue(data.message)
            }
            return data.message
        } catch (error) {
            return rejectWithValue(data.error)
        }
    }
)

export const addtoCart=createAsyncThunk(
    "cart/addtocart",
    async({productId,count},{rejectWithValue})=>{
        try {
            const res=await fetch(`/api/user/cart/${productId}`,{method:'POST',body:JSON.stringify({count:count})})
            const data=res.json()
            if(!res.ok){
                return rejectWithValue(data.message)
            }
            return data.message
        } catch (error) {
            return rejectWithValue(data.error)
        }
    }
)

export const removefromcart=createAsyncThunk(
    "cart/removefromcart",
    async(productId,{rejectWithValue})=>{
        try {
            const res=await fetch(`/api/user/cart/${productId}`,{method:'DELETE'})
            const data=res.json()
            if(!res.ok){
                return rejectWithValue(data.message)
            }
            return data.message
        } catch (error) {
            return rejectWithValue(data.error)
        }
    }
)

export const fetchcartdata=createAsyncThunk(
    "cart/fetchcartdata",
    async(_,{rejectWithValue})=>{
        try {
            const res=await fetch(`/api/user/cart`)
            const data=res.json()
            if(!res.ok){
                return rejectWithValue(data.message)
            }
            return data
        } catch (error) {
            return rejectWithValue(data.error)
        }
    }
)


const cartSlice=createSlice({
    name:'cart',
    initialState:{
      
        cartCount:0,
        loading:false,
        success:false,
        message:null,
        error:null,
        deleteloading:false,
        deletesuccess:false,
        cartloading:false,
        cartsuccess:false,
        cartData:[]
    },
    extraReducers:(builder)=>{
        builder
        .addCase(addtoCart.pending,(state,action)=>{
            state.loading=true
            state.success=false
        })
         .addCase(addtoCart.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.message=action.payload
        })
         .addCase(removefromcart.pending,(state,action)=>{
            state.deleteloading=true
            state.deletesuccess=false
        })
         .addCase(removefromcart.fulfilled,(state,action)=>{
            state.deleteloading=false
            state.deletesuccess=true
            state.message=action.payload
        })
         .addCase(fetchcartdata.pending,(state,action)=>{
            state.cartloading=true
            state.cartsuccess=false
        })
         .addCase(fetchcartdata.fulfilled,(state,action)=>{
            state.cartloading=false
            state.cartsuccess=true
             let total = 0
  for (const item of action.payload) {
    total += item.count
  }
  state.cartCount = total

            state.cartData=action.payload
         
        })
    }
})

export const cartReducer=cartSlice.reducer