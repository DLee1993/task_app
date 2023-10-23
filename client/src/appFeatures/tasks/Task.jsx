import { EditTaskModal } from "../../appFeatures/tasks/EditTaskModal";
import { PropTypes } from "prop-types";
import { useDisclosure } from "@mantine/hooks";
import { useGetTasksQuery } from "./tasksSlice";
import { Badge } from "@mantine/core";

const Task = ({ taskId }) => {
    const [editTaskOpened, { open: openEditTask, close: closeEditTask }] = useDisclosure(false);

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

    function onKeyUp(e) {
        if (e.key === "Enter" && !editTaskOpened) {
            openEditTask();
        }
    }

    return (
        <>
            <article
                tabIndex={0}
                onClick={openEditTask}
                onKeyDown={(e) => onKeyUp(e)}
                id={`viewTask_${taskId}`}
                aria-label="view task"
                className="hover:shadow-lg border-2 border-[#8d99ae]/20 rounded p-4"
            >
                <p className="font-bold text-lg">{titleContent}</p>
                <p>{descriptionContent}</p>
                <Badge>{task.createdAt}</Badge>
                <Badge>{task.category}</Badge>
            </article>
            <EditTaskModal
                editTaskOpened={editTaskOpened}
                closeEditTask={closeEditTask}
                task={task}
            />
        </>
    );
};

Task.propTypes = {
    taskId: PropTypes.string.isRequired,
};

export default Task;
