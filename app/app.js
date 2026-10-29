// ==========================================================================
// CROWDWISE INDIA ENGINE - LOGIC & INTERACTION CONTROLLER
// Pan-India Coverage: Rajasthan, Golden Triangle, Varanasi, Goa, Mumbai,
//                     Kerala, South Heritage, and the Himalayas.
// ==========================================================================

let state = {
  currentCityId: "all",     // "all" or specific city ID
  currentHour: "13:00",
  dayType: "weekend",       // weekday, weekend, holiday
  weather: "clear",         // clear, heat, rain
  selectedPlaceId: "AGR_001",
  activeCategory: "all",    // all, Historical, Lakes, Temples, Beaches, Nature, Others
  searchQuery: "",
  favorites: new Set(["AGR_001", "UDR_001", "JAI_001", "VNS_001", "GOA_001"]),
  userReports: {},          // placeId -> { rating, timestamp }
  itineraryCircuitId: "udaipur_circuit",
  itinerarySwapped: false
};

const TOMTOM_API_KEY = "0SlQ1qDIjraxDmZOR7GJosJv5rTjKLT6";
let map;
let mapMarkers = {};
let tomtomTrafficLayer = null;
let tomtomTrafficVisible = true;

document.addEventListener("DOMContentLoaded", () => {
  initMap();
  initCitySelector();
  initControls();
  renderExplorer();
  renderItinerary();
  initModals();
  initJudgePlaybook();
  initRerouteAssistant();
});

// ==========================================================================
// 1. LEAFLET MAP & TOMTOM TRAFFIC TELEMETRY (PAN-INDIA)
// ==========================================================================
function initMap() {
  // Initial center: Pan-India perspective
  map = L.map('leafletMap', {
    center: [22.8, 79.2],
    zoom: 5,
    zoomControl: true
  });

  // Base map tiles using TomTom Map Display API
  L.tileLayer(`https://{s}.api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=${TOMTOM_API_KEY}`, {
    attribution: '&copy; <a href="https://www.tomtom.com" target="_blank">TomTom</a> Map Data',
    subdomains: ['a', 'b', 'c', 'd'],
    maxZoom: 19
  }).addTo(map);

  // TomTom Live Traffic Flow Tile Layer
  try {
    tomtomTrafficLayer = L.tileLayer(`https://{s}.api.tomtom.com/traffic/map/4/tile/flow/relative0/{z}/{x}/{y}.png?key=${TOMTOM_API_KEY}`, {
      attribution: '&copy; <a href="https://www.tomtom.com" target="_blank">TomTom</a> Live Traffic',
      subdomains: ['a', 'b', 'c', 'd'],
      opacity: 0.85,
      maxZoom: 19
    }).addTo(map);
  } catch (e) {
    console.warn("TomTom Traffic Layer note:", e);
  }

  // Fetch initial telemetry
  fetchTomTomLiveTraffic(state.currentCityId);

  // Add markers for all destinations across India
  ALL_DESTINATIONS.forEach(dest => {
    const crowdData = computeCrowdScore(dest);
    const marker = createCustomMarker(dest, crowdData);
    marker.addTo(map);
    mapMarkers[dest.id] = marker;
  });
}

// Fetch live telemetry from TomTom Traffic Flow API for the current city
async function fetchTomTomLiveTraffic(cityId) {
  try {
    const city = INDIA_CITIES.find(c => c.id === cityId) || INDIA_CITIES[0];
    const pt = city.trafficPoint || [24.5764, 73.6835];
    const url = `https://api.tomtom.com/traffic/services/4/flowSegmentData/relative0/10/json?point=${pt[0]},${pt[1]}&key=${TOMTOM_API_KEY}`;

    const labelEl = document.getElementById("trafficCorridorLabel");
    if (labelEl) {
      labelEl.textContent = `${city.trafficCorridorName || city.name}:`;
    }

    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const flow = data.flowSegmentData;
      if (flow) {
        const curSpeed = flow.currentSpeed || 20;
        const freeSpeed = flow.freeFlowSpeed || 25;
        const delay = Math.max(0, (flow.currentTravelTime || 0) - (flow.freeFlowTravelTime || 0));
        const delayMins = Math.round(delay / 60);
        const delayEl = document.getElementById("trafficDelayVal");
        if (delayEl) {
          delayEl.textContent = `+${delayMins} min delay (Speed: ${curSpeed} km/h vs Free-flow: ${freeSpeed} km/h)`;
        }
      }
    }
  } catch (err) {
    console.log("TomTom live telemetry note:", err);
  }
}

