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

//- update a task
export const updateTask = async (req, res) => {
    const { name, user_id } = req.body;

    //- confirm data
    if (!name || !user_id) {
        return res.status(400).json({ message: "All Fields are required" });
    }

    //- find the task
    const task = await Task.findOne({ user_id });

    if (!task) {
        res.status(404).json({ message: "Task not found" });
    }

    //- add the new values to the task
    task.name = name;

    //- save the recently updated task
    await task.save();

    res.json({ message: "Task updated successfully" });
};

//- delete a task
export const deleteTask = async (req, res) => {
    const { user_id } = req.body;

    //- confirm data
    if (!user_id) {
        return res.status(400).json({ message: "Task id Required" });
    }

    //- find the task
    const task = await Task.findOne({ user_id });

    if (!task) {
        res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();

    res.status(200).json({ message: "Task successfully deleted" });
};
