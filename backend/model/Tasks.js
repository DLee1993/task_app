import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
const genID = uuid(); 

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
            type: [String],
            default: "Home",
        },
        completed: {
            type: Boolean,
            default: false,
        },
        task_id: {
            type: String,
            default: genID
        },
    },
    {
        timestamps: true,
    }
);

export const Task = mongoose.model("tasks", taskSchema);