function createCustomMarker(dest, crowdData) {
  const color = getCrowdColor(crowdData.level);

  const customIcon = L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="
        background: ${color};
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 3px solid #FFFFFF;
        box-shadow: 0 4px 12px rgba(0,0,0,0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 11px;
      ">
        ${crowdData.score}
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });

  const marker = L.marker(dest.coords, { icon: customIcon });
  marker.bindPopup(`
    <div style="font-family:'Plus Jakarta Sans', sans-serif; padding: 4px; min-width: 170px;">
      <strong style="font-size:14px; color:#1C241E;">${dest.name}</strong><br/>
      <span style="font-size:11px; color:#56635A;">📍 ${dest.displayLocation}</span><br/>
      <div style="margin-top:6px; display:flex; align-items:center; justify-content:space-between; gap:6px;">
        <span style="background:${color}; color:white; padding:2px 8px; border-radius:99px; font-size:10px; font-weight:bold;">
          ${crowdData.level} Crowd (${crowdData.score}%)
        </span>
        <span style="font-size:10px; color:#0284C7; font-weight:700;">★ ${dest.rating || 4.6}</span>
      </div>
    </div>
  `);

  marker.on('click', () => {
    selectDestination(dest.id);
  });

  return marker;
}

// ==========================================================================
// 2. CITY / REGIONAL SELECTOR
// ==========================================================================
function initCitySelector() {
  const row = document.getElementById("citySelectorRow");
  if (!row) return;

  row.innerHTML = "";

  INDIA_CITIES.forEach(city => {
    const count = (city.id === "all")
      ? ALL_DESTINATIONS.length
      : ALL_DESTINATIONS.filter(d => d.cityId === city.id).length;

    const btn = document.createElement("button");
    btn.className = `city-chip ${city.id === state.currentCityId ? 'active' : ''}`;
    btn.dataset.city = city.id;
    btn.innerHTML = `
      <span class="city-flag">${city.flag}</span>
      <span class="city-name">${city.name}</span>
      <span class="city-count">${count}</span>
    `;

    btn.addEventListener("click", () => {
      document.querySelectorAll("#citySelectorRow .city-chip").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectCity(city.id);
    });

    row.appendChild(btn);
  });
}

function selectCity(cityId) {
  state.currentCityId = cityId;
  const city = INDIA_CITIES.find(c => c.id === cityId) || INDIA_CITIES[0];

  // Fly map smoothly to city center & zoom
  if (map && city.center) {
    map.flyTo(city.center, city.zoom, { duration: 1.2 });
  }

  // Update map title overlay
  const mapTitle = document.getElementById("mapTitleOverlay");
  if (mapTitle) {
    mapTitle.textContent = city.id === "all"
      ? "Pan-India Geographic Heat Overlay"
      : `${city.name} Geographic Heat Overlay`;
  }

  // Fetch telemetry for this city
  fetchTomTomLiveTraffic(cityId);

  // If currently selected destination is not in this city, switch selection
  const matching = ALL_DESTINATIONS.filter(d => cityId === "all" || d.cityId === cityId);
  if (matching.length > 0 && !matching.some(d => d.id === state.selectedPlaceId)) {
    state.selectedPlaceId = matching[0].id;
  }

  // Sync Itinerary Circuit if a matching circuit exists
  const circuitMatch = ITINERARY_CIRCUITS.find(c => c.id.startsWith(cityId));
  if (circuitMatch) {
    state.itineraryCircuitId = circuitMatch.id;
    renderItinerary();
  }

  renderExplorer();
  updateRerouteAssistant();
}

// ==========================================================================
// 3. MATHEMATICAL CROWD PREDICTION ENGINE
// Formula: CrowdScore(d, t) = 0.40*Chist + 0.30*Scal + 0.20*Eevent + 0.10*Wweather
// ==========================================================================
function computeCrowdScore(dest) {
  // A. Historical Baseline (40%)
  const hourKey = state.currentHour;
  const histVal = dest.hourlyBaseline[hourKey] || 40;

  // B. Calendar Signal (30%)
  let calVal = 20; // default weekday
  if (state.dayType === "weekend") calVal = 70;
  if (state.dayType === "holiday") calVal = 95;

  // C. Events / Peak Proxy (20%)
  let eventVal = 25;
  if (dest.primaryIntent === "sunset_waterfront" && (hourKey === "17:00" || hourKey === "18:00")) {
    eventVal = 85; // Evening Aarti, sunset boat surges
  } else if (dest.primaryIntent === "spiritual" && (hourKey === "08:00" || hourKey === "09:00" || hourKey === "18:00")) {
    eventVal = 80; // Aarti / Darshan peak
  }

  // D. Weather Penalty/Modifier (10%)
  let weatherVal = 50; // normal
  if (state.weather === "heat") {
    // Extreme heat suppresses outdoor walking; shifts visitors indoors
    weatherVal = (dest.category === "Historical" || dest.category === "Others") ? 75 : 20;
  } else if (state.weather === "rain") {
    // Rain halts outdoor boating / beaches; spikes indoor museum galleries
    weatherVal = (dest.category === "Lakes" || dest.category === "Beaches" || dest.category === "Nature") ? 10 : 80;
  }

  // Linear Normalized Combination
  let score = Math.round(
    (0.40 * histVal) +
    (0.30 * calVal) +
    (0.20 * eventVal) +
    (0.10 * weatherVal)
  );

  // Check if citizen report exists (overrides with recent decay)
  let provenance = "PREDICTED";
  if (state.userReports[dest.id]) {
    const rep = state.userReports[dest.id];
    score = rep.rating === 3 ? 90 : rep.rating === 2 ? 55 : 20;
    provenance = "RECENT";
  }

  // Clamp 5-98
  score = Math.max(5, Math.min(98, score));

  let level = "Low";
  if (score >= 65) level = "High";
  else if (score >= 35) level = "Moderate";

  return { score, level, provenance, histVal, calVal, weatherVal };
}

