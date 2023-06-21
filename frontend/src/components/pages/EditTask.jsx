//! - THIS IS WHERE WE SELECT TASK BY ID WITH TASKSLICE
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    selectTaskById,
    useDeleteTaskMutation,
    useUpdateTaskMutation,
} from "../../appFeatures/tasks/tasksSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import GoBack from "../../assets/corner-down-left.svg";

const EditTask = () => {
    const { id } = useParams();
    const task = useSelector((state) => selectTaskById(state, id));

    const [title, setTitle] = useState(task.task_title);
    const [description, setDescription] = useState(task.task_description);
    const [category, setCategory] = useState(task.category);
    const [completed, setCompleted] = useState(task.completed);

    const navigate = useNavigate();

    const [deleteTask, { isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }] =
        useDeleteTaskMutation();
    const [updateTask, { isLoading, isSuccess, isError, error }] = useUpdateTaskMutation();

    const canSave = [title, description, category].every(Boolean) && !isLoading;

    useEffect(() => {
        if (isSuccess) {
            navigate("/dashboard");
            toast.success("Task Updated", {
                toastId: "updateSuccessToast",
            });
        }
        if (isDeleteSuccess) {
            navigate("/dashboard");
            toast.success("Task Deleted", {
                toastId: "deleteSuccessToast",
            });
        }

        if (isError) {
            toast.error(error.data.message, {
                toastId: "saveErrorToast",
            });
        }

        if (isDeleteError) {
            toast.error(deleteError.data.message, {
                toastId: "deleteErrorToast",
            });
        }
    }, [isSuccess, isDeleteSuccess, isDeleteError, isError, error, deleteError, navigate]);

    const checkMark = () => {
        setCompleted(!completed);
        toast.info("Task completed Status Updated", {
            toastId: "infoToast",
        });
    };

    const onSaveTaskClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await updateTask({
                id,
                user: "645dd507c4aff17007b29a7f",
                task_title: title,
                task_description: description,
                category,
                completed: completed,
            });
        }
    };

    const onDeleteTaskClicked = async () => {
        await deleteTask({ id: task.id });
    };

    return (
        <section className="edit_task_form_container">
            <img
                src={GoBack}
                alt="back to previous page"
                onClick={() => navigate(-1)}
                className="return_btn"
            />
            <form className="editTaskForm" onSubmit={onSaveTaskClicked}>
                <section>
                    <fieldset className="task_title">
                        <label htmlFor="editTask_title">Title:</label>
                        <input
                            type="text"
                            id="editTask_title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                        />
                    </fieldset>
                    <fieldset className="task_description">
                        <label htmlFor="editTask_description">Description:</label>
                        <textarea
                            type="text"
                            id="editTask_description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </fieldset>
                </section>
                <section>
                    <fieldset className="task_category">
                        <label htmlFor="editTask_category">Pick a category for your task:</label>
                        <select
                            name="task_category"
                            id="editTask_category"
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
                    <section className="form_btn_group">
                        <button
                            type="submit"
                            className="form_btn filled color_transition"
                            aria-label="submit updated task button"
                        >
                            Save Task
                        </button>
                        <button
                            type="button"
                            className="form_btn outline color_transition"
                            onClick={checkMark}
                            aria-label="check task button"
                        >
                            {!completed ? "Mark as complete" : "Mark as incomplete"}
                        </button>
                        <button
                            type="button"
                            onClick={onDeleteTaskClicked}
                            className="form_btn warning color_transition"
                            aria-label="delete task button"
                        >
                            Delete Task
                        </button>
                    </section>
                </section>
            </form>
        </section>
    );
};

export default EditTask;
