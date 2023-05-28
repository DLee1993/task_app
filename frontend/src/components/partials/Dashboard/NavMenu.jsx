import { useState } from "react";
import { PropTypes } from "prop-types";
import { Menu, Button } from "@mantine/core";
import { HiMenuAlt2, HiPlus, HiCalendar, HiTrash, HiUserCircle } from "react-icons/hi";

const NavMenu = ({ taskMenuOpen, deleteAccountOpen }) => {
    const [menuOpened, setMenuOpened] = useState(false);

    return (
        <>
            <Menu opened={menuOpened} onChange={setMenuOpened} position="bottom-start">
                <Menu.Target>
                    <Button className="navMenu_cta">
                        <HiMenuAlt2 size="1.5em" />
                    </Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label>Features</Menu.Label>
                    <Menu.Item icon={<HiPlus size={20} />} onClick={taskMenuOpen}>
                        Add Task
                    </Menu.Item>
                    <Menu.Item icon={<HiCalendar size={20} />}>Calendar</Menu.Item>

                    <Menu.Divider />

                    <Menu.Label>Account Settings</Menu.Label>
                    <Menu.Item icon={<HiUserCircle size={20} />} className="profile_cta">
                        User Profile
                    </Menu.Item>
                    <Menu.Item
                        icon={<HiTrash size={20} />}
                        className="delete_cta"
                        onClick={deleteAccountOpen}
                    >
                        Delete my account
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    );
};

NavMenu.propTypes = {
    taskMenuOpen: PropTypes.func,
    deleteAccountOpen: PropTypes.func,
};

export default NavMenu;
