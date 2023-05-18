import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { onboarding_Anim } from "../../animations/Animations";

const Onboarding = () => {
    let header = useRef(null);
    let subText = useRef(null);
    let ctaContainer = useRef(null);
    let containerBackground = useRef(null);

    useEffect(() => {
        onboarding_Anim(containerBackground, header, subText, ctaContainer);
    });

    return (
        <section className="onboarding_page">
            <section className="onboarding_container" ref={(el) => (containerBackground = el)}>
                <h1 ref={(el) => (header = el)}>Welcome to UpTo</h1>
                <p ref={(el) => (subText = el)}>
                    Please login to your account or create a new account to continue
                </p>
                <section className="cta_container" ref={(el) => (ctaContainer = el)}>
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
