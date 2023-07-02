import NavIconBar from "./NavIconBar";
import { PropTypes } from "prop-types";

const Header = ({ title }) => {
    return (
        <header className="flex justify-between items-center h-16 px-5 border-b-2 border-brightPurple sm:h-fit" id="header">
            <h3 className="text-lg">{title}</h3>
            <NavIconBar />
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string,
};

export default Header;
