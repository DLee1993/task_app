import Menu from "./Menu";
import { PropTypes } from "prop-types";

const Header = ({ title }) => {
    return (
        <header
            className="flex justify-between items-center h-20 px-2 bg-blue text-silver"
            id="header"
        >
            <h3 className="text-lg max-w-[120px] min-[420px]:max-w-none">{title}</h3>
            <Menu />
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string,
};

export default Header;
