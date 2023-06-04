import Task from "./Task";
import { useGetTasksQuery } from "./tasksSlice";
import { Table, ScrollArea } from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";

const TasksList = () => {
    const { data: tasks, isLoading, isSuccess, isError, error } = useGetTasksQuery();

    let content;

    if (isLoading)
        content = (
            <tr>
                <td>Fetching Tasks...</td>
            </tr>
        );

    if (isError) toast.error(`${error?.data?.message}`);

    if (isSuccess) {
        const { ids } = tasks;

        content = ids?.length ? ids.map((taskId) => <Task key={taskId} taskId={taskId} />) : null;
    }

    return (
        <>
            <ToastContainer />
            <ScrollArea h={450}>
                <Table
                    className="tasks_list"
                    striped
                    highlightOnHover
                    verticalSpacing="md"
                    fontSize="md"
                >
                    <thead>
                        <tr>
                            <th className="title">Title</th>
                            <th className="description">Description</th>
                            <th className="category">Category</th>
                            <th className="priority">Priority</th>
                            <th className="edit"></th>
                        </tr>
                    </thead>
                    <tbody>{content}</tbody>
                </Table>
            </ScrollArea>
        </>
    );
};

export default TasksList;
