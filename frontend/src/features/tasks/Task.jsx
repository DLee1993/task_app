import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTaskById } from "./tasksApiSlice";
import { FaEdit } from "react-icons/fa";

const Task = (taskId) => {
    const task = useSelector((state) => selectTaskById(state, taskId));
    const navigate = useNavigate();

    if (task) {
        //- the date for when the task is created
        const created = new Date(task.createdAt).toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
        });
        //- the date for when the task was last updated
        const updated = new Date(task.updatedAt).toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
        });

        //- handle the edit of the task
        const handleEdit = () => navigate(`/notes/${taskId}`);

        return (
            <tr>
                <td>{task.completed ? <span>Completed</span> : <span>open</span>}</td>
                <td>{created}</td>
                <td>{updated}</td>
                <td>{task.title}</td>
                <td>{task.username}</td>
                <td>
                    <button onClick={handleEdit}>
                        <FaEdit />
                    </button>
                </td>
            </tr>
        );
    } else return null;
};

export default Task;