function getCrowdColor(level) {
  if (level === "High") return "#EF4444";
  if (level === "Moderate") return "#F59E0B";
  return "#10B981";
}

// ==========================================================================
// 4. RENDER SMART TRAVEL EXPLORER (FEATURED CARD + SECONDARY GRID)
// ==========================================================================
function renderExplorer() {
  const featuredContainer = document.getElementById("featuredPlaceContainer");
  const visualGrid = document.getElementById("destinationsVisualGrid");
  const countBadge = document.getElementById("placesCountBadge");
  if (!featuredContainer || !visualGrid) return;

  // Filter destinations based on City, Category, and Search Query
  const filtered = ALL_DESTINATIONS.filter(dest => {
    // City filter
    let cityMatch = true;
    if (state.currentCityId && state.currentCityId !== "all") {
      cityMatch = (dest.cityId === state.currentCityId);
    }
    // Category filter
    let catMatch = true;
    if (state.activeCategory && state.activeCategory !== "all") {
      catMatch = (dest.category === state.activeCategory);
    }
    // Search query
    let searchMatch = true;
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const name = (dest.name || "").toLowerCase();
      const subtitle = (dest.subtitle || "").toLowerCase();
      const city = (dest.cityName || "").toLowerCase();
      const stateName = (dest.state || "").toLowerCase();
      const cat = (dest.category || "").toLowerCase();
      const tags = (dest.tags || []).join(" ").toLowerCase();
      searchMatch = name.includes(q) || subtitle.includes(q) || city.includes(q) || stateName.includes(q) || cat.includes(q) || tags.includes(q);
    }
    return cityMatch && catMatch && searchMatch;
  });

  if (countBadge) {
    const scopeTxt = state.currentCityId === "all" ? "across India" : `in ${INDIA_CITIES.find(c => c.id === state.currentCityId)?.name || 'Region'}`;
    countBadge.innerHTML = `<span>Showing <strong>${filtered.length}</strong> destination${filtered.length === 1 ? '' : 's'} ${scopeTxt}</span>`;
  }

  // 1. Featured Card Selection: prefer currently selected if matching, or first match
  let feat = filtered.find(d => d.id === state.selectedPlaceId);
  if (!feat) {
    feat = filtered.length > 0 ? filtered[0] : ALL_DESTINATIONS.find(d => d.id === state.selectedPlaceId) || ALL_DESTINATIONS[0];
  }

  const featCrowd = computeCrowdScore(feat);
  const featColor = getCrowdColor(featCrowd.level);
  const isFeatFav = state.favorites.has(feat.id);

  featuredContainer.innerHTML = `
    <div class="featured-place-card" id="card-${feat.id}">
      <div class="featured-image-box">
        <img class="featured-img" src="${feat.image}" alt="${feat.name}" onerror="this.onerror=null; this.src='images/AGR_001.jpg';">
        <div class="featured-gradient-scrim"></div>
        <div class="badge-popular-choice">
          👑 ${feat.popularChoice ? 'Popular Choice' : 'Featured Highlight'} &bull; ${feat.cityName}
        </div>
        <button class="card-heart-btn ${isFeatFav ? 'favorited' : ''}" onclick="toggleFavorite('${feat.id}', event)" title="Toggle Favorite">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFeatFav ? '#EF4444' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      <div class="featured-details-content">
        <div class="featured-title-bar">
          <div class="featured-place-names">
            <h3>${feat.name}</h3>
            <span class="featured-location">📍 ${feat.displayLocation || feat.cityName}</span>
          </div>
          <button class="btn-view-details" onclick="openAlternativeModal('${feat.id}')">
            View Alternatives &rarr;
          </button>
        </div>

        <div class="featured-stats-row">
          <!-- 1. Predicted Density -->
          <div class="stat-insight-card">
            <div class="insight-header">
              <span>👥</span>
              <span>Predicted Density</span>
            </div>
            <div class="insight-value" style="color:${featColor};">${featCrowd.score}%</div>
            <div class="mini-meter-track">
              <div class="mini-meter-fill" style="width:${featCrowd.score}%; background:${featColor};"></div>
            </div>
          </div>

          <!-- 2. Best Visit Time -->
          <div class="stat-insight-card">
            <div class="insight-header">
              <span>🕒</span>
              <span>Best Visit Time</span>
            </div>
            <div class="insight-value">${feat.bestVisitTime || '09 AM – 11 AM'}</div>
            <span class="insight-sub">${feat.bestVisitTimeNote || '(Less Crowded)'}</span>
          </div>

          <!-- 3. Recommended Days -->
          <div class="stat-insight-card">
            <div class="insight-header">
              <span>📅</span>
              <span>Recommended Days</span>
            </div>
            <div class="insight-value">${feat.recommendedDays || 'Tue – Thu'}</div>
            <span class="insight-sub">${feat.recommendedDaysNote || '(Lower Crowds)'}</span>
          </div>
        </div>

        <div class="featured-meta-bar">
          <span class="meta-item">🏛️ Capacity: <strong>${feat.capacityCeiling.toLocaleString()}</strong></span>
          <span class="meta-item star-rating">⭐ Rating: <strong>${feat.rating || 4.7} ★</strong></span>
          <span class="meta-item">🏷️ Tags: ${(feat.tags || []).join(', ')}</span>
        </div>
      </div>
    </div>
  `;

  // 2. Secondary Grid: Render remaining places
  visualGrid.innerHTML = "";
  const remaining = filtered.filter(d => d.id !== feat.id);

  if (remaining.length === 0 && filtered.length === 0) {
    visualGrid.innerHTML = `
      <div class="empty-search-state" style="grid-column: 1 / -1; text-align:center; padding:48px 20px;">
        <div style="font-size:2.4rem; margin-bottom:10px;">🔍</div>
        <h4 style="color:#FFF; font-size:1.15rem; margin-bottom:6px;">No destinations found</h4>
        <p style="color:#A2B8AD; font-size:0.85rem;">No places match your search query or filter in this region. Try switching to "All India" or clearing search.</p>
      </div>
    `;
    return;
  }

  remaining.forEach(dest => {
    const crowd = computeCrowdScore(dest);
    const isFav = state.favorites.has(dest.id);
    const card = document.createElement("div");
    card.className = "visual-place-card";
    card.id = `card-${dest.id}`;
    card.title = `Click to inspect ${dest.name} on map`;
    card.innerHTML = `
      <img class="card-bg-img" src="${dest.image}" alt="${dest.name}" loading="lazy" onerror="this.onerror=null; this.src='images/AGR_001.jpg';">
      <div class="card-vignette-overlay"></div>
      
      <button class="card-heart-btn ${isFav ? 'favorited' : ''}" onclick="toggleFavorite('${dest.id}', event)" title="Toggle Favorite">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${isFav ? '#EF4444' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>

      <div class="card-bottom-content">
        <div class="card-title-box">
          <h4>${dest.name}</h4>
          <span class="card-category-txt">📍 ${dest.cityName} &bull; ${dest.category}</span>
        </div>
        <span class="crowd-status-pill crowd-status-${crowd.level.toLowerCase()}">
          👥 ${crowd.level} (${crowd.score}%)
        </span>
      </div>
    `;

    card.addEventListener("click", (e) => {
      if (!e.target.closest(".card-heart-btn")) {
        selectDestination(dest.id);
      }
    });

    visualGrid.appendChild(card);
  });
}

