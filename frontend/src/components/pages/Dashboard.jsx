import Header from "../partials/Header";
import TasksList from "../../appFeatures/tasks/TasksList";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
    //- destructure the username from useAuth
    const { username } = useAuth();

    const getTime = new Date().getHours();

    const headerMessage =
        getTime < 12 ? (
            <p className="flex">
                <span className="hidden sm:block">Good Morning, &nbsp; </span>
                {username}
            </p>
        ) : getTime < 17 ? (
            <p className="flex">
                <span className="hidden sm:block">Good Afternoon, &nbsp; </span>
                {username}
            </p>
        ) : (
            <p className="flex">
                <span className="hidden sm:block">Good Evening, &nbsp; </span>
                {username}
            </p>
        );
    return (
        <main className="dashboard">
            <Header title={headerMessage} />
            <section className="max-h-[80vh] mx-auto mt-2 overflow-y-auto">
                <TasksList />
            </section>
        </main>
    );
};

export default Dashboard;
