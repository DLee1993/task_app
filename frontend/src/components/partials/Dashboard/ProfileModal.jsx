import { PropTypes } from "prop-types";
import { Modal } from "@mantine/core";

const ProfileModal = ({ profileOpened, close }) => {
    return (
        <>
            <Modal
                opened={profileOpened}
                onClose={close}
                title="Add a Task"
                fullScreen
                className="addTaskModal"
            >
                profile goes here
            </Modal>
        </>
    );
};

ProfileModal.propTypes = {
    profileOpened: PropTypes.bool,
    close: PropTypes.func,
};

export default ProfileModal;
