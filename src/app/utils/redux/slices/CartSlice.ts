import { createSlice } from "@reduxjs/toolkit";

type CartItem = {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

const initialState: CartItem[] = []
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.find(item => item.id === action.payload.id);
            if (existingProduct) {
                existingProduct.quantity += action.payload.quantity;
            } else {
                state.push(action.payload);
            }
        },
        removeFromCart: (state, action) => {
            return state.filter((item) => item.id !== action.payload)
        },
        updateQuantity: (state, action) => {
            const product = state.find(item => item.id === action.payload.id)
            if(product){
                product.quantity = Math.max(1, action.payload.quantity);
            }
        }
    }
})

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions

export default cartSlice.reducer