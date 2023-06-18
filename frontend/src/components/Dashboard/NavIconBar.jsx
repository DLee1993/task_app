import { Link } from "react-router-dom";
import { IoAdd, IoLogOut } from "react-icons/io5";

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
            >
                <IoAdd size={25} />
            </Link>
            <button onClick={logoutClicked} className="header_btn filled color_transition">
                <IoLogOut size={25} />
            </button>
        </section>
    );
};

export default NavIconBar;
