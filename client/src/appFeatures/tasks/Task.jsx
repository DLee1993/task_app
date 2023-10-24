import { EditTaskModal } from "../../appFeatures/tasks/EditTaskModal";
import { PropTypes } from "prop-types";
import { useDisclosure } from "@mantine/hooks";
import { useGetTasksQuery } from "./tasksSlice";
import { Badge, Group } from "@mantine/core";

const Task = ({ taskId }) => {
    const [editTaskOpened, { open: openEditTask, close: closeEditTask }] = useDisclosure(false);

    const { task } = useGetTasksQuery("tasksList", {
        selectFromResult: ({ data }) => ({
            task: data?.entities[taskId],
        }),
    });

    const taskCreatedAt = new Date(task.createdAt).toLocaleString("en-GB");
    const date = taskCreatedAt.split(", ")[0];

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
                className="hover:shadow-lg border-2 border-[#8d99ae]/20 rounded p-4 cursor-pointer"
            >
                <Group justify="space-between">
                    <p className="text-lg font-medium">{titleContent}</p>
                </Group>

                <p className="my-5">{descriptionContent}</p>

                <Group justify="space-between">
                    {task.category && <Badge variant="outline">{task.category}</Badge>}
                    <Badge variant="outline">{date}</Badge>
                </Group>
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
