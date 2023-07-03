import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { selectTaskById } from "./tasksSlice";

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
        <tr
            id="tableContent_row"
            className="odd:bg-fadedBlack odd:hover:bg-tableHover even:bg-transparent even:hover:bg-tableHover cursor-pointer h-[64px]"
        >
            <td id="title" className="pl-2">
                <p>{titleContent}</p>
            </td>
            <td id="description" className="hidden sm:table-cell">
                <p>{descriptionContent}</p>
            </td>
            <td id="category" className="text-center hidden md:table-cell">
                {task.category}
            </td>
            <td id="completed" className="hidden lg:table-cell">
                {task.completed ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#c1c2c5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mx-auto"
                    >
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#c1c2c5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mx-auto"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                )}
            </td>
            <td id="viewTask" className="text-center">
                <Link
                    to={`/dashboard/${task._id}`}
                    className="border-2 border-brightPurple rounded w-3/4 sm:w-2/3 mx-auto h-10 flex justify-center hover:bg-brightPurple hover:border-transparent transition duration-200"
                >
                    <button
                        id="viewTask_btn outline color_transition"
                        aria-label="view the task in full"
                    >
                        View Task
                    </button>
                </Link>
            </td>
        </tr>
    );
};

Task.propTypes = {
    taskId: PropTypes.string,
};

export default Task;
