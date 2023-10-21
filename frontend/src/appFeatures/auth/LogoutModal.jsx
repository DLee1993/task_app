import { PropTypes } from "prop-types";
import { Button, Modal } from "@mantine/core";
export const LogoutModal = ({ logoutOpened, logoutClicked, closeLogout }) => {
    return (
        <Modal title="Confirm you want to Logout?" opened={logoutOpened} onClose={closeLogout}>
            <Button onClick={logoutClicked}>Confirm</Button>
            <Button onClick={closeLogout}>Cancel</Button>
        </Modal>
    );
};

LogoutModal.propTypes = {
    logoutOpened: PropTypes.bool,
    logoutClicked: PropTypes.func,
    closeLogout: PropTypes.func,
};