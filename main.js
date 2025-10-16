// ShopWisePro Main JavaScript File
// Handles all interactivity, animations, and functionality

// Global Variables
let currentAuthMode = 'signin';
let compareList = [];
let currentView = 'grid';
let products = [];
let cart = JSON.parse(localStorage.getItem('shopwisepro_cart')) || [];
let user = JSON.parse(localStorage.getItem('shopwisepro_user')) || null;

// Product Database
const productDatabase = [
    {
        id: 'oppo-find-x7',
        name: 'Oppo Find X7',
        brand: 'oppo',
        category: 'smartphones',
        price: 899,
        condition: 'new',
        image: './resources/products/iphone-15-pro-max.jpg',
        rating: 4.5,
        features: ['6.7" AMOLED Display', 'Snapdragon 8 Gen 3', '50MP Triple Camera', '5000mAh Battery'],
        description: 'Latest flagship with advanced camera system and premium design'
    },
    {
        id: 'xiaomi-14-pro',
        name: 'Xiaomi 14 Pro',
        brand: 'xiaomi',
        category: 'smartphones',
        price: 799,
        condition: 'new',
        image: './resources/products/xiaomi-14-pro.jpgs',
        rating: 4.7,
        features: ['6.73" LTPO AMOLED', 'Snapdragon 8 Gen 3', 'Leica Camera', '120W Fast Charging'],
        description: 'Professional photography smartphone with Leica partnership'
    },
    {
        id: 'sony-wh1000xm5',
        name: 'Sony WH-1000XM5',
        brand: 'sony',
        category: 'audio',
        price: 399,
        condition: 'new',
        image: './resources/products/sony-wh1000xm5.jpg',
        rating: 4.8,
        features: ['Industry-leading Noise Canceling', '30-hour Battery Life', 'Multipoint Connection', 'Touch Controls'],
        description: 'Premium wireless headphones with industry-leading noise canceling'
    },
    {
        id: 'nintendo-switch-oled',
        name: 'Nintendo Switch OLED',
        brand: 'nintendo',
        category: 'gaming',
        price: 349,
        condition: 'new',
        image: './resources/products/nintendo-switch-oled.jpg',
        rating: 4.6,
        features: ['7" OLED Display', '64GB Storage', 'Enhanced Audio', 'Adjustable Stand'],
        description: 'Portable gaming console with vibrant OLED display'
    },
    {
        id: 'samsung-galaxy-s23',
        name: 'Samsung Galaxy S23',
        brand: 'samsung',
        category: 'smartphones',
        price: 699,
        condition: 'pre-owned',
        image: './resources/products/samsung-galaxy-s23.jpg',
        rating: 4.4,
        features: ['6.1" Dynamic AMOLED', 'Snapdragon 8 Gen 2', '50MP Camera', '3900mAh Battery'],
        description: 'Certified pre-owned flagship with excellent condition'
    },
    {
        id: 'ipad-pro-12-9',
        name: 'iPad Pro 12.9"',
        brand: 'apple',
        category: 'tablets',
        price: 1099,
        condition: 'pre-owned',
        image: './resources/products/ipad-pro-12-9.jpg',
        rating: 4.9,
        features: ['12.9" Liquid Retina XDR', 'M2 Chip', '128GB Storage', 'Apple Pencil Support'],
        description: 'Professional tablet perfect for creative work and productivity'
    },
    {
        id: 'samsung-galaxy-watch6',
        name: 'Samsung Galaxy Watch 6',
        brand: 'samsung',
        category: 'wearables',
        price: 299,
        condition: 'new',
        image: './resources/products/samsung-galaxy-watch6.jpg',
        rating: 4.3,
        features: ['1.5" Super AMOLED', 'Exynos W930', 'Health Monitoring', 'GPS Tracking'],
        description: 'Advanced smartwatch with comprehensive health tracking'
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize products
    products = [...productDatabase];
    
    // Initialize components based on current page
    const currentPage = getCurrentPage();
    
    // Common initializations
    initializeScrollReveal();
    initializeSearch();
    initializeAuth();
    
    // Page-specific initializations
    switch(currentPage) {
        case 'index':
            initializeHomePage();
            break;
        case 'products':
            initializeProductsPage();
            break;
        case 'about':
            initializeAboutPage();
            break;
        case 'contact':
            initializeContactPage();
            break;
    }
    
    // Update UI based on user state
    updateUI();
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('products.html')) return 'products';
    if (path.includes('about.html')) return 'about';
    if (path.includes('contact.html')) return 'contact';
    return 'index';
}

