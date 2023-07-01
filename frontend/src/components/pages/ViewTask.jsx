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
            toast.success("Task Deleted", {
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
            <section className="viewTask_container">
                <form className="viewTask">
                    <section>
                        <fieldset className="task_title">
                            <label htmlFor="viewTask_title">Title:</label>
                            <input
                                type="text"
                                id="viewTask_title"
                                value={task.task_title}
                                readOnly
                            />
                        </fieldset>
                        <fieldset className="task_description">
                            <label htmlFor="viewTask_description">Description:</label>
                            <textarea
                                type="text"
                                id="viewTask_description"
                                value={task.task_description}
                                readOnly
                            />
                        </fieldset>
                    </section>
                    <section>
                        <fieldset>
                            <label htmlFor="viewTask_category">Category:</label>
                            <input
                                type="text"
                                id="viewTask_category"
                                value={task.category}
                                readOnly
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="task_createdOn">Created On:</label>
                            <input type="text" id="task_createdOn" value={createdAt} readOnly />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="task_updatedAt">Last Updated:</label>
                            <input type="text" id="task_updatedAt" value={updatedAt} readOnly />
                        </fieldset>
                        <section className="form_btn_group">
                            <button
                                type="button"
                                className="form_btn filled color_tranisiton"
                                onClick={handleEditRedirect}
                                aria-label="edit task button"
                            >
                                Update Task
                            </button>
                            <button
                                type="button"
                                className="form_btn warning color_tranisiton"
                                onClick={onDeleteTaskClicked}
                                aria-label="delete task button"
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
