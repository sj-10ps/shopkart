const { createAsyncThunk, createSlice, buildCreateSlice } = require("@reduxjs/toolkit");
export const fetchaddress=createAsyncThunk(
    "address/fetchaddress",
       
     async(_,{rejectWithValue})=>{
        try {
            const res=await fetch(`/api/user/address`)
            const data=await res.json()
            if(!res.ok){
                return rejectWithValue('failed to fetch')
            }
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)



const addressSlice=createSlice({
    name:"address",
    initialState:{
        loading:false,
        success:false,
        addressdata:[]
    },
    extraReducers:(builder)=>{
      builder
      .addCase(fetchaddress.pending,(state,action)=>{
        state.loading=true
        state.success=false
      })
      .addCase(fetchaddress.fulfilled,(state,action)=>{
        state.loading=false
        state.success=true
        state.addressdata=action.payload
      })
      
      
    }
})

export const addressReducer=addressSlice.reducer

