import { apiSlice } from "../../app/api/apiSlice";
import { logout, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //- this is the login endpoint ( log a user in )
        login: builder.mutation({
            //- pass in the credentials as an arg ( access token )
            query: (credentials) => ({
                url: "/auth",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        //- this is the logout endpoint ( log a user out )
        sendLogout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            //- onQueryStarted is useful for optimistic updates
            //- it shows the immediate change of cache data
            //- arg is needed as the first argument even if your not using it
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    //- if query has been fulfilled
                    // const { data } =
                    await queryFulfilled;
                    // console.log(data);
                    //- dispatch the logout reducer
                    dispatch(logout());
                    //- reset the api state (clear the cache)
                    //- use setTimeout to allow the subscriptions to be unsubcribed
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState());
                    }, 1000);
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        //- this is the refresh endpoint ( refresh access for user )
        refresh: builder.mutation({
            query: () => ({
                url: "/auth/refresh",
                method: "GET",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const { accessToken } = data;
                    dispatch(setCredentials({ accessToken }));
                } catch (error) {
                    // console.log(error);
                }
            },
        }),
    }),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } = authApiSlice;
