import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { Modal, Paper, Divider, Button } from "@mantine/core";
import { FaUserCircle } from "react-icons/fa";

const ProfileModal = ({ profileOpened, close }) => {
    const [confirmLogout, setConfirmLogout] = useState(false);

    const navigate = useNavigate();

    const onLogoutClicked = () => {
        setConfirmLogout(!confirmLogout);
        close();
        navigate("/");
    };

    const changeDetailsClicked = () => navigate("/dashboard/profile");
    
    return (
        <>
            <Modal opened={profileOpened} onClose={close} className="profileModal">
                <section className="profile_header">
                    <FaUserCircle size={25} />
                    <p className="users_name">John Doe</p>
                </section>
                <Divider />
                <section className="tasks_tracker">
                    <Paper className="current_tasks" shadow="xl" p="md">
                        Current Tasks <span className="current_number">1</span>
                    </Paper>
                    <Paper className="completed_tasks" shadow="xl" p="md">
                        Completed Tasks <span className="completed_number">8</span>
                    </Paper>
                </section>
                <Divider />
                <section className="user user-actions user-details">
                    <span className="user_details">Email: johnDoe@example.com</span>
                    <Button className="detail-changes filled" onClick={changeDetailsClicked}>
                        change details
                    </Button>
                    <Button className="logout_cta warning" onClick={onLogoutClicked}>
                        logout
                    </Button>
                </section>
            </Modal>
        </>
    );
};

ProfileModal.propTypes = {
    profileOpened: PropTypes.bool,
    close: PropTypes.func,
};

export default ProfileModal;
