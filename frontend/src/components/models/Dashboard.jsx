import Header from "../partials/Header";
import FloatingDock from "../partials/FloatingDock";
import TaskList from "../../features/tasks/TasksList";

const Dashboard = () => {
    return (
        <main className="dashboard">
            <Header />
            <TaskList />
            <FloatingDock />
        </main>
    );
};

export default Dashboard;
