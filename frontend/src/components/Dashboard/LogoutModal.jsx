import { Modal, Button } from "@mantine/core";
import { PropTypes } from "prop-types";

const LogoutModal = ({ opened, onClose }) => {
    const handleLogout = () => {
        console.log("logging out");
    };

    return (
        <Modal opened={opened} onClose={onClose} centered>
            <section className="logout_modal_inner">
                <p>Confirm you want to logout of your account?</p>
                <Button.Group>
                    <Button className="outline color_transition" onClick={() => onClose(true)}>
                        cancel
                    </Button>
                    <Button className="warning color_transition" onClick={handleLogout}>
                        logout
                    </Button>
                </Button.Group>
            </section>
        </Modal>
    );
};

LogoutModal.propTypes = {
    opened: PropTypes.bool,
    onClose: PropTypes.func,
};

export default LogoutModal;
