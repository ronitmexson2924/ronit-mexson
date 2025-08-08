// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and interactions
    initPageTransition();
    initCustomCursor();
    initFloatingElements();
    initScrollAnimations();
    initThemeToggle();
    initSearchForm();
    initTestimonialSlider();
    initTagButtons();
    initFilterButtons();
    initSidebar();        
});

// Custom cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let isVisible = false;
    
    document.addEventListener('mousemove', (e) => {
        if (!isVisible) {
            gsap.to([cursor, cursorFollower], { autoAlpha: 1, duration: 0.2 });
            isVisible = true;
        }
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
        gsap.to(cursorFollower, { x: e.clientX, y: e.clientY, duration: 0.3 });
    });
    
    // Add hover class to cursor when hovering over interactive elements
    const hoverElements = document.querySelectorAll(
        'a, button, input, .result-card, .tag, .filter-btn, .slider-btn, .dot, .connect-btn, .control-btn, .progress-slider, .volume-slider'
    );
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
            gsap.to(cursorFollower, { scale: 1.3, duration: 0.2 });
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
            gsap.to(cursorFollower, { scale: 1, duration: 0.2 });
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        gsap.to([cursor, cursorFollower], { autoAlpha: 0, duration: 0.2 });
        isVisible = false;
    });
    
    document.addEventListener('mouseenter', () => {
        if (!isVisible) {
            gsap.to([cursor, cursorFollower], { autoAlpha: 1, duration: 0.2 });
            isVisible = true;
        }
    });
}

// Page transition animation
function initPageTransition() {
    const pageTransition = document.querySelector('.page-transition');
    if (!pageTransition) return;
    
    // Initial page load animation
    gsap.to(pageTransition, {
        duration: 0.6,
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'power4.inOut',
        delay: 0.1
    });
    
    // Animate links with page transition
    document.body.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;
        
        const href = link.getAttribute('href');
        const target = link.getAttribute('target');
        
        // Ignore links opening in new tabs, mailto, tel, or same-page anchors
        if (!href || target === '_blank' || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
            return;
        }
        
        // Prevent default navigation for internal links
        if (link.hostname === window.location.hostname) {
            e.preventDefault();
            
            // Animate out
            gsap.to(pageTransition, {
                duration: 0.5,
                scaleY: 1,
                transformOrigin: 'bottom',
                ease: 'power4.inOut',
                onComplete: () => {
                    window.location.href = href;
                }
            });
        }
    });
}

