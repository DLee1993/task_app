import Header from "../Dashboard/Header";
import TasksList from "../../appFeatures/tasks/TasksList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
    const getTime = new Date().getHours();
    const headerMessage =
        getTime < 12
            ? "Good Morning User"
            : getTime < 17
            ? "Good Afternoon User"
            : "Good Evening User";
    return (
        <main className="dashboard">
            <ToastContainer />
            <Header title={headerMessage} />
            <section className="main">
                <TasksList />
            </section>
        </main>
    );
};

export default Dashboard;
