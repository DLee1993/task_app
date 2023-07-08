//- A store contains all of the state for the entire app
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../appFeatures/auth/authSlice";

//- set up the store for your state
export const store = configureStore({
    //- this is where we add the reducers we create
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    //- getDefaultMiddleware is useful if you want to add some custom middleware, but also still want to have the default middleware added as well:
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

setupListeners(store.dispatch);
