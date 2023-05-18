import { Menu, Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    HiCog8Tooth,
    HiUserCircle,
    HiBars3CenterLeft,
    HiPencilSquare,
    HiCalendar,
    HiExclamationTriangle,
} from "react-icons/hi2";

const Header = () => {
    const [profileModalIsOpen, { open: openProfile, close: profileClose }] = useDisclosure(false);

    return (
        <>
            <header className="app_header">
                <Menu closeOnItemClick position="bottom-start" className="menu">
                    <Menu.Target className="menu_btn">
                        <Button>
                            <HiBars3CenterLeft />
                        </Button>
                    </Menu.Target>

                    <Menu.Dropdown className="menu_modal">
                        <Menu.Label>Settings</Menu.Label>

                        <Menu.Item icon={<HiPencilSquare />}>
                            Add a Task
                        </Menu.Item>

                        <Menu.Item icon={<HiCalendar />}>Calender</Menu.Item>

                        <Menu.Item icon={<HiCog8Tooth />}>Settings</Menu.Item>

                        <Menu.Divider />

                        <Menu.Label>Account</Menu.Label>
                        <Menu.Item icon={<HiUserCircle />} onClick={openProfile}>
                            Profile
                        </Menu.Item>

                        <Menu.Item icon={<HiExclamationTriangle />} className="delete_account">
                            Delete my account
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
                <h1 className="page_title">Dashboard</h1>
                <section className="account_link">
                    <Modal
                        opened={profileModalIsOpen}
                        onClose={profileClose}
                        title="Profile"
                        size="90%"
                    >
                        modal content here
                    </Modal>

                    <Group position="center">
                        <Button onClick={openProfile} className="profile_btn">
                            <HiUserCircle />
                        </Button>
                    </Group>
                </section>
            </header>
        </>
    );
};

export default Header;
