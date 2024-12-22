import { ADD_To_CART, DELETE_FROM_CART, UPDATE_FROM_CART, PRODUCT_TO_CART, SUB_TOTAL, ADD_TO_WISHLIST, DELETE_FROM_WISHLIST } from "./actionTypes";

export const addToCart = (item) => {
    
    return {
        type: ADD_To_CART,
        payload: item
    }
}


export const deleteFromCart = (item) => ({
    type: DELETE_FROM_CART,
    payload: item
})

export const updateFromCart = (item) => ({
    type: UPDATE_FROM_CART,
    payload: item
})

export const productToCart = (item) => ({
    type: PRODUCT_TO_CART,
    payload: item
})

export const subTotal = (item) => ({
    type: SUB_TOTAL,
    payload: item
})

export const addToWishList = (item) => ({
    type: ADD_TO_WISHLIST,
    payload: item
})

export const deleteFromWishlist = (item) => ({
    type: DELETE_FROM_WISHLIST,
    payload: item
})