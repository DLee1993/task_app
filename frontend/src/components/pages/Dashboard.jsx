import Header from "../partials/Header";
import TasksList from "../../appFeatures/tasks/TasksList";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
    //- destructure the username from useAuth
    const { username } = useAuth();
    const usersName = username.split(" ");

    const getTime = new Date().getHours();
    const headerMessage =
        getTime < 12
            ? `Good Morning, ${usersName[0]}`
            : getTime < 17
            ? `Good Afternoon, ${usersName[0]}`
            : `Good Evening, ${usersName[0]}`;
    return (
        <main className="dashboard">
            <Header title={headerMessage} />
            <section className="max-w-[98%] max-h-[85vh] mx-auto mt-2 overflow-y-auto">
                <TasksList />
            </section>
        </main>
    );
};

export default Dashboard;
