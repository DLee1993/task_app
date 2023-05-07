import { Task } from "../model/Tasks.js";

export const getAllTasks = async (req, res) => {
    const tasks = await Task.find();

    if (!tasks?.length) {
        return res.status(400).json({ message: "No Tasks found" });
    }

    res.json(tasks);
};
