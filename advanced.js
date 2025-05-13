/**
 * Advanced JS for Elegant Gems Jewelry Store
 * Enhances the user experience with modern interactions and effects
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all advanced features
    initAdvancedFeatures();
});

/**
 * Initialize all advanced features
 */
function initAdvancedFeatures() {
    // Add enhanced styling to product cards
    enhanceProductCards();
    
    // Initialize glassmorphism elements
    initGlassmorphism();
    
    // Initialize animations
    initAnimations();
    
    // Create and initialize dark mode toggle
    initDarkMode();
    
    // Apply shimmer effect to featured elements
    initShimmerEffects();
    
    // Initialize floating elements
    initFloatingElements();
    
    // Apply gold text effect
    initGoldTextEffect();
}

/**
 * Enhance product cards with advanced styling
 */
function enhanceProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add enhanced class for styling
        card.classList.add('enhanced');
        
        // Add image zoom effect to product images
        const imageContainer = card.querySelector('.product-image');
        if (imageContainer) {
            imageContainer.classList.add('img-zoom-container');
            const image = imageContainer.querySelector('img');
            if (image) {
                image.classList.add('img-zoom');
            }
        }
        
        // Add hover underline to product titles
        const title = card.querySelector('h3');
        if (title) {
            title.classList.add('hover-underline');
        }
    });
}

/**
 * Initialize glassmorphism elements
 */
function initGlassmorphism() {
    // Apply glass card effect to testimonials
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach(testimonial => {
        testimonial.classList.add('glass-card');
    });
    
    // Apply glass effect to newsletter section
    const newsletterContent = document.querySelector('.newsletter-content');
    if (newsletterContent) {
        newsletterContent.classList.add('glass-card');
        newsletterContent.style.background = 'rgba(255, 255, 255, 0.15)';
        newsletterContent.style.padding = '3rem';
    }
}

/**
 * Initialize animations for page elements
 */
function initAnimations() {
    // Apply fade-in animations to sections
    const sections = [
        '.featured', 
        '.best-sellers', 
        '.testimonials', 
        '.newsletter'
    ];
    
    sections.forEach((selector, index) => {
        const section = document.querySelector(selector);
        if (section) {
            section.classList.add('fade-in');
            section.style.animationDelay = `${index * 0.2}s`;
        }
    });
    
    // Add staggered animation to category and product cards
    const cardContainers = [
        '.category-grid',
        '.product-grid',
        '.products-grid'
    ];
    
    cardContainers.forEach(selector => {
        const container = document.querySelector(selector);
        if (container) {
            container.classList.add('stagger-fade-in');
        }
    });
    
    // Add hardware acceleration to animated elements
    document.querySelectorAll('.animate-text, .fade-in, .stagger-fade-in > *')
        .forEach(el => el.classList.add('hw-accelerated'));
}

/**
 * Initialize dark mode functionality
 */
function initDarkMode() {
    // Create dark mode toggle button
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);
    
    // Check for saved user preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Apply dark mode if saved preference exists
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle dark mode on click
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        // Update button icon
        darkModeToggle.innerHTML = isDark 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        
        // Save preference
        localStorage.setItem('darkMode', isDark);
    });
}

/**
 * Initialize shimmer effects
 */
function initShimmerEffects() {
    // Apply shimmer to call-to-action buttons
    const primaryButtons = document.querySelectorAll('.hero .btn, .checkout-btn, .place-order-btn');
    primaryButtons.forEach(button => {
        button.classList.add('shimmer');
    });
    
    // Apply shimmer to logo
    const logo = document.querySelector('.logo h1');
    if (logo) {
        logo.classList.add('shimmer');
    }
}

/**
 * Initialize floating elements
 */
function initFloatingElements() {
    // Make certain elements float
    const floatingElements = [
        '.footer-logo h2',
        '.category-card img',
        '.hero-content h1'
    ];
    
    floatingElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.add('float-element');
        });
    });
}

/**
 * Initialize gold text effect
 */
function initGoldTextEffect() {
    // Apply gold text effect to section titles
    const sectionTitles = document.querySelectorAll('.section-title h2, .footer-logo h2');
    sectionTitles.forEach(title => {
        title.classList.add('gold-text');
    });
    
    // Apply gold text to product prices
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        price.classList.add('gold-text');
    });
}

/**
 * Apply 3D button effect to buttons
 */
function enhance3DButtons() {
    // Apply 3D effect to specific buttons
    const buttons3D = document.querySelectorAll('.add-to-cart-btn, .checkout-btn, .place-order-btn');
    buttons3D.forEach(button => {
        button.classList.add('btn-3d');
    });
    
    // Apply fancy outline effect to secondary buttons
    const outlineButtons = document.querySelectorAll('.add-to-cart, .category-link, .continue-shopping');
    outlineButtons.forEach(button => {
        button.classList.add('btn-outline-fancy');
    });
}

/**
 * Make the page responsive with enhanced mobile navigation
 */
function enhanceMobileExperience() {
    // Only apply on mobile devices
    if (window.innerWidth <= 768) {
        // Create mobile bottom navigation
        const mobileNav = document.createElement('nav');
        mobileNav.className = 'nav-mobile-improved';
        
        // Get existing nav items
        const navLinks = document.querySelectorAll('.nav-links a');
        const navHTML = Array.from(navLinks).map(link => {
            const text = link.textContent;
            let icon = 'home';
            
            // Determine appropriate icon
            if (text.includes('Home')) icon = 'home';
            else if (text.includes('Collections')) icon = 'gem';
            else if (text.includes('About')) icon = 'info-circle';
            else if (text.includes('Contact')) icon = 'envelope';
            
            return `
                <a href="${link.href}" ${link.classList.contains('active') ? 'class="active"' : ''}>
                    <i class="fas fa-${icon}"></i>
                    <span>${text}</span>
                </a>
            `;
        }).join('');
        
        // Add cart icon
        const cartLink = document.querySelector('.cart a');
        if (cartLink) {
            const cartCount = cartLink.querySelector('#cart-count').outerHTML || '';
            navHTML += `
                <a href="${cartLink.href}" ${cartLink.classList.contains('active') ? 'class="active"' : ''}>
                    <i class="fas fa-shopping-cart"></i>
                    ${cartCount}
                    <span>Cart</span>
                </a>
            `;
        }
        
        mobileNav.innerHTML = navHTML;
        document.body.appendChild(mobileNav);
        
        // Make all touch targets larger
        const touchTargets = document.querySelectorAll('button, .btn, a, input[type="checkbox"], input[type="radio"]');
        touchTargets.forEach(target => {
            target.classList.add('touch-friendly');
        });
    }
}

// Call additional enhancements after window loads
window.addEventListener('load', () => {
    enhance3DButtons();
    
    // Only initialize mobile enhancements if on mobile
    if (window.innerWidth <= 768) {
        enhanceMobileExperience();
    }
    
    // Remove page load transitions after everything is loaded
    setTimeout(() => {
        document.body.classList.add('transitions-complete');
    }, 1500);
}); 