// ==================== HOME PAGE INITIALIZATION ====================

function initializeHomePage() {
    initializeHeroAnimations();
    initializeFeaturedCarousel();
    initializeParticleBackground();
}

function initializeHeroAnimations() {
    // Typewriter effect for hero text
    if (document.getElementById('typed-text')) {
        const typed = new Typed('#typed-text', {
            strings: [
                'Certified Quality',
                'Best Prices',
                'ShopWise-Pro'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

function initializeFeaturedCarousel() {
    if (document.getElementById('featured-carousel')) {
        const splide = new Splide('#featured-carousel', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 3000,
            pauseOnHover: true,
            breakpoints: {
                1024: {
                    perPage: 2,
                },
                640: {
                    perPage: 1,
                }
            }
        });
        splide.mount();
    }
}

function initializeParticleBackground() {
    // Simple particle background for hero section
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            particlesContainer.appendChild(particle);
        }
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
                50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==================== PRODUCTS PAGE INITIALIZATION ====================

function initializeProductsPage() {
    loadProducts();
    initializeFilters();
    initializePriceRange();
}

function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    renderProducts(products);
    updateResultsCount();
}

function renderProducts(productsToRender) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '';
        document.getElementById('noResults').classList.remove('hidden');
        return;
    }
    
    document.getElementById('noResults').classList.add('hidden');
    
    const gridClass = currentView === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-6';
    productsGrid.className = gridClass;
    
    productsGrid.innerHTML = productsToRender.map(product => {
        if (currentView === 'grid') {
            return createProductCard(product);
        } else {
            return createProductListItem(product);
        }
    }).join('');
    
    // Add fade-in animation
    const cards = productsGrid.querySelectorAll('.product-card, .product-list-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function createProductCard(product) {
    const isInCompare = compareList.includes(product.id);
    return `
        <div class="product-card bg-white rounded-xl shadow-lg overflow-hidden relative fade-in">
            <div class="comparison-checkbox">
                <label class="flex items-center cursor-pointer">
                    <input type="checkbox" ${isInCompare ? 'checked' : ''} 
                           onchange="toggleCompare('${product.id}')"
                           class="rounded text-black focus:ring-black">
                    <span class="ml-1 text-xs text-gray-600">Compare</span>
                </label>
            </div>
            <div class="aspect-w-16 aspect-h-12 bg-gray-100">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            </div>
            <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">${product.brand}</span>
                    <span class="text-xs px-2 py-1 rounded-full ${product.condition === 'new' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}">${product.condition === 'new' ? 'Brand New' : 'Pre-Owned'}</span>
                </div>
                <h3 class="font-display text-xl font-semibold text-black mb-2">${product.name}</h3>
                <p class="text-gray-600 text-sm mb-4">${product.description}</p>
                <div class="flex items-center mb-4">
                    <div class="flex items-center">
                        ${generateStars(product.rating)}
                        <span class="ml-2 text-sm text-gray-600">(${product.rating})</span>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <span class="font-mono text-2xl font-bold text-black">$${product.price}</span>
                    <button onclick="addToCart('${product.id}')" 
                            class="btn-primary px-4 py-2 rounded-lg font-medium text-sm">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

function createProductListItem(product) {
    const isInCompare = compareList.includes(product.id);
    return `
        <div class="product-list-item bg-white rounded-xl shadow-lg p-6 flex items-center space-x-6 fade-in">
            <div class="flex-shrink-0">
                <img src="${product.image}" alt="${product.name}" class="w-24 h-24 object-cover rounded-lg">
            </div>
            <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">${product.brand}</span>
                    <span class="text-xs px-2 py-1 rounded-full ${product.condition === 'new' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}">${product.condition === 'new' ? 'Brand New' : 'Pre-Owned'}</span>
                </div>
                <h3 class="font-display text-xl font-semibold text-black mb-2">${product.name}</h3>
                <p class="text-gray-600 text-sm mb-3">${product.description}</p>
                <div class="flex items-center mb-3">
                    <div class="flex items-center">
                        ${generateStars(product.rating)}
                        <span class="ml-2 text-sm text-gray-600">(${product.rating})</span>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <span class="font-mono text-2xl font-bold text-black">$${product.price}</span>
                    <div class="flex items-center space-x-3">
                        <label class="flex items-center cursor-pointer">
                            <input type="checkbox" ${isInCompare ? 'checked' : ''} 
                                   onchange="toggleCompare('${product.id}')"
                                   class="rounded text-black focus:ring-black">
                            <span class="ml-2 text-sm text-gray-600">Compare</span>
                        </label>
                        <button onclick="addToCart('${product.id}')" 
                                class="btn-primary px-4 py-2 rounded-lg font-medium text-sm">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
    }
    
    if (hasHalfStar) {
        stars += '<svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0v15z"/></svg>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<svg class="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
    }
    
    return stars;
}

function initializeFilters() {
    // Add event listeners to all filter inputs
    const filterInputs = document.querySelectorAll('.category-filter, .brand-filter, .condition-filter');
    filterInputs.forEach(input => {
        input.addEventListener('change', filterProducts);
    });
}

function filterProducts() {
    const searchTerm = document.getElementById('productSearch')?.value.toLowerCase() || '';
    const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(cb => cb.value);
    const selectedBrands = Array.from(document.querySelectorAll('.brand-filter:checked')).map(cb => cb.value);
    const selectedConditions = Array.from(document.querySelectorAll('.condition-filter:checked')).map(cb => cb.value);
    const maxPrice = parseInt(document.getElementById('priceRange')?.value || 2000);
    const sortBy = document.getElementById('sortBy')?.value || 'featured';
    
    let filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            product.brand.toLowerCase().includes(searchTerm) ||
                            product.category.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm);
        
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(product.condition);
        const matchesPrice = product.price <= maxPrice;
        
        return matchesSearch && matchesCategory && matchesBrand && matchesCondition && matchesPrice;
    });
    
    // Sort products
    filteredProducts = sortProducts(filteredProducts, sortBy);
    
    renderProducts(filteredProducts);
    updateResultsCount(filteredProducts.length);
}

