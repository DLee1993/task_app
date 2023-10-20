import { PropTypes } from "prop-types";
import NavMenu from "./NavMenu";

const Header = ({ title }) => {
    return (
        <header className="flex justify-between items-center h-20 px-4 shadow-md" id="header">
            <h3 className="text-lg max-w-[120px] min-[420px]:max-w-none capitalize">{title}</h3>
            <NavMenu />
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string,
    open: PropTypes.func,
};

export default Header;
