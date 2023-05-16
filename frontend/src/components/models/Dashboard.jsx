import Header from "../partials/Header";
import TaskList from "../../features/tasks/TasksList";

const Dashboard = () => {
    return (
        <main className="dashboard">
            <Header/>
            <TaskList />
        </main>
    );
};

export default Dashboard;
