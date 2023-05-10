import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

var tl = gsap.timeline({ duration: 1.2 });

export const onboarding_Anim = (node1, node2, node3, node4) => {
    tl.to(node1, { backgroundColor: "#121212b3" })
        .to(node2, { y: 0, opacity: 1 })
        .to(node3, { y: 0, opacity: 1 }, "-=0.2")
        .to(node4, { y: 0, opacity: 1 }, "-=0.3");
};
