import { Link } from "react-router-dom";
import PropTypes from "prop-types";
export const EntryButton = ({ endpoint }) => {
    const formatEndpoint = endpoint.charAt(0).toUpperCase() + endpoint.slice(1);

    return (
        <Link
            to={`/${endpoint}`}
            className="flex justify-center items-center w-60 h-12 text-xl cursor-pointer border-2 border-fadedPurple hover:bg-brightPurple hover:border-transparent transition-all transition-200"
            id="login_cta"
        >
            {formatEndpoint}
        </Link>
    );
};

EntryButton.propTypes = {
    endpoint: PropTypes.string,
};
