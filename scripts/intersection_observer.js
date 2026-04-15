const options = {
        root: null,
        rootMargin: '0px 0px 100px 0px',
        threshold: 0.1
    };
intersectionObserverForButtonsIconsAndInput('visible_skill', 'hidden_skill');
intersectionObserverForButtonsIconsAndInput('visible_button', 'hidden_button');
intersectionObserverForButtonsIconsAndInput('visible_input', 'hidden_input');
intersectionObserverForButtonsIconsAndInput('visible_button', 'hidden_link');
const hiddenElementAndObserverList = intersectionObserverForButtonsIconsAndInput('visible_reference', 'hidden_reference');
const hiddenReferences = hiddenElementAndObserverList.hiddenElements;
const observer = hiddenElementAndObserverList.observer;
const medieQueryAnimateReference = window.matchMedia('(max-width: 1250px)');

/**
 * This function handles changes in the viewport size.
 * @param {*} e - The media query list event object.
 */
function handleReferenceViewportChange(e) {
    if (e.matches) {
        disableAnimationForReferences();
    } else {
        enableAnimationForReferences();
    }
}
handleReferenceViewportChange(medieQueryAnimateReference); 
medieQueryAnimateReference.addEventListener('change', handleReferenceViewportChange);


/**
 * This function enables the animation for the reference elements by observing them with the Intersection Observer.
 */
function enableAnimationForReferences() {
    // const hiddenReferences = document.querySelectorAll('.hidden_reference');
    hiddenReferences.forEach(el => observer.observe(el));
}


/**
 * This function disables the animation for the reference elements by unobserving them with the Intersection Observer 
 * and adding the 'visible_reference' class to make them visible.
 */
function disableAnimationForReferences() {
    // const hiddenReferences = document.querySelectorAll('.hidden_reference');
    hiddenReferences.forEach(el => observer.unobserve(el));
    hiddenReferences.forEach(el => el.classList.add('visible_reference'));
}


/**
 * This function creates an Intersection Observer for the specified class names to handle the visibility of buttons, 
 * icons, and input fields based on their intersection with the viewport.
 */
function intersectionObserverForButtonsIconsAndInput(classNameVisible, classNameHidden) {
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add(classNameVisible);
        } else {
            entry.target.classList.remove(classNameVisible);
        }
    });
    }, options);

    const hiddenElements = document.querySelectorAll(`.${classNameHidden}`);
    hiddenElements.forEach(el => observer.observe(el));
    return { hiddenElements, observer };
}