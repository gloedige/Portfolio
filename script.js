const data = [
    {icon: './assets/icons/location_icon.png', text_1: 'I am', text_2: 'located in Brunswick...'},
    {icon: './assets/icons/remote_icon.svg', text_1: 'I am', text_2: 'open to work remotely or on-site...'},
    {icon: './assets/icons/relocate_icon.svg', text_1: 'I am', text_2: 'open to relocate...'}
]

const textElement = document.getElementById('typing_text');
const locationIcon = document.getElementById('location_icon');

let index = 0;
let isDeleting = false;
let currentText = '';
let currentSpanText = '';
let currentProjectOverview = null;
let isProjectTransitionRunning = false;


/**
 * This function creates a typing effect for the location information. 
 * It types out the text character by character, and then deletes it before moving 
 * on to the next piece of information. The location icon is also updated based on 
 * the current information being displayed.
*/
function typeEffect() {
    const fullText = ' ' + data[index].text_2;
    const fullSpanText = data[index].text_1;
    const iconSrc = data[index].icon;
    if (isDeleting) {
        [currentText, currentSpanText] = deleteCharacters(currentText, fullText, currentSpanText, fullSpanText);
    } else {
        locationIcon.innerHTML = `<img src="${iconSrc}" alt="Location Icon">`;
        locationIcon.style.opacity = 1;
        [currentText, currentSpanText] = writeCharacters(currentText, fullText, currentSpanText, fullSpanText);
    }    
    setTextToHTML(currentText, currentSpanText);
    let speed = setTiming(currentText, fullText, currentSpanText);
    setTimeout(typeEffect, speed);
}


/**
 * This function handles the deletion of characters for the typing effect. It checks if there are characters left to 
 * delete in the current text or span text and updates them accordingly.
 * @param {string} currentText - The current text being displayed that is being typed or deleted.
 * @param {string} fullText - The full text that is being typed out, used to determine how many characters to delete.
 * @param {string} currentSpanText - The current span text being displayed that is being typed or deleted.
 * @param {string} fullSpanText - The full span text that is being typed out, used to determine how many characters to delete.
 * @returns {[string, string]} Updated currentText and currentSpanText
*/
function deleteCharacters(currentText, fullText, currentSpanText, fullSpanText) {
    if (currentText.length > 0) {
        currentText = fullText.substring(0, currentText.length - 1);
    } else if (currentSpanText.length > 0) {
        currentSpanText = fullSpanText.substring(0, currentSpanText.length - 1);
    }
    return [currentText, currentSpanText];
}


/**
 * This function handles the typing of characters for the typing effect. It checks if there are characters left to
 * type in the current span text and updates it accordingly. Once the span text is fully typed, it starts typing the main text.
 * @param {string} currentText - The current text being displayed that is being typed or deleted.
 * @param {string} fullText - The full text that is being typed out, used to determine how many characters to type.
 * @param {string} currentSpanText - The current span text being displayed that is being typed or deleted.
 * @param {string} fullSpanText - The full span text that is being typed out, used to determine how many characters to type.
 * @returns {[string, string]} Updated currentText and currentSpanText
*/
function writeCharacters(currentText, fullText, currentSpanText, fullSpanText) {
    currentSpanText = fullSpanText.substring(0, currentSpanText.length + 1);
    if (currentSpanText === fullSpanText) {
        currentText = fullText.substring(0, currentText.length + 1);
    }
    return [currentText, currentSpanText];
}


/**
 * This function updates the HTML content of the text element with the current text and span text, including a cursor.
 * @param {string} currentText - The current text being displayed that is being typed or deleted.
 * @param {string} currentSpanText - The current span text being displayed that is being typed or deleted.
*/
function setTextToHTML(currentText, currentSpanText) {
    let spanElement = `<span class="text_blue">${currentSpanText}</span>`;
    let cursorElement = `<span class="cursor">|</span>`;
    textElement.innerHTML = spanElement + currentText + cursorElement;
}


/**
 * This function determines the speed of the typing effect based on the current state of the text being typed or deleted.
 * It checks if the full text has been reached to decide when to start deleting, and when to move on to the next piece of information.
 * @param {string} currentText - The current text being displayed that is being typed or deleted.
 * @param {string} fullText - The full text that is being typed out, used to determine how many characters to type or delete.
 * @param {string} currentSpanText - The current span text being displayed that is being typed or deleted.
 * @returns {number} The speed for the typing effect, which varies based on whether the text is being typed or deleted, and if the full text has been reached.
 * This function determines the speed of the typing effect based on the current state of the text being typed or deleted. 
 * It checks if the full text has been reached to decide when to start deleting, and when to move on to the next piece of information.
 */
function setTiming(currentText, fullText, currentSpanText) {
    let speed = isDeleting ? 50 : 100;
    if (!isDeleting && currentText === fullText) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && currentText === '' && currentSpanText === '') {
        isDeleting = false;
        locationIcon.style.opacity = 0;
        index = (index + 1) % data.length;
        speed = 500;
    }
    return speed;
}


/**
 * This function uses the Intersection Observer API to observe when sections of the page come into view.
 * When a section is in view, it updates the navigation links to highlight the active section.
 */
