"use client"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import SellerReducer from '../redux/sellerSlice'
import { categoryReducer } from "@/redux/categorySlice"
import {WishlistReducer} from '@/redux/wishlistSlice'
import { cartReducer } from "@/redux/cartSlice"
import { addressReducer } from "@/redux/addressSlice"


const store=configureStore({
    reducer:{
        seller:SellerReducer,
        category:categoryReducer,
        wishlist:WishlistReducer,
        cart:cartReducer,
        address:addressReducer
    }
})


export const ReduxProvider=({children})=>{
    return (
        <Provider store={store}>
          {children}
        </Provider>
    )
}

