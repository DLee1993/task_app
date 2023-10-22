/* eslint-disable no-unused-vars */
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const tasksAdapter = createEntityAdapter({
    //- sort the tasks based on wether they are completed or not
    sortComparer: (a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1),
});

const initialState = tasksAdapter.getInitialState();

export const tasksApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //- get all the tasks
        getTasks: builder.query({
            query: () => "/dashboard",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            transformResponse: (responseData) => {
                const loadedTasks = responseData.map((task) => {
                    //- set the task id to _id
                    //- we have to do this as its looking for an id property not an _id property
                    task.id = task._id;
                    return task;
                });
                //-  accepts an array of entities and replaces all existing entities with the values in the array.
                return tasksAdapter.setAll(initialState, loadedTasks);
            },
            //- provides tags that can be invalidated
            providesTags: (result, error, arg) => {
                //- if there are ids send back the Task type and id list along with the mapping over the ids so any one of the ids can invalidate the tags
                if (result?.ids) {
                    return [
                        { type: "Task", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "Task", id })),
                    ];
                } else return [{ type: "Task", id: "LIST" }];
            },
        }),
        addNewTask: builder.mutation({
            query: (initialTask) => ({
                url: "/dashboard",
                method: "POST",
                body: {
                    ...initialTask,
                },
            }),
            invalidatesTags: [{ type: "Task", id: "LIST" }],
        }),
        updateTask: builder.mutation({
            query: (initialTask) => ({
                url: "/dashboard",
                method: "PATCH",
                body: {
                    ...initialTask,
                },
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg.id }],
        }),
        deleteTask: builder.mutation({
            query: ({ id }) => ({
                url: `/dashboard`,
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg.id }],
        }),
    }),
});

export const {
    useGetTasksQuery,
    useAddNewTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = tasksApiSlice;

// returns the query result object
export const selectTasksResult = tasksApiSlice.endpoints.getTasks.select();

// creates memoized selector
const selectTasksData = createSelector(
    selectTasksResult,
    (tasksResult) => tasksResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllTasks,
    selectById: selectTaskById,
    selectIds: selectTaskIds,
    // Pass in a selector that returns the tasks slice of state
} = tasksAdapter.getSelectors((state) => selectTasksData(state) ?? initialState);
