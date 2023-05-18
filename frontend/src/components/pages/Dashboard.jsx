import Header from "../partials/Header";
import TaskList from "../../features/tasks/TasksList";

const Dashboard = () => {
    return (
        <>
            <Header />
            <main className="dashboard">
                <TaskList />
            </main>
        </>
    );
};

export default Dashboard;
