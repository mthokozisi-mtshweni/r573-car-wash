/* ============================================================
   R573 — MAIN SCRIPT
   ============================================================ */

document.addEventListener("DOMContentLoaded", function() {

    /* ==========================================================
       NAVBAR SCROLL
    ========================================================== */
    window.addEventListener("scroll", function() {
        const navbar = document.querySelector(".navbar");
        if (navbar) {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
        }
    });

    /* ==========================================================
       SCROLL REVEAL
    ========================================================== */
    document.querySelectorAll(".reveal").forEach(function(element) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible", "active");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        observer.observe(element);
    });

    /* ==========================================================
       QUEUE SYSTEM
    ========================================================== */
    const join = document.querySelector("#joinQueueBtn");
    const position = document.querySelector("#queuePosition");
    const wait = document.querySelector("#waitTime");
    const success = document.querySelector("#queueSuccess");
    let number = null;

    if (join) {
        join.addEventListener("click", function() {
            number = "#0" + (24 + Math.floor(Math.random() * 6));
            if (position) position.textContent = number;
            if (wait) wait.textContent = "5–10 min";
            if (success) success.hidden = false;
            join.textContent = "Queue joined ✓";
            join.disabled = true;
        });
    }

    const check = document.querySelector("#checkPositionBtn");
    if (check) {
        check.addEventListener("click", function() {
            alert(number 
                ? "You are currently " + number + ". Estimated wait: 5–10 minutes." 
                : "Join the live queue first."
            );
        });
    }

    /* ==========================================================
       NAVIGATION BUTTONS
    ========================================================== */
    const eventButton = document.querySelector("#eventsBtn");
    if (eventButton) {
        eventButton.addEventListener("click", function() {
            window.location.href = "events.html";
        });
    }

    const clubButton = document.querySelector("#clubBtn");
    if (clubButton) {
        clubButton.addEventListener("click", function() {
            window.location.href = "club.html";
        });
    }

    /* ==========================================================
       TOAST FUNCTION
    ========================================================== */
    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.classList.add('show');
            clearTimeout(toast._timer);
            toast._timer = setTimeout(function() {
                toast.classList.remove('show');
            }, 3500);
        } else {
            alert(message);
        }
    }

    /* ==========================================================
       MENU DATA
    ========================================================== */
    const menuData = {
        shisanyama: [
            { name: 'Beef Short Ribs', price: 'R185', desc: 'Fire-grilled beef ribs with our signature R573 seasoning.' },
            { name: 'Boerewors', price: 'R95', desc: 'Traditional South African boerewors grilled over the fire.' },
            { name: 'Grilled Chicken', price: 'R120', desc: 'Juicy flame-grilled chicken served with your choice of side.' },
            { name: 'Beef Steak', price: 'R175', desc: 'Tender steak grilled to your preference.' }
        ],
        drinks: [
            { name: 'R573 Cooler', price: 'R55', desc: 'Our refreshing signature cooler.' },
            { name: 'Soft Drinks', price: 'R25', desc: 'A selection of chilled soft drinks.' },
            { name: 'Fresh Juice', price: 'R40', desc: 'Freshly prepared fruit juice.' },
            { name: 'Water', price: 'R20', desc: 'Ice cold bottled water.' }
        ],
        sides: [
            { name: 'Pap & Sheba', price: 'R30', desc: 'Traditional South African staple.' },
            { name: 'Garlic Bread', price: 'R25', desc: 'Freshly baked with garlic butter.' },
            { name: 'Green Salad', price: 'R35', desc: 'Fresh garden salad with dressing.' },
            { name: 'Chips', price: 'R20', desc: 'Golden crispy fries.' }
        ],
        specials: [
            { name: '🔥 R573 Feast Platter', price: 'R250', desc: 'A generous platter of ribs, boerewors, steak and sides for two.' },
            { name: '🔥 Burger & Chips Combo', price: 'R85', desc: 'Juicy beef burger with cheese, served with golden chips.' },
            { name: '🔥 Family Braai Pack', price: 'R350', desc: 'Perfect for sharing - serves 4 people with all the fixings.' },
            { name: '🔥 R573 Premium Platter', price: 'R180', desc: 'Premium cuts of meat with gourmet sides and sauces.' }
        ]
    };

    /* ==========================================================
       RENDER MENU
    ========================================================== */
    const menuGrid = document.getElementById('menuGrid');
    const menuTabs = document.querySelectorAll('.menu-tab');

    function renderMenu(category) {
        const items = menuData[category] || [];
        if (!menuGrid) return;

        menuGrid.innerHTML = '';

        if (items.length === 0) {
            menuGrid.innerHTML = `
                <div class="menu-empty" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--muted);">
                    <p>No items available in this category.</p>
                </div>
            `;
            return;
        }

        items.forEach(function(item, index) {
            const div = document.createElement('div');
            div.className = 'menu-item';
            div.style.animationDelay = (index * 0.08) + 's';
            div.innerHTML = `
                <div class="menu-item-top">
                    <h4>${item.name}</h4>
                    <span class="menu-price">${item.price}</span>
                </div>
                <p>${item.desc}</p>
                <div class="stars">★★★★★</div>
            `;
            menuGrid.appendChild(div);
        });
    }

    /* ==========================================================
       MENU TAB SWITCHING
    ========================================================== */
    if (menuTabs.length > 0) {
        menuTabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                menuTabs.forEach(function(t) {
                    t.classList.remove('active');
                });
                tab.classList.add('active');
                renderMenu(tab.dataset.category);
            });
        });
    }

    /* ==========================================================
       ORDER FOOD BUTTON
    ========================================================== */
    const orderFoodBtn = document.getElementById('orderFoodBtn');
    if (orderFoodBtn) {
        orderFoodBtn.addEventListener('click', function() {
            showToast('🍔 Food ordering system will open here. Stay tuned!');
            
            // Button animation
            this.style.transform = 'scale(0.95)';
            setTimeout(function(btn) {
                btn.style.transform = 'scale(1)';
            }, 200, this);
        });
    }

    /* ==========================================================
       INITIAL MENU RENDER
    ========================================================== */
    renderMenu('shisanyama');

});


