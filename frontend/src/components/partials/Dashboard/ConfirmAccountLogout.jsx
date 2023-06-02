import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { Button, Modal, Group } from "@mantine/core";
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
                <Group className="logout_select_btns">
                    <Button className="cancel-cta outline" onClick={close}>
                        Cancel
                    </Button>
                    <Button className="logout_cta warning" onClick={onLogoutClicked}>
                        Logout
                    </Button>
                </Group>
            </Modal>
        </>
    );
};

ConfirmAccountLogout.propTypes = {
    logoutAccountOpened: PropTypes.bool,
    close: PropTypes.func,
};

export default ConfirmAccountLogout;