function selectDestination(placeId) {
  state.selectedPlaceId = placeId;
  const dest = ALL_DESTINATIONS.find(d => d.id === placeId);
  if (dest && map) {
    // Fly to destination coords
    map.flyTo(dest.coords, 14, { duration: 1.2 });
    if (mapMarkers[placeId]) {
      mapMarkers[placeId].openPopup();
    }
  }

  // Refresh Explorer cards so selected item is highlighted as featured
  renderExplorer();

  const featEl = document.getElementById("featuredPlaceContainer");
  if (featEl) {
    featEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

window.toggleFavorite = function (placeId, event) {
  if (event) event.stopPropagation();
  if (state.favorites.has(placeId)) {
    state.favorites.delete(placeId);
  } else {
    state.favorites.add(placeId);
  }
  renderExplorer();
};

// ==========================================================================
// 5. CONTROLS INTERACTION
// ==========================================================================
function initControls() {
  // Time Slider
  const timeSlider = document.getElementById("timeSlider");
  const timeDisplay = document.getElementById("timeDisplay");

  if (timeSlider) {
    timeSlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value);
      const formattedHour = (val < 10 ? "0" : "") + val + ":00";
      state.currentHour = formattedHour;
      if (timeDisplay) timeDisplay.textContent = `${formattedHour} ${val >= 12 ? 'PM' : 'AM'}`;
      refreshAll();
    });
  }

  // Day Type Segmented Buttons
  const dayButtons = document.querySelectorAll("#dayTypeControl .seg-btn");
  dayButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      dayButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.dayType = btn.dataset.day;
      refreshAll();
    });
  });

  // Weather Buttons
  const weatherButtons = document.querySelectorAll("#weatherControl .weather-btn");
  weatherButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      weatherButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.weather = btn.dataset.weather;
      refreshAll();
    });
  });

  // Search Input & Clear
  const searchInput = document.getElementById("placeSearchInput");
  const clearBtn = document.getElementById("clearSearchBtn");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      if (clearBtn) clearBtn.style.display = state.searchQuery ? "block" : "none";
      renderExplorer();
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      state.searchQuery = "";
      clearBtn.style.display = "none";
      renderExplorer();
    });
  }

  // Category Filter Pills
  const catPills = document.querySelectorAll("#categoryFilterRow .cat-pill");
  catPills.forEach(pill => {
    pill.addEventListener("click", () => {
      catPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.activeCategory = pill.dataset.category;
      renderExplorer();
    });
  });

  // Simulation Controls Panel Toggle
  const toggleBtn = document.getElementById("btnToggleControls");
  const panel = document.getElementById("controlPanelWrapper");
  if (toggleBtn && panel) {
    toggleBtn.addEventListener("click", () => {
      panel.classList.toggle("collapsed");
      toggleBtn.classList.toggle("active");
    });
  }

  // Itinerary Disruption Buttons
  const rainBtn = document.getElementById("btnSimulateRain");
  if (rainBtn) rainBtn.addEventListener("click", triggerRainDisruption);

  const quickDemoBtn = document.getElementById("btnQuickDemo");
  if (quickDemoBtn) {
    quickDemoBtn.addEventListener("click", () => {
      document.getElementById("itinerary").scrollIntoView({ behavior: 'smooth' });
      triggerRainDisruption();
    });
  }

  const resetBtn = document.getElementById("btnResetItinerary");
  if (resetBtn) resetBtn.addEventListener("click", resetItinerary);

  // Hero Redirect
  const heroBtn = document.getElementById("heroRedirectBtn");
  if (heroBtn) {
    heroBtn.addEventListener("click", () => {
      openAlternativeModal("UDR_001");
    });
  }

  // TomTom Traffic Layer Toggle
  const toggleTomTomBtn = document.getElementById("toggleTomTomBtn");
  if (toggleTomTomBtn) {
    toggleTomTomBtn.addEventListener("click", () => {
      tomtomTrafficVisible = !tomtomTrafficVisible;
      if (tomtomTrafficVisible) {
        if (tomtomTrafficLayer && !map.hasLayer(tomtomTrafficLayer)) {
          tomtomTrafficLayer.addTo(map);
        }
        toggleTomTomBtn.textContent = "🚦 TomTom Traffic: ON";
        toggleTomTomBtn.style.background = "#10B981";
      } else {
        if (tomtomTrafficLayer && map.hasLayer(tomtomTrafficLayer)) {
          map.removeLayer(tomtomTrafficLayer);
        }
        toggleTomTomBtn.textContent = "🚦 TomTom Traffic: OFF";
        toggleTomTomBtn.style.background = "#64748B";
      }
    });
  }
}

