// --- Core Shared Virtual State Engine Databases ---
const propertiesCatalog = [
    {
        id: "PRIME-VILLA-01",
        title: "The Obsidian Infinity Villa",
        mode: "buy",
        location: "miami",
        locationText: "Biscayne Bay, Miami USA",
        type: "villa",
        price: 1250000,
        beds: 5,
        baths: 6,
        status: "New Listing",
        img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80",
        desc: "A massive multi-tiered structural triumph overlooking clear open-ocean views. Features a continuous 50-meter outdoor heating infinity filtration pool system, subterranean automation wine cellar chambers, smart facial-recognition portals, and zero-edge dynamic glass panes."
    },
    {
        id: "PRIME-DUPLEX-02",
        title: "Neo-Classic Geometric Duplex",
        mode: "rent",
        location: "lagos",
        locationText: "Ikoyi Phase II, Lagos Nigeria",
        type: "duplex",
        price: 8500,
        beds: 4,
        baths: 4.5,
        status: "Verified Clear Asset",
        img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
        desc: "An incredible dual-occupancy residential development block optimizing internal sunlight pathways perfectly. Equipped with a professional executive chef galley station, custom bulletproof infrastructure tracking, integrated green energy backup batteries, and private domestic helper quarters."
    },
    {
        id: "PRIME-APT-03",
        title: "Penthouse Cloud Skyline Suite",
        mode: "buy",
        location: "london",
        locationText: "Canary Wharf, London UK",
        type: "apartment",
        price: 680000,
        beds: 2,
        baths: 2,
        status: "Highly Requested",
        img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
        desc: "Suspended perfectly on the 42nd level overlooking direct financial district skylines. Outfitted with bespoke Italian customized furniture elements, dedicated fiber routing channels, and master suite layouts featuring steam treatment spas."
    }
];

// --- App Life Cycle Boot Sequence Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    // Generate initial listing iterations safely
    renderCatalogGrid(propertiesCatalog, "featuredGridInjected");
    renderCatalogGrid(propertiesCatalog, "marketplaceMasterGrid");
    rebuildAdminManagementTable();
});

// --- Unified Structural State Routing Controller ---
// --- Unified Structural State Routing Controller ---
function switchView(targetViewId) {
    // Structural DOM view scanning pass execution loop
    document.querySelectorAll(".page-view").forEach(page => {
        page.classList.remove("active");
    });

    const activeTargetPage = document.getElementById(`view-${targetViewId}`);
    if (activeTargetPage) {
        activeTargetPage.classList.add("active");
        window.scrollTo(0, 0);
    }

    // Toggle navigation element state modifiers to preserve aesthetic focus mappings
    document.querySelectorAll(".target-nav-links .nav-link").forEach(link => {
        link.classList.remove("active");
    });
    
    // Auto-patch navigation state feedback indicators inside layout nodes
    const inlineActionLinks = document.querySelector(`.target-nav-links a[onclick*="${targetViewId}"]`);
    if(inlineActionLinks) inlineActionLinks.classList.add("active");

    // ==========================================
    // 🛠️ NEW: AUTOMATIC HAMBURGER MENU AUTO-CLOSE
    // ==========================================
    const mobileNavbarCollapse = document.getElementById("mainNav");
    if (mobileNavbarCollapse && mobileNavbarCollapse.classList.contains("show")) {
        // Use Bootstrap's built-in collapse handler to shut it smoothly
        const bsCollapseInstance = bootstrap.Collapse.getInstance(mobileNavbarCollapse);
        if (bsCollapseInstance) {
            bsCollapseInstance.hide();
        } else {
            // Fallback just in case the instance isn't globally tracked yet
            new bootstrap.Collapse(mobileNavbarCollapse).hide();
        }
    }
}

// --- Multi-Criteria Asset Rendering Compilation Framework ---
function renderCatalogGrid(dataset, targetContainerElementId) {
    const renderInsertionNode = document.getElementById(targetContainerElementId);
    if (!renderInsertionNode) return;

    renderInsertionNode.innerHTML = "";

    if (dataset.length === 0) {
        renderInsertionNode.innerHTML = `<div class="col-12 py-5 text-center text-muted-custom"><i class="fa-solid fa-cloud-moon fs-1 mb-2"></i><p>No investment listings match those specific configuration bounds.</p></div>`;
        return;
    }

    dataset.forEach(asset => {
        const structuralColumnCardWrapper = document.createElement("div");
        structuralColumnCardWrapper.className = "col-md-4";
        structuralColumnCardWrapper.innerHTML = `
            <div class="property-neon-card h-100">
                <div class="thumb-wrap" style="background-image: url('${asset.img}');">
                    <span class="status-badge-node">${asset.status}</span>
                </div>
                <div class="card-body-neon">
                    <span class="asset-valuation-label">$${asset.price.toLocaleString()}${asset.mode === 'rent' ? '<span class="fs-6 text-muted">/mo</span>' : ''}</span>
                    <h5 class="fw-bold text-truncate mb-1">${asset.title}</h5>
                    <p class="small text-muted-custom mb-2"><i class="fa-solid fa-location-dot text-neon me-1"></i> ${asset.locationText}</p>
                    <div class="badge bg-secondary mb-3 btn-sm text-capitalize">For ${asset.mode}</div>
                    <div class="specs-inline-strip">
                        <span><i class="fa-solid fa-bed me-1"></i> ${asset.beds} Beds</span>
                        <span><i class="fa-solid fa-bath me-1"></i> ${asset.baths} Baths</span>
                        <span class="text-truncate text-capitalize"><i class="fa-solid fa-building me-1"></i> ${asset.type}</span>
                    </div>
                    <button class="btn btn-nav-action outline-neon btn-sm w-100 justify-content-center" onclick="mountAssetDetailedPage('${asset.id}')">View Details</button>
                </div>
            </div>
        `;
        renderInsertionNode.appendChild(structuralColumnCardWrapper);
    });
}

