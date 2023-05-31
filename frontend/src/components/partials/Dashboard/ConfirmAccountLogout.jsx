import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { Button, Modal } from "@mantine/core";
import "react-toastify/dist/ReactToastify.css";

const ConfirmAccountLogout = ({ logoutAccountOpened, close }) => {
    const [confirmLogout, setConfirmLogout] = useState(false);

    const navigate = useNavigate();

    const onLogoutClicked = () => {
        setConfirmLogout(!confirmLogout);
        close();
        navigate("/");
    };

    return (
        <>
            <Modal
                opened={logoutAccountOpened}
                onClose={close}
                title="Confirm you want to Logout of your account?"
                padding="xl"
                centered
            >
                <Button.Group>
                    <Button className="cancel-cta filled_btn" onClick={close}>
                        Cancel
                    </Button>
                    <Button className="delete_account-cta warning_btn" onClick={onLogoutClicked}>
                        Logout
                    </Button>
                </Button.Group>
            </Modal>
        </>
    );
};

ConfirmAccountLogout.propTypes = {
    logoutAccountOpened: PropTypes.bool,
    close: PropTypes.func,
};

export default ConfirmAccountLogout;
