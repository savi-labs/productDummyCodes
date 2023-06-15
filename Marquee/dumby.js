let lastScrollY = 0;

const init = () => {
    console.log("first");
    const marquee = document.querySelector("[savi-marquee-content]");
    if (!marquee) {
        return;
    }
    const duration = parseInt(marquee.getAttribute("duration"), 10) || 10;
    const marqueeContent = marquee.firstChild;
    if (!marqueeContent) {
        return;
    }

    const containerWidth = marquee.offsetWidth;
    const screenWidth = window.innerWidth;
    // const numClones = Math.floor(screenWidth / containerWidth);

    const children = marquee.children;
    const numChildren = children.length;
    let clonedChildren = [];

    // Iterate over the children array and clone each child element
    for (let i = 0; i < numChildren; i++) {
        const clonedChild = children[i].cloneNode(true);
        clonedChildren.push(clonedChild);
    }

    // Insert the cloned nodes before the original nodes
    clonedChildren.forEach((clonedChild, i) => {
        marquee.insertBefore(clonedChild, children[i]);
    });

    // const clonedContent = marqueeContent.cloneNode(true);
    // // clonedContent.classList.add("cloned-node");
    // marquee.insertBefore(clonedContent, marquee);

    // const clonedNodes = [];

    // for (let i = 0; i < marquee.children.length; i++) {
    //     console.log(i);
    //     const clonedContent = marquee.children[i].cloneNode(true);
    //     clonedContent.classList.add("cloned-node");
    //     clonedNodes.push(clonedContent);
    // }

    // console.log(marquee, clonedContent)
    // marquee.before(...clonedNodes);
    // marquee.after(...clonedNodes.map((node) => node.cloneNode(true)));

    let tween;
    let isScrollingUp = false;

    const playMarquee = () => {
        const width = parseInt(
            getComputedStyle(marquee).getPropertyValue("width"),
            10
        );
        const gap = parseInt(
            getComputedStyle(marquee).getPropertyValue("column-gap"),
            10
        ) || 0
        const distanceToTranslate = 1 * (gap + width);
        tween = gsap.to(marquee, {
            x: -distanceToTranslate,
            duration,
            ease: "none",
            repeat: -1,
        });
    };
    playMarquee();

    function debounce(func) {
        var timer;
        return function (event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(
                () => {
                    func();
                },
                500,
                event
            );
        };
    }

    window.addEventListener("resize", debounce(playMarquee));

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY < lastScrollY) {
            // scrolling up
            isScrollingUp = true;
            // tween.reverse()
        } else {
            // scrolling down
            isScrollingUp = false;

            // tween.reverse()

        }
        lastScrollY = currentScrollY;
        tween.pause();
        playMarquee();
    });
};

document.addEventListener("DOMContentLoaded", init);
