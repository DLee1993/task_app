import { useGetTasksQuery } from "./tasksSlice";
import Task from "./Task";
import useAuth from "../../hooks/useAuth";
import { selectAllUsers } from "../../appFeatures/users/usersSlice";
import { useSelector } from "react-redux";

const TasksList = () => {
    const { username } = useAuth();
    const users = useSelector(selectAllUsers);
    let taskCreator;

    const {
        data: tasks,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetTasksQuery("tasksList", {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    let content;

    if (isLoading) content = <p>Loading...</p>;

    if (isError && error)
        content = (
            <p id="error_message" className="text-center">
                {error.data.message}
            </p>
        );

    if (isSuccess) {
        const { ids, entities } = tasks;

        users.forEach((user) => {
            if (user.username === username) {
                taskCreator = user._id;
            }
        });

        let filteredIds = ids.filter((taskId) => entities[taskId].user === taskCreator);

        const taskTableContent =
            ids?.length && filteredIds.map((taskId) => <Task key={taskId} taskId={taskId} />);

        !filteredIds.length
            ? (content = (
                  <p id="error_message" className="text-center">
                      Click the menu button to add a new task
                  </p>
              ))
            : (content = (
                  <table id="tasks_list" className="w-full">
                      <thead className="sticky top-0 border-b-2 border-blue">
                          <tr className="h-16">
                              <th id="title" className="text-left pl-2">
                                  Title
                              </th>
                              <th id="description" className="text-left hidden min-[480px]:table-cell sm:table-cell">
                                  Description
                              </th>
                              <th id="category" className="hidden sm:table-cell">
                                  Category
                              </th>
                              <th id="completed" className="hidden md:table-cell">
                                  Completed
                              </th>
                              <th id="viewTask"></th>
                          </tr>
                      </thead>
                      <tbody>{taskTableContent}</tbody>
                  </table>
              ));
    }

    return content;
};

export default TasksList;
