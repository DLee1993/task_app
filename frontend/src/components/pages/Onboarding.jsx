import { useEffect, useRef } from "react";
import { EntryButton } from "../partials/Buttons";
import gsap from "gsap";

const Onboarding = () => {
    let onboardingHeader = useRef(null);
    let onboardingText = useRef(null);
    let onboardingSignInLinks = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        const OnboardingAnim = (node1, node2, node3) => {
            tl.to([node1, node2, node3], {
                y: 0,
                opacity: 1,
                stagger: 0.2,
            });
        };
        OnboardingAnim(onboardingHeader, onboardingText, onboardingSignInLinks);
    });

    return (
        <section
            className="h-screen flex flex-col justify-evenly items-center text-center text-base sm:text-lg"
            id="onboarding_bg_container"
        >
            <section id="onboarding_message">
                <h1
                    className="text-3xl sm:text-4xl md:text-5xl max-w-prose opacity-0 translate-y-5"
                    ref={(el) => (onboardingHeader = el)}
                >
                    Welcome to Upto
                </h1>
                <p
                    className="max-w-md my-10 opacity-0 translate-y-5"
                    ref={(el) => (onboardingText = el)}
                >
                    Utilise our software to organise your daily tasks and increase your productivity
                </p>
            </section>
            <section
                className="w-80 h-28 flex flex-col justify-evenly items-center opacity-0 translate-y-5"
                id="onboarding_sign-in_options"
                ref={(el) => (onboardingSignInLinks = el)}
            >
                <EntryButton endpoint={"login"} />
                <EntryButton endpoint={"register"} />
            </section>
        </section>
    );
};

export default Onboarding;