function intersectionObserver() {
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`nav a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
    }, { threshold: 0.9 });

    sections.forEach(section => observer.observe(section));
};


document.addEventListener('DOMContentLoaded', () => {
    intersectionObserver();
    typeEffect();
    initProjectMenu();
    initProjectOverviews();
    toggleProject();
});


/**
 * This function initializes the project menu by setting the first project button as active when the page loads.
 */
function initProjectMenu() {
    const projectButton = document.getElementById('pokemon');
    projectButton.classList.add('active');
}


/**
 * This function initializes the project overviews by hiding all of them and then displaying the first project overview when the page loads.
 */
function initProjectOverviews() {
    const projectOverviews = document.querySelectorAll('.project_overview');
    projectOverviews.forEach(overview => {
        overview.classList.add('d-none');
        overview.classList.remove('fade-in', 'fade-out');
    });
    const firstProjectOverview = document.getElementById('project_pokedex');
    if (firstProjectOverview) {
        firstProjectOverview.classList.remove('d-none');
        currentProjectOverview = firstProjectOverview;
    }
}


/**
 * This function sets up event listeners for the project menu buttons. When a button is clicked, it toggles the active state of the buttons,
 * hides all project overviews, and then displays the overview corresponding to the clicked button.
 */
function toggleProject() {
    const projectButtons = document.querySelectorAll('.project_menu button');
    findCurrentProjectOverview();
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const nextProjectOverview = getNextProjectOverview(button);
            if (!nextProjectOverview || nextProjectOverview === currentProjectOverview || isProjectTransitionRunning) return;
            deactivateActiveMenuButton();
            activateMenuButton(button);
            isProjectTransitionRunning = true;
            handlePreviosProjectOverview(currentProjectOverview, nextProjectOverview);
        });
    });
}


/**
 * This function finds the currently visible project overview on the page and assigns it to the currentProjectOverview variable.
 * It checks for any project overview that does not have the 'd-none' class, which indicates that it is currently visible.
 */
function findCurrentProjectOverview() {
    if (!currentProjectOverview) {
        currentProjectOverview = document.querySelector('.project_overview:not(.d-none)');
    }
}


/**
 * This function retrieves the next project overview element based on the data attribute of the clicked button. It uses 
 * the 'data-project' attribute of the button to find the corresponding project overview element by its ID.
 * @param {HTMLElement} button 
 * @returns {HTMLElement} The next project overview element corresponding to the clicked button.
 */
function getNextProjectOverview(button) {
    const project = button.getAttribute('data-project');
    const nextProjectOverview = document.getElementById(`project_${project}`);
    return nextProjectOverview;
}


/**
 * This function is called when a project menu button is clicked. It toggles the active state 
 * of the buttons in the project menu, ensuring only one button is active at a time.
 */
function deactivateActiveMenuButton() {
    const activeButton = document.querySelector('.project_menu button.active');
    if (activeButton) {
        activeButton.classList.remove('active');
    }
}


/**
 * This function is called to activate a project menu button by adding the 'active' class to it. This visually 
 * indicates which project is currently selected in the menu.
 * @param {HTMLElement} button 
 */
function activateMenuButton(button) {
    button.classList.add('active');
}


/**
 * 
 * @param {HTMLElement} currentProjectOverview 
 * @param {HTMLElement} nextProjectOverview 
 * @returns 
 */
function handlePreviosProjectOverview(currentProjectOverview, nextProjectOverview) {
    const previousProjectOverview = currentProjectOverview;
        if (!previousProjectOverview) {
            showNextOverview(nextProjectOverview);
            return;
        }
        previousProjectOverview.classList.remove('fade-in');
        previousProjectOverview.classList.add('fade-out');
        handleAnimationEnd(previousProjectOverview, nextProjectOverview);
}


/**
 * This function handles the end of the fade-out animation for the previous project overview. Once the fade-out animation is complete,
 * it hides the previous project overview and then calls the function to show the next project overview with a fade-in effect.
 * @param {HTMLElement} previousProjectOverview - The previous project overview element that is currently visible and will be hidden after 
 * the fade-out animation completes.
 * @param {HTMLElement} nextProjectOverview - The next project overview element that will be displayed after the previous one is hidden.
 */
function handleAnimationEnd(previousProjectOverview, nextProjectOverview) {
    previousProjectOverview.addEventListener('animationend', function handleFadeOut(event) {
        if (event.animationName !== 'fadeOut') {
            return;
        }
        previousProjectOverview.classList.remove('fade-out');
        previousProjectOverview.classList.add('d-none');
        previousProjectOverview.removeEventListener('animationend', handleFadeOut);
        showNextOverview(nextProjectOverview);
    });
}


/**
 * This function is responsible for showing the next project overview with a fade-in effect.
 * @param {HTMLElement} nextProjectOverview - The next project overview element that should be displayed. 
 */
function showNextOverview(nextProjectOverview) {
    nextProjectOverview.classList.remove('d-none', 'fade-out');
    nextProjectOverview.classList.add('fade-in');

    nextProjectOverview.addEventListener('animationend', function handleFadeIn(event) {
        if (event.animationName !== 'fadeIn') {
            return;
        }
        nextProjectOverview.classList.remove('fade-in');
        nextProjectOverview.removeEventListener('animationend', handleFadeIn);
        currentProjectOverview = nextProjectOverview;
        isProjectTransitionRunning = false;
    });
}