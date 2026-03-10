function intersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('nav a').forEach(nav => nav.classList.remove('active'));
        document.querySelector(`nav a[href="#${id}"]`).classList.add('active');
        }
    });
    }, { threshold: 0.6 }); // 60% der Sektion muss sichtbar sein

document.querySelectorAll('section').forEach(section => observer.observe(section));
};


document.addEventListener('DOMContentLoaded', () => {
    intersectionObserver();
});