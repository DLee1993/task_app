import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useGetTasksQuery } from "./tasksSlice";
import { CompletedSVG, NotCompletedSVG } from "./TaskSvg";

const Task = ({ taskId }) => {
    const { task } = useGetTasksQuery("tasksList", {
        selectFromResult: ({ data }) => ({
            task: data?.entities[taskId],
        }),
    });
    let titleContent;
    let descriptionContent;

    const truncateText = (text) => {
        return text.length > 30 ? `${text.substring(0, 30)}...` : text;
    };

    descriptionContent = truncateText(task.task_description);
    titleContent = truncateText(task.task_title);

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
                {task.completed ? <CompletedSVG /> : <NotCompletedSVG />}
            </td>
            <td id="viewTask" className="text-center">
                <Link
                    to={`/dashboard/${task._id}`}
                    className="border-2 border-brightPurple rounded w-3/4 sm:w-2/3 sm:max-w-[150px]  mx-auto h-10 flex justify-center hover:bg-brightPurple hover:border-transparent transition duration-200"
                >
                    <button
                        id="viewTask_btn outline color_transition"
                        aria-label="press enter to view the task in full"
                    >
                        View Task
                    </button>
                </Link>
            </td>
        </tr>
    );
};

Task.propTypes = {
    taskId: PropTypes.string.isRequired,
};

export default Task;
