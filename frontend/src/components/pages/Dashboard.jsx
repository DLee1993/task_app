import Header from "../partials/Header";
import TasksList from "../../appFeatures/tasks/TasksList";
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
            <Header title={headerMessage} />
            <section className="h-[26rem] sm:h-[29rem] w-full max-w-[98%] mx-auto mt-2 overflow-y-auto">
                <TasksList />
            </section>
        </main>
    );
};

export default Dashboard;
