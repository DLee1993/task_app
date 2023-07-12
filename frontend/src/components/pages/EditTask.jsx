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
import Header from "../partials/Header";

const EditTask = () => {
    const { id } = useParams();
    const task = useSelector((state) => selectTaskById(state, id));

    const [title, setTitle] = useState(task?.task_title);
    const [description, setDescription] = useState(task?.task_description);
    const [category, setCategory] = useState(task?.category);
    const [completed, setCompleted] = useState(task?.completed);

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
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
        if (isDeleteSuccess) {
            navigate("/dashboard");
            toast.error("Task Deleted", {
                toastId: "deleteSuccessToast",
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }

        if (isError) {
            toast.error(error.data.message, {
                toastId: "saveErrorToast",
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }

        if (isDeleteError) {
            toast.error(deleteError.data.message, {
                toastId: "deleteErrorToast",
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    }, [isSuccess, isDeleteSuccess, isDeleteError, isError, error, deleteError, navigate]);

    const checkMark = () => {
        setCompleted(!completed);
        toast.info("Task Status Updated", {
            toastId: "infoToast",
            position: toast.POSITION.BOTTOM_CENTER,
        });
    };

    const onSaveTaskClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await updateTask({
                id,
                user: task.user,
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
        <>
            <Header title={"Edit a Task"} />
            <section
                id="edit_task_form_container"
                className="flex justify-center items-center flex-col h-screen sm:h-full min-h-[650px] sm:min-h-0 sm:mt-10"
            >
                <form
                    id="editTaskForm"
                    onSubmit={onSaveTaskClicked}
                    className="w-full flex justify-evenly items-center flex-col sm:flex-row"
                >
                    <section className="sm:min-h-[350px] flex justify-between items-center flex-col">
                        <fieldset id="task_title" className="flex flex-col">
                            <label htmlFor="editTask_title" className="text-lg pb-2">
                                Title:
                            </label>
                            <input
                                type="text"
                                id="editTask_title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                autoFocus
                                className="w-80 h-10 pl-1 bg-blue text-silver rounded"
                            />
                        </fieldset>
                        <fieldset id="task_description" className="flex flex-col">
                            <label htmlFor="editTask_description" className="text-lg pb-2">
                                Description:
                            </label>
                            <textarea
                                type="text"
                                id="editTask_description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-80 h-52 pl-1 bg-blue text-silver rounded resize-none"
                            />
                        </fieldset>
                    </section>
                    <section className="sm:min-h-[350px] flex justify-between items-end flex-col mb-14 sm:mb-0">
                        <fieldset id="task_category" className="flex flex-col">
                            <label htmlFor="editTask_category" className="text-lg pb-2">
                                Pick a category for your task:
                            </label>
                            <select
                                name="task_category"
                                id="editTask_category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-80 h-10 pl-1 bg-blue text-silver rounded"
                            >
                                <option value="home">Home</option>
                                <option value="work">Work</option>
                                <option value="university">University</option>
                                <option value="social">Social</option>
                                <option value="exercise">Exercise</option>
                                <option value="health">Health</option>
                            </select>
                        </fieldset>
                        <fieldset className="w-full flex justify-between items-center">
                            <label htmlFor="completedStatus" className="text-lg pb-2 h-5">
                                Mark as {completed ? "incomplete" : "complete"}
                            </label>
                            <input
                                type="checkbox"
                                checked={completed}
                                onChange={() => setCompleted(!completed)}
                                name="completed"
                                id="completedStatus"
                                aria-label={
                                    completed
                                        ? "press spacebar to uncheck the task"
                                        : "press spacebar to check the task"
                                }
                                onClick={checkMark}
                                className="w-5 h-5 cursor-pointer"
                            />
                        </fieldset>
                        <section id="form_btn_group" className="w-full my-10 sm:my-0">
                            <button
                                type="submit"
                                id="form_btn filled color_transition"
                                aria-label="submit updated task button"
                                className="w-full mb-2 cursor-pointer sm:max-w-xs h-10 sm:h-12 text-lg flex justify-center items-center bg-transparent text-blue border-2 border-gray hover:bg-blue hover:border-0 hover:text-silver transition duration-200"
                            >
                                Save Task
                            </button>
                            <button
                                type="button"
                                onClick={onDeleteTaskClicked}
                                id="form_btn warning color_transition"
                                aria-label="delete task button"
                                className="w-full cursor-pointer sm:max-w-xs h-10 sm:h-12 text-lg flex justify-center items-center bg-warningRed hover:bg-red text-silver transition duration-200"
                            >
                                Delete Task
                            </button>
                        </section>
                    </section>
                </form>
            </section>
        </>
    );
};

export default EditTask;
