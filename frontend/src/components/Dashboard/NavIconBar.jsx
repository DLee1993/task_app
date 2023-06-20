import PlusIcon from "../../assets/plus.svg";
import LogoutIcon from "../../assets/log-out.svg";
import { Link } from "react-router-dom";

const NavIconBar = () => {
    const logoutClicked = () => {
        console.log("logout here");
    };

    return (
        <section className="nav-button_group">
            <Link
                to="/dashboard/newTask"
                variant="subtle"
                className="header_btn filled color_transition"
                aria-label="navigate to the add new task form page link"
            >
                <img src={PlusIcon} alt="addTask icon" />
            </Link>
            <button
                onClick={logoutClicked}
                className="header_btn filled color_transition"
                aria-label="logout of your account button"
            >
                <img src={LogoutIcon} alt="logout icon" />
            </button>
        </section>
    );
};

export default NavIconBar;
