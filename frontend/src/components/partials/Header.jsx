import { PropTypes } from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllUsers } from "../../appFeatures/users/usersSlice";
import { useSendLogoutMutation } from "../../appFeatures/auth/authApiSlice";
import { useDeleteUserMutation } from "../../appFeatures/users/usersSlice";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useDisclosure } from "@mantine/hooks";
import NavMenu from "./NavMenu";
import { LogoutModal } from "../../appFeatures/auth/LogoutModal";
import { DeleteAccountModal } from "../../appFeatures/auth/DeleteAccountModal";
import { Button, Group } from "@mantine/core";
const Header = ({ title, openAddTask, openEditTask }) => {
    let accountHolderId;

    const { username } = useAuth();

    const navigate = useNavigate();

    const users = useSelector(selectAllUsers);

    users.forEach((user) => {
        if (user.username === username) {
            accountHolderId = user._id;
        }
    });

    const [logoutOpened, { open: openLogout, close: closeLogout }] = useDisclosure(false);
    const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
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

    useEffect(() => {
        isSuccess
            ? toast.success("Succesfully Logged out")
            : deleteSuccess
            ? toast.success("Succesfully deleted account")
            : null;

        isSuccess || deleteSuccess ? navigate("/") : null;
    }, [isSuccess, deleteSuccess, navigate]);

    useEffect(() => {
        if (isError) toast.error(error.data?.message);
        if (IsDeleteError) toast.error(deleteError.data?.message);
    }, [deleteError, error, isError, IsDeleteError]);

    useEffect(() => {
        if (isloading || deleteLoading) <p>Please wait...</p>;
    }, [isloading, deleteLoading]);

    const logoutClicked = () => sendLogout();
    const deleteClicked = () => sendDelete({ id: accountHolderId });

    return (
        <>
            <header className="flex justify-between items-center h-20 px-4 shadow-md" id="header">
                <h3 className="text-lg max-w-[120px] min-[420px]:max-w-none capitalize">{title}</h3>
                <Group>
                    <Button onClick={openEditTask}>Edit Task</Button>
                    <Button onClick={openAddTask}>Add Task</Button>
                    <NavMenu openLogout={openLogout} openDelete={openDelete} username={username} />
                </Group>
            </header>
            <LogoutModal
                logoutOpened={logoutOpened}
                closeLogout={closeLogout}
                logoutClicked={logoutClicked}
            />

            <DeleteAccountModal
                deleteOpened={deleteOpened}
                closeDelete={closeDelete}
                deleteClicked={deleteClicked}
            />
        </>
    );
};

Header.propTypes = {
    title: PropTypes.string,
    openAddTask: PropTypes.func,
    openEditTask: PropTypes.func,
};

export default Header;