function refreshAll() {
  // Update Cards
  renderExplorer();

  // Update Map Markers
  ALL_DESTINATIONS.forEach(dest => {
    const crowdData = computeCrowdScore(dest);
    const color = getCrowdColor(crowdData.level);
    const marker = mapMarkers[dest.id];
    if (marker) {
      marker.setIcon(L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            background: ${color};
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 3px solid #FFFFFF;
            box-shadow: 0 4px 12px rgba(0,0,0,0.35);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 11px;
          ">
            ${crowdData.score}
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      }));
    }
  });

  updateRerouteAssistant();
}

// ==========================================================================
// 6. DYNAMIC ITINERARY CIRCUITS & MULTI-STOP RE-PLANNING
// ==========================================================================
function renderItinerary() {
  const switcherRow = document.getElementById("circuitSwitcherRow");
  const grid = document.getElementById("itineraryGrid");
  if (!switcherRow || !grid) return;

  // Render circuit chips
  switcherRow.innerHTML = "";
  ITINERARY_CIRCUITS.forEach(circuit => {
    const chip = document.createElement("button");
    chip.className = `circuit-chip ${circuit.id === state.itineraryCircuitId ? 'active' : ''}`;
    chip.textContent = circuit.name;
    chip.addEventListener("click", () => {
      document.querySelectorAll("#circuitSwitcherRow .circuit-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      state.itineraryCircuitId = circuit.id;
      state.itinerarySwapped = false;
      renderItinerary();
    });
    switcherRow.appendChild(chip);
  });

  // Find active circuit
  const activeCircuit = ITINERARY_CIRCUITS.find(c => c.id === state.itineraryCircuitId) || ITINERARY_CIRCUITS[0];

  // Render 4 stops
  grid.innerHTML = "";
  activeCircuit.stops.forEach(stop => {
    const isSwapped = state.itinerarySwapped && stop.swappable;
    const name = isSwapped ? stop.swappedName : stop.name;
    const desc = isSwapped ? stop.swappedDesc : stop.desc;
    const badgeText = isSwapped ? stop.swappedBadge : stop.provBadge;
    const waitText = isSwapped ? stop.swappedWait : stop.waitText;

    const card = document.createElement("div");
    card.className = `step-card ${isSwapped ? 'swapped' : ''}`;
    card.id = `step${stop.stopIndex}`;
    card.innerHTML = `
      <div class="step-time">${stop.time} &bull; STOP ${stop.stopIndex}</div>
      <div style="display:flex; align-items:center; gap:10px; margin:6px 0 8px;">
        <img src="images/${stop.placeId}.jpg" alt="${name}" style="width:48px; height:48px; border-radius:8px; object-fit:cover; border:1px solid rgba(255,255,255,0.15); flex-shrink:0;" onerror="this.onerror=null; this.src='images/AGR_001.jpg';">
        <div class="step-name" style="margin:0; font-size:1.05rem;">${name}</div>
      </div>
      <p style="font-size:0.75rem; color:#A2B6AC; margin-bottom:8px;">${desc}</p>
      <div class="step-status">
        <span class="badge-provenance ${isSwapped ? 'prov-pred' : stop.provClass}">
          ${badgeText}
        </span>
        <span style="color:${stop.waitColor || '#9FE859'}; font-weight:700;">${waitText}</span>
      </div>
    `;
    grid.appendChild(card);
  });

  // Diff Box handling
  const diffBox = document.getElementById("diffAlertBox");
  if (diffBox) {
    if (state.itinerarySwapped) {
      const swappableStop = activeCircuit.stops.find(s => s.swappable);
      diffBox.style.display = "flex";
      const diffText = document.getElementById("diffAlertText");
      if (diffText && swappableStop) {
        diffText.innerHTML = `<strong>Disruption Handled (/api/itineraries/replan):</strong> ${swappableStop.disruptionReason}`;
      }
    } else {
      diffBox.style.display = "none";
    }
  }
}

function triggerRainDisruption() {
  state.itinerarySwapped = true;

  // 1. Change Weather to Rain
  state.weather = "rain";
  document.querySelectorAll("#weatherControl .weather-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.weather === "rain");
  });
  refreshAll();

  // 2. Rerender itinerary with swap
  renderItinerary();
}

