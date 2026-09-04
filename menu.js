// ============================================================
// R573 MENU SECTION - JAVASCRIPT
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // MENU DATA
    // ============================================================
    const menuData = {
        Shisanyama: [
            { name: 'Beef Steak', price: 'R85', desc: 'Grilled to perfection with special seasoning.' },
            { name: 'Chicken Braai', price: 'R65', desc: 'Juicy chicken pieces with homemade sauce.' },
            { name: 'Pork Chops', price: 'R75', desc: 'Tender pork chops with BBQ glaze.' },
            { name: 'Boerewors Roll', price: 'R45', desc: 'Traditional South African sausage roll.' },
            { name: 'Lamb Chops', price: 'R95', desc: 'Flame-grilled lamb chops with herb butter.' },
            { name: 'Spicy Wings', price: 'R55', desc: 'Crispy wings with a spicy peri-peri glaze.' },
        ],
        Sides: [
            { name: 'Pap & Sheba', price: 'R30', desc: 'Traditional South African staple with tomato relish.' },
            { name: 'Garlic Bread', price: 'R25', desc: 'Freshly baked with garlic butter and herbs.' },
            { name: 'Green Salad', price: 'R35', desc: 'Fresh garden salad with house dressing.' },
            { name: 'Chips', price: 'R20', desc: 'Golden crispy fries, salted to perfection.' },
            { name: 'Coleslaw', price: 'R18', desc: 'Creamy coleslaw with a fresh, crunchy bite.' },
            { name: 'Mielie Pap', price: 'R22', desc: 'Smooth mielie pap served with savoury sauce.' },
        ],
        Drinks: [
            { name: 'Craft Beer', price: 'R35', desc: 'Local brews on tap, served ice cold.' },
            { name: 'House Wine', price: 'R45', desc: 'Red or white, by the glass.' },
            { name: 'Cocktails', price: 'R55', desc: 'Signature R573 cocktails.' },
            { name: 'Soft Drinks', price: 'R20', desc: 'Cold refreshments, choice of cola or sprite.' },
            { name: 'Fresh Juice', price: 'R25', desc: 'Seasonal fruit juice, freshly squeezed.' },
            { name: 'Lemonade', price: 'R22', desc: 'Freshly squeezed lemonade with mint.' },
        ]
    };

    // ============================================================
    // DOM REFS
    // ============================================================
    const grid = document.getElementById('menuGrid');
    const tabs = document.querySelectorAll('.menu-tab');

    // ============================================================
    // RENDER FUNCTION
    // ============================================================
    function renderMenu(category) {
        const items = menuData[category] || [];
        if (items.length === 0) {
            grid.innerHTML =
                `<div style="grid-column:1/-1;text-align:center;padding:40px 0;color:#666;">No items in this category.</div>`;
            return;
        }

        let html = '';
        items.forEach((item, index) => {
            const delay = (index + 1) * 0.08;
            html += `
                <div class="menu-item" style="animation-delay: ${delay}s">
                    <div class="menu-item-top">
                        <h4>${item.name}</h4>
                        <span class="price">${item.price}</span>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p>${item.desc}</p>
                    <button class="button add-to-cart" data-name="${item.name}" data-price="${item.price}">
                        Add to order
                    </button>
                </div>
            `;
        });

        grid.innerHTML = html;

        // Trigger animation after render
        requestAnimationFrame(() => {
            document.querySelectorAll('.menu-item').forEach(el => {
                el.classList.add('visible');
            });
        });

        // Attach add-to-cart events
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const name = this.dataset.name;
                const price = this.dataset.price;
                showToast(`✔ ${name} added to cart (demo)`);
            });
        });
    }

    // ============================================================
    // TAB SWITCHING
    // ============================================================
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const category = this.dataset.tab;
            renderMenu(category);
        });
    });

    // ============================================================
    // TOAST NOTIFICATION
    // ============================================================
    function showToast(message) {
        // Remove existing toast if any
        const existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);

        // Trigger show
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto hide after 2.5s
        setTimeout(() => {
            toast.classList.remove('show');
            toast.classList.add('hide');
            setTimeout(() => toast.remove(), 400);
        }, 2500);
    }

    // ============================================================
    // INIT
    // ============================================================
    renderMenu('Shisanyama');

})();