function sortProducts(productsToSort, sortBy) {
    switch (sortBy) {
        case 'price-low':
            return productsToSort.sort((a, b) => a.price - b.price);
        case 'price-high':
            return productsToSort.sort((a, b) => b.price - a.price);
        case 'newest':
            return productsToSort.sort((a, b) => b.id.localeCompare(a.id));
        case 'rating':
            return productsToSort.sort((a, b) => b.rating - a.rating);
        default:
            return productsToSort;
    }
}

function updateResultsCount(count = null) {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        const total = count !== null ? count : products.length;
        resultsCount.textContent = `Showing ${total} product${total !== 1 ? 's' : ''}`;
    }
}

function initializePriceRange() {
    const priceRange = document.getElementById('priceRange');
    const maxPriceDisplay = document.getElementById('maxPrice');
    
    if (priceRange && maxPriceDisplay) {
        priceRange.addEventListener('input', function() {
            maxPriceDisplay.textContent = `$${this.value}`;
        });
    }
}

function updatePriceRange() {
    const priceRange = document.getElementById('priceRange');
    const maxPriceDisplay = document.getElementById('maxPrice');
    
    if (priceRange && maxPriceDisplay) {
        maxPriceDisplay.textContent = `$${priceRange.value}`;
    }
}

function clearFilters() {
    // Clear all checkboxes
    document.querySelectorAll('.category-filter, .brand-filter, .condition-filter').forEach(cb => {
        cb.checked = false;
    });
    
    // Reset search
    const searchInput = document.getElementById('productSearch');
    if (searchInput) searchInput.value = '';
    
    // Reset price range
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.value = 2000;
        updatePriceRange();
    }
    
    // Reset sort
    const sortBy = document.getElementById('sortBy');
    if (sortBy) sortBy.value = 'featured';
    
    // Re-render all products
    filterProducts();
}

function toggleView(view) {
    currentView = view;
    
    // Update button states
    document.getElementById('gridView').classList.toggle('bg-gray-200', view === 'grid');
    document.getElementById('gridView').classList.toggle('text-black', view === 'grid');
    document.getElementById('gridView').classList.toggle('text-gray-500', view !== 'grid');
    
    document.getElementById('listView').classList.toggle('bg-gray-200', view === 'list');
    document.getElementById('listView').classList.toggle('text-black', view === 'list');
    document.getElementById('listView').classList.toggle('text-gray-500', view !== 'list');
    
    // Re-render products
    filterProducts();
}

