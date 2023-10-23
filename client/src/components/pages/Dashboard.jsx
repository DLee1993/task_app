import Header from "../partials/Header";
import TasksList from "../../appFeatures/tasks/TasksList";
import { AddTaskModal } from "../../appFeatures/tasks/AddTaskModal";
import { useDisclosure } from "@mantine/hooks";

const Dashboard = () => {
    const [addTaskOpened, { open: openAddTask, close: closeAddTask }] = useDisclosure(false);

    return (
        <main className="dashboard">
            <Header openAddTask={openAddTask}/>
            <section className="max-h-[80vh] mx-auto mt-2 overflow-y-auto">
                <TasksList />
            </section>
            <AddTaskModal addTaskOpened={addTaskOpened} closeAddTask={closeAddTask} />
        </main>
    );
};

export default Dashboard;
