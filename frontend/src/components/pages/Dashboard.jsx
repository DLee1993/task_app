import Header from "../partials/Dashboard/Header";
import TasksList from "../../appFeatures/tasks/TasksList";
import { useDisclosure } from "@mantine/hooks";
import AddTaskModal from "../partials/Dashboard/AddTaskModal";
import ConfirmAccountLogout from "../partials/Dashboard/ConfirmAccountLogout";
import ProfileModal from "../partials/Dashboard/ProfileModal";

const Dashboard = () => {
    const [taskMenuOpened, { open: taskMenuOpen, close: taskMenuClose }] = useDisclosure(false);
    const [logoutAccountOpened, { open: logoutAccountOpen, close: logoutAccountClose }] =
        useDisclosure(false);
    const [profileOpened, { open: profileOpen, close: profileClose }] = useDisclosure(false);

    return (
        <main className="dashboard">
            <Header
                taskMenuOpen={taskMenuOpen}
                logoutAccountOpen={logoutAccountOpen}
                profileOpen={profileOpen}
            />
            <AddTaskModal taskMenuOpened={taskMenuOpened} close={taskMenuClose} />
            <ConfirmAccountLogout
                logoutAccountOpened={logoutAccountOpened}
                close={logoutAccountClose}
            />
            <ProfileModal profileOpened={profileOpened} close={profileClose} />
            <section className="main">
                <TasksList />
            </section>
        </main>
    );
};

export default Dashboard;