/* ============================================================
   GOOGLE MAPS LOADER
   ============================================================ */

function loadMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Coordinates for TweeFontein, KwaMhlanga
    const latitude = -25.4500;
    const longitude = 28.8000;

    // Check if map is already loaded
    if (mapContainer.querySelector('iframe')) return;

    // Hide loading indicator
    const loading = mapContainer.querySelector('.map-loading');
    
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${latitude},${longitude}&zoom=15&maptype=roadmap`;
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.title = 'R573 Car Wash & Shisanyama Location';
    
    // When iframe loads, hide loading
    iframe.addEventListener('load', function() {
        if (loading) loading.classList.add('hidden');
    });

    // If iframe doesn't load within 5 seconds, hide loading anyway
    setTimeout(function() {
        if (loading) loading.classList.add('hidden');
    }, 5000);

    mapContainer.appendChild(iframe);
}

/* ============================================================
   INITIALIZE MAP ON SCROLL REVEAL
   ============================================================ */

// Load map when location section comes into view
document.addEventListener('DOMContentLoaded', function() {
    const locationSection = document.getElementById('location');
    if (!locationSection) return;

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                loadMap();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(locationSection);
});


/* ============================================================
   CAR WASH BOOKING & QUEUE SYSTEM
   ============================================================ */

document.addEventListener("DOMContentLoaded", function() {

    /* ==========================================================
       CAR WASH BOOKING
    ========================================================== */
    const bookBtn = document.querySelector("#joinQueueBtn");
    const positionDisplay = document.querySelector("#queuePosition");
    const waitDisplay = document.querySelector("#waitTime");
    const nowServingDisplay = document.querySelector("#nowServingDisplay");
    const successMessage = document.querySelector("#queueSuccess");
    let bookingNumber = null;

    if (bookBtn) {
        bookBtn.addEventListener("click", function() {
            // Generate booking number
            bookingNumber = "#" + (24 + Math.floor(Math.random() * 6));
            
            // Update display
            if (positionDisplay) positionDisplay.textContent = bookingNumber;
            if (waitDisplay) waitDisplay.textContent = "5–10 min";
            if (successMessage) successMessage.hidden = false;
            
            // Update button state
            bookBtn.textContent = "✓ Booked!";
            bookBtn.disabled = true;
            bookBtn.style.opacity = "0.7";
            
            // Show toast notification
            if (typeof showToast === 'function') {
                showToast('🚗 Your car wash is booked! You are ' + bookingNumber + ' in the queue.');
            }
        });
    }

    /* ==========================================================
       CHECK POSITION
    ========================================================== */
    const checkBtn = document.querySelector("#checkPositionBtn");
    if (checkBtn) {
        checkBtn.addEventListener("click", function() {
            if (bookingNumber) {
                if (typeof showToast === 'function') {
                    showToast('🚗 You are currently ' + bookingNumber + '. Estimated wait: 5–10 minutes.');
                } else {
                    alert('You are currently ' + bookingNumber + '. Estimated wait: 5–10 minutes.');
                }
            } else {
                if (typeof showToast === 'function') {
                    showToast('📋 Please book your car wash first.');
                } else {
                    alert('Please book your car wash first.');
                }
            }
        });
    }

});









/* ============================================================
   CAR WASH BOOKING & REWARD SYSTEM
   ============================================================ */

document.addEventListener("DOMContentLoaded", function() {

    /* ==========================================================
       BOOKING & REWARD SYSTEM
    ========================================================== */
    const bookBtn = document.querySelector("#joinQueueBtn");
    const positionDisplay = document.querySelector("#queuePosition");
    const waitDisplay = document.querySelector("#waitTime");
    const successMessage = document.querySelector("#queueSuccess");
    let bookingNumber = null;

    // Reward Card Elements
    const pointsDisplay = document.querySelector("#currentPoints");
    const usedPointsDisplay = document.querySelector("#usedPoints");
    const expiryDisplay = document.querySelector("#pointsExpiry");

    // State
    let currentPoints = 1250;
    let usedPoints = 320;
    let pointsEarnedThisSession = 0;

    function updateRewardCard() {
        if (pointsDisplay) pointsDisplay.textContent = currentPoints.toLocaleString();
        if (usedPointsDisplay) usedPointsDisplay.textContent = usedPoints.toLocaleString();
        if (expiryDisplay) {
            // Set expiry to 1 year from now
            const expiry = new Date();
            expiry.setFullYear(expiry.getFullYear() + 1);
            expiryDisplay.textContent = expiry.toLocaleDateString('en-ZA', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
            });
        }
    }

    /* ==========================================================
       BOOK A WASH
    ========================================================== */
    if (bookBtn) {
        bookBtn.addEventListener("click", function() {
            // Generate booking number
            bookingNumber = "#" + (24 + Math.floor(Math.random() * 6));
            
            // Update display
            if (positionDisplay) positionDisplay.textContent = bookingNumber;
            if (waitDisplay) waitDisplay.textContent = "5–10 min";
            
            // Add points for booking
            const pointsEarned = 50;
            currentPoints += pointsEarned;
            pointsEarnedThisSession += pointsEarned;
            
            // Update reward card
            updateRewardCard();
            
            // Show success message
            if (successMessage) {
                successMessage.hidden = false;
                successMessage.innerHTML = `✓ You've booked your wash! You earned <strong>+${pointsEarned} points</strong>!`;
            }
            
            // Update button state
            bookBtn.textContent = "✓ Booked!";
            bookBtn.disabled = true;
            bookBtn.style.opacity = "0.7";
            
            // Show toast notification
            if (typeof showToast === 'function') {
                showToast(`🚗 Your car wash is booked! You earned +${pointsEarned} points!`);
            }
        });
    }

    /* ==========================================================
       REGISTER REWARD CARD
    ========================================================== */
    const registerBtn = document.querySelector("#checkPositionBtn");
    if (registerBtn) {
        registerBtn.addEventListener("click", function() {
            if (typeof showToast === 'function') {
                showToast('⭐ Your R573 Reward Card has been registered!');
            } else {
                alert('⭐ Your R573 Reward Card has been registered!');
            }
            
            // Button animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Update button text
            this.textContent = '✓ Registered!';
            this.style.opacity = '0.7';
            this.disabled = true;
        });
    }

    /* ==========================================================
       INITIAL RENDER
    ========================================================== */
    updateRewardCard();

});











