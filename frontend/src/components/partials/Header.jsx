import { Menu, Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    HiCog8Tooth,
    HiUserCircle,
    HiBars3CenterLeft,
} from "react-icons/hi2";

const Header = () => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <header className="app_header">
            <Menu closeOnItemClick position="bottom-start" className="menu">
                <Menu.Target className="menu_btn">
                    <Button>
                        <HiBars3CenterLeft />
                    </Button>
                </Menu.Target>

                <Menu.Dropdown className="menu_modal">
                    <Menu.Label>Settings</Menu.Label>
                    <Menu.Item
                        icon={<HiCog8Tooth size={25} />}
                        component="a"
                        href="/dashboard/settings"
                    >
                        Settings
                    </Menu.Item>
                    <Menu.Divider />

                    <Menu.Label>Account</Menu.Label>
                    <Menu.Item icon={<HiUserCircle size={25} />}>Account</Menu.Item>
                    <Menu.Item icon={<HiUserCircle size={25} />} className="delete_account">
                        Delete my account
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <h1 className="page_title">Dashboard</h1>
            <section className="account_link">
                <Modal opened={opened} onClose={close} title="Profile" size="90%">
                    modal content here
                </Modal>

                <Group position="center">
                    <Button onClick={open} className="profile_btn">
                        <HiUserCircle />
                    </Button>
                </Group>
            </section>
        </header>
    );
};

export default Header;
