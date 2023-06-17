import { useGetTasksQuery } from "./tasksSlice";
import Task from "./Task";
import { Table, ScrollArea } from "@mantine/core";

const TasksList = () => {
    const { data: tasks, isLoading, isSuccess, isError, error } = useGetTasksQuery();

    let content;

    if (isLoading) content = <p>Loading...</p>;

    if (isError) content = <p className="error_message">{error.data.message}</p>;

    if (isSuccess) {
        const { ids } = tasks;

        const taskTableContent = ids?.length
            ? ids.map((taskId) => <Task key={taskId} taskId={taskId} />)
            : null;

        content = (
            <ScrollArea h={400} type="auto">
                <Table
                    className="tasks_list"
                    striped
                    highlightOnHover
                    verticalSpacing="md"
                    horizontalSpacing="lg"
                    fontSize="md"
                >
                    <thead>
                        <tr>
                            <th className="title">Title</th>
                            <th className="description">Description</th>
                            <th className="category">Category</th>
                            <th className="completed">Completed</th>
                            <th className="viewTask"></th>
                        </tr>
                    </thead>
                    <tbody>{taskTableContent}</tbody>
                </Table>
            </ScrollArea>
        );
    }

    return content;
};

export default TasksList;
