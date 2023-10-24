import { PropTypes } from "prop-types";
import { Menu, Button } from "@mantine/core";
import settingsIcon from "../../assets/settings.svg";
import logoutIcon from "../../assets/log-out.svg";

const NavMenu = ({ openLogout, openDelete, username }) => {
    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Button color="#2b2d42">
                    <img src={settingsIcon} alt="icon for menu button" className="w-5" />
                </Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>

                <Menu.Divider />

                <Menu.Item
                    color="red"
                    onClick={openLogout}
                    id="logout_account_btn"
                    aria-label="Click to logout"
                    rightSection={<img src={logoutIcon} alt="logout" className="w-4"/>}
                >
                    <p className="text-base">Logout</p>
                </Menu.Item>

                <Menu.Divider />

                {username !== "Guest" && (
                    <Menu.Item
                        onClick={openDelete}
                        id="delete_account_btn"
                        aria-label="Click to delete your account"
                        color="red"
                        rightSection={<img src={logoutIcon} alt="logout" className="w-4"/>}
                    >
                        <p className="text-base">Delete Account</p>
                    </Menu.Item>
                )}
            </Menu.Dropdown>
        </Menu>
    );
};

NavMenu.propTypes = {
    openLogout: PropTypes.func,
    openDelete: PropTypes.func,
    username: PropTypes.string,
};

export default NavMenu;
