import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTaskById } from "./tasksSlice";
import { PropTypes } from "prop-types";
import { Text } from "@mantine/core";
import { BsPencilSquare } from "react-icons/bs";

const Task = ({ taskId }) => {
    const task = useSelector((state) => selectTaskById(state, taskId));
    const navigate = useNavigate();

    const handleRedirect = () => navigate(`/dashboard/tasks/${taskId}`);

    if (task) {
        return (
            <tr key={task.title}>
                <td className="title">
                    <Text>{task.task_title}</Text>
                </td>
                <td className="description">
                    <Text>{task.task_description}</Text>
                </td>
                <td className="category">{task.category}</td>
                <td className="priority">{task.priority}</td>
                <td className="edit" onClick={handleRedirect}>
                    <BsPencilSquare
                        className="edit_btn color_transition"
                        size={25}
                        style={{ cursor: "pointer" }}
                    />
                </td>
            </tr>
        );
    } else return null;
};

Task.propTypes = {
    taskId: PropTypes.string,
    editTaskOpen: PropTypes.func,
};

export default Task;
