import { useGetTasksQuery } from "./tasksSlice";
import Task from "./Task";
import useAuth from "../../hooks/useAuth";
import { selectAllUsers } from "../../appFeatures/users/usersSlice";
import { useSelector } from "react-redux";
import notepad from "../../assets/notepad.svg";
import { SimpleGrid } from "@mantine/core";

const TasksList = () => {
    const { username } = useAuth();
    const users = useSelector(selectAllUsers);
    let taskCreator;
    let content;

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

        //- filter out only the current users tasks
        let filteredIds = ids.filter((taskId) => entities[taskId].user === taskCreator);

        //- this is where we generate a task component for each user task
        const taskContent =
            ids?.length && filteredIds.map((taskId) => <Task key={taskId} taskId={taskId} />);

        !filteredIds.length
            ? (content = (
                  <section className="flex flex-col justify-center items-center">
                      <img src={notepad} alt="notepad icon" className="w-20 my-10" />
                      <p
                          id="error_message"
                          className="font-bold text-lg flex flex-col justify-center items-center"
                      >
                          Let`s add your first task
                          <span className="text-sm font-normal mt-1">
                              Click the Add task button to get started
                          </span>
                      </p>
                  </section>
              ))
            : (content = (
                  <section className="px-2" tabIndex={-1}>
                      <SimpleGrid
                          tabIndex={-1}
                          cols={{ base: 1, sm: 2, lg: 4 }}
                          spacing={{ base: 12, sm: "xl" }}
                          verticalSpacing={{ base: "md", sm: "xl" }}
                          className="mt-5"
                      >
                          {taskContent}
                      </SimpleGrid>
                  </section>
              ));
    }

    return content;
};

export default TasksList;

{
    /**<section className="flex flex-col justify-center items-center">
                      <img src={notepad} alt="notepad icon" className="w-20 my-10" />
                      <p
                          id="error_message"
                          className="font-bold text-lg flex flex-col justify-center items-center"
                      >
                          Let`s add your first task
                          <span className="text-sm font-normal mt-1">
                              Click the Add task button to get started
                          </span>
                      </p>
                  </section> */
}
