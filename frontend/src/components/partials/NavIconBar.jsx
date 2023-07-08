import { useEffect } from "react";
import PlusIcon from "../../assets/plus.svg";
import LogoutIcon from "../../assets/log-out.svg";
import Home from "../../assets/home.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../../appFeatures/auth/authApiSlice";
import { toast } from "react-toastify";

const NavIconBar = () => {
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
            className="flex justify-between items-center fixed bottom-0 left-0 p-5 bg-fadedBlack w-full sm:relative sm:w-fit sm:bg-transparent"
            id="nav-button_group"
        >
            <Link
                to="/dashboard"
                id="dashboard_btn"
                aria-label="navigate to the add new task form page link"
                className="bg-fadedPurple w-16 p-1 rounded hover:bg-brightPurple transition-all duration-200"
            >
                <img src={Home} alt="go to dashboard icon" className="m-auto w-5 h-auto" />
            </Link>
            <Link
                to="/dashboard/newTask"
                id="addTask_btn"
                aria-label="navigate to the add new task form page link"
                className="bg-fadedPurple w-16 p-1 rounded sm:mx-5 hover:bg-brightPurple transition-all duration-200"
            >
                <img src={PlusIcon} alt="addTask icon" className="m-auto w-5 h-auto" />
            </Link>
            <button
                onClick={logoutClicked}
                id="logout_btn"
                aria-label="logout of your account button"
                className="bg-fadedPurple w-16 p-1 rounded hover:bg-brightPurple transition-all duration-200"
            >
                <img src={LogoutIcon} alt="logout icon" className="m-auto w-5 h-auto" />
            </button>
        </section>
    );
};

export default NavIconBar;
