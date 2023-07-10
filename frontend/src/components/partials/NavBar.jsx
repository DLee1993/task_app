import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../../appFeatures/auth/authApiSlice";
import { toast } from "react-toastify";

const NavBar = () => {
    const navigate = useNavigate();
    const [sendLogout, { isloading, isSuccess, isError, error }] = useSendLogoutMutation();

    useEffect(() => {
        if (isSuccess) navigate("/");
    }, [isSuccess, navigate]);

    const logoutClicked = () => sendLogout();

    if (isloading) return <p>Logging Out...</p>;

    if (isError) return toast.error(`Error: ${error.data?.message}`);

    return (
        <section
            className="w-80 flex justify-between items-center"
            id="nav-button_group"
        >
            <Link
                to="/dashboard"
                id="dashboard_btn"
                aria-label="navigate to the dashboard"
                className="hover:text-brightPurple"
            >
                Dashboard
            </Link>
            <Link
                to="/profile"
                id="dashboard_btn"
                aria-label="navigate to your profile page"
                className="hover:text-brightPurple"
            >
                Profile
            </Link>
            <Link
                to="/dashboard/newTask"
                id="addTask_btn"
                aria-label="navigate to the add new task form"
                className="hover:text-brightPurple"
            >
                Add a task
            </Link>
            <button
                onClick={logoutClicked}
                id="logout_btn"
                aria-label="logout of your account button"
                className="hover:text-brightPurple"
            >
                Logout
            </button>
        </section>
    );
};

export default NavBar;