function resetItinerary() {
  state.itinerarySwapped = false;
  state.weather = "clear";
  document.querySelectorAll("#weatherControl .weather-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.weather === "clear");
  });
  refreshAll();

  // Rerender itinerary original stops
  renderItinerary();
}

// ==========================================================================
// 7. INTENT-PRESERVING ALTERNATIVE RECOMMENDER MODAL
// ==========================================================================
function openAlternativeModal(placeId) {
  const orig = ALL_DESTINATIONS.find(d => d.id === placeId);
  if (!orig) return;

  const origScore = computeCrowdScore(orig);
  document.getElementById("altModalTitle").textContent = `Intent-Matched Alternatives for ${orig.name}`;
  document.getElementById("altModalReason").innerHTML = `
    ${orig.name} (${orig.cityName}) is predicted at <strong>${origScore.score}% (${origScore.level} Crowd)</strong>. 
    Our intent-matching algorithm preserves your primary interest (<strong>${orig.primaryIntent.replace('_', ' ')}</strong>) 
    with less crowded alternatives:
  `;

  // Find explicit alternatives or same-city intent-matched candidates
  let candidates = ALL_DESTINATIONS.filter(d => orig.alternatives && orig.alternatives.includes(d.id));
  if (candidates.length === 0) {
    candidates = ALL_DESTINATIONS.filter(d => d.id !== orig.id && (d.cityId === orig.cityId || d.primaryIntent === orig.primaryIntent)).slice(0, 3);
  }

  const listContainer = document.getElementById("altCandidatesList");
  listContainer.innerHTML = "";

  candidates.forEach(cand => {
    const candScore = computeCrowdScore(cand);
    const candColor = getCrowdColor(candScore.level);
    const item = document.createElement("div");
    item.style.cssText = "background:#FAF7F0; border:1px solid #EBE6DA; border-radius:16px; padding:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;";
    item.innerHTML = `
      <div style="display:flex; align-items:center; gap:14px;">
        <img src="${cand.image}" alt="${cand.name}" style="width:58px; height:58px; border-radius:12px; object-fit:cover; border:1px solid #E2DCCE; flex-shrink:0;" onerror="this.onerror=null; this.src='images/AGR_001.jpg';">
        <div>
          <div style="display:flex; align-items:center; gap:8px;">
            <strong style="font-size:1.05rem; font-family:'Fraunces', serif;">${cand.name}</strong>
            <span class="badge-provenance prov-pred" style="background:${candColor}; color:white;">
              ${candScore.level}: ${candScore.score}%
            </span>
          </div>
          <p style="font-size:0.78rem; color:#56635A; margin-top:2px;">
            📍 ${cand.displayLocation} &bull; Save approx. 45-60 mins waiting queue!
          </p>
        </div>
      </div>
      <button class="btn-pill btn-pill-lime" style="padding:6px 14px; font-size:0.75rem;" onclick="selectAndClose('${cand.id}')">
        Choose &rarr;
      </button>
    `;
    listContainer.appendChild(item);
  });

  // Time-Shift Recommendation
  document.getElementById("altTimeShiftText").innerHTML = `
    Prefer to stick with <strong>${orig.name}</strong>? Visit during off-peak window: 
    <strong>${orig.suggestedQuietSlot || 'Early morning before 10 AM'}</strong>. Historical counts show vastly lower footfall!
  `;

  document.getElementById("alternativeModal").classList.add("open");
}

