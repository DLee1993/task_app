import { Modal } from "@mantine/core";
import { PropTypes } from "prop-types";

const AddTaskModal = ({ opened, onClose }) => {
    return <Modal opened={opened} onClose={onClose} title="tasks here" centered fullScreen></Modal>;
};

AddTaskModal.propTypes = {
    opened: PropTypes.bool,
    onClose: PropTypes.func,
};

export default AddTaskModal;
