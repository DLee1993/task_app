import { Link } from "react-router-dom";
import PropTypes from "prop-types";

{
    /* ONBOARDING CTA */
}
export const EntryButton = ({ endpoint }) => {
    const formatEndpoint = endpoint.charAt(0).toUpperCase() + endpoint.slice(1);

    return (
        <Link to={`/${endpoint}`} className="entry_btn">
            {formatEndpoint}
        </Link>
    );
};

EntryButton.propTypes = {
    endpoint: PropTypes.string,
};
