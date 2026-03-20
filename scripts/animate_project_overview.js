let currentProjectOverview = null;
let isProjectTransitionRunning = false;


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
 * This function handles the transition from the current project overview to the next project overview when a project menu button is clicked.
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