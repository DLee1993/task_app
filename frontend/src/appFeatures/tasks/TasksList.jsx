import Task from "./Task";
import { useGetTasksQuery } from "./tasksSlice";
import { PropTypes } from "prop-types";
import { Table, ScrollArea } from "@mantine/core";
import { toast } from "react-toastify";

const TasksList = () => {
    const { data: tasks, isLoading, isSuccess, isError, error } = useGetTasksQuery();

    let content;

    if (isLoading)
        content = (
            <tr>
                <td>Fetching Tasks...</td>
            </tr>
        );

    if (isError) {
        if (error.status === 404) {
            content = (
                <tr>
                    <td>{error.data.message}, why not add one? Click the + button</td>
                </tr>
            );
        } else {
            toast.error("Oops we can't seem to get your todo's!");
        }
    }

    if (isSuccess) {
        const { ids } = tasks;
        content = ids?.length ? ids.map((taskId) => <Task key={taskId} taskId={taskId} />) : null;
    }

    return (
        <>
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

TasksList.propTypes = {
    editMenuOpen: PropTypes.func,
    close: PropTypes.func,
};

export default TasksList;
