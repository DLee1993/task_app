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
import plusIcon from "../../assets/plus.svg";
const Header = ({ openAddTask }) => {
    let accountHolderId;
    const getTime = new Date().getHours();
    const navigate = useNavigate();
    let headerMessage;

    const { username } = useAuth();
    const users = useSelector(selectAllUsers);
    const firstName = username.split(" ")[0];

    users.forEach((user) => {
        if (user.username === username) {
            accountHolderId = user._id;
        }
    });

    if (getTime < 12) {
        headerMessage = `Good Morning, ${firstName}`;
    } else if (getTime < 17) {
        headerMessage = `Good Afternoon, ${firstName}`;
    } else {
        headerMessage = `Good Evening, ${firstName}`;
    }

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
                <h3 className="text-lg max-w-[120px] min-[420px]:max-w-none capitalize">
                    {headerMessage}
                </h3>
                <Group>
                    <Button
                        color="rgba(43, 45, 66, 1)"
                        variant="outline"
                        onClick={openAddTask}
                        leftSection={<img src={plusIcon} alt="add task" className="w-5"/>}
                    >
                        Add Task
                    </Button>
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
