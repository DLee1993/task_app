import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mantine/core";

const ViewTask = () => {
    const { taskId } = useParams();
    const navigate = useNavigate();

    const handleEditRedirect = () => {
        navigate(`/dashboard/tasks/edit/${taskId}`);
    };

    const handleDeleteRedirect = () => {
        //- delete task here
        navigate('/dashboard')
    }

    return (
        <article>
            <h2>Task Title</h2>
            <p>Task Description</p>
            <p>Task category</p>
            <p>priority</p>
            <p>Completed</p>
            <p>created on</p>
            <p>last updated</p>
            <section className="task_actions">
                <Button className="warning color_tranisiton" onClick={handleDeleteRedirect}>Delete Task</Button>
                <Button className="filled color_tranisiton" onClick={handleEditRedirect}>
                    Update Task
                </Button>
            </section>
        </article>
    );
};

export default ViewTask;
