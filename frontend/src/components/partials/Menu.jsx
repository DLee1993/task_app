import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { selectAllUsers } from "../../appFeatures/users/usersSlice";
import { useSendLogoutMutation } from "../../appFeatures/auth/authApiSlice";
import { useDeleteUserMutation } from "../../appFeatures/users/usersSlice";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Menu = () => {
    const [open, setOpen] = useState(false);
    const accMenuRef = useRef();
    const { username } = useAuth();
    const users = useSelector(selectAllUsers);
    let accountHolderId;
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [sendLogout, { isloading, isSuccess, isError, error }] = useSendLogoutMutation();
    const [
        sendDelete,
        {
            isloading: deleteLoading,
            isSuccess: deleteSuccess,
            isError: IsDeleteError,
            error: deleteError,
        },
    ] = useDeleteUserMutation();

    users.forEach((user) => {
        if (user.username === username) {
            accountHolderId = user._id;
        }
    });

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
        if (isSuccess) {
            navigate("/");
            toast.success("Succesfully Logged out", { position: toast.POSITION.BOTTOM_RIGHT });
        }
        if (deleteSuccess) {
            navigate("/");
            toast.success("Succesfully deleted account", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }, [isSuccess, deleteSuccess, navigate]);

    useEffect(() => {
        if (isError) {
            setOpen(false);
            toast.error(error.data?.message, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }

        if (IsDeleteError) {
            setOpen(false);
            toast.error(deleteError.data?.message, { position: toast.POSITION.BOTTOM_CENTER });
        }
    }, [deleteError, error, isError, IsDeleteError]);

    useEffect(() => {
        if (isloading || deleteLoading) {
            setOpen(false);
            return <p>Please wait...</p>;
        }
    }, [isloading, deleteLoading]);

    const openMenu = () => setOpen(!open);
    const logoutClicked = () => sendLogout();
    const deleteClicked = () => sendDelete({ id: accountHolderId });

    return (
        <section ref={accMenuRef}>
            <button
                id="menu_btn"
                className={
                    open
                        ? "px-3 py-1 sm:px-5 sm:py-2 rounded bg-gray text-blue"
                        : "border-2 border-gray px-3 py-1 sm:px-5 sm:py-2 rounded"
                }
                onClick={openMenu}
            >
                Menu
            </button>
            <div
                className={
                    open
                        ? "absolute z-10 top-16 right-0 w-64 opacity-100 bg-blue text-gray rounded transition-opacity"
                        : "absolute z-10 top-16 right-0 w-0 min-h-0 opacity-0 overflow-hidden transition-opacity"
                }
            >
                <ul className="px-2 font-medium">
                    <p className="text-hover/75 py-2">Features</p>
                    <li className="border-b-2 border-hover">
                        <Link
                            to="/dashboard"
                            id="dashboard_btn"
                            aria-label="navigate to the dashboard"
                            className={`flex justify-start items-center w-full min-h-[50px] pl-2 ${
                                pathname.endsWith("/dashboard")
                                    ? "text-silver cursor-not-allowed"
                                    : "hover:text-silver font-medium"
                            }`}
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li className="border-b-2 border-hover">
                        <Link
                            to="/dashboard/newTask"
                            id="addTask_btn"
                            aria-label="navigate to the add new task form"
                            className={`flex justify-start items-center w-full min-h-[50px] pl-2 ${
                                pathname.endsWith("/dashboard/newTask")
                                    ? "text-silver cursor-not-allowed"
                                    : "hover:text-silver font-medium"
                            }`}
                        >
                            Add a task
                        </Link>
                    </li>
                    <p className="text-hover/75 py-2">Account</p>
                    <li className="border-b-2 border-hover">
                        <button
                            onClick={logoutClicked}
                            id="logout_btn"
                            aria-label="logout of your account button"
                            className="flex justify-start items-center w-full min-h-[50px] hover:text-silver font-medium pl-2"
                        >
                            Logout
                        </button>
                    </li>
                    <li className="border-b-2 border-plainGray/10 py-2">
                        <button
                            onClick={deleteClicked}
                            id="delete_account_btn"
                            aria-label="delete your account button"
                            className="flex justify-center items-center w-full min-h-[50px] font-medium bg-red/75 text-silver hover:bg-warningRed rounded"
                        >
                            Delete Account
                        </button>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Menu;
