import { useGetTasksQuery } from "./tasksSlice";
import Task from "./Task";

const TasksList = () => {
    const { data: tasks, isLoading, isSuccess, isError, error } = useGetTasksQuery();

    let content;

    if (isLoading) content = <p>Loading...</p>;

    if (isError) content = <p id="error_message">{error.data.message}</p>;

    if (isSuccess) {
        const { ids } = tasks;

        const taskTableContent = ids?.length
            ? ids.map((taskId) => <Task key={taskId} taskId={taskId} />)
            : null;

        content = (
            <table id="tasks_list" className="w-full">
                <thead className="sticky top-0 bg-backgroundBlack">
                    <tr className="h-16 border-b-2 border-fadedBlack">
                        <th id="title" className="text-left pl-2">
                            Title
                        </th>
                        <th id="description" className="text-left hidden sm:table-cell">
                            Description
                        </th>
                        <th id="category" className="hidden md:table-cell">
                            Category
                        </th>
                        <th id="completed" className="hidden lg:table-cell">
                            Completed
                        </th>
                        <th id="viewTask"></th>
                    </tr>
                </thead>
                <tbody>{taskTableContent}</tbody>
            </table>
        );
    }

    return content;
};

export default TasksList;
