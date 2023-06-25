import NavIconBar from "./NavIconBar";
import { PropTypes } from "prop-types";

const Header = ({ title }) => {
    return (
        <header className="header">
            <h3>{title}</h3>
            <NavIconBar />
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string,
};

export default Header;
