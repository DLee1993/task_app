import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

export const Task = mongoose.model('tasks', taskSchema); 