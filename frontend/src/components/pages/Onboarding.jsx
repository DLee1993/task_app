import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { OnboardingAnim } from "../../animations/Onboarding";

const Onboarding = () => {
    let onboardingHeader = useRef(null);
    let onboardingText = useRef(null);
    let onboardingLoginLink = useRef(null);
    let onboardingRegisterLink = useRef(null);

    useEffect(() => {
        OnboardingAnim(
            onboardingHeader,
            onboardingText,
            onboardingLoginLink,
            onboardingRegisterLink
        );
    });

    return (
        <section className="onboarding_bg_container">
            <section className="onboarding_message">
                <h1 ref={(el) => (onboardingHeader = el)}>Welcome to Upto</h1>
                <p ref={(el) => (onboardingText = el)}>
                    Utilise our software to organise your daily tasks and increase your productivity
                </p>
            </section>
            <section className="onboarding_sign-in_options">
                <Link
                    to="/login"
                    className="login_cta link outline"
                    ref={(el) => (onboardingLoginLink = el)}
                >
                    login
                </Link>
                <Link
                    to="/register"
                    className="register_cta link outline"
                    ref={(el) => (onboardingRegisterLink = el)}
                >
                    register
                </Link>
            </section>
        </section>
    );
};

export default Onboarding;
