/**
 * Aesthetic Background JS for Elegant Gems Jewelry Store
 * Creates dynamic backgrounds and visual effects
 */

document.addEventListener('DOMContentLoaded', () => {
    // Apply the shadow card effect to product cards
    applyShadowCards();
    
    // Initialize animated gradient sections
    initAnimatedGradients();
    
    // Add subtle parallax effect to certain sections
    initParallaxEffect();
    
    // Initialize glowing orbs in hero section
    initGlowingOrbs('.hero', 5);
});

/**
 * Apply shadow card effect to product cards
 */
function applyShadowCards() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.classList.add('shadow-gold-card');
    });
    
    // Also apply to testimonials
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach(testimonial => {
        testimonial.classList.add('shadow-gold-card');
    });
}

/**
 * Initialize sections with animated gradient backgrounds
 */
function initAnimatedGradients() {
    // Apply animated gradient to specific sections
    const sections = [
        '.newsletter',
        '.page-banner'
    ];
    
    sections.forEach(selector => {
        const section = document.querySelector(selector);
        if (section) {
            section.classList.add('animated-gradient');
        }
    });
}

/**
 * Initialize subtle parallax effect for background patterns
 */
function initParallaxEffect() {
    // For sections with background patterns
    const parallaxSections = [
        '.hero',
        '.newsletter',
        '.page-banner',
        'footer'
    ];
    
    // Add parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        parallaxSections.forEach(selector => {
            const section = document.querySelector(selector);
            if (section) {
                // Get section's position relative to viewport
                const rect = section.getBoundingClientRect();
                
                // Check if section is in viewport
                if (
                    rect.bottom >= 0 &&
                    rect.top <= window.innerHeight
                ) {
                    // Apply parallax effect to pseudo-element
                    section.style.setProperty('--parallax-x', `${mouseX * 20}px`);
                    section.style.setProperty('--parallax-y', `${mouseY * 20}px`);
                }
            }
        });
    });
    
    // Add CSS variables for parallax
    const style = document.createElement('style');
    style.innerHTML = `
        .hero::before,
        .newsletter::before,
        .page-banner::before,
        footer::before {
            transform: translate(var(--parallax-x, 0), var(--parallax-y, 0));
            transition: transform 0.2s ease-out;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Create glowing orbs in a container element
 * @param {string} selector - CSS selector for container
 * @param {number} count - Number of orbs to create
 */
function initGlowingOrbs(selector, count) {
    const container = document.querySelector(selector);
    if (!container) return;
    
    // Create a wrapper for the orbs
    const orbsContainer = document.createElement('div');
    orbsContainer.className = 'glowing-orbs-container';
    orbsContainer.style.position = 'absolute';
    orbsContainer.style.top = '0';
    orbsContainer.style.left = '0';
    orbsContainer.style.right = '0';
    orbsContainer.style.bottom = '0';
    orbsContainer.style.overflow = 'hidden';
    orbsContainer.style.zIndex = '1';
    orbsContainer.style.pointerEvents = 'none';
    
    // Add orbs to the container
    for (let i = 0; i < count; i++) {
        createGlowingOrb(orbsContainer);
    }
    
    // Insert the orbs container before the first child of the container
    container.insertBefore(orbsContainer, container.firstChild);
}

/**
 * Create a single glowing orb
 * @param {HTMLElement} container - Container element
 */
function createGlowingOrb(container) {
    const orb = document.createElement('div');
    
    // Randomize orb properties
    const size = Math.random() * 150 + 50; // 50-200px
    const x = Math.random() * 100; // Random position (0-100%)
    const y = Math.random() * 100;
    const hue = Math.random() * 30 + 40; // Gold hues (40-70)
    const animationDuration = Math.random() * 10 + 20; // 20-30s
    
    // Set orb styles
    orb.className = 'glowing-orb';
    orb.style.position = 'absolute';
    orb.style.width = `${size}px`;
    orb.style.height = `${size}px`;
    orb.style.borderRadius = '50%';
    orb.style.background = `radial-gradient(circle at 30% 30%, hsla(${hue}, 80%, 70%, 0.15), hsla(${hue}, 100%, 50%, 0) 70%)`;
    orb.style.left = `${x}%`;
    orb.style.top = `${y}%`;
    orb.style.filter = 'blur(8px)';
    orb.style.opacity = '0.8';
    
    // Add animation
    orb.style.animation = `glowing-orb-float ${animationDuration}s ease-in-out infinite alternate`;
    
    // Add to container
    container.appendChild(orb);
    
    // Add animation keyframes if they don't exist
    if (!document.getElementById('glowing-orb-keyframes')) {
        const style = document.createElement('style');
        style.id = 'glowing-orb-keyframes';
        style.innerHTML = `
            @keyframes glowing-orb-float {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.6;
                }
                50% {
                    opacity: 0.8;
                }
                100% {
                    transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.2);
                    opacity: 0.7;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Enhance product section backgrounds
 */
window.addEventListener('load', () => {
    // Apply shadow to product images
    const productImages = document.querySelectorAll('.product-image img');
    productImages.forEach(img => {
        img.style.filter = 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1))';
    });
    
    // Add gradient overlays to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.position = 'relative';
        title.style.zIndex = '1';
        
        // Create gradient line
        const gradientLine = document.createElement('div');
        gradientLine.style.position = 'absolute';
        gradientLine.style.bottom = '-10px';
        gradientLine.style.left = '50%';
        gradientLine.style.transform = 'translateX(-50%)';
        gradientLine.style.width = '80px';
        gradientLine.style.height = '3px';
        gradientLine.style.background = 'linear-gradient(to right, transparent, var(--primary-color), transparent)';
        
        // Add the line
        title.querySelector('.underline').style.display = 'none';
        title.appendChild(gradientLine);
    });
}); 