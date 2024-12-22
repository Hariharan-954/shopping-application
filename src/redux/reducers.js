import { ADD_To_CART, DELETE_FROM_CART, UPDATE_FROM_CART, PRODUCT_TO_CART, SUB_TOTAL, ADD_TO_WISHLIST, DELETE_FROM_WISHLIST } from "./actionTypes";
import { Products } from "../data/Products";

export const initialState = {

    allProducts : Products,
    cartItems: [],
    priceSubTotal: 0
}



export const cartReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_To_CART:
            if (state.cartItems.some(item => item.id === action?.payload?.id)) {
                const updatedCartItems = state.cartItems.map(item => {
                    if (item.id === action?.payload?.id) {
                        const updatedQuantity = Number(item.quantity) + 1;
                        const unitPrice = parseFloat(item.price) / Number(item.quantity);
                        return {
                            ...item,
                            quantity: updatedQuantity,
                            price: (unitPrice * updatedQuantity).toString(),
                        };
                    }
                    return item;
                });

                return {
                    ...state,
                    cartItems: updatedCartItems,
                    priceSubTotal: state.priceSubTotal + Number(action?.payload.price)

                };
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, action?.payload],
                    priceSubTotal: state.priceSubTotal + Number(action?.payload.price)
                };
            }

        case DELETE_FROM_CART:
            const deleteObj = action?.payload
            return {
                ...state,
                cartItems: state.cartItems.filter((value) => {
                    return value !== deleteObj
                }),
                priceSubTotal: state.priceSubTotal - Number(deleteObj.price)
            }

        case UPDATE_FROM_CART:
            const obj = action.payload
            const type = action.payload?.updateType
            const findedObj = state.allProducts?.find((item) => item.id === obj.id)

            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    (item.id === obj?.id ? { ...item, ...obj } : item)),
                priceSubTotal: type === 'INC' ? state.priceSubTotal + Number(findedObj.price) : state.priceSubTotal - Number(findedObj.price)
            }

        case PRODUCT_TO_CART:

            if (state.cartItems.some(item => item.id === action?.payload?.id)) {

                const updatedCartItems = state.cartItems.map(item => {
                    if (item.id === action?.payload?.id) {
                        const updatedQuantity = Number(item.quantity) + Number(action?.payload.quantity)
                        const unitPrice = parseFloat(item.price) / Number(item.quantity);
                        return {
                            ...item,
                            quantity: updatedQuantity,
                            price: (unitPrice * updatedQuantity).toString(),
                        };
                    }
                    return item;
                });

                return {
                    ...state,
                    cartItems: updatedCartItems,
                    priceSubTotal: state.priceSubTotal + (Number(action.payload.quantity) * Number(action?.payload.price))
                };

            }
            else {

                let item = action.payload
                const updatedQuantity = Number(item.quantity)
                const unitPrice = parseFloat(item.price)
                console.log(unitPrice,"unitPrice")
                const updatedItem = {
                    ...item,
                    quantity: updatedQuantity,
                    price: (unitPrice * updatedQuantity).toString(),
                };
                return {
                    ...state,
                    cartItems: [...state.cartItems, updatedItem],
                    priceSubTotal: state.priceSubTotal + Number(updatedItem.price)
                };

            }

        case SUB_TOTAL:
            const item = action.payload
            const price = Number(item.price)
            return {
                ...state,
                priceSubTotal: item?.isChecked ? state.priceSubTotal + Number(price) : state.priceSubTotal - Number(price)
            }

        case ADD_TO_WISHLIST:
            return {
                ...state,
                allProducts: state.allProducts.map((item) => {
                    if (item.id === action?.payload?.id) {
                        return {
                            ...item,
                            wishList : action.payload.wishList
                        };
                    }
                    return item;
                })
            }

        case DELETE_FROM_WISHLIST:
            return {
                ...state,
                allProducts: state.allProducts.map((item) => {
                    if (item.id === action?.payload?.id) {
                        return {
                            ...item,
                            wishList : action.payload.wishList
                        };
                    }
                    return item;
                })
            }

        default:
            return state
    }

}