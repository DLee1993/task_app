import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useGetTasksQuery } from "./tasksSlice";
import { CompletedSVG, NotCompletedSVG } from "./TaskSvg";
import { Button } from "@mantine/core";

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
        <tr id="tableContent_row" className="border-b-2 border-gray/20 h-[70px]">
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
                <Link to={`/dashboard/${task._id}`} className="cursor-pointer">
                    <Button
                        tabIndex={-1}
                        id="viewTask_btn"
                        aria-label="press enter to view the task in full"
                        color="#2b2d42"
                    >
                        View Task
                    </Button>
                </Link>
            </td>
        </tr>
    );
};

Task.propTypes = {
    taskId: PropTypes.string.isRequired,
};

export default Task;
