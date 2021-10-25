import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    full_name: "",
    email: "",
    cart: [],
    type: ""
}

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        updateUserData: (state, action) => {
            const { email, full_name, cart, type } = action.payload;
            state.full_name = full_name;
            state.email = email;
            state.cart = cart;
            state.type = type;
        },
        upadateCartData: (state, action) => {
            state.cart = action.payload;
        },
        resetUserData: (state) => {
            state.cart = []
            state.full_name = ""
            state.email = ""
            state.type = ""
        }
    },
})

export const { updateUserData, upadateCartData, resetUserData } = userSlice.actions;
export default userSlice.reducer;