// --- Mock Sample Properties Inventory Dataset ---
const propertiesData = [
    {
        id: 1,
        title: "The Glass Penthouse & Oasis",
        location: "nyc",
        locationText: "Manhattan, New York City",
        type: "romantic",
        typeText: "Romantic Getaway",
        price: 320,
        beds: 2,
        baths: 2,
        rating: 4.95,
        img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
        desc: "Perched high above the city skyline, this luxury architectural marvel offers floor-to-ceiling panoramic views of Central Park, premium mid-century interiors, and a fully furnished wraps-around terrace garden."
    },
    {
        id: 2,
        title: "Minimalist Executive Studio Loft",
        location: "nyc",
        locationText: "Brooklyn, New York City",
        type: "business",
        typeText: "Business Travel",
        price: 195,
        beds: 1,
        baths: 1,
        rating: 4.88,
        img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
        desc: "Designed explicitly for productivity and remote corporate operations. Outfitted with blazing fast enterprise Wi-Fi, ergonomics workstation desk setup, dynamic smart illumination, and instant rapid metro access."
    },
    {
        id: 3,
        title: "Coastal Modern Waterfront Villa",
        location: "miami",
        locationText: "Brickell Key, Miami",
        type: "romantic",
        typeText: "Romantic Getaway",
        price: 450,
        beds: 4,
        baths: 3.5,
        rating: 4.98,
        img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
        desc: "An incredible slice of tropical paradise featuring wide-open private bayside infinity pool deck, open-plan kitchen quarters, and premium integrated sound systems for maximum leisurely stay configurations."
    },
    {
        id: 4,
        title: "Cozy Budget Smart Micro-Apartment",
        location: "la",
        locationText: "Downtown Los Angeles",
        type: "budget",
        typeText: "Budget-Friendly",
        price: 98,
        beds: 1,
        baths: 1,
        rating: 4.75,
        img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80",
        desc: "Experience hyper-efficient micro-living at its absolute finest. Features transformations spaces, full kitchen utility blocks, intelligent voice home controls, and curated local neighborhood travel maps."
    },
    {
        id: 5,
        title: "Venice Beach Sun-Drenched Bungalow",
        location: "la",
        locationText: "Venice, Los Angeles",
        type: "romantic",
        typeText: "Romantic Getaway",
        price: 280,
        beds: 2,
        baths: 1,
        rating: 4.91,
        img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80",
        desc: "Charming historical bungalow layout steps away from ocean tides. Includes private cruiser bicycles, external hot sand surfboard shower, and a beautiful rear privacy deck shaded by old-growth palms."
    }
];

// --- Core DOM Selections ---
const listingsContainer = document.getElementById('listingsContainer');
const searchFilterForm = document.getElementById('searchFilterForm');
const detailModal = document.getElementById('detailModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalDynamicContent = document.getElementById('modalDynamicContent');
const sliderContainer = document.querySelector('.listings-slider-container');

// --- Initialization Handler ---
document.addEventListener('DOMContentLoaded', () => {
    renderListings(propertiesData);
    
    // Register Filter Listeners
    searchFilterForm.addEventListener('submit', handleFilterSearch);
    
    // Setup Horizontal Slider Navigation Carousel Controls
    document.getElementById('nextBtn').addEventListener('click', () => {
        sliderContainer.scrollBy({ left: 360, behavior: 'smooth' });
    });
    document.getElementById('prevBtn').addEventListener('click', () => {
        sliderContainer.scrollBy({ left: -360, behavior: 'smooth' });
    });

    // Close Modal Event bindings
    closeModalBtn.addEventListener('click', () => detailModal.classList.remove('active'));
    detailModal.addEventListener('click', (e) => {
        if(e.target === detailModal) detailModal.classList.remove('active');
    });
});

// --- Dynamic Listings Injection Engine ---
function renderListings(items) {
    listingsContainer.innerHTML = '';
    
    if(items.length === 0) {
        listingsContainer.innerHTML = `<p style="padding: 40px 20px; font-weight: 600; color: #888;">No properties match your exact selected search parameters.</p>`;
        return;
    }

    items.forEach(prop => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.setAttribute('data-id', prop.id);
        card.innerHTML = `
            <div class="property-thumb" style="background-image: url('${prop.img}');">
                <span class="property-type-tag">${prop.typeText}</span>
            </div>
            <div class="property-info">
                <h3>${prop.title}</h3>
                <p class="property-location"><i class="fa-solid fa-location-dot"></i> ${prop.locationText}</p>
                <div class="property-specs">
                    <span><i class="fa-solid fa-bed"></i> ${prop.beds} Beds</span>
                    <span><i class="fa-solid fa-bath"></i> ${prop.baths} Baths</span>
                    <span><i class="fa-solid fa-star" style="color:#FFB100;"></i> ${prop.rating}</span>
                </div>
                <span class="property-price">$${prop.price} <span style="font-size:0.8rem; font-weight:400; color:#666;">/ night</span></span>
            </div>
        `;
        
        // Connect House Detail trigger onClick
        card.addEventListener('click', () => openHouseDetailPage(prop.id));
        listingsContainer.appendChild(card);
    });
}

