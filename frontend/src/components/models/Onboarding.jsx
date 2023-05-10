import React from "react";
import { Link } from "react-router-dom";

const Onboarding = () => {
    return (
        <section className="onboarding_page">
            <section className="onboarding_container">
                <h1>Welcome to UpTo</h1>
                <p>Please login to your account or create a new account to continue</p>
                <section className="cta_container">
                    <Link to="login" className="fill login_cta">
                        login
                    </Link>
                    <Link to="register" className="transparent register_cta">
                        register
                    </Link>
                </section>
            </section>
        </section>
    );
};

export default Onboarding;