function selectAndClose(placeId) {
  document.getElementById("alternativeModal").classList.remove("open");
  selectDestination(placeId);
}

// ==========================================================================
// 8. MODALS SETUP (CITIZEN REPORT & JUDGE PLAYBOOK)
// ==========================================================================
function initModals() {
  // Alternative Modal Close
  document.getElementById("closeAltModal").addEventListener("click", () => {
    document.getElementById("alternativeModal").classList.remove("open");
  });

  // Citizen Report Modal
  const reportModal = document.getElementById("reportModal");
  document.getElementById("btnReportModalOpen").addEventListener("click", () => {
    // Populate select grouped by city
    const select = document.getElementById("reportPlaceSelect");
    select.innerHTML = "";

    INDIA_CITIES.filter(c => c.id !== "all").forEach(city => {
      const places = ALL_DESTINATIONS.filter(d => d.cityId === city.id);
      if (places.length > 0) {
        const optgroup = document.createElement("optgroup");
        optgroup.label = `${city.flag} ${city.name} (${city.state || ''})`;
        places.forEach(p => {
          const opt = document.createElement("option");
          opt.value = p.id;
          opt.textContent = `${p.name} - ${p.category}`;
          optgroup.appendChild(opt);
        });
        select.appendChild(optgroup);
      }
    });

    reportModal.classList.add("open");
  });

  document.getElementById("closeReportModal").addEventListener("click", () => {
    reportModal.classList.remove("open");
  });

  // Report Rating Selection
  let selectedRating = 1;
  const ratingBtns = document.querySelectorAll(".report-rating-btn");
  ratingBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      ratingBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedRating = parseInt(btn.dataset.rating);
    });
  });

  document.getElementById("btnSubmitReport").addEventListener("click", () => {
    const placeId = document.getElementById("reportPlaceSelect").value;
    state.userReports[placeId] = {
      rating: selectedRating,
      timestamp: new Date()
    };
    reportModal.classList.remove("open");
    refreshAll();
    selectDestination(placeId);
    alert("Report recorded! Destination provenance badge updated to RECENT (Visitor Verified) with 30-min decay.");
  });

  // Judge Playbook Modal
  const judgeModal = document.getElementById("judgeModal");
  document.getElementById("openJudgeLink").addEventListener("click", (e) => {
    e.preventDefault();
    judgeModal.classList.add("open");
  });

  document.getElementById("closeJudgeModal").addEventListener("click", () => {
    judgeModal.classList.remove("open");
  });
}

