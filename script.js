// ----- 1. TAB NAVIGATION (Event Listeners) -----
const navLinks = document.querySelectorAll('.nav a');
const sections = {
    about: document.getElementById('about'),
    skills: document.getElementById('skills'),
    education: document.getElementById('education'),
    projects: document.getElementById('projects')
};

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.dataset.target;

        // hide all sections
        Object.values(sections).forEach(sec => sec.classList.remove('active'));

        // show target
        if (sections[target]) sections[target].classList.add('active');

        // update nav active
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        // re-trigger scroll animations for newly visible items
        setTimeout(() => {
            const visibleSection = document.querySelector('.section.active');
            if (visibleSection) {
                const items = visibleSection.querySelectorAll('.skill-item, .edu-item, .project-card');
                items.forEach(item => {
                    const rect = item.getBoundingClientRect();
                    if (rect.top < window.innerHeight - 50) {
                        item.classList.add('visible');
                    }
                });
            }
        }, 100);
    });
});

// ensure 'about' is active on load
if (!document.querySelector('.section.active')) {
    document.getElementById('about').classList.add('active');
    document.querySelector('.nav a[data-target="about"]')?.classList.add('active');
}

// ----- 2. SCROLL REVEAL (Intersection Observer) -----
const observerOptions = {
    threshold: 0.10,
    rootMargin: '0px 0px -20px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.skill-item, .edu-item, .project-card').forEach(el => {
    observer.observe(el);
});

// Also check immediately if any are already visible (for above-the-fold)
setTimeout(() => {
    document.querySelectorAll('.skill-item, .edu-item, .project-card').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            el.classList.add('visible');
        }
    });
}, 200);
