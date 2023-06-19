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
        <main className="viewTask_container">
            <IoArrowBack size={25} onClick={() => navigate(-1)} className="return_btn" />
            <article className="task_view">
                <p>
                    Title: <span>{task.task_title}</span>
                </p>
                <p>
                    Description: <span>{task.task_description}</span>
                </p>
                <p>
                    Created on: <span>{createdAt.split("-").reverse().join("-")}</span>
                </p>
                <p>
                    Last updated: <span>{updatedAt.split("-").reverse().join("-")}</span>
                </p>
                <section className="task_actions">
                    <button
                        className="form_btn warning color_tranisiton"
                        onClick={onDeleteTaskClicked}
                    >
                        Delete Task
                    </button>
                    <button
                        className="form_btn filled color_tranisiton"
                        onClick={handleEditRedirect}
                    >
                        Update Task
                    </button>
                </section>
            </article>
        </main>
    );
};

export default ViewTask;
