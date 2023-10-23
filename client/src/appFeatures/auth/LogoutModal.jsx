import { PropTypes } from "prop-types";
import { Button, Group, Modal } from "@mantine/core";
export const LogoutModal = ({ logoutOpened, logoutClicked, closeLogout }) => {
    return (
        <Modal title="Confirm you want to Logout?" opened={logoutOpened} onClose={closeLogout} centered>
            <Group>
                <Button onClick={logoutClicked} color="red">
                    Confirm
                </Button>
                <Button onClick={closeLogout} color="rgba(43, 45, 66, 1)" variant="outline">
                    Cancel
                </Button>
            </Group>
        </Modal>
    );
};

LogoutModal.propTypes = {
    logoutOpened: PropTypes.bool,
    logoutClicked: PropTypes.func,
    closeLogout: PropTypes.func,
};
