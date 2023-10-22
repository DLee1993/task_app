/* eslint-disable no-unused-vars */
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //- get all the users
        getUsers: builder.query({
            query: () => "/users",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            transformResponse: (responseData) => {
                const loadedUsers = responseData.map((user) => {
                    //- set the user id to _id
                    //- we have to do this as its looking for an id property not an _id property
                    user.id = user._id;
                    return user;
                });
                //-  accepts an array of entities and replaces all existing entities with the values in the array.
                return usersAdapter.setAll(initialState, loadedUsers);
            },
            //- provides tags that can be invalidated
            providesTags: (result, error, arg) => {
                //- if there are ids send back the User type and id list along with the mapping over the ids so any one of the ids can invalidate the tags
                if (result?.ids) {
                    return [
                        { type: "User", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "User", id })),
                    ];
                } else return [{ type: "User", id: "LIST" }];
            },
        }),
        addNewUser: builder.mutation({
            query: (initialUser) => ({
                url: "/users",
                method: "POST",
                body: {
                    ...initialUser,
                },
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
        updateUser: builder.mutation({
            query: (initialUser) => ({
                url: "/users",
                method: "PATCH",
                body: {
                    ...initialUser,
                },
            }),
            invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/users`,
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice;

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    (usersResult) => usersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
    // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);
