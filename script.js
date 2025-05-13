// Global Variables
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let totalQuantity = 0;

// DOM Elements
const cartCount = document.getElementById('cart-count');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart count
    updateCartCount();

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Initialize page-specific functionality
    initPageFunctionality();
});

// Initialize functionality based on current page
function initPageFunctionality() {
    const currentPage = window.location.pathname.split('/').pop();

    // If on the home page
    if (currentPage === '' || currentPage === 'index.html') {
        initHomePageFunctionality();
    }
    // If on the categories page
    else if (currentPage === 'categories.html') {
        initCategoriesPageFunctionality();
    }
    // If on the product page
    else if (currentPage === 'product.html') {
        initProductPageFunctionality();
    }
    // If on the cart page
    else if (currentPage === 'cart.html') {
        initCartPageFunctionality();
    }
    // If on the checkout page
    else if (currentPage === 'checkout.html') {
        initCheckoutPageFunctionality();
    }

    // Add to cart buttons (across all pages)
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
}

// Home Page Functionality
function initHomePageFunctionality() {
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.testimonials .prev');
    const nextButton = document.querySelector('.testimonials .next');
    let currentTestimonial = 0;

    if (testimonials.length > 0) {
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });

        // Next button click
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                testimonials[currentTestimonial].style.display = 'none';
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                testimonials[currentTestimonial].style.display = 'block';
            });
        }

        // Previous button click
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                testimonials[currentTestimonial].style.display = 'none';
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                testimonials[currentTestimonial].style.display = 'block';
            });
        }
    }

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // In a real app, you would send this to your backend
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
}

// Categories Page Functionality
function initCategoriesPageFunctionality() {
    // Category Tab Filtering
    const tabButtons = document.querySelectorAll('.category-tabs .tab-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const category = button.getAttribute('data-category');

                // Show/hide products based on category
                productCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Price Range Slider
    const priceSlider = document.getElementById('price-slider');
    const priceValue = document.getElementById('price-value');

    if (priceSlider && priceValue) {
        priceSlider.addEventListener('input', () => {
            priceValue.textContent = `$${priceSlider.value}`;
        });
    }

    // Check URL for hash to activate a specific tab
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetTab = document.getElementById(hash);
        if (targetTab) {
            targetTab.click();

            // Smooth scroll to the categories section
            const categoriesSection = document.querySelector('.categories-container');
            if (categoriesSection) {
                categoriesSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
}

// Product Page Functionality
function initProductPageFunctionality() {
    // Image thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    const featuredImage = document.getElementById('featured-image');

    if (thumbnails.length > 0 && featuredImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                // Remove active class from all thumbnails
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                // Add active class to clicked thumbnail
                thumbnail.classList.add('active');

                // Update featured image
                const imgSrc = thumbnail.getAttribute('data-img');
                featuredImage.src = imgSrc;
            });
        });
    }

    // Quantity controls
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.getElementById('quantity');

    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
        });
    }

    // Product tabs
    const tabButtons = document.querySelectorAll('.product-tabs .tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));

                // Add active class to clicked button
                button.classList.add('active');

                // Show corresponding panel
                const tabId = button.getAttribute('data-tab');
                const tabPanel = document.getElementById(tabId);
                if (tabPanel) {
                    tabPanel.classList.add('active');
                }
            });
        });
    }

    // Rating selection in review form
    const ratingStars = document.querySelectorAll('.rating-select i');
    if (ratingStars.length > 0) {
        ratingStars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.getAttribute('data-rating'));
                
                // Remove active class from all stars
                ratingStars.forEach(s => s.className = 'far fa-star');
                
                // Add active class to selected stars
                ratingStars.forEach((s, index) => {
                    if (index < rating) {
                        s.className = 'fas fa-star active';
                    }
                });
            });
        });
    }

    // Review form submission
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, you would send this to your backend
            alert('Thank you for your review! It will be published after moderation.');
            reviewForm.reset();
            ratingStars.forEach(s => s.className = 'far fa-star');
        });
    }

    // Load product details from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        // In a real app, you would fetch product details from the server
        // For this demo, we'll use placeholder code
        loadProductDetails(productId);
    }

    // Related products carousel
    initProductCarousel('.related-products .product-carousel');
}

