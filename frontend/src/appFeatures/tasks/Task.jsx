import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectTaskById } from "./tasksSlice";
import { FaCheck } from "react-icons/fa";

const Task = ({ taskId }) => {
    const task = useSelector((state) => selectTaskById(state, taskId));

    return (
        <tr>
            <td className="title">
                <Text>{task.task_title}</Text>
            </td>
            <td className="description">
                <Text>{task.task_description}</Text>
            </td>
            <td className="category">{task.category}</td>
            <td className="completed">{task.completed ? <FaCheck /> : null}</td>
            <td className="viewTask">
                <Link to={`/dashboard/${task._id}`}>View</Link>
            </td>
        </tr>
    );
};

Task.propTypes = {
    taskId: PropTypes.string,
};

export default Task;
