import mongoose from "mongoose";
import Inc from "mongoose-sequence";
const AutoIncrement = Inc(mongoose);

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
    },
    {
        timestamps: true,
    }
);

// taskSchema.plugin(AutoIncrement, {
//     inc_field: "task_id",
//     id: "taskNums",
//     start_sequence: 1,
// });

export const Task = mongoose.model("tasks", taskSchema);
