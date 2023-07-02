import { Link } from "react-router-dom";
import PropTypes from "prop-types";

{
    /* ONBOARDING CTA */
}
export const EntryButton = ({ endpoint }) => {
    const formatEndpoint = endpoint.charAt(0).toUpperCase() + endpoint.slice(1);

    return (
        <Link to={`/${endpoint}`} className="w-full sm:max-w-xs h-10 sm:h-12 flex justify-center items-center bg-transparent border-brightPurple border-2 hover:bg-brightPurple hover:border-transparent transition duration-200">
            {formatEndpoint}
        </Link>
    );
};

EntryButton.propTypes = {
    endpoint: PropTypes.string,
};
