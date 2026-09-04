/* ============================
   TICKETS JAVASCRIPT
   ============================ */

   // Make sure showToast exists
if (typeof showToast === 'undefined') {
    window.showToast = function(message) {
        alert(message);
    };
}

document.addEventListener('DOMContentLoaded', function() {

    // ============================
    // EVENT DATA
    // ============================
    const eventsData = [
        {
            id: 1,
            title: 'R573 Saturdays',
            category: 'music',
            categoryLabel: '🎵 Music',
            date: '27 September 2026',
            time: '18:00 - 02:00',
            venue: 'R573 Venue, TweeFontein',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
            description: 'The ultimate Saturday experience. Live DJs, great food, cold drinks and the best car culture vibe in town.',
            ticketTypes: [
                { name: 'General Admission', price: 150, available: 200, benefits: 'Standard entry, access to all areas' },
                { name: 'VIP', price: 350, available: 50, benefits: 'VIP lounge, premium seating, complimentary drinks' },
                { name: 'Early Bird', price: 100, available: 100, benefits: 'Limited early bird special' }
            ]
        },
        {
            id: 2,
            title: 'Car Culture Showdown',
            category: 'car',
            categoryLabel: '🚗 Car Culture',
            date: '10 October 2026',
            time: '10:00 - 18:00',
            venue: 'R573 Venue, TweeFontein',
            image: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=800&q=80',
            description: 'Show off your ride or come see the best cars in town. Trophies, prizes and bragging rights.',
            ticketTypes: [
                { name: 'Spectator', price: 80, available: 300, benefits: 'Entry to event' },
                { name: 'Car Entry', price: 150, available: 100, benefits: 'Show your car, entry for 2 people' },
                { name: 'VIP', price: 250, available: 30, benefits: 'VIP viewing area, food voucher' }
            ]
        },
        {
            id: 3,
            title: 'Shisanyama Food Fest',
            category: 'food',
            categoryLabel: '🍔 Food',
            date: '24 October 2026',
            time: '12:00 - 22:00',
            venue: 'R573 Venue, TweeFontein',
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
            description: 'A celebration of South African food. Grills, shisanyama, sides and desserts from the best chefs.',
            ticketTypes: [
                { name: 'General Entry', price: 50, available: 500, benefits: 'Entry to food festival' },
                { name: 'VIP Tasting', price: 200, available: 80, benefits: 'Tasting menu, drink pairings' }
            ]
        },
        {
            id: 4,
            title: 'R573 VIP Night',
            category: 'vip',
            categoryLabel: '💎 VIP',
            date: '7 November 2026',
            time: '20:00 - 03:00',
            venue: 'R573 Venue, TweeFontein',
            image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80',
            description: 'An exclusive night for VIP members. Premium drinks, live entertainment and networking.',
            ticketTypes: [
                { name: 'VIP Access', price: 500, available: 30, benefits: 'All-inclusive drinks, premium seating' },
                { name: 'Table of 6', price: 2500, available: 10, benefits: 'Private table, bottle service, VIP entry' }
            ]
        },
        {
            id: 5,
            title: 'Sunday Chill Session',
            category: 'music',
            categoryLabel: '🎵 Music',
            date: '15 November 2026',
            time: '14:00 - 22:00',
            venue: 'R573 Venue, TweeFontein',
            image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80',
            description: 'Wind down your weekend with good music, good food and good company.',
            ticketTypes: [
                { name: 'General', price: 60, available: 200, benefits: 'Standard entry' },
                { name: 'Comfort', price: 120, available: 80, benefits: 'Comfort seating, drink voucher' }
            ]
        }
    ];

    // ============================
    // RENDER EVENTS
    // ============================
    const eventsGrid = document.getElementById('eventsGrid');
    const filterButtons = document.querySelectorAll('.filter');

    let activeFilter = 'all';
    const eventSearch = document.getElementById('eventSearch');
    const eventLocation = document.getElementById('eventLocation');
    function renderEvents(filter = activeFilter) {
        activeFilter = filter;
        const query = eventSearch ? eventSearch.value.trim().toLowerCase() : '';
        const location = eventLocation ? eventLocation.value : 'all';
        const filtered = eventsData.filter(event => {
            const categoryMatch = filter === 'all' || event.category === filter;
            const textMatch = !query || `${event.title} ${event.description} ${event.categoryLabel}`.toLowerCase().includes(query);
            const locationMatch = location === 'all' || event.venue.toLowerCase().includes('r573 venue');
            return categoryMatch && textMatch && locationMatch;
        });

        if (filtered.length === 0) {
            eventsGrid.innerHTML = `
                <div class="no-events" style="grid-column: 1 / -1; text-align: center; padding: 80px 0; color: #888;">
                    <p style="font-size: 24px; margin-bottom: 12px;">🎫 No events found</p>
                    <p>Check back soon for new events!</p>
                </div>
            `;
            return;
        }

        eventsGrid.innerHTML = filtered.map(event => `
            <div class="event-card" data-id="${event.id}">
                <div class="event-card-image">
                    <img src="${event.image}" alt="${event.title}" />
                    <span class="event-badge">${event.categoryLabel}</span>
                    <div class="event-price-tag">
                        <small>FROM</small>
                        <strong>R${Math.min(...event.ticketTypes.map(t => t.price))}</strong>
                    </div>
                </div>
                <div class="event-card-body">
                    <span class="event-category">${event.categoryLabel}</span>
                    <h3>${event.title}</h3>
                    <p class="event-description">${event.description}</p>
                    <div class="event-meta">
                        <span>📅 ${event.date}</span>
                        <span>📍 ${event.venue}</span>
                        <span><span class="dot"></span> Available</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Add click listeners to event cards
        document.querySelectorAll('.event-card').forEach(card => {
            card.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                const event = eventsData.find(e => e.id === id);
                if (event) openTicketModal(event);
            });
        });
    }

    // ============================
    // FILTER EVENTS
    // ============================
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderEvents(this.dataset.filter);
        });
        if (eventSearch) eventSearch.addEventListener('input', () => renderEvents());
        if (eventLocation) eventLocation.addEventListener('change', () => renderEvents());
    });

    // ============================
    // TICKET MODAL
    // ============================
    const ticketModal = document.getElementById('ticketModal');
    const modalClose = document.getElementById('modalClose');
    let currentEvent = null;
    let ticketQuantities = {};

    function openTicketModal(event) {
        currentEvent = event;
        ticketQuantities = {};
        event.ticketTypes.forEach((t, index) => {
            ticketQuantities[index] = 0;
        });

        document.getElementById('modalEventTitle').textContent = event.title;
        document.getElementById('modalEventDate').textContent = event.date;
        document.getElementById('modalEventVenue').textContent = event.venue;

        const typesContainer = document.getElementById('ticketTypes');
        typesContainer.innerHTML = event.ticketTypes.map((type, index) => `
            <div class="ticket-type-item">
                <div class="ticket-type-info">
                    <h4>${type.name}</h4>
                    <p>${type.benefits}</p>
                    <span class="price">R${type.price}</span>
                </div>
                <div class="ticket-type-qty">
                    <button class="qty-minus" data-index="${index}">−</button>
                    <span id="qty-${index}">0</span>
                    <button class="qty-plus" data-index="${index}">+</button>
                </div>
            </div>
        `).join('');

        // Add quantity listeners
        document.querySelectorAll('.qty-minus').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(this.dataset.index);
                if (ticketQuantities[idx] > 0) {
                    ticketQuantities[idx]--;
                    updateQuantityDisplay(idx);
                    updateSummary();
                }
            });
        });

        document.querySelectorAll('.qty-plus').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(this.dataset.index);
                const max = currentEvent.ticketTypes[idx].available;
                if (ticketQuantities[idx] < max) {
                    ticketQuantities[idx]++;
                    updateQuantityDisplay(idx);
                    updateSummary();
                } else {
                    showToast('Maximum available tickets reached for this type.');
                }
            });
        });

        updateSummary();
        ticketModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function updateQuantityDisplay(index) {
        document.getElementById(`qty-${index}`).textContent = ticketQuantities[index];
    }

    function updateSummary() {
        let subtotal = 0;
        let totalTickets = 0;
        currentEvent.ticketTypes.forEach((type, index) => {
            const qty = ticketQuantities[index] || 0;
            subtotal += type.price * qty;
            totalTickets += qty;
        });

        const serviceFee = totalTickets * 10;
        const total = subtotal + serviceFee;

        document.getElementById('subtotal').textContent = `R${subtotal.toFixed(2)}`;
        document.getElementById('serviceFee').textContent = `R${serviceFee.toFixed(2)}`;
        document.getElementById('totalAmount').textContent = `R${total.toFixed(2)}`;

        const buyBtn = document.getElementById('buyTicketsBtn');
        if (totalTickets > 0) {
            buyBtn.style.opacity = '1';
            buyBtn.style.pointerEvents = 'auto';
        } else {
            buyBtn.style.opacity = '0.5';
            buyBtn.style.pointerEvents = 'none';
        }
    }

    function closeTicketModal() {
        ticketModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeTicketModal);
    ticketModal.addEventListener('click', function(e) {
        if (e.target === this) closeTicketModal();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeTicketModal();
    });

    // ============================
    // BUY TICKETS → CHECKOUT
    // ============================
    document.getElementById('buyTicketsBtn').addEventListener('click', function() {
        const totalTickets = Object.values(ticketQuantities).reduce((a, b) => a + b, 0);
        if (totalTickets === 0) {
            showToast('Please select at least one ticket.');
            return;
        }

        // Close ticket modal, open checkout
        closeTicketModal();

        setTimeout(() => {
            openCheckoutModal();
        }, 300);
    });

    // ============================
    // CHECKOUT MODAL
    // ============================
    const checkoutModal = document.getElementById('checkoutModal');
    const checkoutClose = document.getElementById('checkoutClose');
    const checkoutForm = document.getElementById('checkoutForm');

    function openCheckoutModal() {
        // Build checkout summary
        let itemsHTML = '';
        let total = 0;
        currentEvent.ticketTypes.forEach((type, index) => {
            const qty = ticketQuantities[index] || 0;
            if (qty > 0) {
                const subtotal = type.price * qty;
                total += subtotal + (qty * 10);
                itemsHTML += `
                    <div class="summary-item">
                        <span>${qty} × ${type.name}</span>
                        <span>R${(subtotal + (qty * 10)).toFixed(2)}</span>
                    </div>
                `;
            }
        });

        document.getElementById('checkoutItems').innerHTML = itemsHTML;
        document.getElementById('checkoutTotal').textContent = `R${total.toFixed(2)}`;

        checkoutModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeCheckoutModal() {
        checkoutModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    checkoutClose.addEventListener('click', closeCheckoutModal);
    checkoutModal.addEventListener('click', function(e) {
        if (e.target === this) closeCheckoutModal();
    });

    // ============================
    // CHECKOUT FORM SUBMIT
    // ============================
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const idNumber = this.querySelectorAll('input[type="text"]')[1].value;

        if (!name || !email || !phone || !idNumber) {
            showToast('Please fill in all fields.');
            return;
        }

        // Build order summary
        let orderSummary = '🎟 TICKET CONFIRMATION\n';
        orderSummary += '═══════════════════════\n';
        orderSummary += `Event: ${currentEvent.title}\n`;
        orderSummary += `Date: ${currentEvent.date}\n`;
        orderSummary += `Venue: ${currentEvent.venue}\n`;
        orderSummary += '───────────────────\n';
        
        let totalTickets = 0;
        let totalAmount = 0;
        currentEvent.ticketTypes.forEach((type, index) => {
            const qty = ticketQuantities[index] || 0;
            if (qty > 0) {
                const subtotal = type.price * qty;
                totalTickets += qty;
                totalAmount += subtotal + (qty * 10);
                orderSummary += `${qty} × ${type.name} = R${(subtotal + (qty * 10)).toFixed(2)}\n`;
            }
        });
        orderSummary += '───────────────────\n';
        orderSummary += `Total: R${totalAmount.toFixed(2)}\n`;
        orderSummary += '═══════════════════════\n';
        orderSummary += `Customer: ${name}\n`;
        orderSummary += `Email: ${email}\n`;
        orderSummary += `Phone: ${phone}\n`;
        orderSummary += `ID: ${idNumber}\n`;
        orderSummary += '═══════════════════════\n';
        orderSummary += '🎫 Tickets sent to your email.';

        const customerData = JSON.parse(localStorage.getItem('r573CustomerData') || '{"bookings":[],"orders":[],"tickets":[],"notifications":[]}');
        customerData.tickets.unshift({ id: `TKT-${Date.now().toString().slice(-6)}`, subject: currentEvent.title, date: currentEvent.date, type: Object.keys(ticketQuantities).filter(index => ticketQuantities[index] > 0).map(index => `${ticketQuantities[index]} × ${currentEvent.ticketTypes[index].name}`).join(', '), status: 'Confirmed' });
        customerData.notifications.unshift({ text: `Your ${currentEvent.title} ticket has been confirmed.`, date: 'Just now', read: false });
        localStorage.setItem('r573CustomerData', JSON.stringify(customerData));

        // Show confirmation
        showToast(`✅ Tickets purchased! Check your email for confirmation.`);
        closeCheckoutModal();
        closeTicketModal();

        // Log for testing
        console.log(orderSummary);
    });

    // ============================
    // INITIAL RENDER
    // ============================
    renderEvents('all');

});