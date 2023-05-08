import { Task } from "../model/Tasks.js";

//- Get All tasks
export const getAllTasks = async (req, res) => {
    const tasks = await Task.find();

    if (!tasks?.length) {
        return res.status(400).json({ message: "No Tasks found" });
    }

    res.json(tasks);
};

//- Create a new task
export const createTask = async (req, res) => {
    const { name, user_id } = req.body;

    //- confirm data
    if (!name || !user_id) {
        return res.status(400).json({ message: "All Fields are required" });
    }

    //- check for duplicate task
    const duplicate = await Task.findOne({ name });

    if (duplicate) {
        return res.status(409).json({ message: "Note Already Exists" });
    }

    //- create and store the new task
    const task = await Task.create({ name, user_id });

    task
        ? res.status(201).json({ message: "Task created" })
        : res.status(400).json({ message: "Invalid Task Data recieved" });
};
