import express from "express";
import { getAllTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js";

const router = express.Router();

router.route("/").get(getAllTasks).post(createTask).patch(updateTask).delete(deleteTask);

export default router;