// --- Multi-parameter Form Filtering Algorithm ---
function handleFilterSearch(e) {
    e.preventDefault();
    const locValue = document.getElementById('filterLocation').value;
    const typeValue = document.getElementById('filterType').value;
    const priceValue = document.getElementById('filterPrice').value;

    const filtered = propertiesData.filter(prop => {
        const matchLoc = (locValue === 'all' || prop.location === locValue);
        const matchType = (typeValue === 'all' || prop.type === typeValue);
        
        let matchPrice = true;
        if(priceValue === 'under-250') matchPrice = prop.price < 250;
        if(priceValue === 'above-250') matchPrice = prop.price >= 250;

        return matchLoc && matchType && matchPrice;
    });

    renderListings(filtered);
}

// --- Dynamic House Detail Page Modal System ---
function openHouseDetailPage(id) {
    const targetProperty = propertiesData.find(p => p.id === id);
    if(!targetProperty) return;

    modalDynamicContent.innerHTML = `
        <div class="modal-left-panel">
            <div class="modal-gallery-main" style="background-image: url('${targetProperty.img}');"></div>
            
            <div class="modal-info">
                <h2>${targetProperty.title}</h2>
                <p class="property-location" style="font-size:1.1rem;"><i class="fa-solid fa-location-dot"></i> ${targetProperty.locationText}</p>
                
                <div class="modal-tabs">
                    <button class="tab-btn active" onclick="switchModalTab(event, 'overviewTab')">Overview</button>
                    <button class="tab-btn" onclick="switchModalTab(event, 'amenitiesTab')">Amenities</button>
                    <button class="tab-btn" onclick="switchModalTab(event, 'policiesTab')">Policies</button>
                </div>

                <div id="overviewTab" class="tab-panel active">
                    <p style="margin-bottom:16px; color:#555; line-height:1.7;">${targetProperty.desc}</p>
                    <div class="property-specs" style="font-size:1rem; padding: 16px 0; margin-top:10px;">
                        <span><i class="fa-solid fa-bed"></i> <strong>${targetProperty.beds}</strong> Bedrooms</span>
                        <span><i class="fa-solid fa-bath"></i> <strong>${targetProperty.baths}</strong> Bathrooms</span>
                        <span><i class="fa-solid fa-star" style="color:#FFB100;"></i> <strong>${targetProperty.rating}</strong> Evaluation Score</span>
                    </div>
                </div>

                <div id="amenitiesTab" class="tab-panel">
                    <ul style="list-style:none; display:grid; grid-template-columns:1fr 1fr; gap:12px; padding:10px 0;">
                        <li><i class="fa-solid fa-wifi" style="color:var(--secondary-color);"></i> Enterprise Ultra-Fast Fiber Wi-Fi</li>
                        <li><i class="fa-solid fa-snowflake" style="color:var(--secondary-color);"></i> Central HVAC Climate Control</li>
                        <li><i class="fa-solid fa-kitchen-set" style="color:var(--secondary-color);"></i> Premium Chef Culinary Utensils</li>
                        <li><i class="fa-solid fa-square-parking" style="color:var(--secondary-color);"></i> Secure Subterranean Parking Structure</li>
                        <li><i class="fa-solid fa-tv" style="color:var(--secondary-color);"></i> 4K UHD Streaming Device</li>
                    </ul>
                </div>

                <div id="policiesTab" class="tab-panel">
                    <div style="display:flex; flex-direction:column; gap:10px; padding:10px 0;">
                        <p><strong>Check-in window:</strong> 3:00 PM - 9:00 PM</p>
                        <p><strong>Checkout execution:</strong> 11:00 AM standard local time</p>
                        <p><strong>Cancellations:</strong> 100% full financial reversal protection guarantee up to 48 hours out.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-right-panel">
            <div class="modal-sidebar-box">
                <div class="sidebar-price">$${targetProperty.price} <span>/ night</span></div>
                
                <form class="booking-mock-form" onsubmit="event.preventDefault(); alert('Reservation Simulation Registered Successfully!');">
                    <div class="mock-field">
                        <label>CHECK-IN</label>
                        <input type="date" value="2026-06-15" required>
                    </div>
                    <div class="mock-field">
                        <label>CHECKOUT</label>
                        <input type="date" value="2026-06-22" required>
                    </div>
                    <div class="mock-field">
                        <label>NUMBER OF OCCUPANTS</label>
                        <input type="number" min="1" max="6" value="2">
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center; margin-top:10px;">
                        Execute Instant Booking
                    </button>
                </form>
                <small style="display:block; text-align:center; color:#888; margin-top:12px;">You won't be charged actual currency yet.</small>
            </div>
        </div>
    `;

    detailModal.classList.add('active');
}

// --- Tab Toggle Controller inside Modal ---
function switchModalTab(event, tabId) {
    const parent = event.target.closest('.modal-info');
    
    // Clear Active Class states on buttons
    parent.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    // Clear Active Class states on viewports
    parent.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

    event.target.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}