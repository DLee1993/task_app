import { Menu, Button } from "@mantine/core";
import { HiCog8Tooth, HiUserCircle, HiCamera, HiKey, HiBars3CenterLeft } from "react-icons/hi2";

const Header = () => {
    return (
        <header className="app_header">
            <Menu closeOnItemClick width={400} position="bottom-start">
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
                    <Menu.Item icon={<HiUserCircle size={25} />}>Messages</Menu.Item>
                    <Menu.Item icon={<HiCamera size={25} />}>Gallery</Menu.Item>
                    <Menu.Item icon={<HiKey size={25} />}>Search</Menu.Item>

                    <Menu.Divider />

                    <Menu.Label>Account</Menu.Label>
                    <Menu.Item icon={<HiCamera size={25} />}>Transfer my data</Menu.Item>
                    <Menu.Item icon={<HiUserCircle size={25} />} className="delete_account">
                        Delete my account
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <h1 className="page_title">Dashboard</h1>
            <span className="account_link">account modal here</span>
        </header>
    );
};

export default Header;
