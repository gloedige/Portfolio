const assetsBaseUrl = new URL('./assets/', document.currentScript?.src || window.location.href).href;
const browserLanguageSetting = navigator.language || navigator.userLanguage;
const supportedLanguages = ['en', 'de'];
const defaultLanguage = 'en';
const currentLanguage = supportedLanguages.includes(browserLanguageSetting) ? browserLanguageSetting : defaultLanguage;
let selectedLanguage = supportedLanguages[0];
const medieQueryProjectMenuMobile = window.matchMedia('(max-width: 1150px)');

const data_en = [
    {icon: `${assetsBaseUrl}icons/location_icon.png`, text_1: 'I am', text_2: 'located in Brunswick...'},
    {icon: `${assetsBaseUrl}icons/remote_icon.svg`, text_1: 'I am', text_2: 'open to work remotely or on-site...'},
    {icon: `${assetsBaseUrl}icons/relocate_icon.svg`, text_1: 'I am', text_2: 'open to relocate...'}
]

const data_de = [
    {icon: `${assetsBaseUrl}icons/location_icon.png`, text_1: 'Ich bin', text_2: 'in Braunschweig...'},
    {icon: `${assetsBaseUrl}icons/remote_icon.svg`, text_1: 'Ich bin', text_2: 'offen für Remote- oder Vor-Ort-Arbeit...'},
    {icon: `${assetsBaseUrl}icons/relocate_icon.svg`, text_1: 'Ich bin', text_2: 'offen für einen Umzug...'}
]

const textElement = document.getElementById('typing_text');
const locationIcon = document.getElementById('location_icon');

let index = 0;
let isDeleting = false;
let currentText = '';
let currentSpanText = '';


/**
 * This function stores the user's preferred language in local storage and reloads the page to apply the language change.
 * @param {string} lang - The language code.
 */
function storePreferredLanguage(lang) {
    if (supportedLanguages.includes(lang)) {
        localStorage.setItem('preferredLanguage', lang);
        selectedLanguage = lang;
        location.reload();
    }
}


/**
 * This function loads the user's preferred language from local storage. 
 * @returns - The preferred language code if it is supported, otherwise the default language code.
 */
function loadPreferredLanguage() {
    const storedLanguage = localStorage.getItem('preferredLanguage');
    if (supportedLanguages.includes(storedLanguage)) {
        return storedLanguage;
    }
    return defaultLanguage;
}


/**
 * This function highlights the selected language in the navigation menu.
 * @param {string} lang - The language code.
 */
function highlightSelectedLanguage(lang) {
    const languageLinks = document.querySelectorAll('.nav_language a');
    languageLinks.forEach(link => {
        if (link.textContent.toLowerCase() === lang) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}


/**
 * This function creates a typing effect for the location information. 
 * It types out the text character by character, and then deletes it before moving 
 * on to the next piece of information. The location icon is also updated based on 
 * the current information being displayed.
*/
function typeEffect() {
    const data = selectedLanguage.startsWith('de') ? data_de : data_en;
    const fullText = ' ' + data[index].text_2;
    const fullSpanText = data[index].text_1;
    const iconSrc = data[index].icon;
    if (isDeleting) {
        [currentText, currentSpanText] = deleteCharacters(currentText, fullText, currentSpanText, fullSpanText);
    } else {
        if (locationIcon) {
            locationIcon.innerHTML = `<img src="${iconSrc}" alt="Location Icon">`;
            locationIcon.style.opacity = 1;
        }
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
    if (textElement) {
        textElement.innerHTML = spanElement + currentText;
        textElement.classList.add('typing_active');
    }
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
        if (locationIcon) locationIcon.style.opacity = 0;
        index = (index + 1) % data_en.length;
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
const navLinks = document.querySelectorAll('.nav_menu a');

    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`.nav_menu a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
    }, { threshold: 0.9 });

    sections.forEach(section => observer.observe(section));
};


/**
 * This helper function updates the text for all project menu buttons.
 * @param {string[]} labels - Labels in the order: pokemon, pollo_loco, join, ongoing.
 */
function setProjectMenuTexts(labels) {
    const projectIds = ['pokemon', 'pollo_loco', 'join', 'ongoing'];
    projectIds.forEach((id, index) => {
        const button = document.getElementById(id);
        if (button) {
            button.textContent = labels[index];
        }
    });
}


/**
 * This function updates the text of the project menu buttons for mobile view.
 */
function updateMenuTextForMobile() {
    setProjectMenuTexts(['1. Project', '2. Project', '3. Project', '4. Project']);
}


/**
 * This function resets the text of the project menu buttons to their original state for desktop view.
 */
function resetMenuTextForDesktop() {
    setProjectMenuTexts(['1. Pokedex', '2. Pollo Loco', '3. Join', '4. Ongoing']);
}


/**
 * This event listener waits for the DOM content to be fully loaded before initializing the intersection observer, 
 * starting the typing effect, and setting up the project menu and overviews. It ensures that all necessary elements 
 * are available in the DOM before any scripts attempt to interact with them.
 */
document.addEventListener('DOMContentLoaded', () => {
    intersectionObserver();
    handleViewportChange(medieQueryProjectMenuMobile);
    if (textElement) typeEffect();
    const hasProjectSection = document.querySelector('.project_overview, #pokemon, #project_pokedex');
    if (hasProjectSection) {
        initProjectMenu();
        initProjectOverviews();
        if (typeof toggleProject === 'function') {
            toggleProject();
        }
    }
    selectedLanguage = loadPreferredLanguage();
    highlightSelectedLanguage(selectedLanguage);
});


/**
 * This function initializes the project menu by setting the first project button as active when the page loads.
 */
function initProjectMenu() {
    const projectButton = document.getElementById('pokemon');
    const projectButtonMobile = document.getElementById('pokemon_mobile');
    if (projectButton) projectButton.classList.add('active');
    if (projectButtonMobile) projectButtonMobile.classList.add('active');
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
 * This function toggles the visibility of the burger menu when the burger button is clicked.
 */
function toggleBurgerMenu(buttonElement) {
    buttonElement.querySelector('span').classList.toggle('is-closed');
    const burgerMenu = document.querySelector('.burger_menu');
    if (burgerMenu) {
        burgerMenu.classList.toggle('is-active');
    }
}


/**
 * This function handles changes in the viewport size.
 * @param {*} e - The media query list event object.
 */
function handleViewportChange(e) {
    if (e.matches) {
        updateMenuTextForMobile();
    } else {
        resetMenuTextForDesktop();
    }
}

medieQueryProjectMenuMobile.addEventListener('change', handleViewportChange);