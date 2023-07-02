import { useEffect, useRef } from "react";
import { OnboardingAnim } from "../../animations/Onboarding";
import { EntryButton } from "../partials/Buttons";

const Onboarding = () => {
    let onboardingHeader = useRef(null);
    let onboardingText = useRef(null);
    let onboardingSignInLinks = useRef(null);

    useEffect(() => {
        OnboardingAnim(onboardingHeader, onboardingText, onboardingSignInLinks);
    });

    return (
        <section
            className="h-screen flex flex-col justify-evenly items-center text-center text-base sm:text-lg"
            id="onboarding_bg_container"
        >
            <section id="onboarding_message">
                <h1
                    className="text-3xl sm:text-4xl md:text-5xl max-w-prose"
                    ref={(el) => (onboardingHeader = el)}
                >
                    Welcome to Upto
                </h1>
                <p className="max-w-md my-10" ref={(el) => (onboardingText = el)}>
                    Utilise our software to organise your daily tasks and increase your productivity
                </p>
            </section>
            <section
                className="w-80 h-28 flex flex-col justify-evenly items-center"
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
