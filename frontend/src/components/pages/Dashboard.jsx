import Header from "../partials/Header";
import TasksList from "../../appFeatures/tasks/TasksList";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
    //- destructure the username from useAuth
    const { username } = useAuth();

    const getTime = new Date().getHours();

    let headerMessage;

    if(getTime < 12){
        headerMessage = `Good Morning, ${username}`
    } else if(getTime < 17){
        headerMessage = `Good Afternoon, ${username}`
    } else {
        headerMessage = `Good Evening, ${username}`
    }

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
