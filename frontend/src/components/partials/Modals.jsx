import { PropTypes } from "prop-types";
import { Button, Modal, Alert } from "@mantine/core";

export const AddTaskModal = () => {};

export const EditTaskModal = () => {};

export const LogoutModal = ({ logoutOpened, logoutClicked, closeLogout }) => {
    return (
        <Modal title="Confirm you want to Logout?" opened={logoutOpened} onClose={closeLogout}>
            <Button onClick={logoutClicked}>Confirm</Button>
            <Button onClick={closeLogout}>Cancel</Button>
        </Modal>
    );
};

export const DeleteAccountModal = ({ deleteOpened, closeDelete, deleteClicked }) => {
    return (
        <Modal
            title="Confirm you want to Delete Account?"
            opened={deleteOpened}
            onClose={closeDelete}
        >
            <Alert variant="light" color="red" title="Warning">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis, quae tempore
                necessitatibus placeat saepe.
            </Alert>
            <Button onClick={deleteClicked}>Confirm</Button>
            <Button onClick={closeDelete}>Cancel</Button>
        </Modal>
    );
};

LogoutModal.propTypes = {
    logoutOpened: PropTypes.bool,
    logoutClicked: PropTypes.func,
    closeLogout: PropTypes.func,
};

DeleteAccountModal.propTypes = {
    deleteOpened: PropTypes.bool,
    deleteClicked: PropTypes.func,
    closeDelete: PropTypes.func,
};
