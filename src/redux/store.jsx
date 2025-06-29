import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSilce";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"], // persist these slices
};

const rootReducer = {
  auth: authReducer,
  cart: cartReducer,
};

const persistedReducer = persistReducer(persistConfig, (state, action) => {
  return {
    auth: rootReducer.auth(state?.auth, action),
    cart: rootReducer.cart(state?.cart, action),
  };
});

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