// ============================================================
// R573 MENU SECTION - JAVASCRIPT
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // MENU DATA
    // ============================================================
    const menuData = {
        Shisanyama: [
            { name: 'Beef Steak', price: 'R85', desc: 'Grilled to perfection with special house seasoning and herb butter.' },
            { name: 'Chicken Braai', price: 'R65', desc: 'Juicy free-range chicken pieces with homemade peri-peri sauce.' },
            { name: 'Pork Chops', price: 'R75', desc: 'Tender pork chops with a sticky BBQ glaze and caramelised onions.' },
            { name: 'Boerewors Roll', price: 'R45', desc: 'Traditional South African sausage roll with secret spice blend.' },
            { name: 'Lamb Chops', price: 'R95', desc: 'Flame-grilled lamb chops with rosemary and garlic butter.' },
            { name: 'Spicy Wings', price: 'R55', desc: 'Crispy chicken wings with a fiery peri-peri glaze.' },
        ],
        Sides: [
            { name: 'Pap & Sheba', price: 'R30', desc: 'Traditional South African staple with spicy tomato relish.' },
            { name: 'Garlic Bread', price: 'R25', desc: 'Freshly baked ciabatta with garlic butter and herbs.' },
            { name: 'Green Salad', price: 'R35', desc: 'Fresh garden salad with house vinaigrette dressing.' },
            { name: 'Chips', price: 'R20', desc: 'Golden crispy fries, salted to perfection.' },
            { name: 'Coleslaw', price: 'R18', desc: 'Creamy coleslaw with a fresh, crunchy bite.' },
            { name: 'Mielie Pap', price: 'R22', desc: 'Smooth mielie pap served with a savoury sauce.' },
        ],
        Drinks: [
            { name: 'Craft Beer', price: 'R35', desc: 'Local craft brews on tap, served ice cold.' },
            { name: 'House Wine', price: 'R45', desc: 'Premium red or white wine, served by the glass.' },
            { name: 'Cocktails', price: 'R55', desc: 'Signature R573 cocktails made with fresh ingredients.' },
            { name: 'Soft Drinks', price: 'R20', desc: 'Choice of cola, sprite or fanta, served with ice.' },
            { name: 'Fresh Juice', price: 'R25', desc: 'Seasonal fruit juice, freshly squeezed to order.' },
            { name: 'Lemonade', price: 'R22', desc: 'Freshly squeezed lemonade with mint and a touch of honey.' },
        ]
    };

    // ============================================================
    // DOM REFS
    // ============================================================
    const grid = document.getElementById('menuGrid');
    const tabs = document.querySelectorAll('.menu-tab');

    // ============================================================
    // TOAST FUNCTION
    // ============================================================
    function showToast(message) {
        // Remove existing toast
        const existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);

        // Show with animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto hide after 2.5s
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 2500);
    }

    // ============================================================
    // RENDER FUNCTION
    // ============================================================
    function renderMenu(category) {
        const items = menuData[category] || [];
        if (items.length === 0) {
            grid.innerHTML =
                `<div style="grid-column:1/-1;text-align:center;padding:40px 0;color:#666;">No items in this category.</div>`;
            return;
        }

        let html = '';
        items.forEach((item, index) => {
            const delay = (index + 1) * 0.08;
            html += `
                <div class="menu-item" style="animation-delay: ${delay}s">
                    <div class="menu-item-top">
                        <h4>${item.name}</h4>
                        <span class="price">${item.price}</span>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p>${item.desc}</p>
                    <button class="button button-primary button-small add-to-cart" 
                            data-name="${item.name}" data-price="${item.price}">
                        Add to order
                        <span>→</span>
                    </button>
                </div>
            `;
        });

        grid.innerHTML = html;

        // Trigger animation
        requestAnimationFrame(() => {
            document.querySelectorAll('.menu-item').forEach(el => {
                el.classList.add('visible');
            });
        });

        // Attach add-to-cart events
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const name = this.dataset.name;
                showToast(`✔ ${name} added to cart`);
            });
        });
    }

    // ============================================================
    // TAB SWITCHING
    // ============================================================
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const category = this.dataset.tab;
            renderMenu(category);
        });
    });

    // ============================================================
    // INIT
    // ============================================================
    renderMenu('Shisanyama');

})();