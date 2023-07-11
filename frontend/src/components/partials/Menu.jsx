import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../../appFeatures/auth/authApiSlice";
import { toast } from "react-toastify";

const Menu = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [sendLogout, { isloading, isSuccess, isError, error }] = useSendLogoutMutation();
    const accMenuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!accMenuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

    useEffect(() => {
        if (isSuccess) navigate("/");
    }, [isSuccess, navigate]);

    const logoutClicked = () => sendLogout();

    if (isloading) return <p>Logging Out...</p>;

    if (isError) return toast.error(`Error: ${error.data?.message}`);

    return (
        <section ref={accMenuRef}>
            <button
                id="menu_btn"
                className={
                    open
                        ? "bg-brightPurple px-3 py-1 sm:px-5 sm:py-2 rounded hover:bg-fadedPurple"
                        : "bg-transparent border-2 border-brightPurple px-3 py-1 sm:px-5 sm:py-2 rounded hover:bg-fadedPurple/10"
                }
                onClick={() => setOpen(!open)}
            >
                Menu
            </button>
            <menu
                className={
                    open
                        ? "absolute z-10 top-14 right-2 sm:right-5 w-64 min-h-[200px] opacity-100 bg-fadedBlack transition-opacity"
                        : "absolute z-10 top-14 right-2 sm:right-5 w-0 min-h-0 opacity-0 overflow-hidden transition-opacity"
                }
            >
                <ul className="px-2 font-medium">
                    <p className="text-plainGray/50 py-2">Features</p>
                    <li className="border-b-2 border-plainGray/10">
                        <Link
                            to="/dashboard"
                            id="dashboard_btn"
                            aria-label="navigate to the dashboard"
                            className={`flex justify-start items-center w-full min-h-[50px] pl-2 ${
                                pathname.endsWith("/dashboard")
                                    ? "bg-brightPurple rounded cursor-not-allowed"
                                    : "hover:text-brightPurple font-medium"
                            }`}
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li className="border-b-2 border-plainGray/10">
                        <Link
                            to="/dashboard/newTask"
                            id="addTask_btn"
                            aria-label="navigate to the add new task form"
                            className={`flex justify-start items-center w-full min-h-[50px] pl-2 ${
                                pathname.endsWith("/dashboard/newTask")
                                    ? "bg-brightPurple cursor-not-allowed"
                                    : "hover:text-brightPurple font-medium"
                            }`}
                        >
                            Add a task
                        </Link>
                    </li>
                    <p className="text-plainGray/50 py-2">Account</p>
                    <li className="border-b-2 border-plainGray/10">
                        <button
                            onClick={logoutClicked}
                            id="logout_btn"
                            aria-label="logout of your account button"
                            className="flex justify-start items-center w-full min-h-[50px] hover:text-brightPurple font-medium pl-2"
                        >
                            Logout
                        </button>
                    </li>
                    <li className="border-b-2 border-plainGray/10 py-2">
                        <button
                            onClick={logoutClicked}
                            id="logout_btn"
                            aria-label="logout of your account button"
                            className="flex justify-center items-center w-full min-h-[50px] font-medium bg-fadedWarningRed rounded hover:bg-warningRed"
                        >
                            Delete Account
                        </button>
                    </li>
                </ul>
            </menu>
        </section>
    );
};

export default Menu;
