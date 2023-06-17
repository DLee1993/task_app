import Header from "../Dashboard/Header";
import TasksList from "../../appFeatures/tasks/TasksList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
    return (
        <main className="dashboard">
            <ToastContainer />
            <Header />
            <section className="main">
                <TasksList />
            </section>
        </main>
    );
};

export default Dashboard;
