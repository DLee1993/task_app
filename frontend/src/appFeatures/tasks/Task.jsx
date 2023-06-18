import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { selectTaskById } from "./tasksSlice";
import { FaCheck } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

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
        <tr className="tableContent_row">
            <td className="title">
                <p>{titleContent}</p>
            </td>
            <td className="description">
                <p>{descriptionContent}</p>
            </td>
            <td className="category">{task.category}</td>
            <td className="completed">{task.completed ? <FaCheck /> : <RxCrossCircled />}</td>
            <td className="viewTask">
                <Link to={`/dashboard/${task._id}`}>
                    <button className="viewTask_btn outline color_transition">View Task</button>
                </Link>
            </td>
        </tr>
    );
};

Task.propTypes = {
    taskId: PropTypes.string,
};

export default Task;
