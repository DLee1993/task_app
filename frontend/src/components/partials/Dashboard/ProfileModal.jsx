import { Modal } from "@mantine/core";
import { PropTypes } from "prop-types";

const ProfileModal = ({ opened, onClose }) => {
    return <Modal opened={opened} onClose={onClose} title="user profile here!" />;
};

ProfileModal.propTypes = {
    opened: PropTypes.bool,
    onClose: PropTypes.func,
};

export default ProfileModal;
