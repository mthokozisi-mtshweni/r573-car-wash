(function () {
  const seed = {
    bookings: [{ id: "RW-1048", service: "Premium Wash", date: "12 Sep 2026", time: "10:30", status: "Confirmed" }],
    orders: [{ id: "ORD-5731", items: "Shisanyama platter · 2 drinks", date: "03 Sep 2026", total: "R285", status: "Ready" }],
    tickets: [{ id: "TKT-210", subject: "September Saturday tickets", date: "02 Sep 2026", status: "Open" }],
    notifications: [{ text: "Your Premium Wash booking is confirmed.", date: "Today", read: false }, { text: "Your R573 Club points balance was updated.", date: "Yesterday", read: true }]
  };
  const key = "r573CustomerData";
  let data;
  try { data = JSON.parse(localStorage.getItem(key)) || seed; } catch (_) { data = seed; }
  localStorage.setItem(key, JSON.stringify(data));
  const page = document.body.dataset.page || "dashboard";
  const esc = value => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const cls = value => String(value).toLowerCase().replace(/\s+/g, "-");
  const badge = value => `<span class="status-badge status-${cls(value)}">${esc(value)}</span>`;
  const empty = (title, href, label) => `<div class="empty-state"><strong>${title}</strong><span>Nothing to show here yet.</span><br><a class="button button-outline" href="${href}">${label}</a></div>`;
  const list = (items, type) => items.length ? `<div class="dashboard-list">${items.map(item => `<div class="dashboard-list-item"><div><h3>${esc(item.service || item.items || item.subject || item.id)}</h3><p>${esc(item.id)} · ${esc(item.date)}${item.time ? " · " + esc(item.time) : ""}${item.total ? " · " + esc(item.total) : ""}</p></div>${badge(item.status)}</div>`).join("")}</div>` : empty(`No ${type} yet`, type === "bookings" ? "booking.html" : type === "orders" ? "menu.html" : "events.html", type === "bookings" ? "Book a wash" : type === "orders" ? "Browse menu" : "Explore events");
  const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
  set("bookingList", list(data.bookings, "bookings")); set("orderList", list(data.orders, "orders")); set("ticketList", list(data.tickets, "tickets"));
  set("notificationList", data.notifications.length ? `<div class="dashboard-list notice-list">${data.notifications.map(n => `<div class="dashboard-list-item"><span class="notice-dot ${n.read ? "read" : ""}"></span><div><h3>${esc(n.text)}</h3><p>${esc(n.date)}</p></div></div>`).join("")}</div>` : empty("You're all caught up", "index.html", "Explore R573"));
  set("bookingCount", data.bookings.length); set("orderCount", data.orders.length); set("ticketCount", data.tickets.length);
  document.querySelectorAll("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
})();
