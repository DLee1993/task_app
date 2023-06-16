import mongoose from "mongoose";

const currentDate = new Date().toISOString();
const date = currentDate.slice(0, 10);

const taskSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        task_title: {
            type: String,
            required: true,
        },
        task_description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            default: "Home",
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Task = mongoose.model("tasks", taskSchema);
