import { useState } from "react";
import { Menu, Button } from "@mantine/core";
import { HiMenuAlt2, HiPlus, HiCalendar, HiTrash } from "react-icons/hi";

const NavMenu = () => {
    const [menuOpened, setMenuOpened] = useState(false);

    return (
        <Menu opened={menuOpened} onChange={setMenuOpened}>
            <Menu.Target>
                <Button className="navMenu_cta">
                    <HiMenuAlt2 size="1.5em" />
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Features</Menu.Label>
                <Menu.Item icon={<HiPlus size={14} />}>Add Task</Menu.Item>
                <Menu.Item icon={<HiCalendar size={14} />}>Calendar</Menu.Item>

                <Menu.Divider />

                <Menu.Label>Account Settings</Menu.Label>
                <Menu.Item icon={<HiTrash size={14} />} className="delete_cta">
                    Delete my account
                    {/* THIS NEEDS TO TRIGGER A CONFIRM MODAL */}
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default NavMenu;
