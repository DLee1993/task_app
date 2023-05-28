import { useState } from "react";
import { PropTypes } from "prop-types";
import { Button, Modal } from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConfirmAccountDelete = ({ deleteAccountOpened, close }) => {
    const [confirmDelete, setConfirmDelete] = useState(false);

    const onDeleteClicked = () => {
        setConfirmDelete(!confirmDelete);
        toast.success("You have successfully deleted your account");
        close();
    };

    return (
        <>
            <ToastContainer />
            <Modal opened={deleteAccountOpened} onClose={close}>
                <h1>Confirm you want to Delete your account</h1>
                <p>This action can not be undone</p>
                <Button.Group>
                    <Button className="cancel-cta" onClick={close}>
                        Cancel
                    </Button>
                    <Button className="delete_account-cta" onClick={onDeleteClicked}>
                        Delete
                    </Button>
                </Button.Group>
            </Modal>
        </>
    );
};

ConfirmAccountDelete.propTypes = {
    deleteAccountOpened: PropTypes.bool,
    close: PropTypes.func,
};

export default ConfirmAccountDelete;
