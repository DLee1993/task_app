import { PropTypes } from "prop-types";
import NavIconBar from "./NavIconBar";

const Header = ({ taskMenuOpen, logoutAccountOpen }) => {
    return (
        <header className="app_header">
            <h3>Welcome User</h3>
            <NavIconBar taskMenuOpen={taskMenuOpen} logoutAccountOpen={logoutAccountOpen} />
        </header>
    );
};

Header.propTypes = {
    taskMenuOpen: PropTypes.func,
    logoutAccountOpen: PropTypes.func,
};

export default Header;
