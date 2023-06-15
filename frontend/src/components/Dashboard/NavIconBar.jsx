import { Group, Button } from "@mantine/core";
import { IoAdd, IoPersonCircleOutline, IoLogOut } from "react-icons/io5";
import { PropTypes } from "prop-types";

const NavIconBar = ({ taskMenuOpen, logoutAccountOpen, profileOpen }) => {
    return (
        <Group className="nav-button_group">
            <Button variant="subtle" onClick={taskMenuOpen} className="hover color_transition">
                <IoAdd size={25} />
            </Button>
            <Button variant="subtle" onClick={profileOpen} className="hover color_transition">
                <IoPersonCircleOutline size={25} />
            </Button>
            <Button variant="subtle" onClick={logoutAccountOpen} className="hover color_transition">
                <IoLogOut size={25} />
            </Button>
        </Group>
    );
};

NavIconBar.propTypes = {
    taskMenuOpen: PropTypes.func,
    logoutAccountOpen: PropTypes.func,
    profileOpen: PropTypes.func,
};

export default NavIconBar;
