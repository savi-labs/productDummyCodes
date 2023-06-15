console.log("first")

window.addEventListener('DOMContentLoaded', () => {
    let allTestTexts = document.querySelectorAll("[highlight-text]");

    if (allTestTexts) {
        const splitter = allTestTexts[0].getAttribute("splitter");
        const highlighterColor = allTestTexts[0].getAttribute("highlight-color");
        if (splitter && highlighterColor) {
            allTestTexts.forEach((el) => {
                const textContent = el.textContent;
                const textArray = textContent.split(splitter);
                // Get the middle element of the array (the text between the two | symbols)
                const spanText = textArray[1];

                // Create a new span element with the same content as the text between the | symbols
                const spanElement = document.createElement("span");
                spanElement.textContent = spanText;
                spanElement.style.color = highlighterColor;

                // Replace the text between the | symbols with the new span element
                el.innerHTML =
                    textArray.length > 2
                        ? textArray[0] + spanElement.outerHTML + textArray[2]
                        : textArray[0] + spanElement.outerHTML;
            });
        } else console.log("splitter/highlight-color attribute not found!!");
    } else console.log("testimonial-text attribute not found!!");

})