// Cart Page Functionality
function initCartPageFunctionality() {
    // Display cart items
    displayCartItems();

    // Update quantity of cart items
    const quantityInputs = document.querySelectorAll('.cart-quantity input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', handleQuantityChange);
    });

    // Remove items from cart
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', handleRemoveFromCart);
    });

    // Quantity controls
    const minusButtons = document.querySelectorAll('.quantity-btn.minus');
    const plusButtons = document.querySelectorAll('.quantity-btn.plus');

    minusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.nextElementSibling;
            const currentValue = parseInt(input.value);
            if (currentValue > 1) {
                input.value = currentValue - 1;
                const event = new Event('change');
                input.dispatchEvent(event);
            }
        });
    });

    plusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling;
            const currentValue = parseInt(input.value);
            if (currentValue < 10) {
                input.value = currentValue + 1;
                const event = new Event('change');
                input.dispatchEvent(event);
            }
        });
    });

    // Update cart button
    const updateCartButton = document.querySelector('.update-cart');
    if (updateCartButton) {
        updateCartButton.addEventListener('click', () => {
            updateCartTotals();
            alert('Cart updated successfully!');
        });
    }

    // Apply coupon button
    const couponButton = document.querySelector('.coupon button');
    if (couponButton) {
        couponButton.addEventListener('click', () => {
            const couponInput = document.querySelector('.coupon input');
            if (couponInput && couponInput.value) {
                // In a real app, you would validate the coupon code on the server
                alert('Coupon applied successfully!');
                // For demo, let's apply a 10% discount
                applyDiscount(10);
                couponInput.value = '';
            } else {
                alert('Please enter a coupon code');
            }
        });
    }
}

// Checkout Page Functionality
function initCheckoutPageFunctionality() {
    // Toggle billing address form
    const differentBillingCheckbox = document.getElementById('different-billing');
    const billingAddressForm = document.querySelector('.billing-address');

    if (differentBillingCheckbox && billingAddressForm) {
        differentBillingCheckbox.addEventListener('change', () => {
            billingAddressForm.style.display = differentBillingCheckbox.checked ? 'block' : 'none';
        });
    }

    // Payment method toggle
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const creditCardDetails = document.getElementById('credit-card-details');

    if (paymentRadios.length > 0 && creditCardDetails) {
        paymentRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.value === 'credit-card') {
                    creditCardDetails.style.display = 'block';
                } else {
                    creditCardDetails.style.display = 'none';
                }
            });
        });
    }

    // Shipping method change
    const shippingRadios = document.querySelectorAll('input[name="shipping"]');
    const summaryShipping = document.getElementById('summary-shipping');
    const summaryTotal = document.getElementById('summary-total');
    const subtotalElement = document.getElementById('summary-subtotal');

    if (shippingRadios.length > 0 && summaryShipping && summaryTotal && subtotalElement) {
        const subtotal = parseFloat(subtotalElement.textContent.replace('$', ''));
        const taxElement = document.getElementById('summary-tax');
        const tax = taxElement ? parseFloat(taxElement.textContent.replace('$', '')) : 0;

        shippingRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                const shippingCost = radio.value === 'standard' ? 5.00 : 15.00;
                summaryShipping.textContent = `$${shippingCost.toFixed(2)}`;
                
                // Update total
                const total = subtotal + shippingCost + tax;
                summaryTotal.textContent = `$${total.toFixed(2)}`;
            });
        });
    }

    // Form validation
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const required = checkoutForm.querySelectorAll('[required]');
            let isValid = true;
            
            required.forEach(field => {
                if (!field.value) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // In a real app, you would send this to your backend
                alert('Order placed successfully! Thank you for your purchase.');
                // Clear cart and redirect to confirmation page
                clearCart();
                // window.location.href = 'confirmation.html';
            } else {
                alert('Please fill in all required fields');
            }
        });
    }
}

