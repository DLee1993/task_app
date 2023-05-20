import Header from "../partials/Header";
import TasksList from "../../features/tasks/TasksList";
import Footer from "../partials/Footer";

const Dashboard = () => {
    return (
        <>
            <Header />
            <section className="main">
                <TasksList />
            </section>
            <Footer />
        </>
    );
};

export default Dashboard;
