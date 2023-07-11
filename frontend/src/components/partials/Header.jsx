import Menu from "./Menu";
import { PropTypes } from "prop-types";

const Header = ({ title }) => {
    return (
        <header
            className="flex justify-between items-center h-16 px-2 sm:px-5 border-b-2 border-plainGray"
            id="header"
        >
            <h3 className="text-lg">{title}</h3>
            <Menu />
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string,
};

export default Header;
