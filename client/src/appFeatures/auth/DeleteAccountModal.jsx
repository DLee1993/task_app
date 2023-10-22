import { PropTypes } from "prop-types";
import { Button, Modal, Alert, Group } from "@mantine/core";

export const DeleteAccountModal = ({ deleteOpened, closeDelete, deleteClicked }) => {
    return (
        <Modal
            title="Confirm you want to Delete Account?"
            opened={deleteOpened}
            onClose={closeDelete}
        >
            <Alert variant="light" color="red" title="Warning">
                This action can not be undone
            </Alert>
            <Group mt="lg">
                <Button onClick={deleteClicked}>Confirm</Button>
                <Button onClick={closeDelete}>Cancel</Button>
            </Group>
        </Modal>
    );
};

DeleteAccountModal.propTypes = {
    deleteOpened: PropTypes.bool,
    deleteClicked: PropTypes.func,
    closeDelete: PropTypes.func,
};
