import { createSlice } from "@reduxjs/toolkit";

export const profileDataSlice = createSlice({
  name: "profileData",
  initialState: {
    username: "",
    full_name: "",
    email: "",
    cart: [],
    isLoggedIn: false,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => {
        return action.payload !== item;
      });
    },
    setUserData: (state, action) => {
      const { username, full_name, email, cart } = action.payload;
      state.cart = cart;
      state.username = username;
      state.full_name = full_name;
      state.email = email;
      state.isLoggedIn = true;
    },
    updateCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, setUserData, updateCart } =
  profileDataSlice.actions;
export default profileDataSlice.reducer;
