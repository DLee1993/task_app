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
import { Button, Modal, Alert } from "@mantine/core";
import NavMenu from "./NavMenu";
const Header = ({ title }) => {
    const [logoutOpened, { open: openLogout, close: closeLogout }] = useDisclosure(false);
    const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
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
        <header className="flex justify-between items-center h-20 px-4 shadow-md" id="header">
            <h3 className="text-lg max-w-[120px] min-[420px]:max-w-none capitalize">{title}</h3>
            <NavMenu openLogout={openLogout} openDelete={openDelete} username={username} />

            <Modal title="Confirm you want to Logout?" opened={logoutOpened} onClose={closeLogout}>
                <Button onClick={logoutClicked}>Confirm</Button>
                <Button onClick={closeLogout}>Cancel</Button>
            </Modal>

            <Modal
                title="Confirm you want to Delete Account?"
                opened={deleteOpened}
                onClose={closeDelete}
            >
                <Alert variant="light" color="red" title="Warning">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis, quae
                    tempore necessitatibus placeat saepe.
                </Alert>
                <Button onClick={deleteClicked}>Confirm</Button>
                <Button onClick={closeDelete}>Cancel</Button>
            </Modal>
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string,
};

export default Header;
