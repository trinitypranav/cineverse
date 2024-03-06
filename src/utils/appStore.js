import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";
import darkSlice from "./darkSlice";
import cart from "./cartSlice";
import searchCache from "./searchCacheSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    config: configReducer,
    dark: darkSlice,
    cart: cart,
    searchCache: searchCache,
  },
});

export default appStore;
