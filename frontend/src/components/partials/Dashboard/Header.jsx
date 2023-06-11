import { PropTypes } from "prop-types";
import NavIconBar from "./NavIconBar";

const Header = ({ taskMenuOpen, logoutMenuOpen, profileMenuOpen }) => {
    const getTime = new Date().getHours();
    return (
        <header className="header">
            <h3>
                {getTime < 12 ? "Good Morning" : getTime < 17 ? "Good Afternoon" : "Good Evening"}{" "}
                User
            </h3>
            <NavIconBar
                taskMenuOpen={taskMenuOpen}
                logoutAccountOpen={logoutMenuOpen}
                profileOpen={profileMenuOpen}
            />
        </header>
    );
};

Header.propTypes = {
    taskMenuOpen: PropTypes.func,
    logoutMenuOpen: PropTypes.func,
    profileMenuOpen: PropTypes.func,
};

export default Header;
