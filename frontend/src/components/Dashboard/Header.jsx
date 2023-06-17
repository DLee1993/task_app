import NavIconBar from "./NavIconBar";

const Header = () => {
    const getTime = new Date().getHours();
    return (
        <header className="header">
            <h3>
                {getTime < 12 ? "Good Morning" : getTime < 17 ? "Good Afternoon" : "Good Evening"}{" "}
                User
            </h3>
            <NavIconBar />
        </header>
    );
};

export default Header;
