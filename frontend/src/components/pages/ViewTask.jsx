import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { selectTaskById, useDeleteTaskMutation } from "../../appFeatures/tasks/tasksSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../partials/Header";

const ViewTask = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const task = useSelector((state) => selectTaskById(state, id));
    const createdAt = task.createdAt.slice(0, 10);
    const updatedAt = task.updatedAt.slice(0, 10);

    const [deleteTask, { isSuccess, isError, error }] = useDeleteTaskMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate("/dashboard");
            toast.error("Task Deleted", {
                toastId: "deleteSuccessToast",
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
        if (isError) {
            toast.error(error.data.message, {
                toastId: "deleteErrorToast",
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    }, [isSuccess, isError, error, navigate]);

    const handleEditRedirect = () => {
        navigate(`/dashboard/edit/${id}`);
    };

    const onDeleteTaskClicked = async () => {
        await deleteTask({ id: task.id });
    };

    return (
        <>
            <Header title={"Task Details"} />
            <section
                id="viewTask_container"
                className="flex justify-center items-center flex-col h-fit sm:h-full m-10 sm:m-10"
            >
                <form
                    id="viewTask"
                    className="w-full flex justify-evenly items-center flex-col sm:flex-row"
                >
                    <section className="min-h-[425px] sm:min-h-[400px] flex justify-between items-center flex-col mb-10 sm:mb-0">
                        <fieldset id="task_title" className="flex flex-col">
                            <label htmlFor="viewTask_title" className="text-lg pb-2">
                                Title:
                            </label>
                            <input
                                type="text"
                                id="viewTask_title"
                                value={task.task_title}
                                readOnly
                                className="bg-fadedBlack w-80 h-10 text-fadedWhite pl-1"
                            />
                        </fieldset>
                        <fieldset id="task_description" className="flex flex-col">
                            <label htmlFor="viewTask_description" className="text-lg pb-2">
                                Description:
                            </label>
                            <textarea
                                type="text"
                                id="viewTask_description"
                                value={task.task_description}
                                readOnly
                                className="bg-fadedBlack w-80 h-48 text-fadedWhite pl-1 resize-none"
                            />
                        </fieldset>
                        <fieldset className="flex flex-col">
                            <label htmlFor="viewTask_category" className="text-lg pb-2">
                                Category:
                            </label>
                            <input
                                type="text"
                                id="viewTask_category"
                                value={task.category}
                                readOnly
                                className="bg-fadedBlack w-80 h-10 text-fadedWhite pl-1"
                            />
                        </fieldset>
                    </section>
                    <section className="min-h-[425px] sm:min-h-[400px] flex justify-between items-end flex-col mb-14 sm:mb-0">
                        <fieldset className="flex flex-col">
                            <label htmlFor="task_createdOn" className="text-lg pb-2">
                                Created On:
                            </label>
                            <input
                                type="text"
                                id="task_createdOn"
                                value={createdAt}
                                readOnly
                                className="bg-fadedBlack w-80 h-10 text-fadedWhite pl-1"
                            />
                        </fieldset>
                        <fieldset className="flex flex-col">
                            <label htmlFor="task_updatedAt" className="text-lg pb-2">
                                Last Updated:
                            </label>
                            <input
                                type="text"
                                id="task_updatedAt"
                                value={updatedAt}
                                readOnly
                                className="bg-fadedBlack w-80 h-10 text-fadedWhite pl-1"
                            />
                        </fieldset>
                        <section id="form_btn_group" className="w-full my-10 sm:my-0">
                            <button
                                type="button"
                                id="form_btn filled color_tranisiton"
                                onClick={handleEditRedirect}
                                aria-label="edit task button"
                                className="w-full mb-2 cursor-pointer sm:max-w-xs h-10 sm:h-12 text-lg flex justify-center items-center bg-fadedPurple hover:bg-brightPurple transition duration-200"
                            >
                                Update Task
                            </button>
                            <button
                                type="button"
                                id="form_btn warning color_tranisiton"
                                onClick={onDeleteTaskClicked}
                                aria-label="delete task button"
                                className="w-full cursor-pointer sm:max-w-xs h-10 sm:h-12 text-lg flex justify-center items-center bg-fadedWarningRed hover:bg-warningRed transition duration-200"
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

export default ViewTask;