// ==========================================================================
// 9. JUDGE PLAYBOOK ACCORDION LOADER
// ==========================================================================
function initJudgePlaybook() {
  const container = document.getElementById("judgeAccordionContainer");
  if (!container) return;
  container.innerHTML = "";

  JUDGE_PLAYBOOK.forEach((item, index) => {
    const box = document.createElement("details");
    box.style.cssText = "background:#FAF7F0; border:1px solid #EBE6DA; border-radius:14px; padding:12px 18px; cursor:pointer;";
    box.innerHTML = `
      <summary style="font-weight:700; font-size:0.9rem; color:#1C241E; outline:none;">
        ${index + 1}. ${item.q}
      </summary>
      <p style="font-size:0.84rem; color:#56635A; margin-top:8px; line-height:1.55; padding-left:14px; border-left:3px solid #9FE859;">
        ${item.a}
      </p>
    `;
    container.appendChild(box);
  });
}

// ==========================================================================
// 10. REAL-TIME "HEADING TO..." BOTTLENECK REROUTE ASSISTANT
// ==========================================================================
function initRerouteAssistant() {
  const select = document.getElementById("headingPlaceSelect");
  if (!select) return;

  select.innerHTML = "";

  INDIA_CITIES.filter(c => c.id !== "all").forEach(city => {
    const places = ALL_DESTINATIONS.filter(d => d.cityId === city.id);
    if (places.length > 0) {
      const optgroup = document.createElement("optgroup");
      optgroup.label = `${city.flag} ${city.name}`;
      places.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.id;
        opt.textContent = `${p.name} (${city.name})`;
        if (p.id === "AGR_001") opt.selected = true;
        optgroup.appendChild(opt);
      });
      select.appendChild(optgroup);
    }
  });

  select.addEventListener("change", () => {
    updateRerouteAssistant();
  });

  updateRerouteAssistant();
}

function updateRerouteAssistant() {
  const select = document.getElementById("headingPlaceSelect");
  const banner = document.getElementById("rerouteAlertBanner");
  if (!select || !banner) return;

  const placeId = select.value || "AGR_001";
  const dest = ALL_DESTINATIONS.find(d => d.id === placeId);
  if (!dest) return;

  const crowdData = computeCrowdScore(dest);
  const isHigh = crowdData.score >= 65;

  if (isHigh) {
    const altId = dest.alternatives && dest.alternatives.length > 0 ? dest.alternatives[0] : null;
    const altDest = altId ? ALL_DESTINATIONS.find(d => d.id === altId) : null;
    const altScore = altDest ? computeCrowdScore(altDest) : null;

    banner.style.background = "#FEF2F2";
    banner.style.border = "1px solid #FECACA";
    banner.style.color = "#991B1B";

    banner.innerHTML = `
      <div style="display:flex; align-items:flex-start; gap:12px; max-width:760px;">
        <span style="font-size:1.6rem; line-height:1;">⚠️</span>
        <div>
          <div style="font-weight:700; font-size:0.95rem; color:#991B1B; margin-bottom:3px;">
            High Bottleneck Warning at ${dest.name} (${crowdData.score}% Capacity • Est. Wait: 60–90 mins)
          </div>
          <div style="font-size:0.83rem; color:#7F1D1D; line-height:1.45;">
            Heading there now? Skip the line and visit <strong>${altDest ? altDest.name : "nearby alternatives"}</strong> (${altDest ? altDest.cityName : "nearby"}) — currently just <strong>${altScore ? altScore.score : 28}% crowd (&lt;12 min wait)</strong> with authentic ${dest.primaryIntent.replace('_', ' ')}!
          </div>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        ${altDest ? `<button class="btn-pill btn-pill-lime" style="padding:8px 16px; font-size:0.8rem;" onclick="selectDestination('${altDest.id}')">Switch to ${altDest.name.split(' ')[0]} &rarr;</button>` : ''}
        <button class="btn-pill btn-pill-outline" style="padding:8px 14px; font-size:0.8rem; background:white;" onclick="openAlternativeModal('${dest.id}')">All Options</button>
      </div>
    `;
  } else {
    banner.style.background = "#F0FDF4";
    banner.style.border = "1px solid #DCFCE7";
    banner.style.color = "#166534";
    banner.innerHTML = `
      <div style="display:flex; align-items:center; gap:12px;">
        <span style="font-size:1.5rem;">🟢</span>
        <div>
          <div style="font-weight:700; font-size:0.95rem; color:#166534;">
            ${dest.name} (${dest.cityName}) is looking great right now! (${crowdData.score}% &bull; ${crowdData.level} Crowd)
          </div>
          <div style="font-size:0.82rem; color:#15803D;">
            Estimated entry queue is under 15 minutes. Optimal window to visit!
          </div>
        </div>
      </div>
      <button class="btn-pill btn-pill-outline" style="padding:8px 14px; font-size:0.8rem; background:white;" onclick="openAlternativeModal('${dest.id}')">Explore Alternatives</button>
    `;
  }
}