// --- Marketplace Search Logic Engine ---
function applyMarketplaceFilters() {
    const targetMode = document.getElementById("filterMode").value;
    const targetLoc = document.getElementById("filterLocation").value;
    const targetPrice = document.getElementById("filterPrice").value;
    const targetType = document.getElementById("filterType").value;

    const isolatedSubset = propertiesCatalog.filter(asset => {
        const evaluationModeMatch = (targetMode === "all" || asset.mode === targetMode);
        const evaluationLocMatch = (targetLoc === "all" || asset.location === targetLoc);
        const evaluationTypeMatch = (targetType === "all" || asset.type === targetType);
        
        let evaluationPriceMatch = true;
        if (targetPrice !== "all") {
            evaluationPriceMatch = asset.price <= parseInt(targetPrice);
        }

        return evaluationModeMatch && evaluationLocMatch && evaluationTypeMatch && evaluationPriceMatch;
    });

    renderCatalogGrid(isolatedSubset, "marketplaceMasterGrid");
}

// --- Dynamic Deep Detail View Render Mounting Engine ---
function mountAssetDetailedPage(assetIdCode) {
    const targetObject = propertiesCatalog.find(p => p.id === assetIdCode);
    if (!targetObject) return;

    const viewportTemplateMount = document.getElementById("dynamicDetailsTarget");
    viewportTemplateMount.innerHTML = `
        <div class="row g-5">
            <div class="col-lg-8">
                <div class="rounded-4 overflow-hidden mb-4 border border-secondary" style="height:450px; background: url('${targetObject.img}') center/cover;"></div>
                <h2 class="fw-bold mb-2">${targetObject.title}</h2>
                <p class="text-neon mb-4"><i class="fa-solid fa-location-dot me-1"></i> ${targetObject.locationText}</p>
                
                <h5 class="fw-bold text-neon mb-2">Architectural Description Profile</h5>
                <p class="text-muted-custom small mb-4">${targetObject.desc}</p>
                
                <h5 class="fw-bold text-neon mb-3">Premium Infrastructure Amenities</h5>
                <div class="row g-2 mb-4 text-muted-custom small">
                    <div class="col-sm-4"><i class="fa-solid fa-shield-halved text-neon me-1"></i> Biometric Perimeter Control</div>
                    <div class="col-sm-4"><i class="fa-solid fa-bolt text-neon me-1"></i> Decentralized Backup Power Grid</div>
                    <div class="col-sm-4"><i class="fa-solid fa-car text-neon me-1"></i> Climate Controlled Garages</div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="filter-panel-card p-4 rounded-3 text-center mb-4">
                    <span class="small d-block text-muted-custom mb-1">Asset Listed Value Evaluation</span>
                    <h3 class="fw-bold text-neon mb-4">$${targetObject.price.toLocaleString()}</h3>
                    <button class="btn solid-neon w-100 mb-3" onclick="initializeTransactionIntent('${targetObject.id}', '${targetObject.mode}')">
                        Initialize ${targetObject.mode === 'rent' ? 'Rental Lease Pipeline' : 'Direct Capital Purchase'}
                    </button>
                </div>
            </div>
        </div>
    `;
    switchView("details");
}

// --- Automated Pipeline Application Initialization Hook ---
function initializeTransactionIntent(id, mode) {
    if(mode === "rent") {
        document.getElementById("rentPropId").value = id;
        switchView("rent-page");
    } else {
        switchView("buy-page");
    }
}

