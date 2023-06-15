window.addEventListener('load', () => {
    // console.log(document.querySelector('[tippy-variant="default"]'))


    tippy(document.querySelector('[tippy-variant="default"]'), {
        content: 'Default!',
        arrow: true
    });

    tippy(document.querySelector('[tippy-variant="with-arrow"]'), {
        content: 'With Arrows',
        arrow: true,
        arrowType: "round",
        arrowSize: '1000px'
    });

    tippy(document.querySelector('[tippy-variant="without-arrow"]'), {
        content: "Without Arrow!",
        arrow: false
    });

    // Custom theme start

    // .tippy-box[data-theme~='tomato'] {
    //     background-color: tomato
    //     color: yellow;
    // }

    tippy(document.querySelector('[tippy-variant="custom_theme"]'), {
        content: "Custom theme!",
        theme: 'tomato',
    });

    // Custom theme End


})