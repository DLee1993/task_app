import { useSelector } from "react-redux";
import { selectAllTasks, getTasksStatus } from "./tasksSlice";
import Task from "./Task";
import { Table, ScrollArea } from "@mantine/core";

const TasksList = () => {
    const tasks = useSelector(selectAllTasks);
    const taskStatus = useSelector(getTasksStatus);

    let content;

    if (taskStatus === "loading") {
        content = (
            <tr>
                <td>Loading...</td>
            </tr>
        );
    } else if (taskStatus === "failed") {
        content = (
            <tr>
                <td>You don`t have any tasks, click the + button to add a Task!</td>
            </tr>
        );
    } else if (taskStatus === "succeeded") {
        content = tasks.tasks.map((task, index) => <Task key={index} task={task} />).reverse();
    }

    return (
        <>
            <ScrollArea>
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
                    <tbody>{content}</tbody>
                </Table>
            </ScrollArea>
        </>
    );
};

export default TasksList;
