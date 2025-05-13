/**
 * Particles JS for Elegant Gems Jewelry Store
 * Creates elegant floating particle effects
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles on specific sections
    initParticles('.hero', 30);
    initParticles('.newsletter', 20);
    initParticles('.testimonials', 15);
});

/**
 * Initialize particles in a specific section
 * @param {string} selector - CSS selector for the section
 * @param {number} count - Number of particles to generate
 */
function initParticles(selector, count) {
    const section = document.querySelector(selector);
    if (!section) return;
    
    // Make section position relative if it's not already
    if (window.getComputedStyle(section).position === 'static') {
        section.style.position = 'relative';
    }
    
    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    section.appendChild(particlesContainer);
    
    // Generate particles
    for (let i = 0; i < count; i++) {
        createParticle(particlesContainer, i);
    }
}

/**
 * Create a single particle
 * @param {HTMLElement} container - Container element
 * @param {number} index - Particle index
 */
function createParticle(container, index) {
    const particle = document.createElement('div');
    
    // Randomize particle properties
    const size = getRandomSize();
    const type = getRandomType();
    const shape = getRandomShape();
    
    // Apply classes
    particle.className = `particle ${size} ${type} ${shape}`;
    
    // Set initial position
    const x = Math.random() * 100; // Random X position (0-100%)
    const y = Math.random() * 100 + 100; // Start below the container
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    
    // Add random delay
    const delay = Math.random() * 15;
    particle.style.animationDelay = `${delay}s`;
    
    // Add random drift
    const drift = Math.random() * 100 - 50; // Random left-right drift (-50px to 50px)
    particle.style.animationName = 'particle-float';
    
    // Create custom keyframes for this particle
    createCustomKeyframes(index, drift);
    particle.style.animationName = `particle-float-${index}`;
    
    // Add to container
    container.appendChild(particle);
}

/**
 * Get random particle size class
 * @returns {string} Size class
 */
function getRandomSize() {
    const sizes = ['small', 'medium', 'large'];
    const weights = [0.6, 0.3, 0.1]; // Higher chance for smaller particles
    
    return weightedRandom(sizes, weights);
}

/**
 * Get random particle type/color
 * @returns {string} Type class
 */
function getRandomType() {
    const types = ['gold', 'silver', 'rose-gold', 'shine'];
    const weights = [0.4, 0.3, 0.2, 0.1]; // Higher chance for gold
    
    return weightedRandom(types, weights);
}

/**
 * Get random particle shape
 * @returns {string} Shape class
 */
function getRandomShape() {
    const shapes = ['', 'diamond', 'star']; // Empty string for circular particles
    const weights = [0.7, 0.2, 0.1]; // Higher chance for circular particles
    
    return weightedRandom(shapes, weights);
}

/**
 * Get weighted random item from array
 * @param {Array} items - Array of items
 * @param {Array} weights - Array of weights (must sum to 1)
 * @returns {*} Random item
 */
function weightedRandom(items, weights) {
    const rand = Math.random();
    let sum = 0;
    
    for (let i = 0; i < items.length; i++) {
        sum += weights[i];
        if (rand <= sum) {
            return items[i];
        }
    }
    
    // Fallback
    return items[0];
}

/**
 * Create custom keyframes for a particle
 * @param {number} index - Particle index
 * @param {number} drift - Horizontal drift in pixels
 */
function createCustomKeyframes(index, drift) {
    // Create style element if it doesn't exist
    let style = document.getElementById('particle-keyframes');
    if (!style) {
        style = document.createElement('style');
        style.id = 'particle-keyframes';
        document.head.appendChild(style);
    }
    
    // Create keyframes
    const keyframes = `
    @keyframes particle-float-${index} {
        0% {
            transform: translate(0, 100%) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.8;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translate(${drift}px, -100px) rotate(${Math.random() * 360}deg);
            opacity: 0;
        }
    }`;
    
    // Add to style element
    style.innerHTML += keyframes;
} 