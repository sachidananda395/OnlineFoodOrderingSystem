// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeBtns = document.querySelectorAll('.close');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cartItems');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
const checkoutBtn = document.getElementById('checkoutBtn');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');

// Sample menu data
const menuItems = [
    {
        id: 1,
        name: 'Margherita Pizza',
        category: 'pizza',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop',
        description: 'Classic pizza with tomato sauce, mozzarella, and basil'
    },
    {
        id: 2,
        name: 'Pepperoni Pizza',
        category: 'pizza',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop',
        description: 'Pizza topped with spicy pepperoni and mozzarella'
    },
    {
        id: 3,
        name: 'Chicken Burger',
        category: 'burger',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
        description: 'Juicy chicken patty with fresh vegetables and sauce'
    },
    {
        id: 4,
        name: 'Cheeseburger',
        category: 'burger',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=200&fit=crop',
        description: 'Classic beef patty with cheese, lettuce, and special sauce'
    },
    {
        id: 5,
        name: 'Chicken Biryani',
        category: 'biryani',
        price: 11.99,
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=200&fit=crop',
        description: 'Fragrant basmati rice cooked with chicken and aromatic spices'
    }
];

// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the home page
    if (document.querySelector('.popular-items')) {
        displayPopularItems();
    }

    // Check if we're on the menu page
    if (document.querySelector('.menu-grid')) {
        displayMenuItems(menuItems);
    }

    // Check if we're on the cart page
    if (document.querySelector('.cart')) {
        displayCartItems();
    }

    // Update cart count
    updateCartCount();

    // Add event listeners
    setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
    // Modal buttons
    if (loginBtn) loginBtn.addEventListener('click', () => showModal('login'));
    if (signupBtn) signupBtn.addEventListener('click', () => showModal('signup'));
    if (showSignup) showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        showModal('signup');
    });
    if (showLogin) showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        showModal('login');
    });

    // Close buttons
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === signupModal) signupModal.style.display = 'none';
    });

    // Forms
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (signupForm) signupForm.addEventListener('submit', handleSignup);

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredItems = menuItems.filter(item => 
                item.name.toLowerCase().includes(searchTerm) || 
                item.description.toLowerCase().includes(searchTerm)
            );
            displayMenuItems(filteredItems);
        });
    }

    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.dataset.category;
            if (category === 'all') {
                displayMenuItems(menuItems);
            } else {
                const filteredItems = menuItems.filter(item => item.category === category);
                displayMenuItems(filteredItems);
            }
        });
    });

    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }
}

// Show modal
function showModal(modalType) {
    if (modalType === 'login') {
        loginModal.style.display = 'flex';
        signupModal.style.display = 'none';
    } else if (modalType === 'signup') {
        signupModal.style.display = 'flex';
        loginModal.style.display = 'none';
    }
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // In a real app, you would validate credentials with a backend
    alert('Login successful!');
    loginModal.style.display = 'none';
    loginForm.reset();
    
    // Update UI to show user is logged in
    updateAuthUI(true);
}

// Handle signup form submission
function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // In a real app, you would send this data to a backend
    alert('Account created successfully! Please log in.');
    signupModal.style.display = 'none';
    signupForm.reset();
    showModal('login');
}

// Update UI when user is logged in
function updateAuthUI(isLoggedIn) {
    const authButtons = document.querySelector('.auth-buttons');
    if (isLoggedIn) {
        authButtons.innerHTML = `
            <button id="logoutBtn" class="btn btn-outline">Logout</button>
        `;
        document.getElementById('logoutBtn').addEventListener('click', () => {
            updateAuthUI(false);
        });
    } else {
        authButtons.innerHTML = `
            <button id="loginBtn" class="btn btn-outline">Login</button>
            <button id="signupBtn" class="btn btn-primary">Sign Up</button>
        `;
        // Re-attach event listeners
        document.getElementById('loginBtn').addEventListener('click', () => showModal('login'));
        document.getElementById('signupBtn').addEventListener('click', () => showModal('signup'));
    }
}

