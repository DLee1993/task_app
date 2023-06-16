//! - THIS IS WHERE WE SELECT TASK BY ID WITH TASKSLICE
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    selectTaskById,
    useDeleteTaskMutation,
    useUpdateTaskMutation,
} from "../../appFeatures/tasks/tasksSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mantine/core";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "react-toastify";

const EditTask = () => {
    const { id } = useParams();
    const task = useSelector((state) => selectTaskById(state, id));

    const [title, setTitle] = useState(task.task_title);
    const [description, setDescription] = useState(task.task_description);
    const [category, setCategory] = useState(task.category);

    const navigate = useNavigate();

    const [deleteTask] = useDeleteTaskMutation();
    const [updateTask, { isLoading, isSuccess, isError, error }] = useUpdateTaskMutation();

    const canSave = [title, description, category].every(Boolean) && !isLoading;

    useEffect(() => {
        if (isSuccess) {
            navigate("/dashboard");
        }

        if (isError) {
            toast.error(`${error.data.message}`);
        }
    }, [isSuccess, isError, error, navigate]);

    const onSaveTaskClicked = async (e) => {
        e.preventDefault();
        await updateTask({
            id,
            user: "645dd507c4aff17007b29a7f",
            task_title: title,
            task_description: description,
            category,
            completed: task.completed,
        });
        navigate("/dashboard");
        window.location.reload();
    };

    const onDeleteTaskClicked = async () => {
        await deleteTask({ id: task.id });
        navigate("/dashboard");
        window.location.reload();
    };

    return (
        <section className="edit_task_form_container">
            <IoArrowBack size={25} onClick={() => navigate(-1)} className="return_btn" />
            <form className="editTaskForm" onSubmit={onSaveTaskClicked}>
                <section>
                    <fieldset className="task_title">
                        <label htmlFor="task_title">Title:</label>
                        <input
                            type="text"
                            id="task_title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </fieldset>
                    <fieldset className="task_description">
                        <label htmlFor="task_description">Description:</label>
                        <textarea
                            type="text"
                            id="task_description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </fieldset>
                </section>
                <section>
                    <fieldset className="task_category">
                        <label htmlFor="task_category">Pick a category for your task:</label>
                        <select
                            name="task_category"
                            id="task_category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="home">Home</option>
                            <option value="work">Work</option>
                            <option value="university">University</option>
                            <option value="social">Social</option>
                            <option value="exercise">Exercise</option>
                            <option value="health">Health</option>
                        </select>
                    </fieldset>
                    <Button.Group className="form_btn_group">
                        <Button onClick={onDeleteTaskClicked} className="warning color_transition">
                            Delete Task
                        </Button>
                        <Button
                            type="submit"
                            disabled={!canSave}
                            className="filled color_transition"
                        >
                            Update Task
                        </Button>
                    </Button.Group>
                </section>
            </form>
        </section>
    );
};

export default EditTask;
