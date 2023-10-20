import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectAllUsers } from "../../appFeatures/users/usersSlice";
import { useSendLogoutMutation } from "../../appFeatures/auth/authApiSlice";
import { useDeleteUserMutation } from "../../appFeatures/users/usersSlice";
import useAuth from "../../hooks/useAuth";
import { Menu, Button } from "@mantine/core";
import { toast } from "react-toastify";

const NavMenu = () => {
    const { username } = useAuth();
    const users = useSelector(selectAllUsers);
    let accountHolderId;
    const navigate = useNavigate();
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
            toast.error(error.data?.message, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }

        if (IsDeleteError) {
            toast.error(deleteError.data?.message, { position: toast.POSITION.BOTTOM_CENTER });
        }
    }, [deleteError, error, isError, IsDeleteError]);

    useEffect(() => {
        if (isloading || deleteLoading) {
            return <p>Please wait...</p>;
        }
    }, [isloading, deleteLoading]);

    const logoutClicked = () => sendLogout();
    const deleteClicked = () => sendDelete({ id: accountHolderId });

    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Button color="#2b2d42">Menu</Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item>Dashboard</Menu.Item>
                <Menu.Item>
                    <Link>Add Task</Link>
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Account</Menu.Label>
                <Menu.Item
                    color="red"
                    onClick={logoutClicked}
                    id="logout_account_btn"
                    aria-label="Click to logout"
                >
                    Logout
                </Menu.Item>

                <Menu.Divider />

                {username !== "Guest" && (
                    <Menu.Item
                        onClick={deleteClicked}
                        id="delete_account_btn"
                        aria-label="Click to delete your account"
                    >
                        <Button variant="filled" color="red" fullWidth>
                            Delete Account
                        </Button>
                    </Menu.Item>
                )}
            </Menu.Dropdown>
        </Menu>
    );
};

export default NavMenu;
