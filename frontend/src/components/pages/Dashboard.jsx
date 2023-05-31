import Header from "../partials/Dashboard/Header";
import TasksList from "../../appFeatures/TasksList";
import { useDisclosure } from "@mantine/hooks";
import AddTaskModal from "../partials/Dashboard/AddTaskModal";
import ConfirmAccountLogout from "../partials/Dashboard/ConfirmAccountLogout";

const Dashboard = () => {
    const [taskMenuOpened, { open: taskMenuOpen, close: taskMenuClose }] = useDisclosure(false);
    const [logoutAccountOpened, { open: logoutAccountOpen, close: logoutAccountClose }] =
        useDisclosure(false);
    return (
        <main className="dashboard">
            <Header taskMenuOpen={taskMenuOpen} logoutAccountOpen={logoutAccountOpen} />
            <AddTaskModal taskMenuOpened={taskMenuOpened} close={taskMenuClose} />
            <ConfirmAccountLogout
                logoutAccountOpened={logoutAccountOpened}
                close={logoutAccountClose}
            />
            <section className="main">
                <TasksList />
            </section>
        </main>
    );
};

export default Dashboard;
