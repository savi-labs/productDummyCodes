window.addEventListener('load', () => {
    console.log("here")

    const myElement = document.querySelector("[savi-marquee-content]");
    // Then, create a GSAP timeline and add a tween to move the element
    const myTimeline = gsap.timeline({
        onReverseComplete: () => myTimeline.progress(1)
    });

    myTimeline.to(myElement, { duration: 10, x: -myElement.clientWidth, repeat: -1, ease: "none" });

    ScrollTrigger.create({
        trigger: myElement,
        start: 'top 80%',
        end: 'bottom 20%',
        // pin: true,
        // scrub: true,
        // snap: {
        //     snapTo: 'labels',
        //     duration: { min: 0.05, max: 0.3 },
        //     delay: 0.1
        // },
        onUpdate: (self) => {
            // Set the direction of the animation based on the current scroll position
            myTimeline.timeScale(self.getVelocity() < 0 ? -1 : 1);
        }
    });
})