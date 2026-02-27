// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle Menu
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Change icon
    const icon = mobileToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
        icon.style.color = 'var(--dark-color)'; // Force dark color for visibility
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
        
        // Reset color based on scroll
        if (window.scrollY > 50) {
            icon.style.color = 'var(--dark-color)';
        } else {
            icon.style.color = 'white';
        }
    }
});

// Close menu when link clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

// Header Scroll Effect
const header = document.getElementById('header');
const headerBtn = document.querySelector('.nav-btn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        
        // Update menu icon color if menu is not active
        if (!navMenu.classList.contains('active')) {
            mobileToggle.querySelector('i').style.color = 'var(--dark-color)';
        }
    } else {
        header.classList.remove('scrolled');
        
        if (!navMenu.classList.contains('active')) {
            mobileToggle.querySelector('i').style.color = 'white';
        }
    }
});

// Scroll Reveal Animation Function
function revealSections() {
    const reveals = document.querySelectorAll('.reveal');

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150; // Points before element becomes visible

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

// Initial check for reveals on page load
revealSections();
// Add scroll event listener
window.addEventListener('scroll', revealSections);

// Counter Animation for Hero Stats
const counters = document.querySelectorAll('.counter');
let hasRunCounters = false;

function animateCounters() {
    // Only run once when hero section is visible
    const heroSection = document.querySelector('.hero');
    const heroTop = heroSection.getBoundingClientRect().top;
    
    if (heroTop < window.innerHeight && !hasRunCounters) {
        hasRunCounters = true;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            // Ensure target is valid, to prevent errors
            if (isNaN(target)) return; 
            
            const duration = 2000; // Total duration in ms
            const stepTime = 20; // Time per frame
            const steps = duration / stepTime;
            const increment = target / steps;
            
            let current = 0;
            
            const updateCounter = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    current = target;
                    clearInterval(updateCounter);
                }
                
                // Format with a + sign for added effect
                counter.innerText = Math.floor(current) + '+';
            }, stepTime);
        });
    }
}

// Initial check and scroll event for counter
animateCounters();
window.addEventListener('scroll', animateCounters);

// Smooth scrolling for anchor links (if default scroll-behavior: smooth is not fully supported)
// Also handles active link state update based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
    let scrollY = window.scrollY;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100; // offset for header
        const sectionId = current.getAttribute('id');
        
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']')?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNav);
