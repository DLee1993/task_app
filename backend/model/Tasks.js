import mongoose from "mongoose";
import Inc from "mongoose-sequence";
const AutoIncrement = Inc(mongoose);

const date = new Date();
let currentDay = String(date.getDate()).padStart(2, "0");
let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
let currentYear = date.getFullYear();
// we will display the date as DD-MM-YYYY
let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

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
        toBeCompletedBy: {
            type: String,
            default: currentDate,
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

taskSchema.plugin(AutoIncrement, {
    inc_field: "ticket",
    id: "ticketNum",
    start_seq: 100,
});

export const Task = mongoose.model("tasks", taskSchema);