// --- Real Estate Interactive Capital Simulation Engineering Logic ---
function runFinancialSimulations() {
    const totalValuation = parseFloat(document.getElementById("calcVal").value) || 0;
    const downEquityPayment = parseFloat(document.getElementById("calcDown").value) || 0;
    const specifiedAnnualRate = parseFloat(document.getElementById("calcRate").value) || 0;

    const principalLoanDebt = totalValuation - downEquityPayment;
    if(principalLoanDebt <= 0) {
        document.getElementById("calcResultDisplay").innerText = "$0.00";
        return;
    }

    const compiledMonthlyInterestScale = (specifiedAnnualRate / 100) / 12;
    const globalTotalAmortizationPeriods = 30 * 12; // Standard fixed 30-year track

    let simulatedMonthlyOutputValue = 0;
    if(compiledMonthlyInterestScale === 0) {
        simulatedMonthlyOutputValue = principalLoanDebt / globalTotalAmortizationPeriods;
    } else {
        simulatedMonthlyOutputValue = principalLoanDebt * (compiledMonthlyInterestScale * Math.pow(1 + compiledMonthlyInterestScale, globalTotalAmortizationPeriods)) / (Math.pow(1 + compiledMonthlyInterestScale, globalTotalAmortizationPeriods) - 1);
    }

    document.getElementById("calcResultDisplay").innerText = `$${simulatedMonthlyOutputValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

// --- Multi-Gateway Payment Router Implementation ---
function executeTransactionRouting(event, workflowContext) {
    event.preventDefault();
    
    let activeSelectedGatewayRoute = "";
    if (workflowContext === 'rent') {
        activeSelectedGatewayRoute = document.getElementById("rentGateway").value;
    } else {
        activeSelectedGatewayRoute = document.getElementById("buyGateway").value;
    }

    alert(`[GATEWAY ROUTER LOG] Initializing secure handshake protocols.\nTarget Interface Endpoint: ${activeSelectedGatewayRoute.toUpperCase()}\nStatus Response: 200 Secure Handshake Complete. Automated receipts are dispatching to registered emails.`);
}

// --- Dynamic Fail-safe Authentication Portal Engine ---
function openAuthModal(modeContext) {
    // Reset any forgot password view shifts first
    toggleForgotPasswordView(false);

    // Dynamic Fail-Safe Initialization instantiation block
    const modalDOMNode = document.getElementById('authGatewayModal');
    if (modalDOMNode) {
        let instance = bootstrap.Modal.getInstance(modalDOMNode);
        if (!instance) {
            instance = new bootstrap.Modal(modalDOMNode);
        }
        
        // Match chosen active tab view on click state triggers
        if (modeContext === 'signup') {
            const signupTabBtn = document.getElementById('signup-tab');
            if (signupTabBtn) signupTabBtn.click();
        } else {
            const loginTabBtn = document.getElementById('login-tab');
            if (loginTabBtn) loginTabBtn.click();
        }

        instance.show();
    }
}

function toggleForgotPasswordView(showForgot) {
    const loginPanel = document.getElementById("login-panel");
    const forgotPanel = document.getElementById("forgot-panel");
    const tabHeaders = document.getElementById("authTabs");
    const oauthStrip = document.getElementById("socialAuthStrip");

    if (!loginPanel || !forgotPanel) return;

    if (showForgot) {
        loginPanel.classList.add("d-none");
        if (tabHeaders) tabHeaders.classList.add("d-none");
        if (oauthStrip) oauthStrip.classList.add("d-none");
        forgotPanel.classList.remove("d-none");
    } else {
        loginPanel.classList.remove("d-none");
        if (tabHeaders) tabHeaders.classList.remove("d-none");
        if (oauthStrip) oauthStrip.classList.remove("d-none");
        forgotPanel.classList.add("d-none");
    }
}

function executeMockAuthentication(event, actionContext) {
    event.preventDefault();
    
    const modalDOMNode = document.getElementById('authGatewayModal');
    if (modalDOMNode) {
        const instance = bootstrap.Modal.getInstance(modalDOMNode);
        if (instance) instance.hide();
    }

    if (actionContext === 'signup') {
        alert("Registration Request Ingested! An activation link has been dispatched to your email address for account validation verification routing.");
        switchView("user-dash");
        return;
    }

    // Checking Login user level credentials contexts
    const loginRoleElement = document.getElementById("loginRole");
    const evaluatedRoleSelected = loginRoleElement ? loginRoleElement.value : "customer";
    
    if (evaluatedRoleSelected === "admin") {
        switchView("admin-dash");
    } else {
        switchView("user-dash");
    }
}

// --- Control Admin Workspace Internal Pipeline Managers ---
function rebuildAdminManagementTable() {
    const targetAdminNode = document.getElementById("adminInventoryTableTarget");
    if (!targetAdminNode) return;

    targetAdminNode.innerHTML = `
        <thead><tr><th>Reference Node ID</th><th>Title Designator</th><th>Deal Class</th><th>Market Price</th><th>System Control Matrix</th></tr></thead>
        <tbody>
            ${propertiesCatalog.map(item => `
                <tr>
                    <td><code>${item.id}</code></td>
                    <td>${item.title}</td>
                    <td><span class="badge bg-dark text-capitalize">${item.mode}</span></td>
                    <td><strong>$${item.price.toLocaleString()}</strong></td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="alert('System operational callback initialized: editing item data node ${item.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn btn-sm btn-outline-danger" onclick="alert('System operational callback initialized: deleting item data node ${item.id}')"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
}

function openNewPropertyManagerForm() {
    const dynamicNodeIdentifierKey = `PRIME-${Math.floor(1000 + Math.random() * 9000)}`;
    const freshAssetTemplateMockData = {
        id: dynamicNodeIdentifierKey,
        title: "The Neo Neon Geometric Pavilion",
        mode: "buy",
        location: "lagos",
        locationText: "Banana Island, Lagos",
        type: "villa",
        price: 2100000,
        beds: 6,
        baths: 7,
        status: "System Generated Asset",
        img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
        desc: "Automated simulation array verification data profile."
    };

    propertiesCatalog.push(freshAssetTemplateMockData);
    renderCatalogGrid(propertiesCatalog, "marketplaceMasterGrid");
    rebuildAdminManagementTable();
    alert(`[ADMIN NOTIFICATION MODULE] Successfully injected asset database node: ${dynamicNodeIdentifierKey}. Inventory views dynamically parsed.`);
}


/* =====================================================================
   📊 MODULE 6: SECURE CLIENT ORDER & TRANSACTION HISTORY TRACKING ENGINE
   ===================================================================== */

// A. MOCK INTERNAL ORDER HISTORY DATABASE ARRAY (Client-Side Storage Simulation)
// This array defines unique transaction order nodes, mirroring data from a secure backend API.
const mockOrderHistory = [
    {
        id: "ORD-991A-2024",
        timestamp: "2024-05-15 11:34 AM",
        assetId: "PE-VILLA-002",
        assetTitle: "Beachfront Obsidian Villa (Lagoon Ave)",
        assetImg: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=80&q=80",
        type: "Lease Application",
        mode: "Rent",
        valuation: "$5,500 / month",
        escrowBond: "$11,000",
        gateway: "Stripe Luxury Gateway (Int'l)",
        status: "Dispatch Complete",
        statusColor: "success",
        docLink: "ORD991A_lease_agreement.pdf"
    },
    {
        id: "ORD-988B-2024",
        timestamp: "2024-05-12 09:11 AM",
        assetId: "PE-DUPLEX-04",
        assetTitle: "Neo-Classic Geometric Duplex (Ikoyi Phase II)",
        assetImg: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=80&q=80",
        type: "Capital Acquisition",
        mode: "Buy",
        valuation: "$338,000 Total Valuation",
        escrowBond: "Awaiting Fund Settlement",
        gateway: "Paystack High-Value Portal (NGN Settlement)",
        status: "Escrow Processing",
        statusColor: "warning",
        docLink: "ORD988B_title_transfer_escrow.pdf"
    },
    {
        id: "ORD-980C-2024",
        timestamp: "2024-04-01 02:22 PM",
        assetId: "PE-APT-01",
        assetTitle: "Penthouse Skyline Suite (Canary Wharf)",
        assetImg: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=80&q=80",
        type: "Pre-Listing Deposit Reservation",
        mode: "Reserve",
        valuation: "$1,500 Hold Fee",
        escrowBond: "N/A - Direct Deposit",
        gateway: "PayPal Direct Terminal",
        status: "Deposit Confirmed",
        statusColor: "primary",
        docLink: "ORD980C_reservation_confirmation.pdf"
    },
    {
        id: "ORD-975D-2023",
        timestamp: "2023-11-20 04:55 PM",
        assetId: "PE-VILLA-01",
        assetTitle: "Infinity Edge Modern Villa (Biscayne Bay)",
        assetImg: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=80&q=80",
        type: "Capital Acquisition",
        mode: "Buy",
        valuation: "$1,250,000 Total Valuation",
        escrowBond: "Complete Settlement",
        gateway: "Stripe Luxury Gateway (Int'l)",
        status: "Settlement Complete",
        statusColor: "success",
        docLink: "ORD975D_final_deed_of_sale.pdf"
    }
];


// B. RENDER FUNCTION: MOUNT ORDER TRACKING TABLE MATRIX
// Dynamically constructs the transaction grid based on the verified `mockOrderHistory` array.
function initializeOrderTrackingHistory(orderDataset) {
    const tableTargetBody = document.getElementById("userOrderHistoryTableTarget")?.querySelector("tbody");
    if (!tableTargetBody) return;

    // Reset current contents for fresh render
    tableTargetBody.innerHTML = "";

    // Data-Validation Guard: Handle Empty History State
    if (orderDataset.length === 0) {
        tableTargetBody.innerHTML = `<tr><td colspan="6" class="text-center py-5 text-muted fst-italic"><i class="fa-solid fa-receipt fs-1 d-block mb-3 opacity-25"></i> No verified transaction nodes have been logged to your history ledger yet. Start exploring properties!</td></tr>`;
        return;
    }

    // Iterative Rendering Loop for Order Nodes
    orderDataset.forEach(order => {
        const structuralRowWrapper = document.createElement("tr");
        structuralRowWrapper.innerHTML = `
            <td class="ps-3 py-3 align-top">
                <code class="text-primary fw-bold text-decoration-none">${order.id}</code>
                <span class="d-block text-muted small mt-1"><i class="fa-solid fa-clock me-1"></i> ${order.timestamp}</span>
            </td>
            <td class="align-top d-flex align-items-center gap-3">
                <img src="${order.assetImg}" alt="${order.assetTitle}" class="rounded-3 shadow-sm border border-light-subtle" style="width: 50px; height: 50px; object-fit: cover;">
                <div>
                    <strong class="text-secondary-emphasis d-block">${order.assetTitle}</strong>
                    <span class="small text-muted d-block mt-1"><i class="fa-solid fa-building text-neon me-1"></i> Asset Node: ${order.assetId}</span>
                </div>
            </td>
            <td class="align-top">
                <span class="fw-bold text-dark text-capitalize">${order.mode} Application</span>
                <span class="d-block small text-muted mt-1">${order.type}</span>
            </td>
            <td class="align-top">
                <strong class="text-neon d-block fs-6">${order.valuation}</strong>
                <span class="small text-muted d-block mt-1"><i class="fa-solid fa-credit-card me-1"></i> Via: ${order.gateway}</span>
            </td>
            <td class="align-top">
                <span class="badge bg-${order.statusColor} p-2 text-capitalize fw-bold" style="letter-spacing:0.5px;">${order.status}</span>
                ${order.mode === 'Rent' && order.status === 'Dispatch Complete' ? `<span class="small text-muted d-block mt-1">Escrow Bond Held: ${order.escrowBond}</span>` : ''}
                ${order.mode === 'Buy' && order.status === 'Escrow Processing' ? `<span class="small text-muted d-block mt-1">Status: ${order.escrowBond}</span>` : ''}
            </td>
            <td class="align-top pe-3">
                <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-nav-action outline-neon fw-bold d-flex align-items-center gap-1" onclick="alert('System operational callback: Pulling comprehensive lifecycle details for Order ${order.id}. Redirecting to tracking visualizer matrix.');">
                        <i class="fa-solid fa-map-location-dot"></i> Track
                    </button>
                    ${order.docLink ? `
                    <button class="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1" onclick="alert('Digital Dossier Access: Authenticating secure link to associated legal parameters for ${order.id}. Dispatching document PDF block.');">
                        <i class="fa-solid fa-download"></i> Ledger
                    </button>
                    ` : ''}
                </div>
            </td>
        `;
        tableTargetBody.appendChild(structuralRowWrapper);
    });
}


// C. CONTROLLER FUNCTION: USER DASHBOARD WORKSPACE ACTIVE VIEW MANAGER
// Manages the smooth tab-switching behavior within the User Dashboard main content zone.
function activateUserDashView(viewTargetKey) {
    const dashboardWorkspace = document.getElementById("view-user-dash");
    if (!dashboardWorkspace) return;

    // 1. Structural DOM view scanning pass execution loop (reset all panels)
    const contentZones = dashboardWorkspace.querySelectorAll('[id^="userDashZone"]');
    const navLinks = dashboardWorkspace.querySelectorAll('[id^="dashNavLink"]');
    
    contentZones.forEach(zone => zone.classList.add("d-none")); // Hide all zones
    navLinks.forEach(link => link.classList.remove("active")); // Deselect all links

    // 2. State Injection: Activate the selected view zone and navigation link mapping
    const targetZone = document.getElementById(`userDashZone${viewTargetKey.charAt(0).toUpperCase() + viewTargetKey.slice(1)}`);
    const targetLink = document.getElementById(`dashNavLink${viewTargetKey.charAt(0).toUpperCase() + viewTargetKey.slice(1)}`);

    if (targetZone && targetLink) {
        targetZone.classList.remove("d-none"); // Show selected panel
        targetLink.classList.add("active"); // Map focus state

        // Special Initialization Callback for History Tab Execution
        if (viewTargetKey === 'history') {
            initializeOrderTrackingHistory(mockOrderHistory); // Render the transaction matrix
        }
    }
}












// // --- Core Shared Virtual State Engine Databases ---
// const propertiesCatalog = [
//     {
//         id: "PRIME-VILLA-01",
//         title: "The Obsidian Infinity Villa",
//         mode: "buy",
//         location: "miami",
//         locationText: "Biscayne Bay, Miami USA",
//         type: "villa",
//         price: 1250000,
//         beds: 5,
//         baths: 6,
//         status: "New Listing",
//         img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80",
//         desc: "A massive multi-tiered structural triumph overlooking clear open-ocean views. Features a continuous 50-meter outdoor heating infinity filtration pool system, subterranean automation wine cellar chambers, smart facial-recognition portals, and zero-edge dynamic glass panes."
//     },
//     {
//         id: "PRIME-DUPLEX-02",
//         title: "Neo-Classic Geometric Duplex",
//         mode: "rent",
//         location: "lagos",
//         locationText: "Ikoyi Phase II, Lagos Nigeria",
//         type: "duplex",
//         price: 8500,
//         beds: 4,
//         baths: 4.5,
//         status: "Verified Clear Asset",
//         img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
//         desc: "An incredible dual-occupancy residential development block optimizing internal sunlight pathways perfectly. Equipped with a professional executive chef galley station, custom bulletproof infrastructure tracking, integrated green energy backup batteries, and private domestic helper quarters."
//     },
//     {
//         id: "PRIME-APT-03",
//         title: "Penthouse Cloud Skyline Suite",
//         mode: "buy",
//         location: "london",
//         locationText: "Canary Wharf, London UK",
//         type: "apartment",
//         price: 680000,
//         beds: 2,
//         baths: 2,
//         status: "Highly Requested",
//         img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
//         desc: "Suspended perfectly on the 42nd level overlooking direct financial district skylines. Outfitted with bespoke Italian customized furniture elements, dedicated fiber routing channels, and master suite layouts featuring steam treatment spas."
//     }
// ];

// let globalBootstrapModalRefInstance = null;

// // --- App Life Cycle Boot Sequence Initialization ---
// document.addEventListener("DOMContentLoaded", () => {
//     // Generate initial listing iterations safely
//     renderCatalogGrid(propertiesCatalog, "featuredGridInjected");
//     renderCatalogGrid(propertiesCatalog, "marketplaceMasterGrid");
//     rebuildAdminManagementTable();

//     // Prepare structural bootstrap element objects inside memory space 
//     const modalTargetElement = document.getElementById('authGatewayModal');
//     if(modalTargetElement) {
//         globalBootstrapModalRefInstance = new bootstrap.Modal(modalTargetElement);
//     }
// });

// // --- Unified Structural State Routing Controller ---
// function switchView(targetViewId) {
//     // Structural DOM view scanning pass execution loop
//     document.querySelectorAll(".page-view").forEach(page => {
//         page.classList.remove("active");
//     });

//     const activeTargetPage = document.getElementById(`view-${targetViewId}`);
//     if (activeTargetPage) {
//         activeTargetPage.classList.add("active");
//         window.scrollTo(0, 0);
//     }

//     // Toggle navigation element state modifiers to preserve aesthetic focus mappings
//     document.querySelectorAll(".target-nav-links .nav-link").forEach(link => {
//         link.classList.remove("active");
//     });
    
//     // Auto-patch navigation state feedback indicators inside layout nodes
//     const inlineActionLinks = document.querySelector(`.target-nav-links a[onclick*="${targetViewId}"]`);
//     if(inlineActionLinks) inlineActionLinks.classList.add("active");
// }

// // --- Multi-Criteria Asset Rendering Compilation Framework ---
// function renderCatalogGrid(dataset, targetContainerElementId) {
//     const renderInsertionNode = document.getElementById(targetContainerElementId);
//     if (!renderInsertionNode) return;

//     renderInsertionNode.innerHTML = "";

//     if (dataset.length === 0) {
//         renderInsertionNode.innerHTML = `<div class="col-12 py-5 text-center text-muted-custom"><i class="fa-solid fa-cloud-moon fs-1 mb-2"></i><p>No investment listings match those specific configuration bounds.</p></div>`;
//         return;
//     }

//     dataset.forEach(asset => {
//         const structuralColumnCardWrapper = document.createElement("div");
//         structuralColumnCardWrapper.className = "col-md-4";
//         structuralColumnCardWrapper.innerHTML = `
//             <div class="property-neon-card h-100">
//                 <div class="thumb-wrap" style="background-image: url('${asset.img}');">
//                     <span class="status-badge-node">${asset.status}</span>
//                 </div>
//                 <div class="card-body-neon">
//                     <span class="asset-valuation-label">$${asset.price.toLocaleString()}${asset.mode === 'rent' ? '<span class="fs-6 text-muted">/mo</span>' : ''}</span>
//                     <h5 class="fw-bold text-truncate mb-1">${asset.title}</h5>
//                     <p class="small text-muted-custom mb-2"><i class="fa-solid fa-location-dot text-neon me-1"></i> ${asset.locationText}</p>
//                     <div class="badge bg-secondary mb-3 btn-sm text-capitalize">For ${asset.mode}</div>
//                     <div class="specs-inline-strip">
//                         <span><i class="fa-solid fa-bed me-1"></i> ${asset.beds} Beds</span>
//                         <span><i class="fa-solid fa-bath me-1"></i> ${asset.baths} Baths</span>
//                         <span class="text-truncate text-capitalize"><i class="fa-solid fa-building me-1"></i> ${asset.type}</span>
//                     </div>
//                     <button class="btn btn-nav-action outline-neon btn-sm w-100 justify-content-center" onclick="mountAssetDetailedPage('${asset.id}')">View Details</button>
//                 </div>
//             </div>
//         `;
//         renderInsertionNode.appendChild(structuralColumnCardWrapper);
//     });
// }

// // --- Marketplace Search Logic Engine ---
// function applyMarketplaceFilters() {
//     const targetMode = document.getElementById("filterMode").value;
//     const targetLoc = document.getElementById("filterLocation").value;
//     const targetPrice = document.getElementById("filterPrice").value;
//     const targetType = document.getElementById("filterType").value;

//     const isolatedSubset = propertiesCatalog.filter(asset => {
//         const evaluationModeMatch = (targetMode === "all" || asset.mode === targetMode);
//         const evaluationLocMatch = (targetLoc === "all" || asset.location === targetLoc);
//         const evaluationTypeMatch = (targetType === "all" || asset.type === targetType);
        
//         let evaluationPriceMatch = true;
//         if (targetPrice !== "all") {
//             evaluationPriceMatch = asset.price <= parseInt(targetPrice);
//         }

//         return evaluationModeMatch && evaluationLocMatch && evaluationTypeMatch && evaluationPriceMatch;
//     });

//     renderCatalogGrid(isolatedSubset, "marketplaceMasterGrid");
// }

// // --- Dynamic Deep Detail View Render Mounting Engine ---
// function mountAssetDetailedPage(assetIdCode) {
//     const targetObject = propertiesCatalog.find(p => p.id === assetIdCode);
//     if (!targetObject) return;

//     const viewportTemplateMount = document.getElementById("dynamicDetailsTarget");
//     viewportTemplateMount.innerHTML = `
//         <div class="row g-5">
//             <div class="col-lg-8">
//                 <div class="rounded-4 overflow-hidden mb-4 border border-secondary" style="height:450px; background: url('${targetObject.img}') center/cover;"></div>
//                 <h2 class="fw-bold mb-2">${targetObject.title}</h2>
//                 <p class="text-neon mb-4"><i class="fa-solid fa-location-dot me-1"></i> ${targetObject.locationText}</p>
                
//                 <h5 class="fw-bold text-neon mb-2">Architectural Description Profile</h5>
//                 <p class="text-muted-custom small mb-4">${targetObject.desc}</p>
                
//                 <h5 class="fw-bold text-neon mb-3">Premium Infrastructure Amenities</h5>
//                 <div class="row g-2 mb-4 text-muted-custom small">
//                     <div class="col-sm-4"><i class="fa-solid fa-shield-halved text-neon me-1"></i> Biometric Perimeter Control</div>
//                     <div class="col-sm-4"><i class="fa-solid fa-bolt text-neon me-1"></i> Decentralized Backup Power Grid</div>
//                     <div class="col-sm-4"><i class="fa-solid fa-car text-neon me-1"></i> Climate Controlled Garages</div>
//                 </div>
//             </div>
//             <div class="col-lg-4">
//                 <div class="filter-panel-card p-4 rounded-3 text-center mb-4">
//                     <span class="small d-block text-muted-custom mb-1">Asset Listed Value Evaluation</span>
//                     <h3 class="fw-bold text-neon mb-4">$${targetObject.price.toLocaleString()}</h3>
//                     <button class="btn solid-neon w-100 mb-3" onclick="initializeTransactionIntent('${targetObject.id}', '${targetObject.mode}')">
//                         Initialize ${targetObject.mode === 'rent' ? 'Rental Lease Pipeline' : 'Direct Capital Purchase'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     `;
//     switchView("details");
// }

// // --- Automated Pipeline Application Initialization Hook ---
// function initializeTransactionIntent(id, mode) {
//     if(mode === "rent") {
//         document.getElementById("rentPropId").value = id;
//         switchView("rent-page");
//     } else {
//         switchView("buy-page");
//     }
// }

// // --- Real Estate Interactive Capital Simulation Engineering Logic ---
// function runFinancialSimulations() {
//     const totalValuation = parseFloat(document.getElementById("calcVal").value) || 0;
//     const downEquityPayment = parseFloat(document.getElementById("calcDown").value) || 0;
//     const specifiedAnnualRate = parseFloat(document.getElementById("calcRate").value) || 0;

//     const principalLoanDebt = totalValuation - downEquityPayment;
//     if(principalLoanDebt <= 0) {
//         document.getElementById("calcResultDisplay").innerText = "$0.00";
//         return;
//     }

//     const compiledMonthlyInterestScale = (specifiedAnnualRate / 100) / 12;
//     const globalTotalAmortizationPeriods = 30 * 12; // Standard fixed 30-year track

//     let simulatedMonthlyOutputValue = 0;
//     if(compiledMonthlyInterestScale === 0) {
//         simulatedMonthlyOutputValue = principalLoanDebt / globalTotalAmortizationPeriods;
//     } else {
//         simulatedMonthlyOutputValue = principalLoanDebt * (compiledMonthlyInterestScale * Math.pow(1 + compiledMonthlyInterestScale, globalTotalAmortizationPeriods)) / (Math.pow(1 + compiledMonthlyInterestScale, globalTotalAmortizationPeriods) - 1);
//     }

//     document.getElementById("calcResultDisplay").innerText = `$${simulatedMonthlyOutputValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
// }

// // --- Multi-Gateway Payment Router Implementation ---
// function executeTransactionRouting(event, workflowContext) {
//     event.preventDefault();
    
//     let activeSelectedGatewayRoute = "";
//     if (workflowContext === 'rent') {
//         activeSelectedGatewayRoute = document.getElementById("rentGateway").value;
//     } else {
//         activeSelectedGatewayRoute = document.getElementById("buyGateway").value;
//     }

//     alert(`[GATEWAY ROUTER LOG] Initializing secure handshake protocols.\nTarget Interface Endpoint: ${activeSelectedGatewayRoute.toUpperCase()}\nStatus Response: 200 Secure Handshake Complete. Automated receipts are dispatching to registered emails.`);
// }

// // --- Modern Security Identity Authentication Logic Block ---
// function openAuthModal(modeContext) {
//     if (globalBootstrapModalRefInstance) {
//         globalBootstrapModalRefInstance.show();
//     }
// }

// function executeMockAuthentication(event) {
//     event.preventDefault();
//     const evaluatedRoleSelected = document.getElementById("authRole").value;
    
//     if (globalBootstrapModalRefInstance) {
//         globalBootstrapModalRefInstance.hide();
//     }

//     if (evaluatedRoleSelected === "admin") {
//         switchView("admin-dash");
//     } else {
//         switchView("user-dash");
//     }
// }

// // --- Control Admin Workspace Internal Pipeline Managers ---
// // function rebuildAdminManagementTable() {
// //     const targetAdminNode = document.getElementById("adminInventoryTableTarget");
// //     if (!targetAdminNode) return;

// //     targetAdminNode.innerHTML = `
// //         <thead><tr><th>Reference Node ID</th><th>Title Designator</th><th>Deal Class</th><th>Market Price</th><th>System Control Matrix</th></tr></thead>
// //         <tbody>
// //             ${propertiesCatalog.map(item => `
// //                 <tr>
// //                     <td><code>${item.id}</code></td>
// //                     <td>${item.title}</td>
// //                     <td><span class="badge bg-dark text-capitalize">${item.mode}</span></td>
// //                     <td><strong>$${item.price.toLocaleString()}</strong></td>
// //                     <td>
// //                         <button class="btn btn-sm btn-outline-primary" onclick="alert('System operational callback initialized: editing item data node ${item.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
// //                         <button class="btn btn-sm btn-outline-danger" onclick="alert('System operational callback initialized: deleting item data node ${item.id}')"><i class="fa-solid fa-trash-can"></i></button>
// //                     </td>
// //                 </tr>
// //             `).join('')}
// //         </tbody>
// //     `;
// // }



// // --- Interactive Authentication Engine Upgrades ---
// function toggleForgotPasswordView(showForgot) {
//     const loginPanel = document.getElementById("login-panel");
//     const forgotPanel = document.getElementById("forgot-panel");
//     const tabHeaders = document.getElementById("authTabs");
//     const oauthStrip = document.getElementById("socialAuthStrip");

//     if (showForgot) {
//         loginPanel.classList.add("d-none");
//         tabHeaders.classList.add("d-none");
//         oauthStrip.classList.add("d-none");
//         forgotPanel.classList.remove("d-none");
//     } else {
//         loginPanel.classList.remove("d-none");
//         tabHeaders.classList.remove("d-none");
//         oauthStrip.classList.remove("d-none");
//         forgotPanel.classList.add("d-none");
//     }
// }

// function executeMockAuthentication(event, actionContext) {
//     event.preventDefault();
    
//     if (globalBootstrapModalRefInstance) {
//         globalBootstrapModalRefInstance.hide();
//     }

//     if (actionContext === 'signup') {
//         alert("Registration Request Ingested! An activation link has been dispatched to your email address for account validation verification routing.");
//         switchView("user-dash"); // Route them inside user space initially
//         return;
//     }

//     // Checking Login contexts
//     const evaluatedRoleSelected = document.getElementById("loginRole").value;
//     if (evaluatedRoleSelected === "admin") {
//         switchView("admin-dash");
//     } else {
//         switchView("user-dash");
//     }
// }





// function openNewPropertyManagerForm() {
//     const dynamicNodeIdentifierKey = `PRIME-${Math.floor(1000 + Math.random() * 9000)}`;
//     const freshAssetTemplateMockData = {
//         id: dynamicNodeIdentifierKey,
//         title: "The Neo Neon Geometric Pavilion",
//         mode: "buy",
//         location: "lagos",
//         locationText: "Banana Island, Lagos",
//         type: "villa",
//         price: 2100000,
//         beds: 6,
//         baths: 7,
//         status: "System Generated Asset",
//         img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
//         desc: "Automated simulation array verification data profile."
//     };

//     propertiesCatalog.push(freshAssetTemplateMockData);
//     renderCatalogGrid(propertiesCatalog, "marketplaceMasterGrid");
//     rebuildAdminManagementTable();
//     alert(`[ADMIN NOTIFICATION MODULE] Successfully injected asset database node: ${dynamicNodeIdentifierKey}. Inventory views dynamically parsed.`);
// }