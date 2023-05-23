import Header from "../partials/Header";
import TasksList from "../../features/tasks/TasksList";
import Footer from "../partials/Footer";

const Dashboard = () => {
    return (
        <main className="dashboard">
            <Header />
            <section className="main">
                <TasksList />
            </section>
            <Footer />
        </main>
    );
};

export default Dashboard;
