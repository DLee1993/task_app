import { Task } from "../model/Tasks.js";
import asyncHandler from "express-async-handler";

//- Get All tasks
export const getAllTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find().lean();

    if (!tasks?.length) {
        return res.status(404).json({ message: "No tasks found" });
    }

    res.json(tasks);
});

//- Create a new task
export const createTask = asyncHandler(async (req, res) => {
    const { user, task_title, task_description, category, completed } = req.body;

    //- confirm data
    if (!user || !task_title || !task_description) {
        return res.status(400).json({ message: "All Fields required" });
    }

    //- check for existing user with same data
    const duplicate = await Task.findOne({ task_title }).lean().exec();

    if (duplicate && duplicate.user === user) {
        return res.status(409).json({ message: "Task Title already exists" });
    }

    //- create new user
    const taskObject = { user, task_title, task_description, category, completed };

    const task = await Task.create(taskObject);

    if (task) {
        //created
        res.status(201).json({ message: `New task created` });
    } else {
        res.status(400).json({ message: "Invalid user data received" });
    }
});

//- update a task
export const updateTask = asyncHandler(async (req, res) => {
    const { id, user, task_title, category, task_description, completed } = req.body;

    //- confirm data
    if (
        !id ||
        !user ||
        !task_title ||
        !task_description ||
        !category ||
        typeof completed !== "boolean"
    ) {
        return res.status(400).json({ message: "All Fields are required" });
    }

    //- find the task
    const task = await Task.findById(id).exec();

    if (!task) {
        res.status(404).json({ message: "Task not found" });
    }

    //- check for duplicate title
    const duplicate = await Task.findOne({ task_title })
        .collation({ locale: "en", strength: 2 })
        .lean()
        .exec();

    if (duplicate && duplicate?._id.toString() !== id && task.user === user) {
        return res.status(409).json({ message: "Task Title already exists" });
    }

    //- add the new values to the task
    task.user = user;
    task.task_title = task_title;
    task.task_description = task_description;
    task.category = category;
    task.completed = completed;

    //- save the recently updated task
    await task.save();

    res.json({ message: "Task Updated" });
});

//- delete a task
export const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.body;

    //- confirm data
    if (!id) {
        return res.status(400).json({ message: "Task id Required" });
    }

    //- find the task
    const task = await Task.findById(id);

    if (!task) {
        res.status(404).json({ message: "Task not found" });
    }

    const result = await task.deleteOne();

    res.status(200).json({ message: "Task Deleted" });
});
