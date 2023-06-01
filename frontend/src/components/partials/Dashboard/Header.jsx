import { PropTypes } from "prop-types";
import NavIconBar from "./NavIconBar";

const Header = ({ taskMenuOpen, logoutAccountOpen, profileOpen }) => {
    const getTime = new Date().getHours();
    return (
        <header className="app_header">
            <h3>
                {getTime < 12 ? "Good Morning" : getTime < 17 ? "Good Afternoon" : "Good Evening"}{" "}
                User
            </h3>
            <NavIconBar
                taskMenuOpen={taskMenuOpen}
                logoutAccountOpen={logoutAccountOpen}
                profileOpen={profileOpen}
            />
        </header>
    );
};

Header.propTypes = {
    taskMenuOpen: PropTypes.func,
    logoutAccountOpen: PropTypes.func,
    profileOpen: PropTypes.func,
};

export default Header;
