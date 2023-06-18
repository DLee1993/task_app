import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { OnboardingAnim } from "../../animations/Onboarding";

const Onboarding = () => {
    let onboardingHeader = useRef(null);
    let onboardingText = useRef(null);
    let onboardingSignInLinks = useRef(null);

    useEffect(() => {
        OnboardingAnim(onboardingHeader, onboardingText, onboardingSignInLinks);
    });

    return (
        <section className="onboarding_bg_container">
            <section className="onboarding_message">
                <h1 ref={(el) => (onboardingHeader = el)}>Welcome to Upto</h1>
                <p ref={(el) => (onboardingText = el)}>
                    Utilise our software to organise your daily tasks and increase your productivity
                </p>
            </section>
            <section
                className="onboarding_sign-in_options"
                ref={(el) => (onboardingSignInLinks = el)}
            >
                <Link to="/login" className="login_cta form_btn color_transition link outline">
                    login
                </Link>
                <Link to="/register" className="register_cta form_btn color_transition link outline">
                    register
                </Link>
            </section>
        </section>
    );
};

export default Onboarding;
