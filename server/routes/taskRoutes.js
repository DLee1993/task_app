import express from "express";
import { getAllTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyJWT)

router.route("/").get(getAllTasks).post(createTask).patch(updateTask).delete(deleteTask);

export default router;
