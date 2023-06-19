import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { selectTaskById, useDeleteTaskMutation } from "../../appFeatures/tasks/tasksSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

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
            });
        }
        if (isError) {
            toast.error(error.data.message, {
                toastId: "deleteErrorToast",
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
        <section className="viewTask_container">
            <IoArrowBack size={25} onClick={() => navigate(-1)} className="return_btn" />
            <form className="viewTask">
                <section>
                    <fieldset className="task_title">
                        <label htmlFor="task_title">Title:</label>
                        <input type="text" id="task_title" value={task.task_title} readOnly />
                    </fieldset>
                    <fieldset className="task_description">
                        <label htmlFor="task_description">Description:</label>
                        <textarea
                            type="text"
                            id="task_desciption"
                            value={task.task_description}
                            readOnly
                        />
                    </fieldset>
                </section>
                <section>
                    <fieldset>
                        <label htmlFor="task_title">Category:</label>
                        <input type="text" id="task_title" value={task.category} readOnly />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="task_title">Created On:</label>
                        <input type="text" id="task_title" value={createdAt} readOnly />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="task_title">Last Updated:</label>
                        <input type="text" id="task_title" value={updatedAt} readOnly />
                    </fieldset>
                    <section className="form_btn_group">
                        <button
                            type="button"
                            className="form_btn filled color_tranisiton"
                            onClick={handleEditRedirect}
                        >
                            Update Task
                        </button>
                        <button
                            type="button"
                            className="form_btn warning color_tranisiton"
                            onClick={onDeleteTaskClicked}
                        >
                            Delete Task
                        </button>
                    </section>
                </section>
            </form>
        </section>
    );
};

export default ViewTask;