// ==================== COMPARISON FUNCTIONALITY ====================

function toggleCompare(productId) {
    const index = compareList.indexOf(productId);
    
    if (index > -1) {
        compareList.splice(index, 1);
    } else {
        if (compareList.length < 4) {
            compareList.push(productId);
        } else {
            showNotification('Maximum 4 products can be compared', 'warning');
            return;
        }
    }
    
    updateCompareButton();
}

function updateCompareButton() {
    const compareButton = document.getElementById('compareButton');
    const compareCount = document.getElementById('compareCount');
    
    if (compareButton && compareCount) {
        compareCount.textContent = compareList.length;
        compareButton.disabled = compareList.length < 2;
    }
}

function openComparisonModal() {
    if (compareList.length < 2) return;
    
    const modal = document.getElementById('comparisonModal');
    const content = document.getElementById('comparisonContent');
    
    const compareProducts = products.filter(p => compareList.includes(p.id));
    
    content.innerHTML = generateComparisonTable(compareProducts);
    modal.classList.remove('hidden');
    
    // Animate modal appearance
    anime({
        targets: modal.querySelector('.bg-white'),
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutCubic'
    });
}

function closeComparisonModal() {
    const modal = document.getElementById('comparisonModal');
    modal.classList.add('hidden');
}

function generateComparisonTable(products) {
    if (products.length === 0) return '<p>No products to compare</p>';
    
    const features = ['Brand', 'Category', 'Price', 'Condition', 'Rating', 'Features'];
    
    return `
        <table class="w-full border-collapse">
            <thead>
                <tr class="bg-gray-50">
                    <th class="text-left p-4 font-semibold">Feature</th>
                    ${products.map(product => `<th class="text-center p-4 font-semibold">${product.name}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                <tr class="border-b">
                    <td class="p-4 font-medium">Image</td>
                    ${products.map(product => `
                        <td class="p-4 text-center">
                            <img src="${product.image}" alt="${product.name}" class="w-20 h-20 object-cover rounded-lg mx-auto">
                        </td>
                    `).join('')}
                </tr>
                <tr class="border-b">
                    <td class="p-4 font-medium">Brand</td>
                    ${products.map(product => `<td class="p-4 text-center capitalize">${product.brand}</td>`).join('')}
                </tr>
                <tr class="border-b">
                    <td class="p-4 font-medium">Category</td>
                    ${products.map(product => `<td class="p-4 text-center capitalize">${product.category}</td>`).join('')}
                </tr>
                <tr class="border-b">
                    <td class="p-4 font-medium">Price</td>
                    ${products.map(product => `<td class="p-4 text-center font-mono font-bold">$${product.price}</td>`).join('')}
                </tr>
                <tr class="border-b">
                    <td class="p-4 font-medium">Condition</td>
                    ${products.map(product => `<td class="p-4 text-center capitalize">${product.condition}</td>`).join('')}
                </tr>
                <tr class="border-b">
                    <td class="p-4 font-medium">Rating</td>
                    ${products.map(product => `<td class="p-4 text-center">${product.rating}/5</td>`).join('')}
                </tr>
                <tr>
                    <td class="p-4 font-medium">Features</td>
                    ${products.map(product => `
                        <td class="p-4 text-center">
                            <ul class="text-sm space-y-1">
                                ${product.features.map(feature => `<li>• ${feature}</li>`).join('')}
                            </ul>
                        </td>
                    `).join('')}
                </tr>
            </tbody>
        </table>
    `;
}

// ==================== ABOUT PAGE INITIALIZATION ====================

function initializeAboutPage() {
    // Additional animations specific to about page
    animateStats();
}

function animateStats() {
    const stats = document.querySelectorAll('.stats-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    scale: [0.8, 1],
                    opacity: [0, 1],
                    duration: 600,
                    delay: anime.stagger(200),
                    easing: 'easeOutCubic'
                });
                observer.unobserve(entry.target);
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
}

// ==================== CONTACT PAGE INITIALIZATION ====================

function initializeContactPage() {
    initializeContactForm();
    initializeFAQ();
}

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', submitContactForm);
    }
}

function submitContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Simulate form submission
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    setTimeout(() => {
        showSuccessModal();
        form.reset();
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }, 1500);
}

function initializeFAQ() {
    // FAQ functionality is handled by toggleFAQ function
}

function toggleFAQ(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    const currentItem = faqItems[index];
    const answer = currentItem.querySelector('.faq-answer');
    const icon = currentItem.querySelector('.faq-icon');
    
    // Close all other FAQs
    faqItems.forEach((item, i) => {
        if (i !== index) {
            const otherAnswer = item.querySelector('.faq-answer');
            const otherIcon = item.querySelector('.faq-icon');
            otherAnswer.classList.remove('active');
            otherIcon.classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    answer.classList.toggle('active');
    icon.classList.toggle('active');
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('hidden');
    
    // Animate modal appearance
    anime({
        targets: modal.querySelector('.bg-white'),
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutCubic'
    });
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('hidden');
}

// ==================== COMMON FUNCTIONALITY ====================

function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
}

function initializeSearch() {
    // Navigation search
    const navSearch = document.getElementById('navSearch');
    if (navSearch) {
        navSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                openSearchOverlay();
            }
        });
    }
    
    // Overlay search
    const overlaySearch = document.getElementById('overlaySearch');
    if (overlaySearch) {
        overlaySearch.addEventListener('input', debounce(searchProducts, 300));
    }
}

function searchProducts() {
    const query = document.getElementById('overlaySearch').value.toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    
    if (query.length < 2) {
        resultsContainer.innerHTML = '';
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    
    if (filteredProducts.length === 0) {
        resultsContainer.innerHTML = '<p class="text-gray-500 p-4">No products found</p>';
        return;
    }
    
    resultsContainer.innerHTML = filteredProducts.map(product => `
        <div class="p-3 hover:bg-gray-50 cursor-pointer border-b" onclick="selectSearchResult('${product.id}')">
            <div class="flex items-center space-x-3">
                <img src="${product.image}" alt="${product.name}" class="w-10 h-10 object-cover rounded">
                <div>
                    <p class="font-medium text-sm">${product.name}</p>
                    <p class="text-xs text-gray-500">$${product.price}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function selectSearchResult(productId) {
    closeSearchOverlay();
    // Navigate to products page with specific product highlighted
    if (getCurrentPage() !== 'products') {
        window.location.href = `products.html#${productId}`;
    } else {
        // Highlight the product on current page
        const productElement = document.querySelector(`[data-product-id="${productId}"]`);
        if (productElement) {
            productElement.scrollIntoView({ behavior: 'smooth' });
            productElement.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.3)';
            setTimeout(() => {
                productElement.style.boxShadow = '';
            }, 2000);
        }
    }
}

