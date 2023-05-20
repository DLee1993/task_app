import { Link } from "react-router-dom";

const Onboarding = () => {
    return (
        <section className="onboarding_bg_container">
            <section className="onboarding_sign-in_options">
                <h1>Welcome to UpTo</h1>
                <p>Improve your productivity by managing your daily tasks efficiently</p>
                <section className="sign-in_links">
                    <Link to="/login" className="login_cta">
                        LOGIN
                    </Link>
                    <Link to="/register" className="register_cta">
                        REGISTER
                    </Link>
                </section>
            </section>
        </section>
    );
};

export default Onboarding;
