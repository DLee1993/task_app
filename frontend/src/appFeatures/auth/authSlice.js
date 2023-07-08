import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { token: null },
    reducers: {
        //- set the access token
        setCredentials: (state, action) => {
            const { accessToken } = action.payload;
            state.token = accessToken;
        },
        //- remove the accessToken
        // eslint-disable-next-line no-unused-vars
        logout: (state, action) => {
            state.token = null;
        },
    },
});

//- export the slice actions
export const { setCredentials, logout } = authSlice.actions;
//- export the reducer
export default authSlice.reducer;
//- export the selector to get the token
export const selectCurrentToken = (state) => state.auth.token;
