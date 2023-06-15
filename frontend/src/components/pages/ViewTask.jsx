import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mantine/core";
import { IoArrowBack } from "react-icons/io5";
import { selectTaskById } from "../../appFeatures/tasks/tasksSlice";
import { useSelector } from "react-redux";

const ViewTask = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const task = useSelector((state) => selectTaskById(state, id));
    const createdAt = task.createdAt.slice(0, 10);
    const updatedAt = task.updatedAt.slice(0, 10);

    console.log(new Date().toISOString());

    const handleEditRedirect = () => {
        navigate(`/dashboard`);
    };

    return (
        <>
            <IoArrowBack size={25} onClick={() => navigate(-1)} className="return_btn" />
            <article className="task_view">
                <h2>{task.task_title}</h2>
                <p>{task.task_description}</p>
                <p></p>
                <p>
                    Complete by: <span>{task.toBeCompletedBy}</span>
                </p>
                <p>
                    Created on: <span>{createdAt.split("-").reverse().join("-")}</span>
                </p>
                <p>
                    Last updated: <span>{updatedAt.split("-").reverse().join("-")}</span>
                </p>
                <section className="task_actions">
                    <Button className="warning color_tranisiton">Delete Task</Button>
                    <Button className="filled color_tranisiton" onClick={handleEditRedirect}>
                        Update Task
                    </Button>
                </section>
            </article>
        </>
    );
};

export default ViewTask;
