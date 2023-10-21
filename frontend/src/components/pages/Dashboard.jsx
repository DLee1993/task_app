import Header from "../partials/Header";
import TasksList from "../../appFeatures/tasks/TasksList";
import useAuth from "../../hooks/useAuth";
import { AddTaskModal } from "../../appFeatures/tasks/AddTaskModal";
import { EditTaskModal } from "../../appFeatures/tasks/EditTaskModal";
import { useDisclosure } from "@mantine/hooks";

const Dashboard = () => {
    //- destructure the username from useAuth
    const { username } = useAuth();
    const getTime = new Date().getHours();
    const [addTaskOpened, { open: openAddTask, close: closeAddTask }] = useDisclosure(false);
    const [editTaskOpened, { open: openEditTask, close: closeEditTask }] = useDisclosure(false);

    let headerMessage;

    if (getTime < 12) {
        headerMessage = `Good Morning, ${username}`;
    } else if (getTime < 17) {
        headerMessage = `Good Afternoon, ${username}`;
    } else {
        headerMessage = `Good Evening, ${username}`;
    }

    return (
        <main className="dashboard">
            <Header title={headerMessage} openAddTask={openAddTask} openEditTask={openEditTask}/>
            <section className="max-h-[80vh] mx-auto mt-2 overflow-y-auto">
                <TasksList /> {/*openEditTask={openEditTask} -- needs to go here in future, remove from header */}
            </section>
            <AddTaskModal addTaskOpened={addTaskOpened} closeAddTask={closeAddTask} />
            <EditTaskModal editTaskOpened={editTaskOpened} closeEditTask={closeEditTask} />
        </main>
    );
};

export default Dashboard;
