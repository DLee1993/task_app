import gsap from 'gsap'
const tl = gsap.timeline(); 

export const OnboardingAnim = (node1, node2, node3, node4) => {
    tl.to([node1, node2, node3, node4], {
        y: 0,
        opacity: 1,
    })
}