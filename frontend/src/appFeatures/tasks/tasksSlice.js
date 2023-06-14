import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TASKS_URL = "http://localhost:3500/dashboard";

const initialState = {
    tasks: [],
    status: "idle", //- 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

//- async thunk - this is used to fetch the tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
    const res = await axios.get(TASKS_URL);
    return [...res.data];
});

//- add new task
export const addNewTask = createAsyncThunk("tasks/addNewTask", async (initialTask) => {
    try {
        const res = await axios.task(TASKS_URL, initialTask);
        return res;
    } catch (error) {
        return error.message;
    }
});

//- update a task
export const updateTask = createAsyncThunk("tasks/updateTask", async (initialTask) => {
    //- get the id from the task the user wants to edit
    const { id } = initialTask;
    try {
        const res = await axios.put(`${TASKS_URL}/${id}`, initialTask);
        return res;
    } catch (err) {
        //return err.message;
        return initialTask; // only for testing Redux!
    }
});

//- delete a task
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (initialTask) => {
    const { id } = initialTask;
    try {
        const res = await axios.delete(`${TASKS_URL}/tasks/${id}`);
        if (res?.status === 200) return initialTask;
        return `${res?.status}: ${res?.statusText}`;
    } catch (err) {
        return err.message;
    }
});

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        taskAdded: {
            reducer(state, action) {
                {
                    /* state.tasks.push uses emmerjs, this means emmerjs creates new state for you */
                }
                state.tasks.push(action.payload);
            },
            //- prepare callback allows you to format the data in the slice instead of the in component
            prepare(title, description, userId, category, date) {
                return {
                    payload: {
                        userId: parseInt(userId),
                        task_title: title,
                        task_description: description,
                        category,
                        toBeCompletedBy: date,
                    },
                };
            },
        },
    },
    //- extra reducers allows you to respond to an action
    extraReducers(builder) {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = "succeeded";

                const loadedTasks = action.payload.map((task) => {
                    return task;
                });

                //- Add the fetched tasks to the array
                state.tasks = [...loadedTasks];
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addNewTask.fulfilled, (state, action) => {
                //- user id
                action.payload.userId = Number(action.payload.userId);
                //- date value
                action.payload.date = new Date().toISOString();
                console.log(action.payload);
                //- push new task to state tasks
                state.tasks.push(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                //- if the update fails
                if (!action.payload?.id) {
                    console.log("Update failed");
                    console.log(action.payload);
                    return;
                }
                //- destructure the id from the payload
                const { id } = action.payload;
                //- date value
                action.payload.date = new Date().toISOString();
                //- filter out the task that was updated
                const tasks = state.tasks.filter((task) => task.id !== id);
                //- add the current tasks and the new task to state tasks
                state.tasks = [...tasks, action.payload];
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log("Unable to delete task");
                    console.log(action.payload);
                    return;
                }
                const { id } = action.payload;
                const tasks = state.tasks.filter((task) => task._id !== id);
                state.tasks = tasks;
            });
    },
});

//- by adding this export, it means we only need to change the path to the state here and not in every file
export const selectAllTasks = (state) => state.tasks;
export const selectTaskById = (state, taskId) =>
    state.tasks.tasks.find((task) => task._id === taskId);
export const getTasksStatus = (state) => state.tasks.status;
export const getTasksError = (state) => state.tasks.error;

//- export the actions
export const { taskAdded, reactionAdded } = tasksSlice.actions;

export default tasksSlice.reducer;