/* ============================================================
   R573 — MAIN SCRIPT
   ============================================================ */

document.addEventListener("DOMContentLoaded", function() {

    /* ==========================================================
       PAGE LOADER
    ========================================================== */
    const pageLoader = document.getElementById('pageLoader');
    
    // Prevent scrolling while loader is visible
    document.body.style.overflow = 'hidden';
    
    // Hide loader after everything loads
    window.addEventListener('load', function() {
        // Wait for the line animation to complete (1.8s + delay)
        setTimeout(function() {
            pageLoader.classList.add('loaded');
            document.body.style.overflow = '';
        }, 2800);
    });

    /* ==========================================================
       NAVBAR SCROLL
    ========================================================== */
    window.addEventListener("scroll", function() {
        const navbar = document.querySelector(".navbar");
        if (navbar) {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
        }
    });

    /* ==========================================================
       SCROLL REVEAL
    ========================================================== */
    document.querySelectorAll(".reveal").forEach(function(element) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible", "active");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        observer.observe(element);
    });

    /* ==========================================================
       TOAST FUNCTION
    ========================================================== */
    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.classList.add('show');
            clearTimeout(toast._timer);
            toast._timer = setTimeout(function() {
                toast.classList.remove('show');
            }, 3500);
        } else {
            alert(message);
        }
    }

    /* ==========================================================
       QUEUE SYSTEM
    ========================================================== */
    const join = document.querySelector("#joinQueueBtn");
    const position = document.querySelector("#queuePosition");
    const wait = document.querySelector("#waitTime");
    const success = document.querySelector("#queueSuccess");
    let number = null;

    if (join) {
        join.addEventListener("click", function() {
            number = "#0" + (24 + Math.floor(Math.random() * 6));
            if (position) position.textContent = number;
            if (wait) wait.textContent = "5–10 min";
            if (success) success.hidden = false;
            join.textContent = "Queue joined ✓";
            join.disabled = true;
        });
    }

    const check = document.querySelector("#checkPositionBtn");
    if (check) {
        check.addEventListener("click", function() {
            alert(number 
                ? "You are currently " + number + ". Estimated wait: 5–10 minutes." 
                : "Join the live queue first."
            );
        });
    }

    /* ==========================================================
       NAVIGATION BUTTONS
    ========================================================== */
    const eventButton = document.querySelector("#eventsBtn");
    if (eventButton) {
        eventButton.addEventListener("click", function() {
            window.location.href = "events.html";
        });
    }

    const clubButton = document.querySelector("#clubBtn");
    if (clubButton) {
        clubButton.addEventListener("click", function() {
            window.location.href = "club.html";
        });
    }

    /* ==========================================================
       MENU DATA
    ========================================================== */
    const menuData = {
        shisanyama: [
            { name: 'Beef Short Ribs', price: 'R185', desc: 'Fire-grilled beef ribs with our signature R573 seasoning.' },
            { name: 'Boerewors', price: 'R95', desc: 'Traditional South African boerewors grilled over the fire.' },
            { name: 'Grilled Chicken', price: 'R120', desc: 'Juicy flame-grilled chicken served with your choice of side.' },
            { name: 'Beef Steak', price: 'R175', desc: 'Tender steak grilled to your preference.' }
        ],
        drinks: [
            { name: 'R573 Cooler', price: 'R55', desc: 'Our refreshing signature cooler.' },
            { name: 'Soft Drinks', price: 'R25', desc: 'A selection of chilled soft drinks.' },
            { name: 'Fresh Juice', price: 'R40', desc: 'Freshly prepared fruit juice.' },
            { name: 'Water', price: 'R20', desc: 'Ice cold bottled water.' }
        ],
        sides: [
            { name: 'Pap & Sheba', price: 'R30', desc: 'Traditional South African staple.' },
            { name: 'Garlic Bread', price: 'R25', desc: 'Freshly baked with garlic butter.' },
            { name: 'Green Salad', price: 'R35', desc: 'Fresh garden salad with dressing.' },
            { name: 'Chips', price: 'R20', desc: 'Golden crispy fries.' }
        ],
        specials: [
            { name: '🔥 R573 Feast Platter', price: 'R250', desc: 'A generous platter of ribs, boerewors, steak and sides for two.' },
            { name: '🔥 Burger & Chips Combo', price: 'R85', desc: 'Juicy beef burger with cheese, served with golden chips.' },
            { name: '🔥 Family Braai Pack', price: 'R350', desc: 'Perfect for sharing - serves 4 people with all the fixings.' },
            { name: '🔥 R573 Premium Platter', price: 'R180', desc: 'Premium cuts of meat with gourmet sides and sauces.' }
        ]
    };

    /* ==========================================================
       RENDER MENU
    ========================================================== */
    const menuGrid = document.getElementById('menuGrid');
    const menuTabs = document.querySelectorAll('.menu-tab');

    function renderMenu(category) {
        const items = menuData[category] || [];
        if (!menuGrid) return;

        menuGrid.innerHTML = '';

        if (items.length === 0) {
            menuGrid.innerHTML = `
                <div class="menu-empty" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--muted);">
                    <p>No items available in this category.</p>
                </div>
            `;
            return;
        }

        items.forEach(function(item, index) {
            const div = document.createElement('div');
            div.className = 'menu-item';
            div.style.animationDelay = (index * 0.08) + 's';
            div.innerHTML = `
                <div class="menu-item-top">
                    <h4>${item.name}</h4>
                    <span class="menu-price">${item.price}</span>
                </div>
                <p>${item.desc}</p>
                <div class="stars">★★★★★</div>
            `;
            menuGrid.appendChild(div);
        });
    }

    /* ==========================================================
       MENU TAB SWITCHING
    ========================================================== */
    if (menuTabs.length > 0) {
        menuTabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                menuTabs.forEach(function(t) {
                    t.classList.remove('active');
                });
                tab.classList.add('active');
                renderMenu(tab.dataset.category);
            });
        });
    }

    /* ==========================================================
       ORDER FOOD BUTTON
    ========================================================== */
    const orderFoodBtn = document.getElementById('orderFoodBtn');
    if (orderFoodBtn) {
        orderFoodBtn.addEventListener('click', function() {
            showToast('🍔 Food ordering system will open here. Stay tuned!');
            
            // Button animation
            this.style.transform = 'scale(0.95)';
            setTimeout(function(btn) {
                btn.style.transform = 'scale(1)';
            }, 200, this);
        });
    }

    /* ==========================================================
       INITIAL MENU RENDER
    ========================================================== */
    renderMenu('shisanyama');

});