// Display popular items on the home page
function displayPopularItems() {
    const popularItemsContainer = document.getElementById('popularItems');
    if (!popularItemsContainer) return;
    
    // Get 4 random popular items
    const popularItems = [...menuItems].sort(() => 0.5 - Math.random()).slice(0, 4);
    
    let html = '';
    popularItems.forEach(item => {
        html += `
            <div class="menu-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-item-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="menu-item-footer">
                        <span class="price">$${item.price.toFixed(2)}</span>
                        <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    popularItemsContainer.innerHTML = html;
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Display menu items
function displayMenuItems(items) {
    const menuContainer = document.getElementById('menuItems');
    if (!menuContainer) return;
    
    if (items.length === 0) {
        menuContainer.innerHTML = '<p class="no-results">No items found. Try a different search term.</p>';
        return;
    }
    
    let html = '';
    items.forEach(item => {
        html += `
            <div class="menu-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-item-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="menu-item-footer">
                        <span class="price">$${item.price.toFixed(2)}</span>
                        <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    menuContainer.innerHTML = html;
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add item to cart
function addToCart(e) {
    const itemId = parseInt(e.target.dataset.id);
    const item = menuItems.find(item => item.id === itemId);
    
    if (!item) return;
    
    // Check if item is already in cart
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    // Save to localStorage
    saveCart();
    
    // Update UI
    updateCartCount();
    
    // If on cart page, update cart display
    if (document.querySelector('.cart')) {
        displayCartItems();
    }
    
    // Show success message
    showNotification(`${item.name} added to cart!`);
}

// Display cart items
function displayCartItems() {
    const cartContainer = document.getElementById('cartItems');
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added anything to your cart yet</p>
                <a href="menu.html" class="btn btn-primary">Browse Menu</a>
            </div>
        `;
        
        // Update summary
        updateCartSummary(0);
        checkoutBtn.disabled = true;
        return;
    }
    
    let html = '';
    cart.forEach(item => {
        html += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        <span class="remove-item" data-id="${item.id}">Remove</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartContainer.innerHTML = html;
    
    // Add event listeners
    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', updateQuantity);
    });
    
    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', updateQuantity);
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });
    
    // Update summary
    updateCartSummary(calculateTotal());
    checkoutBtn.disabled = false;
}

// Update item quantity
function updateQuantity(e) {
    const itemId = parseInt(e.target.dataset.id);
    const isPlus = e.target.classList.contains('plus');
    
    const item = cart.find(item => item.id === itemId);
    if (!item) return;
    
    if (isPlus) {
        item.quantity += 1;
    } else {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            // If quantity would be 0, remove the item
            cart = cart.filter(cartItem => cartItem.id !== itemId);
        }
    }
    
    // Save to localStorage
    saveCart();
    
    // Update UI
    updateCartCount();
    displayCartItems();
}

// Remove item from cart
function removeItem(e) {
    const itemId = parseInt(e.target.dataset.id);
    cart = cart.filter(item => item.id !== itemId);
    
    // Save to localStorage
    saveCart();
    
    // Update UI
    updateCartCount();
    displayCartItems();
    
    // Show notification
    showNotification('Item removed from cart');
}

// Calculate cart total
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update cart summary
function updateCartSummary(subtotal) {
    const deliveryFee = 2.99;
    const total = subtotal + deliveryFee;
    
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Update cart count in header
function updateCartCount() {
    if (!cartCount) return;
    
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? 'flex' : 'none';
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Add show class
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Filter menu by category
function filterMenu(category) {
    if (category === 'all') {
        displayMenuItems(menuItems);
        return;
    }
    
    const filteredItems = menuItems.filter(item => {
        return item.category === category;
    });
    
    displayMenuItems(filteredItems);
}