function openSearchOverlay() {
    const overlay = document.getElementById('searchOverlay');
    overlay.classList.remove('hidden');
    
    // Focus on search input
    setTimeout(() => {
        document.getElementById('overlaySearch').focus();
    }, 100);
    
    // Animate overlay appearance
    anime({
        targets: overlay,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutCubic'
    });
}

function closeSearchOverlay() {
    const overlay = document.getElementById('searchOverlay');
    
    anime({
        targets: overlay,
        opacity: [1, 0],
        duration: 300,
        easing: 'easeOutCubic',
        complete: () => {
            overlay.classList.add('hidden');
            document.getElementById('searchResults').innerHTML = '';
            document.getElementById('overlaySearch').value = '';
        }
    });
}

function initializeAuth() {
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', handleAuthSubmit);
    }
}

function handleAuthSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('email') || event.target.querySelector('input[type="email"]').value;
    const password = formData.get('password') || event.target.querySelector('input[type="password"]').value;
    
    if (currentAuthMode === 'register') {
        const name = formData.get('name') || event.target.querySelector('input[type="text"]').value;
        // Simulate registration
        user = { name, email };
        localStorage.setItem('shopwisepro_user', JSON.stringify(user));
        showNotification('Registration successful!', 'success');
    } else {
        // Simulate login
        user = { name: 'Demo User', email };
        localStorage.setItem('shopwisepro_user', JSON.stringify(user));
        showNotification('Login successful!', 'success');
    }
    
    closeAuthModal();
    updateUI();
}

