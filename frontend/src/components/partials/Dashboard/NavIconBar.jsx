import { Group, Button } from "@mantine/core";
import { IoAdd, IoPersonCircleOutline, IoLogOut } from "react-icons/io5";
import { PropTypes } from "prop-types";

const NavIconBar = ({ taskMenuOpen, deleteAccountOpen }) => {
    return (
        <Group>
            <Button variant="subtle" onClick={taskMenuOpen}>
                <IoAdd size={25} />
            </Button>
            <Button variant="subtle">
                <IoPersonCircleOutline size={25} />
            </Button>
            <Button variant="subtle" onClick={deleteAccountOpen}>
                <IoLogOut size={25} />
            </Button>
        </Group>
    );
};

NavIconBar.propTypes = {
    taskMenuOpen: PropTypes.func,
    deleteAccountOpen: PropTypes.func,
};

export default NavIconBar;
