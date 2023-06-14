import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { Text, Checkbox } from "@mantine/core";

const Task = ({ task }) => {
    return (
        <tr>
            <td className="title">
                <Text>{task.task_title}</Text>
            </td>
            <td className="description">
                <Text>{task.task_description}</Text>
            </td>
            <td className="category">{task.category}</td>
            <td className="completed">
                <Checkbox size="sm" />
            </td>
            <td className="viewTask">
                <Link to={`/dashboard/${task._id}`}>View</Link>
            </td>
        </tr>
    );
};

Task.propTypes = {
    task: PropTypes.object,
    editTaskOpen: PropTypes.func,
};

export default Task;
