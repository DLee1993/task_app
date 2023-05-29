import { useState } from "react";
import { PropTypes } from "prop-types";
import { Button, Modal } from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConfirmAccountLogout = ({ logoutAccountOpened, close }) => {
    const [confirmLogout, setConfirmLogout] = useState(false);

    const onLogoutClicked = () => {
        setConfirmLogout(!confirmLogout);
        toast.success("You have successfully logged out of your account");
        close();
    };

    return (
        <>
            <ToastContainer />
            <Modal opened={logoutAccountOpened} onClose={close}>
                <h1>Confirm you want to Logout of your account</h1>
                <p>This action can not be undone</p>
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
