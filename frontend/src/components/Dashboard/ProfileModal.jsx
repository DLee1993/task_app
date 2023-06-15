import { Modal, Divider, Button } from "@mantine/core";
import { PropTypes } from "prop-types";

const ProfileModal = ({ opened, onClose }) => {
    const logoutClicked = () => {
        console.log("this is where we log out");
    };
    const deleteAccountClicked = () => {
        console.log("this is where we delete user account");
    };

    return (
        <Modal opened={opened} onClose={onClose} title="[Users name] Profile" centered>
            <section className="profile_header">
                <p>Email: [user email here]</p>
                <p>Joined on: [created at here]</p>
            </section>
            <Divider />
            <section className="tasks_tracker">
                <h2>Tasks Tracker</h2>
                <section className="tracker_flex_container">
                    <section className="current_tasks">
                        Open
                        <span className="current_number">2</span>
                    </section>
                    <section className="completed_tasks">
                        Completed
                        <span className="completed_number">0</span>
                    </section>
                </section>
            </section>
            <Divider />
            <section className="user_actions">
                <Button className="outline color_transition" onClick={logoutClicked}>
                    Logout
                </Button>
                <Button className="warning color_transition" onClick={deleteAccountClicked}>
                    Delete Account
                </Button>
            </section>
        </Modal>
    );
};

ProfileModal.propTypes = {
    opened: PropTypes.bool,
    onClose: PropTypes.func,
};

export default ProfileModal;
