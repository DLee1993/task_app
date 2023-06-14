//- A store contains all of the state for the entire app
import { configureStore } from "@reduxjs/toolkit";

//- set up the store for your state
export const store = configureStore({
    //- this is where we add the reducers we create
    reducer: {},
});
