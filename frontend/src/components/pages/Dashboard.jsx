import { useDisclosure } from "@mantine/hooks";
import Header from "../partials/Dashboard/Header";
import TasksList from "../../appFeatures/tasks/TasksList";
import AddTaskModal from "../partials/Dashboard/AddTaskModal";
import LogoutModal from "../partials/Dashboard/LogoutModal";
import ProfileModal from "../partials/Dashboard/ProfileModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
    const [taskMenuOpened, { open: taskMenuOpen, close: taskMenuClose }] = useDisclosure(false);
    const [logoutMenuOpened, { open: logoutMenuOpen, close: logoutMenuClose }] =
        useDisclosure(false);
    const [profileMenuOpened, { open: profileMenuOpen, close: profileMenuClose }] =
        useDisclosure(false);
    return (
        <main className="dashboard">
            <ToastContainer />
            <Header
                taskMenuOpen={taskMenuOpen}
                logoutMenuOpen={logoutMenuOpen}
                profileMenuOpen={profileMenuOpen}
            />
            <section className="main">
                <TasksList />
            </section>
            <AddTaskModal opened={taskMenuOpened} onClose={taskMenuClose} />
            <LogoutModal opened={logoutMenuOpened} onClose={logoutMenuClose} />
            <ProfileModal opened={profileMenuOpened} onClose={profileMenuClose} />
        </main>
    );
};

export default Dashboard;
