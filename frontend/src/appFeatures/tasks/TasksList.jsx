import { useGetTasksQuery } from "./tasksSlice";
import Task from "./Task";

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
            <table className="tasks_list">
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
            </table>
        );
    }

    return content;
};

export default TasksList;
