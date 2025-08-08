// About page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin if not already registered
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Initialize about page animations
    initAboutPageAnimations();
    animateSkillBars();
    initThemeConsistency();
});

// Initialize about page specific animations
function initAboutPageAnimations() {
    // Developer image animation - coming from top to center
    const developerImage = document.querySelector('.profile-image');
    const imageBackdrop = document.querySelector('.image-backdrop');
    
    if (developerImage && imageBackdrop) {
        // Set initial state
        gsap.set(developerImage, { 
            y: -200, 
            opacity: 0 
        });
        
        gsap.set(imageBackdrop, { 
            y: -200, 
            opacity: 0 
        });
        
        // Animate image coming from top
        const tl = gsap.timeline({ delay: 0.5 });
        
        tl.to(imageBackdrop, {
            y: 0,
            opacity: 0.3,
            duration: 1,
            ease: "power3.out"
        })
        .to(developerImage, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)"
        }, "-=0.8");
    }
    
    // Animate profile details
    gsap.from('.profile-details h2', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.developer-title', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.3,
        ease: 'power3.out'
    });
    
    // Only set up scroll triggers if ScrollTrigger is available
    if (typeof ScrollTrigger !== 'undefined') {
        // Animate about text sections
        gsap.from('.intro-text', {
            scrollTrigger: {
                trigger: '.about-me',
                start: 'top 80%'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        gsap.from('.about-text p', {
            scrollTrigger: {
                trigger: '.about-text',
                start: 'top 80%'
            },
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power3.out'
        });
        
        // Animate skill categories
        gsap.from('.skill-category', {
            scrollTrigger: {
                trigger: '.skills-section',
                start: 'top 70%'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        });
        
        // Animate project cards
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '.projects-section',
                start: 'top 70%'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        });
        
        // Animate contact methods
        gsap.from('.contact-method', {
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 80%'
            },
            opacity: 0,
            x: -30,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }
}

// Animate skill bars
function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    if (skillLevels.length === 0 || typeof ScrollTrigger === 'undefined') return;
    
    // Create a timeline for skill bars animation
    const skillsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.skills-section',
            start: 'top 70%'
        }
    });
    
    // Animate each skill bar
    skillLevels.forEach((level, index) => {
        skillsTimeline.to(level, {
            scaleX: 1,
            duration: 1,
            ease: 'power2.out'
        }, index * 0.1); // Stagger the animations
    });
}

// Handle theme consistency without overriding main script's functionality
function initThemeConsistency() {
    // Only set theme if main script hasn't already done so
    if (!document.body.classList.contains('dark-mode')) {
        const savedTheme = localStorage.getItem('theme');
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
            document.body.classList.add('dark-mode');
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        }
    }
    
    // Make sure theme toggle works on the about page
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Remove any existing event listeners by cloning and replacing
        const newThemeToggle = themeToggle.cloneNode(true);
        themeToggle.parentNode.replaceChild(newThemeToggle, themeToggle);
        
        newThemeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                newThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                newThemeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
            
            // Add a flash effect
            const flash = document.createElement('div');
            flash.style.position = 'fixed';
            flash.style.top = '0';
            flash.style.left = '0';
            flash.style.width = '100%';
            flash.style.height = '100%';
            flash.style.backgroundColor = document.body.classList.contains('dark-mode') ? 'white' : 'black';
            flash.style.zIndex = '9999';
            flash.style.opacity = '0.1';
            flash.style.pointerEvents = 'none';
            flash.style.transition = 'opacity 0.3s';
            document.body.appendChild(flash);
            
            setTimeout(() => {
                flash.style.opacity = '0';
                setTimeout(() => {
                    if (document.body.contains(flash)) {
                        document.body.removeChild(flash);
                    }
                }, 300);
            }, 50);
        });
    }
}
