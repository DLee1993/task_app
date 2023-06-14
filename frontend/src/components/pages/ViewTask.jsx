import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectTaskById } from "../../appFeatures/tasks/tasksSlice";
import { Button } from "@mantine/core";
import { IoArrowBack } from "react-icons/io5";

const ViewTask = () => {
    const { taskId } = useParams();
    const navigate = useNavigate();

    const task = useSelector((state) => selectTaskById(state, taskId));

    const handleEditRedirect = () => {
        navigate(`/dashboard/edit/${taskId}`);
    };

    return (
        <>
            <IoArrowBack size={25} onClick={() => navigate(-1)} className="return_btn" />
            <article>
                <p>{taskId}</p>
                <h2>{task.task_title}</h2>
                <p>{task.task_description}</p>
                <p>{task.category}</p>
                <p>Completed: {task.completed ? "Completed" : "Open"}</p>
                <p>created on: {task.createdAt}</p>
                <p>last updated: {task.updatedAt}</p>
                <section className="task_actions">
                    <Button className="warning color_tranisiton">
                        Delete Task
                    </Button>
                    <Button className="filled color_tranisiton" onClick={handleEditRedirect}>
                        Update Task
                    </Button>
                </section>
            </article>
        </>
    );
};

export default ViewTask;
