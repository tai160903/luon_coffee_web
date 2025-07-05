import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  subtotal: 0,
  discount: 0,
  total: 0,
  pickupTime: "",
  promoCode: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setCheckoutData: (state, action) => {
      state.checkoutData = action.payload;
    },

    clearCheckoutData: (state) => {
      state.checkoutData = initialState.checkoutData;
    },
  },
});

// Export actions
export const { setCheckoutData, clearCheckoutData } = orderSlice.actions;

// Export reducer
export default orderSlice.reducer;
