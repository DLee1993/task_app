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
        <section
            className="h-screen bg-backgroundBlack text-fadedWhite flex justify-center items-center flex-col text-center"
            id="onboarding_bg_container"
        >
            <section id="onboarding_message">
                <h1 ref={(el) => (onboardingHeader = el)}>Welcome to Upto</h1>
                <p ref={(el) => (onboardingText = el)}>
                    Utilise our software to organise your daily tasks and increase your productivity
                </p>
            </section>
            <section id="onboarding_sign-in_options" ref={(el) => (onboardingSignInLinks = el)}>
                <Link to="/login" className="entry" id="login_cta">
                    login
                </Link>
                <Link to="/register" className="entry" id="register_cta">
                    register
                </Link>
            </section>
        </section>
    );
};

export default Onboarding;
