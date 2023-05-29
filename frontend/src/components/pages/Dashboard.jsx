import Header from "../partials/Dashboard/Header";
import TasksList from "../../appFeatures/TasksList";

const Dashboard = () => {
    return (
        <main className="dashboard">
            <Header />
            <section className="main">
                <TasksList />
            </section>
        </main>
    );
};

export default Dashboard;
