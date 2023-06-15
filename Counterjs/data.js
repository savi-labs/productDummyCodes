const countUpOptions = {
    startVal: 0, // number to start at (default: 0)
    decimalPlaces: 0, // number of decimal places (default: 0)
    duration: 2, // animation duration in seconds (default: 2)
    useGrouping: true, // whether to use grouping separator (default: true)
    useIndianSeparators: false, // whether to use Indian numbering system separators (default: false)
    useEasing: true, // whether to use easing animation (default: true)
    smartEasingThreshold: 999, // threshold for smooth easing animation (default: 999)
    smartEasingAmount: 333, // amount to be eased for numbers above threshold (default: 333)
    separator: ",", // grouping separator (default: ',')
    decimal: ".", // decimal separator (default: '.')
    easingFn: function (t, b, c, d) {
        // easing function for animation (default: easeOutExpo)
        return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
    },
    formattingFn: function (n) {
        // function that formats the result (default: just returns the number as a string)
        return n.toString();
    },
    prefix: "", // text to prepend to the result (default: "")
    suffix: "", // text to append to the result (default: "")
    numerals: [], // an array of numeral glyphs to substitute for digits
    enableScrollSpy: false, // whether to start the animation when the target is in view (default: false)
    scrollSpyDelay: 0, // delay (in ms) after the target comes into view (default: 0)
    scrollSpyOnce: false, // whether to run the animation only once when the target comes into view (default: false)
    onCompleteCallback: function () { }, // function that gets called when the animation completes (default: an empty function)
    plugin: null // an alternate animation plugin to use instead of the default (default: null)
};


export const counterjsAttributes = {
    startVal: { default: 0, desc: "The number to start counting from." },
    decimalPlaces: { default: 0, desc: "The number of decimal places to display." },
    duration: { default: 2, desc: "The duration (in seconds) of the counting animation." },
    useGrouping: { default: true, desc: "Whether or not to use a grouping separator (e.g. 1,000 vs 1000)." },
    useIndianSeparators: { default: false, desc: "Whether or not to use Indian numbering system separators (e.g. 1,00,000 vs 100,000)." },
    useEasing: { default: true, desc: "Whether or not to use easing animation." },
    smartEasingThreshold: { default: 999, desc: "The threshold for smooth easing animation for large numbers." },
    smartEasingAmount: { default: 333, desc: "The amount to be eased for numbers above the smart easing threshold." },
    separator: { default: ",", desc: "The grouping separator to use." },
    decimal: { default: ".", desc: "The decimal separator to use." },
    easingFn: { default: "easeOutExpo", desc: "The easing function to use for animation." },
    formattingFn: { default: null, desc: "A function that formats the result." },
    prefix: { default: "", desc: "Text to prepend to the result." },
    suffix: { default: "", desc: "Text to append to the result." },
    numerals: { default: [], desc: "An array of numeral glyphs to substitute for digits." },
    enableScrollSpy: { default: false, desc: "Whether or not to start the animation when the target is in view." },
    scrollSpyDelay: { default: 0, desc: "The delay (in milliseconds) after the target comes into view." },
    scrollSpyOnce: { default: false, desc: "Whether or not to run the animation only once when the target comes into view." },
    onCompleteCallback: { default: null, desc: "A function that gets called when the animation completes." },
    plugin: { default: null, desc: "An alternate animation plugin to use instead of the default." }
};

export const scriptJson = {
    defaults: {
        startVal: 0,
    },
    counter: [
        {
            target_attr: "[target-1]"
        },
        {
            target_attr: "[target-2]"
        },
        {
            target_attr: "[target-3]"
        },
        {
            decimalPlaces: 2,
            target_attr: "[target-4]",
            decimal: ","
        },
    ]
}
