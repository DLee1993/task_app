import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../../appFeatures/auth/authApiSlice";
import { toast } from "react-toastify";

const NavBar = () => {
    let dashboardLink = null;
    let profileLink = null;
    let addTaskLink = null;
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [sendLogout, { isloading, isSuccess, isError, error }] = useSendLogoutMutation();
    console.log(pathname)

    useEffect(() => {
        if (isSuccess) navigate("/");
    }, [isSuccess, navigate]);

    const logoutClicked = () => sendLogout();

    if (isloading) return <p>Logging Out...</p>;

    if (isError) return toast.error(`Error: ${error.data?.message}`);

    if (!pathname.endsWith("/dashboard")) {
        dashboardLink = (
            <Link
                to="/dashboard"
                id="dashboard_btn"
                aria-label="navigate to the dashboard"
                className="hover:text-brightPurple mx-2"
            >
                Dashboard
            </Link>
        );
    }
    if (!pathname.endsWith("/profile")) {
        profileLink = (
            <Link
                to="/profile"
                id="dashboard_btn"
                aria-label="navigate to your profile page"
                className="hover:text-brightPurple mx-2"
            >
                Profile
            </Link>
        );
    }
    if (!pathname.endsWith("/dashboard/newTask")) {
        addTaskLink = (
            <Link
                to="/dashboard/newTask"
                id="addTask_btn"
                aria-label="navigate to the add new task form"
                className="hover:text-brightPurple mx-2"
            >
                Add a task
            </Link>
        );
    }

    return (
        <section className="flex justify-between items-center min-w-64" id="nav-button_group">
            {dashboardLink}
            {profileLink}
            {addTaskLink}
            <button
                onClick={logoutClicked}
                id="logout_btn"
                aria-label="logout of your account button"
                className="hover:text-warningRed"
            >
                Logout
            </button>
        </section>
    );
};

export default NavBar;