/* ============================================================
   GOOGLE MAPS LOADER
   ============================================================ */

function loadMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    const latitude = -25.4500;
    const longitude = 28.8000;

    if (mapContainer.querySelector('iframe')) return;

    const loading = mapContainer.querySelector('.map-loading');
    
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${latitude},${longitude}&zoom=15&maptype=roadmap`;
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.title = 'R573 Car Wash & Shisanyama Location';
    
    iframe.addEventListener('load', function() {
        if (loading) loading.classList.add('hidden');
    });

    setTimeout(function() {
        if (loading) loading.classList.add('hidden');
    }, 5000);

    mapContainer.appendChild(iframe);
}

document.addEventListener('DOMContentLoaded', function() {
    const locationSection = document.getElementById('location');
    if (!locationSection) return;

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                loadMap();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(locationSection);
});


/* ============================================================
   CAR WASH BOOKING & REWARD SYSTEM
   ============================================================ */

document.addEventListener("DOMContentLoaded", function() {

    const bookBtn = document.querySelector("#joinQueueBtn");
    const positionDisplay = document.querySelector("#queuePosition");
    const waitDisplay = document.querySelector("#waitTime");
    const successMessage = document.querySelector("#queueSuccess");
    let bookingNumber = null;

    const pointsDisplay = document.querySelector("#currentPoints");
    const usedPointsDisplay = document.querySelector("#usedPoints");
    const expiryDisplay = document.querySelector("#pointsExpiry");

    let currentPoints = 1250;
    let usedPoints = 320;

    function updateRewardCard() {
        if (pointsDisplay) pointsDisplay.textContent = currentPoints.toLocaleString();
        if (usedPointsDisplay) usedPointsDisplay.textContent = usedPoints.toLocaleString();
        if (expiryDisplay) {
            const expiry = new Date();
            expiry.setFullYear(expiry.getFullYear() + 1);
            expiryDisplay.textContent = expiry.toLocaleDateString('en-ZA', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
            });
        }
    }

    if (bookBtn) {
        bookBtn.addEventListener("click", function() {
            bookingNumber = "#" + (24 + Math.floor(Math.random() * 6));
            
            if (positionDisplay) positionDisplay.textContent = bookingNumber;
            if (waitDisplay) waitDisplay.textContent = "5–10 min";
            
            const pointsEarned = 50;
            currentPoints += pointsEarned;
            
            updateRewardCard();
            
            if (successMessage) {
                successMessage.hidden = false;
                successMessage.innerHTML = `✓ You've booked your wash! You earned <strong>+${pointsEarned} points</strong>!`;
            }
            
            bookBtn.textContent = "✓ Booked!";
            bookBtn.disabled = true;
            bookBtn.style.opacity = "0.7";
            
            if (typeof showToast === 'function') {
                showToast(`🚗 Your car wash is booked! You earned +${pointsEarned} points!`);
            }
        });
    }

    const registerBtn = document.querySelector("#checkPositionBtn");
    if (registerBtn) {
        registerBtn.addEventListener("click", function() {
            if (typeof showToast === 'function') {
                showToast('⭐ Your R573 Reward Card has been registered!');
            } else {
                alert('⭐ Your R573 Reward Card has been registered!');
            }
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            this.textContent = '✓ Registered!';
            this.style.opacity = '0.7';
            this.disabled = true;
        });
    }

    updateRewardCard();

});