function openAuthModal(mode = 'signin') {
    currentAuthMode = mode;
    const modal = document.getElementById('authModal');
    const title = document.getElementById('authTitle');
    const submitText = document.getElementById('authSubmitText');
    const switchText = document.getElementById('authSwitchText');
    const switchButton = document.getElementById('authSwitchButton');
    const nameField = document.getElementById('nameField');
    
    if (mode === 'register') {
        title.textContent = 'Register';
        submitText.textContent = 'Register';
        switchText.textContent = 'Already have an account?';
        switchButton.textContent = 'Sign In';
        nameField.classList.remove('hidden');
    } else {
        title.textContent = 'Sign In';
        submitText.textContent = 'Sign In';
        switchText.textContent = "Don't have an account?";
        switchButton.textContent = 'Register';
        nameField.classList.add('hidden');
    }
    
    modal.classList.remove('hidden');
    
    // Animate modal appearance
    anime({
        targets: modal.querySelector('.bg-white'),
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutCubic'
    });
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    
    anime({
        targets: modal.querySelector('.bg-white'),
        scale: [1, 0.8],
        opacity: [1, 0],
        duration: 300,
        easing: 'easeOutCubic',
        complete: () => {
            modal.classList.add('hidden');
            document.getElementById('authForm').reset();
        }
    });
}

function toggleAuthMode() {
    const newMode = currentAuthMode === 'signin' ? 'register' : 'signin';
    openAuthModal(newMode);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('shopwisepro_cart', JSON.stringify(cart));
    showCartNotification();
    updateCartCount();
}

function showCartNotification() {
    const notification = document.getElementById('cartNotification');
    if (!notification) return;
    
    notification.style.transform = 'translateX(0)';
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
    }, 3000);
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    // Update cart count in navigation if element exists
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
}

function updateUI() {
    // Update UI based on user authentication state
    const authButtons = document.querySelectorAll('.auth-buttons');
    const userMenu = document.getElementById('userMenu');
    
    if (user) {
        // User is logged in
        if (userMenu) userMenu.classList.remove('hidden');
        authButtons.forEach(btn => btn.classList.add('hidden'));
    } else {
        // User is logged out
        if (userMenu) userMenu.classList.add('hidden');
        authButtons.forEach(btn => btn.classList.remove('hidden'));
    }
    
    updateCartCount();
}

function scrollToFeatured() {
    const featuredSection = document.getElementById('featured');
    if (featuredSection) {
        featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'warning' ? 'bg-yellow-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-black text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Global event listeners
document.addEventListener('click', function(e) {
    // Close modals when clicking outside
    if (e.target.classList.contains('fixed') && e.target.classList.contains('inset-0')) {
        const modals = ['searchOverlay', 'authModal', 'comparisonModal', 'successModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal && !modal.classList.contains('hidden')) {
                if (modalId === 'searchOverlay') closeSearchOverlay();
                if (modalId === 'authModal') closeAuthModal();
                if (modalId === 'comparisonModal') closeComparisonModal();
                if (modalId === 'successModal') closeSuccessModal();
            }
        });
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC key closes modals
    if (e.key === 'Escape') {
        const modals = ['searchOverlay', 'authModal', 'comparisonModal', 'successModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal && !modal.classList.contains('hidden')) {
                if (modalId === 'searchOverlay') closeSearchOverlay();
                if (modalId === 'authModal') closeAuthModal();
                if (modalId === 'comparisonModal') closeComparisonModal();
                if (modalId === 'successModal') closeSuccessModal();
            }
        });
    }
    
    // Ctrl/Cmd + K opens search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchOverlay();
    }
});

// Export functions for global access
window.ShopWisePro = {
    // Navigation
    toggleMobileMenu,
    openSearchOverlay,
    closeSearchOverlay,
    
    // Authentication
    openAuthModal,
    closeAuthModal,
    toggleAuthMode,
    
    // Products
    filterProducts,
    clearFilters,
    toggleView,
    toggleCompare,
    openComparisonModal,
    closeComparisonModal,
    addToCart,
    
    // UI
    scrollToFeatured,
    toggleFAQ,
    submitContactForm,
    showSuccessModal,
    closeSuccessModal,
    
    // Utilities
    showNotification
};