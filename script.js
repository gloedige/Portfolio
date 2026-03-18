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

function typeEffect() {
    const fullText = ' ' + data[index].text_2;
    const fullSpanText = data[index].text_1;
    const iconSrc = data[index].icon;
    if (isDeleting) {
        if (currentText.length > 0) {
            currentText = fullText.substring(0, currentText.length - 1);
        } else if (currentSpanText.length > 0) {
            currentSpanText = fullSpanText.substring(0, currentSpanText.length - 1);
        }
    } else {
        locationIcon.innerHTML = `<img src="${iconSrc}" alt="Location Icon">`;
        locationIcon.style.opacity = 1;
        currentSpanText = fullSpanText.substring(0, currentSpanText.length + 1);
        if (currentSpanText === fullSpanText) {
            currentText = fullText.substring(0, currentText.length + 1);
        }
    }
    
    let spanElement = `<span class="text_blue">${currentSpanText}</span>`;
    let cursorElement = `<span class="cursor">|</span>`;
    textElement.innerHTML = spanElement + currentText + cursorElement;

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

    setTimeout(typeEffect, speed);
}

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
    }, { threshold: 0.9 }); // 90% der Sektion muss sichtbar sein

    sections.forEach(section => observer.observe(section));
};


document.addEventListener('DOMContentLoaded', () => {
    intersectionObserver();
    typeEffect();
});