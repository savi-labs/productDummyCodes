var attributes = {
    container: "savi_read-more",
    button: "see-more-btn",
    target: "see-more-target"
  };
  window.addEventListener("load", () => {
    const containers = document.querySelectorAll(`[${attributes.container}]`);
    if (!containers || containers.length === 0) {
      console.log(`[${attributes.container}] not found!`);
      return;
    }
  
    containers.forEach((container) => {
      handleContainer(container);
    });
  });
  
  function handleContainer(container) {
    const button = container.querySelector(`[${attributes.button}]`);
    const target = container.querySelector(`[${attributes.target}]`);
  
    if (!button || !target) return;
  
    const targetOriginalHeight = parseFloat(
      window.getComputedStyle(target).getPropertyValue("height")
    );
    const showSeeMoreBtn = target.scrollHeight > targetOriginalHeight;
  
    container.isExpanded = false;
  
    // Set initial visibility for active class
    setButtonVisibility(
      button,
      target.scrollHeight,
      targetOriginalHeight,
      container.parentElement.classList.contains("is-active")
    );
  
    handleMutationObserver(
      container,
      button,
      target,
      showSeeMoreBtn,
      targetOriginalHeight
    );
  
    button.addEventListener("click", () => {
      container.isExpanded = !container.isExpanded;
      if (container.isExpanded === true) {
        expand(button, target, container);
      } else {
        collapse(button, target, targetOriginalHeight, container);
      }
    });
  }
  
  function handleMutationObserver(
    container,
    button,
    target,
    showSeeMoreBtn,
    targetOriginalHeight
  ) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName !== "class") return;
  
        const isActive = mutation.target.classList.contains("is-active");
  
        if (!isActive) {
          container.isExpanded = false;
          collapse(button, target, targetOriginalHeight, container);
        }
        setButtonVisibility(
          button,
          target.scrollHeight,
          targetOriginalHeight,
          isActive
        );
      });
    });
  
    observer.observe(container.parentElement, { attributes: true });
  }
  
  function setButtonVisibility(
    button,
    targetScrollHeight,
    targetOriginalHeight,
    isActive
  ) {
    if (targetScrollHeight > targetOriginalHeight && isActive) {
      button.parentElement.style.opacity = 1;
      button.parentElement.style.pointerEvents = "auto";
    } else {
      button.parentElement.style.opacity = 0;
      button.parentElement.style.pointerEvents = "none";
    }
  }
  
  function expand(button, target, container) {
    container.isExpanded = true;
    target.classList.remove(saviReadMoreObj.toggleClassName);
    target.style.maxHeight = `${target.scrollHeight}px`;
    button.innerText = saviReadMoreObj.seeLessText;
  }
  
  function collapse(button, target, targetOriginalHeight, container) {
    container.isExpanded = false;
    target.style.maxHeight = `${targetOriginalHeight}px`;
    button.innerText = saviReadMoreObj.seeMoreText;
    setTimeout(() => {
      target.classList.add(saviReadMoreObj.toggleClassName);
    }, saviReadMoreObj.transitionTime * 1000 + 10);
  }
  