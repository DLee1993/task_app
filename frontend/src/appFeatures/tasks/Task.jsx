import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectTaskById } from "./tasksSlice";
import { FaCheck } from "react-icons/fa";

const Task = ({ taskId }) => {
    const task = useSelector((state) => selectTaskById(state, taskId));
    let titleContent;
    let descriptionContent;

    task.task_description.length > 30
        ? (descriptionContent = `${task.task_description.substring(0, 30)}...`)
        : (descriptionContent = task.task_description);

    task.task_title.length > 30
        ? (titleContent = `${task.task_title.substring(0, 30)}...`)
        : (titleContent = task.task_title);

    return (
        <tr>
            <td className="title">
                <Text>{titleContent}</Text>
            </td>
            <td className="description">
                <Text>{descriptionContent}</Text>
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
