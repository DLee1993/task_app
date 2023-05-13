import { useGetTasksQuery } from "./tasksApiSlice";
import { Task } from "./Task";

const TasksList = () => {
    const { data: tasks, isLoading, isSuccess, isError, error } = useGetTasksQuery();

    let content;

    if (isLoading) content = <p>Loading...</p>;

    if (isError) {
        content = <p>{error?.data.message}</p>;
    }

    if (isSuccess) {
        const { ids } = tasks;
        const tableContent = ids?.length
            ? ids.map((taskId) => <Task key={taskId} taskId={taskId} />)
            : null;

        content = (
            <table>
                <thead>
                    <tr>
                        <th>username</th>
                        <th>created</th>
                        <th>updated</th>
                        <th>title</th>
                        <th>author</th>
                        <th>edit</th>
                    </tr>
                </thead>
                <tbody>{tableContent}</tbody>
            </table>
        );
        return content;
    }
};

export default TasksList;
