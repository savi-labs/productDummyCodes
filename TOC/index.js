// version 1.0.1

window.addEventListener('load', () => {
    let headingsObj = []
    let isManuallyScrolled = true
    const container = document.querySelector('[savi-generate-toc]');
    const originalDiv = document.querySelector('[toc-first-link]');
    const activeClassName = saviTOC.activeClassName
    const richTextContainer = document.querySelector('[toc-rich_text]')

    const headings = richTextContainer.querySelectorAll(container.getAttribute('savi-generate-toc'));
    const toc = document.createElement('ul');
    container.appendChild(toc);

    let tocContainerRect = container.getBoundingClientRect();
    let tocInViewport = false;
    let activeHeading = null;
    function handleScroll() {
        // Get the current scroll position
        var scrollPosition = window.scrollY;

        // Compare the current scroll position with the previous one to determine the scroll direction
        if (scrollPosition > handleScroll.prevScrollPos) {

        } else if (scrollPosition < handleScroll.prevScrollPos) {

        }

        // Store the current scroll position for the next scroll event
        handleScroll.prevScrollPos = scrollPosition;
    }
    // Add a scroll event listener to check if the TOC container is in view
    window.addEventListener('scroll', () => {
        tocContainerRect = container.getBoundingClientRect();
        console.log(container, tocContainerRect.top, tocContainerRect.bottom, window.innerHeight)
        tocInViewport = tocContainerRect.top >= 0 && tocContainerRect.bottom <= window.innerHeight;
        // handleScroll()
    });

    headings.forEach((heading, index) => {
        let obj = {}
        const newDiv = originalDiv.cloneNode(true);
        const parentDiv = originalDiv.parentNode;
        newDiv.querySelector('p').innerText = `${saviTOC.numbering ? `${index + 1}.` : ""} ${heading.innerText}`
        const id = `heading-${index}`;
        heading.id = id;
        // newDiv.href = `#${id}`;
        newDiv.setAttribute('href', `#${id}`);
        newDiv.addEventListener('click', () => {
            isManuallyScrolled = false
            const targetElement = document.getElementById(heading.id);
            smoothScroll(targetElement, saviTOC);
            console.log(newDiv.classList.value)
            if (!newDiv.classList.value.includes(activeClassName)) {
                newDiv.classList.add(activeClassName);
                activeHeading.toc_link.classList.remove(activeClassName);
                activeHeading = headingsObj.find(h => h.toc_link === newDiv)
            }
            setTimeout(() => {
                isManuallyScrolled = true
            }, saviTOC.duration + 100);
        });
        newDiv.style.opacity = 1
        parentDiv.appendChild(newDiv);
        obj.heading = heading
        obj.toc_link = newDiv

        headingsObj.push(obj)


        if (!activeHeading) {
            activeHeading = headingsObj[0]
            activeHeading.toc_link.classList.add(activeClassName);
        }

    });
    window.addEventListener('scroll', () => {
        console.log(tocInViewport)
        if (tocInViewport && isManuallyScrolled) {
            isManuallyScrolled = true
            headingsObj.forEach(h => {
                let { toc_link, heading } = h
                const headingRect = heading.getBoundingClientRect();
                if (headingRect.top < saviTOC.offset) {
                    if (activeHeading) {
                        console.log("first")
                        activeHeading.toc_link.classList.remove(activeClassName);
                        activeHeading = h
                        toc_link.classList.add(activeClassName);
                    } else {
                        activeHeading = h
                        toc_link.classList.add(activeClassName);
                    }
                }
            })
        }
    });

    originalDiv.style.display = 'none'
    // Easing functions
    const easingFunctions = {
        easeIn: (t, b, c, d) => c * (t /= d) * t + b,
        easeOut: (t, b, c, d) => -c * (t /= d) * (t - 2) + b,
        easeInOut: (t, b, c, d) => {
            t /= d / 2;
            return t < 1 ? c / 2 * t * t + b : -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        ease: (t, b, c, d) => {
            t /= d;
            return c * t * t * t + b;
        },
        linear: (t, b, c, d) => c * t / d + b
    };


    const smoothScroll = (target, options) => {
        const { offset, duration, easing, callback } = options
        const start = window.pageYOffset;
        const distance = target.getBoundingClientRect().top - (offset || 0);
        const startTime = performance.now();
        const easingFunction = easingFunctions[easing || 'easeInOut'];
        console.log(distance, target.getBoundingClientRect().top, offset)
        const scroll = currentTime => {
            const timeElapsed = currentTime - startTime;
            if (timeElapsed >= duration) {
                window.scrollTo(0, start + distance);
                if (callback) callback();
                return;
            }
            const run = easingFunction(timeElapsed, start, distance, duration || 1000);
            window.scrollTo(0, run);
            requestAnimationFrame(scroll);
        };

        requestAnimationFrame(scroll);
    };
})

// version 1.1.0

window.addEventListener("load", () => {
    let headingsObj = [];
    let isManuallyScrolled = true;
    const container = document.querySelector("[savi-generate-toc]");
    const originalDiv = document.querySelector("[toc-first-link]");
    const activeClassName = saviTOC.activeClassName;
    const richTextContainer = document.querySelector("[toc-rich_text]");

    const headings = richTextContainer.querySelectorAll(
        container.getAttribute("savi-generate-toc")
    );
    const toc = document.createElement("ul");
    container.appendChild(toc);

    let tocContainerRect = container.getBoundingClientRect();
    let tocInViewport = false;
    let activeHeading = null;

    const scrollHandler = () => {
        tocContainerRect = container.getBoundingClientRect();
        tocInViewport =
            tocContainerRect.top >= 0 &&
            tocContainerRect.bottom <= window.innerHeight;
    };

    window.addEventListener("scroll", scrollHandler);

    const generateSlug = (text) => {
        return `id-${text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")}`;
    };

    const createTocLink = (heading, index) => {
        const newDiv = originalDiv.cloneNode(true);
        const parentDiv = originalDiv.parentNode;
        const slug = generateSlug(heading.innerText);
        heading.id = slug;

        // Search for any link within the richTextContainer with the same href
        const sameHrefElements = richTextContainer.querySelectorAll(
            `a[href="#${slug}"]`
        );

        // Add event listeners to these links
        sameHrefElements.forEach((link) => {
            handleLinkClick(link, heading);
        });

        newDiv.setAttribute("href", `#${slug}`);
        newDiv.querySelector("p").innerText = `${saviTOC.numbering ? `${index + 1}.` : ""
            } ${heading.innerText}`;

        return newDiv;
    };

    const handleLinkClick = (newDiv, heading) => {
        newDiv.addEventListener("click", (event) => {
            event.preventDefault();

            isManuallyScrolled = false;
            const slug = heading.id;
            const targetElement = document.getElementById(slug);

            smoothScroll(targetElement, saviTOC);

            if (!newDiv.classList.value.includes(activeClassName)) {
                newDiv.classList.add(activeClassName);
                activeHeading.toc_link.classList.remove(activeClassName);
                activeHeading = headingsObj.find((h) => h.toc_link === newDiv);
            }

            setTimeout(() => {
                isManuallyScrolled = true;
                window.history.replaceState("", document.title, `#${slug}`);
            }, saviTOC.duration + 100);
        });
    };

    const generateToc = () => {
        headings.forEach((heading, index) => {
            let obj = {};
            const newDiv = createTocLink(heading, index);

            handleLinkClick(newDiv, heading);

            newDiv.style.opacity = 1;
            originalDiv.parentNode.appendChild(newDiv);

            obj.heading = heading;
            obj.toc_link = newDiv;
            headingsObj.push(obj);

            if (!activeHeading) {
                activeHeading = headingsObj[0];
                activeHeading.toc_link.classList.add(activeClassName);
            }
        });
    };

    generateToc();

    window.addEventListener("scroll", () => {
        if (tocInViewport && isManuallyScrolled) {
            headingsObj.forEach((h) => {
                let { toc_link, heading } = h;
                const headingRect = heading.getBoundingClientRect();
                if (headingRect.top < saviTOC.offset) {
                    if (activeHeading) {
                        activeHeading.toc_link.classList.remove(activeClassName);
                        activeHeading = h;
                        toc_link.classList.add(activeClassName);
                    } else {
                        activeHeading = h;
                        toc_link.classList.add(activeClassName);
                    }
                }
            });
        }
    });

    originalDiv.style.display = "none";

    // Easing functions
    const easingFunctions = {
        easeIn: (t, b, c, d) => c * (t /= d) * t + b,
        easeOut: (t, b, c, d) => -c * (t /= d) * (t - 2) + b,
        easeInOut: (t, b, c, d) => {
            t /= d / 2;
            return t < 1 ? (c / 2) * t * t + b : (-c / 2) * (--t * (t - 2) - 1) + b;
        },
        ease: (t, b, c, d) => {
            t /= d;
            return c * t * t * t + b;
        },
        linear: (t, b, c, d) => (c * t) / d + b
    };

    const smoothScroll = (target, options) => {
        const { offset, duration, easing, callback } = options;
        const start = window.pageYOffset;
        const distance = target.getBoundingClientRect().top - (offset || 0);
        const startTime = performance.now();
        const easingFunction = easingFunctions[easing || "easeInOut"];

        const scroll = (currentTime) => {
            const timeElapsed = currentTime - startTime;
            if (timeElapsed >= duration) {
                window.scrollTo(0, start + distance);
                if (callback) callback();
                return;
            }
            const run = easingFunction(
                timeElapsed,
                start,
                distance,
                duration || 1000
            );
            window.scrollTo(0, run);
            requestAnimationFrame(scroll);
        };

        requestAnimationFrame(scroll);
    };

    if (window.location.hash) {
        const interval = setInterval(() => {
            let sameHrefElement = container.querySelector(
                `[href='${window.location.hash}']`
            );
            if (sameHrefElement) {
                sameHrefElement.click();
                clearInterval(interval);
            }
        }, 300);
    }
});
