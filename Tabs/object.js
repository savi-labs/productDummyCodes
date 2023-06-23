const saviTabs = {
    animation: {
            onActive: [{index: 0, variable: "activeAnimation"}]
        },
    progress_line:false,
    auto_rolling:{
        duration : 10,
        easing: "easein.out"
        },
        scrollTrigger:{
            start:"top top",
            end:"bottom bottom",
            target: document.querySelector('.tab_section') || document.querySelector('[savi_tabs]')
        }
}