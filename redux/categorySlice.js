import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCategories=createAsyncThunk(
    "category/fetchcategories",
    async(_,{rejectWithValue})=>{
      try {
        const res=await fetch('/api/user/productcategories',{cache:'no-store'})
        if(!res.ok){
            return rejectWithValue("failed to fetch")
        }
        const data=await res.json()
        
        return data
      } catch (error) {
        console.log(error)
        return rejectWithValue(error)
      }
    }
)

const categorySlice=createSlice({
    name:"category",
    initialState:{
        loading:false,
        success:false,
        categories:[]
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCategories.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.categories=action.payload
        })
        .addCase(fetchCategories.pending,(state,action)=>{
            state.loading=true
            state.success=false
        })
        .addCase(fetchCategories.rejected,(state,action)=>{
            state.error=action.payload
            state.success=false
            state.loading=false
        })
    }
})
export const categoryReducer=categorySlice.reducer