// Floating elements animation
function initFloatingElements() {
    const elements = document.querySelectorAll('.float-element');
    if (elements.length === 0) return;
    
    elements.forEach((element, index) => {
        const duration = 4 + Math.random() * 3;
        const delay = Math.random() * 1;
        
        // Vertical float animation
        gsap.to(element, {
            y: `random(-25, 25)`,
            duration: duration,
            delay: delay,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
        
        // Subtle rotation animation
        gsap.to(element, {
            rotation: `random(-8, 8)`,
            duration: duration * 1.2,
            delay: delay,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
        
        // Subtle scale animation
        gsap.to(element, {
            scale: `random(0.95, 1.05)`,
            duration: duration * 1.5,
            delay: delay,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    // Animate hero section elements with stagger
    gsap.from('.hero-text > *', { 
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.3
    });
    
    // Animate floating elements entrance
    gsap.from('.float-element', {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        delay: 0.6
    });
    
    // Animate search container
    gsap.from('.search-container', {
        scrollTrigger: {
            trigger: '.search-section',
            start: 'top 90%'
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Animate steps on scroll
    gsap.from('.step', {
        scrollTrigger: {
            trigger: '.how-it-works',
            start: 'top 75%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'back.out(1.4)'
    });
    
    // Animate testimonial cards
    gsap.from('.testimonial-card', {
        scrollTrigger: {
            trigger: '.testimonials',
            start: 'top 80%'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Animate section headers
    gsap.utils.toArray('section h3').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    // Animate footer elements
    gsap.utils.toArray('.footer-content > div').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: '.site-footer',
                start: 'top 95%'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    // Animate footer bottom
    gsap.from('.footer-bottom', {
        scrollTrigger: {
            trigger: '.site-footer',
            start: 'top 80%'
        },
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
}

// Theme toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (!themeToggle) return;
    
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        
        // Update icon and save preference
        themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        
        // Optional flash effect
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100%;
            background-color: ${isDarkMode ? 'white' : 'black'};
            z-index: var(--z-overlay); 
            opacity: 0.05; 
            pointer-events: none;
            transition: opacity var(--transition-fast);
        `;
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

// Search form handling
function initSearchForm() {
    const searchForm = document.getElementById('searchForm');
    const topicInput = document.getElementById('topicInput');
    const resultsSection = document.getElementById('resultsSection');
    const loader = document.getElementById('loader');
    const placeholderText = document.getElementById('placeholderText');
    const resultsContainer = document.getElementById('resultsContainer');
    
    if (!searchForm || !topicInput || !resultsSection || !loader || !placeholderText || !resultsContainer) return;
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const topic = topicInput.value.trim();
        
        if (!topic) {
            // Shake animation for empty input
            gsap.fromTo(topicInput, { x: 0 }, {
                x: 8, 
                duration: 0.08, 
                repeat: 5, 
                yoyo: true, 
                ease: 'power1.inOut',
                clearProps: "x"
            });
            return;
        }
        
        placeholderText.style.display = 'none';
        loader.classList.add('show');
        resultsContainer.innerHTML = '';
        
        // Scroll to results section
        setTimeout(() => {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        
        fetchAndDisplayResults(topic);
    });
    
    function fetchAndDisplayResults(topic) {
        console.log(`Fetching results for: ${topic}`);
        
        setTimeout(() => {
            loader.classList.remove('show');
            generateMockResults(topic);
        }, 1500);
    }
}

// Generate mock results based on topic
function generateMockResults(topic) {
    const resultsContainer = document.getElementById('resultsContainer');
    const placeholderText = document.getElementById('placeholderText');
    if (!resultsContainer || !placeholderText) return;
    
    resultsContainer.innerHTML = '';
    placeholderText.style.display = 'none';
    
    const resultTypes = [
        { type: 'Video', icon: 'fa-video' },
        { type: 'Course', icon: 'fa-graduation-cap' },
        { type: 'Article', icon: 'fa-newspaper' },
        { type: 'Interactive', icon: 'fa-laptop-code' },
        { type: 'Book', icon: 'fa-book' },
        { type: 'Podcast', icon: 'fa-podcast' }
    ];
    
    const resultsCount = 6 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < resultsCount; i++) {
        const resultType = resultTypes[Math.floor(Math.random() * resultTypes.length)];
        const card = document.createElement('div');
        card.className = 'result-card';
        card.dataset.type = resultType.type.toLowerCase();
        card.innerHTML = `
            <div class="result-card-header">
                <div class="icon">
                    <i class="fas ${resultType.icon}"></i>
                </div>
                <span class="type">${resultType.type}</span>
            </div>
            <div class="result-card-body">
                <h4>${getRandomTitle(topic, resultType.type)}</h4>
                <p>${getRandomDescription(topic, resultType.type)}</p>
            </div>
            <div class="result-card-footer">
                <a href="#" target="_blank">
                    <span>Learn More</span>
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        resultsContainer.appendChild(card);
        
        // Animate card entrance
        gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            delay: i * 0.08,
            ease: 'power3.out'
        });
    }
    
    // Reset filters to 'All'
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    const allFilterButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allFilterButton) {
        allFilterButton.classList.add('active');
    }
}

// Helper function to generate random titles
function getRandomTitle(topic, type) {
    const prefixes = ["Introduction to", "Mastering", "Advanced", "The Basics of", "Exploring", "Deep Dive into"];
    const suffixes = {
        Video: " Explained",
        Course: " Bootcamp",
        Article: ": A Guide",
        Interactive: " Simulator",
        Book: " Compendium",
        Podcast: " Insights"
    };
    return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${topic}${suffixes[type] || ''}`;
}

// Helper function to generate random descriptions
function getRandomDescription(topic, type) {
    const verbs = ["Discover", "Learn", "Understand", "Explore", "Master"];
    const nouns = ["key concepts", "fundamental principles", "advanced techniques", "practical applications", "the core ideas"];
    return `${verbs[Math.floor(Math.random() * verbs.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]} of ${topic} through this ${type.toLowerCase()}.`;
}

// Testimonial slider
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    const track = document.querySelector('.testimonial-track');
    const slides = Array.from(track?.children || []);
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if (!slider || !track || slides.length <= 1 || !prevBtn || !nextBtn || !dotsContainer) return;
    
    let currentIndex = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let startPosX = 0;
    let isDragging = false;
    let animationID;
    
    // Touch/mouse events
    slides.forEach((slide, index) => {
        slide.addEventListener('touchstart', touchStart(index), { passive: true });
        slide.addEventListener('touchend', touchEnd);
        slide.addEventListener('touchmove', touchMove, { passive: true });
        slide.addEventListener('mousedown', touchStart(index));
        slide.addEventListener('mouseup', touchEnd);
        slide.addEventListener('mouseleave', touchEnd);
        slide.addEventListener('mousemove', touchMove);
    });
    
    function touchStart(index) {
        return function(e) {
            currentIndex = index;
            startPosX = getPositionX(e);
            isDragging = true;
            animationID = requestAnimationFrame(animation);
            track.style.transition = 'none';
            slider.classList.add('is-dragging');
        };
    }
    
    function touchMove(e) {
        if (isDragging) {
            currentTranslate = prevTranslate + (getPositionX(e) - startPosX);
        }
    }
    
    function touchEnd() {
        if (!isDragging) return;
        
        isDragging = false;
        cancelAnimationFrame(animationID);
        
        const movedBy = currentTranslate - prevTranslate;
        
        if (movedBy < -50 && currentIndex < slides.length - 1) currentIndex++;
        if (movedBy > 50 && currentIndex > 0) currentIndex--;
        
        setPositionByIndex();
        updateDots();
        resetAutoplay();
    }
    
    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }
    
    function setSliderPosition() {
        track.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
    
    // Create dots
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'dot';
        dot.setAttribute('aria-label', `Go to Testimonial ${index + 1}`);
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentIndex = index;
            setPositionByIndex();
            updateDots();
            resetAutoplay();
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function setPositionByIndex() {
        prevTranslate = -currentIndex * getSlideWidth();
        currentTranslate = prevTranslate;
        track.style.transition = 'transform var(--transition-slow)';
        setSliderPosition();
    }
    
    function getSlideWidth() {
        return slides[0].getBoundingClientRect().width;
    }
    
    // Autoplay
    let autoplayInterval = setInterval(nextSlide, 6000);
    
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, 6000);
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        setPositionByIndex();
        updateDots();
    }
    
    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        setPositionByIndex();
        updateDots();
        resetAutoplay();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + 1, slides.length - 1);
        setPositionByIndex();
        updateDots();
        resetAutoplay();
    });
    
    // Resize handling
    window.addEventListener('resize', () => {
        setPositionByIndex();
    });
    
    // Initial setup
    updateDots();
    resetAutoplay();
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    slider.addEventListener('mouseleave', resetAutoplay);
}

// Tag buttons
function initTagButtons() {
    const tagButtons = document.querySelectorAll('.tag');
    const topicInput = document.getElementById('topicInput');
    const searchForm = document.getElementById('searchForm');
    
    if (!tagButtons.length || !topicInput || !searchForm) return;
    
    tagButtons.forEach(button => {
        button.addEventListener('click', () => {
            const topic = button.dataset.topic;
            if (!topic) return;
            
            topicInput.value = topic;
            
            if (searchForm.requestSubmit) {
                searchForm.requestSubmit();
            } else {
                searchForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
            }
            
            gsap.to(button, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
        });
    });
}

// Filter buttons
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const resultsContainer = document.getElementById('resultsContainer');
    const placeholderText = document.getElementById('placeholderText');
    
    if (!filterButtons.length || !resultsContainer || !placeholderText) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.dataset.filter;
            const cards = resultsContainer.querySelectorAll('.result-card');
            let visibleCount = 0;
            
            cards.forEach(card => {
                const cardType = card.dataset.type;
                const matchesFilter = filterValue === 'all' || cardType === filterValue;
                
                gsap.to(card, {
                    duration: 0.3,
                    opacity: matchesFilter ? 1 : 0,
                    scale: matchesFilter ? 1 : 0.95,
                    onStart: () => {
                        if (matchesFilter) card.style.display = 'flex';
                    },
                    onComplete: () => {
                        if (!matchesFilter) card.style.display = 'none';
                    }
                });
                
                if (matchesFilter) visibleCount++;
            });
            
            placeholderText.style.display = visibleCount === 0 && filterValue !== 'all' ? 'block' : 'none';
        });
    });
}

// Sidebar Functionality
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (!sidebar || !sidebarToggle || !closeSidebar || !overlay) return;
    
    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('show');
        sidebarToggle.setAttribute('aria-expanded', 'true');
    }
    
    function closeSidebarFunc() {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        sidebarToggle.setAttribute('aria-expanded', 'false');
    }
    
    sidebarToggle.addEventListener('click', openSidebar);
    closeSidebar.addEventListener('click', closeSidebarFunc);
    overlay.addEventListener('click', closeSidebarFunc);
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            closeSidebarFunc();
        }
    });
}

// Format time for music player
function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Handle resize
window.addEventListener('resize', () => {
    const slides = document.querySelectorAll('.testimonial-track > *');
    if (slides.length > 0) {
        slides[0].style.width = '100%';
        slides[0].style.width = '';
    }
});