// Product Carousel Initialization
function initProductCarousel(selector) {
    const carousel = document.querySelector(selector);
    if (!carousel) return;

    const container = carousel.querySelector('.product-carousel-container');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');

    if (container && prevButton && nextButton) {
        const scrollAmount = container.offsetWidth - 100;

        prevButton.addEventListener('click', () => {
            container.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextButton.addEventListener('click', () => {
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
}

// Handle Add to Cart
function handleAddToCart(e) {
    const productId = e.target.getAttribute('data-id');
    const productCard = e.target.closest('.product-card') || e.target.closest('.product-info');
    
    if (!productCard) return;
    
    let name, price, imageSrc, quantity = 1;
    
    // If on product details page, get quantity from input
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantity = parseInt(quantityInput.value);
    }
    
    // Get product details
    if (productCard.classList.contains('product-card')) {
        name = productCard.querySelector('h3').textContent;
        price = productCard.querySelector('.price').textContent.replace('$', '');
        imageSrc = productCard.querySelector('img').src;
    } else {
        name = document.getElementById('product-name').textContent;
        price = document.getElementById('product-price').textContent.replace('$', '');
        imageSrc = document.getElementById('featured-image').src;
    }
    
    // Add item to cart
    addToCart(productId, name, parseFloat(price), imageSrc, quantity);
    
    // Show confirmation
    showAddToCartConfirmation(name);
}

// Add item to cart
function addToCart(id, name, price, image, quantity) {
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === id);
    
    if (existingItemIndex !== -1) {
        // Update quantity if item exists
        cartItems[existingItemIndex].quantity += quantity;
    } else {
        // Add new item if it doesn't exist
        cartItems.push({
            id,
            name,
            price,
            image,
            quantity
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Update cart count
    updateCartCount();
}

// Update cart count
function updateCartCount() {
    totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalQuantity.toString();
    }
}

// Show add to cart confirmation
function showAddToCartConfirmation(productName) {
    // Create confirmation element
    const confirmation = document.createElement('div');
    confirmation.className = 'cart-confirmation';
    confirmation.innerHTML = `
        <div class="confirmation-content">
            <i class="fas fa-check-circle"></i>
            <p>${productName} has been added to your cart!</p>
            <div class="confirmation-actions">
                <a href="cart.html" class="btn">View Cart</a>
                <button class="btn secondary">Continue Shopping</button>
            </div>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(confirmation);
    
    // Add styles
    confirmation.style.position = 'fixed';
    confirmation.style.top = '30px';
    confirmation.style.right = '30px';
    confirmation.style.backgroundColor = 'white';
    confirmation.style.padding = '20px';
    confirmation.style.borderRadius = '4px';
    confirmation.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    confirmation.style.zIndex = '9999';
    confirmation.style.maxWidth = '300px';
    
    // Add continue shopping button event
    const continueBtn = confirmation.querySelector('.btn.secondary');
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            document.body.removeChild(confirmation);
        });
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(confirmation)) {
            document.body.removeChild(confirmation);
        }
    }, 5000);
}

// Display cart items
function displayCartItems() {
    const cartContainer = document.getElementById('cart-container');
    const cartEmpty = document.getElementById('cart-empty');
    const cartItems = document.getElementById('cart-items');
    
    if (!cartContainer || !cartEmpty || !cartItems) return;
    
    if (totalQuantity === 0) {
        cartContainer.style.display = 'none';
        cartEmpty.style.display = 'block';
        return;
    }
    
    cartContainer.style.display = 'block';
    cartEmpty.style.display = 'none';
    
    // Clear existing items
    cartItems.innerHTML = '';
    
    // Add cart items
    cartItems.forEach(item => {
        const cartRow = document.createElement('div');
        cartRow.className = 'cart-row';
        cartRow.innerHTML = `
            <div class="cart-item">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Handcrafted jewelry</p>
                </div>
            </div>
            <div class="cart-price">$${item.price.toFixed(2)}</div>
            <div class="cart-quantity">
                <div class="quantity-controls">
                    <button class="quantity-btn minus" data-id="${item.id}"><i class="fas fa-minus"></i></button>
                    <input type="number" value="${item.quantity}" min="1" max="10" data-id="${item.id}">
                    <button class="quantity-btn plus" data-id="${item.id}"><i class="fas fa-plus"></i></button>
                </div>
            </div>
            <div class="cart-total">$${(item.price * item.quantity).toFixed(2)}</div>
            <div class="cart-remove">
                <button class="remove-btn" data-id="${item.id}"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        cartItems.appendChild(cartRow);
    });
    
    // Update cart totals
    updateCartTotals();
}

// Handle quantity change
function handleQuantityChange(e) {
    const productId = e.target.getAttribute('data-id');
    const quantity = parseInt(e.target.value);
    
    // Update cart item quantity
    const itemIndex = cartItems.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity = quantity;
        
        // Update cart item total price
        const totalElement = e.target.closest('.cart-row').querySelector('.cart-total');
        if (totalElement) {
            totalElement.textContent = `$${(cartItems[itemIndex].price * quantity).toFixed(2)}`;
        }
        
        // Save to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Update cart count
        updateCartCount();
        
        // Update cart totals
        updateCartTotals();
    }
}

// Handle remove from cart
function handleRemoveFromCart(e) {
    const productId = e.target.getAttribute('data-id') || e.target.parentElement.getAttribute('data-id');
    
    // Remove item from cart
    cartItems = cartItems.filter(item => item.id !== productId);
    
    // Save to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Update cart count
    updateCartCount();
    
    // Remove cart row
    const cartRow = e.target.closest('.cart-row');
    if (cartRow) {
        cartRow.remove();
    }
    
    // Update cart totals
    updateCartTotals();
    
    // Show empty cart message if no items left
    if (totalQuantity === 0) {
        const cartContainer = document.getElementById('cart-container');
        const cartEmpty = document.getElementById('cart-empty');
        
        if (cartContainer && cartEmpty) {
            cartContainer.style.display = 'none';
            cartEmpty.style.display = 'block';
        }
    }
}

// Update cart totals
function updateCartTotals() {
    const subtotalElement = document.getElementById('cart-subtotal');
    const totalElement = document.getElementById('cart-total');
    
    if (subtotalElement && totalElement) {
        const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalElement.textContent = `$${subtotal.toFixed(2)}`;
    }
}

// Apply discount
function applyDiscount(percentage) {
    const discountElement = document.getElementById('cart-discount');
    const totalElement = document.getElementById('cart-total');
    
    if (discountElement && totalElement) {
        const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const discountAmount = (subtotal * percentage) / 100;
        const total = subtotal - discountAmount;
        
        discountElement.textContent = `-$${discountAmount.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
}

// Load product details
function loadProductDetails(productId) {
    // In a real app, you would fetch this data from a server
    // For this demo, we'll use hardcoded data
    const products = {
        '1': {
            name: 'Golden Pearl Necklace',
            price: 120.00,
            description: 'This exquisite handcrafted necklace features a lustrous freshwater pearl pendant set in 18k gold-plated sterling silver. The delicate chain measures 18 inches with a 2-inch extender, allowing for versatile styling. Perfect for special occasions or to add elegance to everyday outfits.',
            material: '18k gold-plated sterling silver',
            gemstone: 'Freshwater pearl',
            length: '18 inches + 2-inch extender',
            closure: 'Lobster clasp',
            care: 'Store in a cool, dry place. Clean with a soft cloth.',
            category: 'Necklaces',
            imageSrc: 'images/product1.jpg'
        },
        '2': {
            name: 'Rose Gold Earrings',
            price: 85.00,
            description: 'Delicate rose gold earrings with a modern geometric design. These lightweight earrings are perfect for everyday wear and add a subtle touch of elegance to any outfit.',
            material: 'Rose gold-plated sterling silver',
            gemstone: 'None',
            length: '1.5 inches',
            closure: 'Push back',
            care: 'Store in a jewelry box. Avoid contact with water and chemicals.',
            category: 'Earrings',
            imageSrc: 'images/product2.jpg'
        }
        // Add more products as needed
    };
    
    const product = products[productId];
    if (!product) return;
    
    // Update product title in breadcrumbs
    const breadcrumbProduct = document.getElementById('breadcrumb-product');
    const productTitle = document.getElementById('product-title');
    if (breadcrumbProduct) breadcrumbProduct.textContent = product.name;
    if (productTitle) productTitle.textContent = product.name;
    
    // Update product details
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const productDescription = document.getElementById('product-description');
    const productMaterial = document.getElementById('product-material');
    const productGemstone = document.getElementById('product-gemstone');
    const productLength = document.getElementById('product-length');
    const productClosure = document.getElementById('product-closure');
    const productCare = document.getElementById('product-care');
    const productCategory = document.getElementById('product-category');
    
    if (productName) productName.textContent = product.name;
    if (productPrice) productPrice.textContent = `$${product.price.toFixed(2)}`;
    if (productDescription) productDescription.textContent = product.description;
    if (productMaterial) productMaterial.textContent = product.material;
    if (productGemstone) productGemstone.textContent = product.gemstone;
    if (productLength) productLength.textContent = product.length;
    if (productClosure) productClosure.textContent = product.closure;
    if (productCare) productCare.textContent = product.care;
    if (productCategory) {
        productCategory.textContent = product.category;
        productCategory.href = `categories.html#${product.category.toLowerCase()}`;
    }
    
    // Update add to cart button
    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.setAttribute('data-id', productId);
    }
    
    // Update featured image
    const featuredImage = document.getElementById('featured-image');
    if (featuredImage) {
        featuredImage.src = product.imageSrc;
    }
}

// Clear cart
function clearCart() {
    cartItems = [];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
}