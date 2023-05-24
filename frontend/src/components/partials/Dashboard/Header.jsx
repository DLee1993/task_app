import NavMenu from "./NavMenu";
import ProfileDraw from "./ProfileDraw";

const Header = () => {
    return (
        <header className="app_header">
            <NavMenu />
            <h1 className="header_title">Dashboard</h1>
            <ProfileDraw />
        </header>
    );
};

export default Header;
