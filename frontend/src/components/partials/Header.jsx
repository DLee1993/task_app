import { Link } from "react-router-dom";
import { HiMenuAlt1, HiUserCircle } from "react-icons/hi";

const Header = () => {
    return (
        <header className="app_header">
            <span className="menu_btn">
                <HiMenuAlt1 />
            </span>
            <nav className="menu">menu</nav>
            <h1 className="page_title">Dashboard</h1>
            <span className="account_link">
                <Link to={"/dashboard/account"}>
                    <HiUserCircle />
                </Link>
            </span>
        </header>
    );
};

export default Header;
