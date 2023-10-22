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
            className="hover:bg-gray/10 border-b-2 border-gray/20 cursor-pointer h-[70px]"
        >
            <td id="title" className="pl-2">
                <p>{titleContent}</p>
            </td>
            <td id="description" className="hidden min-[480px]:table-cell sm:table-cell">
                <p>{descriptionContent}</p>
            </td>
            <td id="category" className="text-center hidden sm:table-cell">
                {task.category}
            </td>
            <td id="completed" className="hidden md:table-cell">
                {task.completed ? <CompletedSVG /> : <NotCompletedSVG />}
            </td>
            <td id="viewTask" className="text-center">
                <Link
                    to={`/dashboard/${task._id}`}
                    className="border-2 border-blue rounded w-2/3 max-w-[100px] sm:w-2/3 sm:max-w-[150px]  mx-auto h-10 flex justify-center hover:bg-blue hover:text-silver hover:border-transparent transition duration-200"
                >
                    <button
                        id="viewTask_btn"
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
