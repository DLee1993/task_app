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
                  <SimpleGrid
                      tabIndex={1}
                      cols={{ base: 1, sm: 2, lg: 4 }}
                      spacing={{ base: 12, sm: "xl" }}
                      verticalSpacing={{ base: "md", sm: "xl" }}
                      className="px-2"
                  >
                      {taskContent}
                  </SimpleGrid>
                  //   <table id="tasks_list" className="w-full table-fixed">
                  //       <thead className="sticky top-0 border-b-2 border-blue">
                  //           <tr className="h-16">
                  //               <th id="title" className="text-left pl-2">
                  //                   Title
                  //               </th>
                  //               <th
                  //                   id="description"
                  //                   className="text-left hidden min-[480px]:table-cell sm:table-cell"
                  //               >
                  //                   Description
                  //               </th>
                  //               <th id="category" className="hidden sm:table-cell">
                  //                   Category
                  //               </th>
                  //               <th id="completed" className="hidden md:table-cell">
                  //                   Completed
                  //               </th>
                  //               <th id="viewTask" className="sr-only">
                  //                   View
                  //               </th>
                  //           </tr>
                  //       </thead>
                  //       <tbody>{taskTableContent}</tbody>
                  //   </table>
              ));
    }

    return content;
};

export default TasksList;
