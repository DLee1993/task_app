import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const Onboarding = () => {
    let onboardingHeader = useRef(null);
    let onboardingText = useRef(null);
    let onboardingLoginLink = useRef(null);
    let onboardingRegisterLink = useRef(null);
    ("");
    useEffect(() => {
        const tl = gsap.timeline();

        const OnboardingAnim = (node1, node2, node3, node4) => {
            tl.to([node1, node2, node3, node4], {
                y: 0,
                opacity: 1,
                stagger: 0.2,
            });
        };
        OnboardingAnim(
            onboardingHeader,
            onboardingText,
            onboardingLoginLink,
            onboardingRegisterLink
        );
    });

    return (
        <section
            className="h-screen flex flex-col justify-center items-center text-center text-base sm:text-lg"
            id="onboarding_bg_container"
        >
            <section id="onboarding_message">
                <h1
                    className="text-3xl sm:text-4xl md:text-5xl max-w-prose opacity-0 translate-y-5"
                    ref={(el) => (onboardingHeader = el)}
                >
                    Welcome to Noted
                </h1>
                <p
                    className="max-w-md my-10 opacity-0 translate-y-5"
                    ref={(el) => (onboardingText = el)}
                >
                    Utilise our software to organise your daily tasks and increase your productivity
                </p>
            </section>
            <section
                className="w-80 h-28 mt-40 flex flex-col justify-evenly items-center"
                id="onboarding_sign-in_options"
            >
                <Link
                    to="/login"
                    className="onBoardingButton"
                    ref={(el) => (onboardingLoginLink = el)}
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="onBoardingButton"
                    ref={(el) => (onboardingRegisterLink = el)}
                >
                    Register
                </Link>
            </section>
        </section>
    );
};

export default Onboarding;
