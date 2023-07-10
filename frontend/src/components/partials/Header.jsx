import NavBar from "./NavBar";
import { PropTypes } from "prop-types";

const Header = ({ title }) => {
    return (
        <header
            className="flex justify-between items-center h-fit sm:h-16 px-5 border-b-2 border-plainGray"
            id="header"
        >
            <h3 className="text-lg">{title}</h3>
            <NavBar />
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string,
};

export default Header;
