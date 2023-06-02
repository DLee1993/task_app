import gsap from "gsap";
const tl = gsap.timeline();

export const OnboardingAnim = (node1, node2, node3) => {
    tl.to([node1, node2, node3], {
        y: 0,
        opacity: 1,
        stagger: 0.2,
    });
};
