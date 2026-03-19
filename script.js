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



function initProjectOverviews() {
    const projectOverviews = document.querySelectorAll('.project_overview');
    projectOverviews.forEach(overview => overview.style.display = 'none');
    const firstProjectOverview = document.getElementById('project_pokedex');
    if (firstProjectOverview) {
        firstProjectOverview.style.display = 'flex';
    }
}


/**
 * This function sets up event listeners for the project menu buttons. When a button is clicked, it toggles the active state of the buttons,
 * hides all project overviews, and then displays the overview corresponding to the clicked button.
 */
function toggleProject() {
    const projectButtons = document.querySelectorAll('.project_menu button');
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleMenu();
            button.classList.add('active');
            const project = button.getAttribute('data-project');
            const projectOverview = document.getElementById(`project_${project}`);
            if (projectOverview) {
                document.querySelectorAll('.project_overview').forEach(overview => overview.style.display = 'none');
                projectOverview.style.display = 'flex';
             }
        });
    });
}


/**
 * This function is called when a project menu button is clicked. It toggles the active state 
 * of the buttons in the project menu, ensuring only one button is active at a time.
 */
function toggleMenu() {
    const activeButton = document.querySelector('.project_menu button.active');
    if (activeButton) {
        activeButton.classList.remove('active');
    }
}