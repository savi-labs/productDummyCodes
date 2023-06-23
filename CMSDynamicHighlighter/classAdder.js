window.addEventListener("load", () => {
    let allTestTexts = document.querySelectorAll("[highlight-text]");
    console.log(allTestTexts);
  
    if (allTestTexts.length > 0) {
      allTestTexts.forEach((el) => {
        // Get class names
        const classNames = el
          .getAttribute("add-class-name")
          .split(",")
          .map((className) => className.trim());
  
        const textContent = el.textContent;
  
        // Use regex to get all content between pairs of backticks
        const regex = /\`(.*?)\`/g;
        let match;
        let newTextContent = textContent;
  
        while ((match = regex.exec(textContent)) != null) {
          const spanElement = document.createElement("span");
          spanElement.textContent = match[1];
  
          // Add all classes to the span element
          classNames.forEach((className) => {
            if (className) spanElement.classList.add(className);
          });
  
          // Replace the text between the backticks with the new span element
          newTextContent = newTextContent.replace(
            "`" + match[1] + "`",
            spanElement.outerHTML
          );
        }
  
        el.innerHTML = newTextContent;
      });
    } else {
      console.log("highlight-text attribute not found!!");
    }
  });
  