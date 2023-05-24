import Header from "../partials/Dashboard/Header";
import TasksList from "../../appFeatures/TasksList";
import Footer from "../partials/Dashboard/Footer";

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
