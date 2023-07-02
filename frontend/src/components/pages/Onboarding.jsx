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
            className="h-screen bg-backgroundBlack text-fadedWhite flex justify-evenly items-center flex-col text-center"
            id="onboarding_bg_container"
        >
            <section id="onboarding_message">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium" ref={(el) => (onboardingHeader = el)}>Welcome to Upto</h1>
                <p className="text-xl my-10" ref={(el) => (onboardingText = el)}>
                    Utilise our software to organise your daily tasks and increase your productivity
                </p>
            </section>
            <section className="h-28 flex justify-between items-center flex-col" id="onboarding_sign-in_options" ref={(el) => (onboardingSignInLinks = el)}>
                <EntryButton endpoint={"login"} />
                <EntryButton endpoint={"register"} />
            </section>
        </section>
    );
};

export default Onboarding;
