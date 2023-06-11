import { Modal } from "@mantine/core";
import { PropTypes } from "prop-types";

const LogoutModal = ({ opened, onClose }) => {
    return <Modal opened={opened} onClose={onClose} title="logout here" />;
};

LogoutModal.propTypes = {
    opened: PropTypes.bool,
    onClose: PropTypes.func,
};

export default LogoutModal;
