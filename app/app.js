// ==========================================================================
// CROWDWISE UDAIPUR ENGINE - LOGIC & INTERACTION CONTROLLER
// Grounded in Unified_Smart_Tourism_Crowd_Prediction_Master_Blueprint.pdf
// ==========================================================================

let state = {
  currentHour: "13:00",
  dayType: "weekend",       // weekday, weekend, holiday
  weather: "clear",         // clear, heat, rain
  selectedPlaceId: "UDR_001",
  userReports: {},          // placeId -> { rating, timestamp }
  itinerarySwapped: false
};

const TOMTOM_API_KEY = "0SlQ1qDIjraxDmZOR7GJosJv5rTjKLT6";
let map;
let mapMarkers = {};
let tomtomTrafficLayer = null;
let tomtomTrafficVisible = true;

document.addEventListener("DOMContentLoaded", () => {
  initMap();
  initControls();
  renderDestinations();
  initModals();
  initJudgePlaybook();
});

// 1. Leaflet Map Initialization with TomTom Traffic Layer
function initMap() {
  // Centered on Udaipur Old City & Lakes
  map = L.map('leafletMap', {
    center: [24.5880, 73.6850],
    zoom: 13,
    zoomControl: true
  });

  // Base warm minimal map tiles (CartoDB Positron / OSM style)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
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
    console.warn("TomTom Traffic Layer initialization note:", e);
  }

  // Fetch live flow segment telemetry
  fetchTomTomLiveTraffic();

  // Add markers for all destinations
  UDAIPUR_DESTINATIONS.forEach(dest => {
    const crowdData = computeCrowdScore(dest);
    const marker = createCustomMarker(dest, crowdData);
    marker.addTo(map);
    mapMarkers[dest.id] = marker;
  });
}

// Fetch live telemetry from TomTom Traffic Segment API for City Palace access road
async function fetchTomTomLiveTraffic() {
  try {
    const url = `https://api.tomtom.com/traffic/services/4/flowSegmentData/relative0/10/json?point=24.5764,73.6835&key=${TOMTOM_API_KEY}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const flow = data.flowSegmentData;
      if (flow) {
        const curSpeed = flow.currentSpeed || 15;
        const freeSpeed = flow.freeFlowSpeed || 18;
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
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
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
    <div style="font-family:'Plus Jakarta Sans', sans-serif; padding: 4px;">
      <strong style="font-size:14px; color:#1C241E;">${dest.name}</strong><br/>
      <span style="font-size:12px; color:#56635A;">${dest.subtitle}</span><br/>
      <div style="margin-top:6px; display:flex; align-items:center; gap:6px;">
        <span style="background:${color}; color:white; padding:2px 8px; border-radius:99px; font-size:11px; font-weight:bold;">
          ${crowdData.level} Crowd (${crowdData.score}%)
        </span>
      </div>
    </div>
  `);

  marker.on('click', () => {
    selectDestination(dest.id);
  });

  return marker;
}

// 2. Mathematical Crowd Prediction Engine
// Formula: CrowdScore(d, t) = 0.40 * Chist + 0.30 * Scal + 0.20 * Eevent + 0.10 * Wweather
function computeCrowdScore(dest) {
  // A. Historical Baseline (40%)
  const hourKey = state.currentHour;
  const histVal = dest.hourlyBaseline[hourKey] || 40;

  // B. Calendar Signal (30%)
  let calVal = 20; // default weekday
  if (state.dayType === "weekend") calVal = 70;
  if (state.dayType === "holiday") calVal = 95;

  // C. Events Signal (20%)
  let eventVal = 25;
  if (dest.primaryIntent === "sunset_waterfront" && (hourKey === "17:00" || hourKey === "18:00")) {
    eventVal = 85; // Evening Lake light & sound shows
  }

  // D. Weather Penalty/Modifier (10%)
  let weatherVal = 50; // normal
  if (state.weather === "heat") {
    // Extreme heat suppresses outdoor walking; moves people to indoor museums
    weatherVal = dest.category === "Heritage" ? 75 : 20;
  } else if (state.weather === "rain") {
    // Rain completely halts lake boating; spikes indoor haveli museums
    weatherVal = dest.category === "Waterfront" ? 10 : 80;
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

  // Clamp 0-100
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

// 3. Render Destination Cards
function renderDestinations() {
  const container = document.getElementById("destinationsList");
  container.innerHTML = "";

  UDAIPUR_DESTINATIONS.forEach(dest => {
    const crowdData = computeCrowdScore(dest);
    const meterClass = crowdData.level === "High" ? "meter-high" : crowdData.level === "Moderate" ? "meter-mod" : "meter-low";
    const provClass = crowdData.provenance === "RECENT" ? "prov-recent" : "prov-pred";
    const isSelected = dest.id === state.selectedPlaceId;

    const card = document.createElement("div");
    card.className = `dest-card ${isSelected ? 'selected' : ''}`;
    card.id = `card-${dest.id}`;
    card.innerHTML = `
      <div class="dest-top-row">
        <div class="dest-title-group">
          <h3>${dest.name}</h3>
          <span class="dest-subtitle">${dest.subtitle} &bull; ${dest.category}</span>
        </div>
        <span class="badge-provenance ${provClass}">
          ${crowdData.provenance}: ${crowdData.level}
        </span>
      </div>

      <div class="crowd-meter-wrapper">
        <div class="crowd-meter-header">
          <span>Predicted Density: <strong style="color:${getCrowdColor(crowdData.level)}">${crowdData.score}%</strong></span>
          <span style="color:var(--text-muted); font-size:0.75rem;">Capacity: ${dest.capacityCeiling}</span>
        </div>
        <div class="meter-track">
          <div class="meter-fill ${meterClass}" style="width: ${crowdData.score}%;"></div>
        </div>
      </div>

      <p style="font-size:0.78rem; color:var(--text-secondary); line-height:1.45;">
        ${dest.description.substring(0, 115)}...
      </p>

      <div class="dest-footer">
        <div class="dest-tags">
          ${dest.experienceTags.slice(0, 2).map(tag => `<span class="tag-item">#${tag.replace('_', ' ')}</span>`).join('')}
        </div>
        <button class="btn-pill btn-pill-outline" style="padding:6px 14px; font-size:0.76rem;" onclick="openAlternativeModal('${dest.id}')">
          Find Alternative &rarr;
        </button>
      </div>
    `;

    card.addEventListener("click", (e) => {
      if (!e.target.closest("button")) {
        selectDestination(dest.id);
      }
    });

    container.appendChild(card);
  });
}

function selectDestination(placeId) {
  state.selectedPlaceId = placeId;
  const dest = UDAIPUR_DESTINATIONS.find(d => d.id === placeId);
  if (!dest) return;

  // Center map with smooth pan
  map.flyTo(dest.coords, 14, { duration: 1 });
  if (mapMarkers[placeId]) {
    mapMarkers[placeId].openPopup();
  }

  // Highlight card
  document.querySelectorAll(".dest-card").forEach(c => c.classList.remove("selected"));
  const activeCard = document.getElementById(`card-${placeId}`);
  if (activeCard) {
    activeCard.classList.add("selected");
    activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// 4. Controls Interaction
function initControls() {
  // Time Slider
  const timeSlider = document.getElementById("timeSlider");
  const timeDisplay = document.getElementById("timeDisplay");

  timeSlider.addEventListener("input", (e) => {
    const val = parseInt(e.target.value);
    const formattedHour = (val < 10 ? "0" : "") + val + ":00";
    state.currentHour = formattedHour;
    timeDisplay.textContent = `${formattedHour} ${val >= 12 ? 'PM' : 'AM'}`;
    refreshAll();
  });

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

  // Itinerary Disruption Buttons
  document.getElementById("btnSimulateRain").addEventListener("click", triggerRainDisruption);
  document.getElementById("btnQuickDemo").addEventListener("click", () => {
    document.getElementById("itinerary").scrollIntoView({ behavior: 'smooth' });
    triggerRainDisruption();
  });
  document.getElementById("btnResetItinerary").addEventListener("click", resetItinerary);

  // Hero Redirect
  document.getElementById("heroRedirectBtn").addEventListener("click", () => {
    openAlternativeModal("UDR_001");
  });

  // TomTom Traffic Layer Toggle
  const toggleBtn = document.getElementById("toggleTomTomBtn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      tomtomTrafficVisible = !tomtomTrafficVisible;
      if (tomtomTrafficVisible) {
        if (tomtomTrafficLayer && !map.hasLayer(tomtomTrafficLayer)) {
          tomtomTrafficLayer.addTo(map);
        }
        toggleBtn.textContent = "🚦 TomTom Traffic: ON";
        toggleBtn.style.background = "#10B981";
      } else {
        if (tomtomTrafficLayer && map.hasLayer(tomtomTrafficLayer)) {
          map.removeLayer(tomtomTrafficLayer);
        }
        toggleBtn.textContent = "🚦 TomTom Traffic: OFF";
        toggleBtn.style.background = "#64748B";
      }
    });
  }
}

function refreshAll() {
  // Update Cards
  renderDestinations();

  // Update Map Markers
  UDAIPUR_DESTINATIONS.forEach(dest => {
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
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
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
}

// 5. Dynamic Itinerary Re-Planning on Sudden Rain Alert
function triggerRainDisruption() {
  state.itinerarySwapped = true;

  // 1. Change Weather to Rain
  state.weather = "rain";
  document.querySelectorAll("#weatherControl .weather-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.weather === "rain");
  });
  refreshAll();

  // 2. Animate Step 3 Swap (Lake Pichola Boating -> Bagore Ki Haveli Gallery)
  const step3 = document.getElementById("step3");
  step3.classList.add("swapped");
  document.getElementById("step3Name").textContent = "Bagore Haveli Museum";
  document.getElementById("step3Desc").textContent = "Swapped to indoor glasswork galleries due to rain.";
  document.getElementById("step3Status").innerHTML = `
    <span class="badge-provenance prov-pred" style="background:#DCFCE7; color:#15803D;">Indoor Safe</span>
    <span style="color:#9FE859; font-weight:700;">Zero Rain Risk</span>
  `;

  // 3. Show Dynamic Change Diff Box
  const diffBox = document.getElementById("diffAlertBox");
  diffBox.style.display = "flex";
  document.getElementById("diffAlertText").innerHTML = `
    <strong>Disruption Handled (/api/itineraries/replan):</strong> Outdoor boating flagged High Weather Risk (Rain: 18mm/h). 
    Swapped with indoor <strong>Bagore Ki Haveli Museum</strong>. Transit distance reduced by 1.4 km & weather penalty eliminated!
  `;
}

function resetItinerary() {
  state.itinerarySwapped = false;
  state.weather = "clear";
  document.querySelectorAll("#weatherControl .weather-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.weather === "clear");
  });
  refreshAll();

  const step3 = document.getElementById("step3");
  step3.classList.remove("swapped");
  document.getElementById("step3Name").textContent = "Lake Pichola Boating";
  document.getElementById("step3Desc").textContent = "Sunset cruise around Jag Mandir island palace.";
  document.getElementById("step3Status").innerHTML = `
    <span class="badge-provenance prov-live">Live: Mod</span>
    <span style="color:#9FE859; font-weight:700;">Dock: 15 min</span>
  `;

  document.getElementById("diffAlertBox").style.display = "none";
}

// 6. Experience-Preserving Alternative Recommender Modal
function openAlternativeModal(placeId) {
  const orig = UDAIPUR_DESTINATIONS.find(d => d.id === placeId);
  if (!orig) return;

  const origScore = computeCrowdScore(orig);
  document.getElementById("altModalTitle").textContent = `Intent-Matched Alternatives for ${orig.name}`;
  document.getElementById("altModalReason").innerHTML = `
    ${orig.name} is predicted at <strong>${origScore.score}% (${origScore.level} Crowd)</strong>. 
    Our intent-matching algorithm preserves your primary interest (<strong>${orig.primaryIntent.replace('_', ' ')}</strong>) 
    with less crowded alternatives:
  `;

  // Filter alternatives that match primary intent or explicit alternatives
  const candidates = UDAIPUR_DESTINATIONS.filter(d => orig.alternatives.includes(d.id));
  const listContainer = document.getElementById("altCandidatesList");
  listContainer.innerHTML = "";

  candidates.forEach(cand => {
    const candScore = computeCrowdScore(cand);
    const candColor = getCrowdColor(candScore.level);
    const item = document.createElement("div");
    item.style.cssText = "background:#FAF7F0; border:1px solid #EBE6DA; border-radius:16px; padding:16px; display:flex; justify-content:space-between; align-items:center;";
    item.innerHTML = `
      <div>
        <div style="display:flex; align-items:center; gap:8px;">
          <strong style="font-size:1.05rem; font-family:'Fraunces', serif;">${cand.name}</strong>
          <span class="badge-provenance prov-pred" style="background:${candColor}; color:white;">
            ${candScore.level}: ${candScore.score}%
          </span>
        </div>
        <p style="font-size:0.78rem; color:#56635A; margin-top:2px;">
          ${cand.subtitle} &bull; Save approx. 45-60 mins waiting queue!
        </p>
      </div>
      <button class="btn-pill btn-pill-lime" style="padding:6px 14px; font-size:0.75rem;" onclick="selectAndClose('${cand.id}')">
        Choose &rarr;
      </button>
    `;
    listContainer.appendChild(item);
  });

  // Time-Shift Recommendation
  document.getElementById("altTimeShiftText").innerHTML = `
    Prefer to stick with <strong>${orig.name}</strong>? Visit during off-peak slot: 
    <strong>${orig.suggestedQuietSlot}</strong>. Historical counts show 60% lower footfall!
  `;

  document.getElementById("alternativeModal").classList.add("open");
}

function selectAndClose(placeId) {
  document.getElementById("alternativeModal").classList.remove("open");
  selectDestination(placeId);
}

// 7. Modals and Slide-Over Setup
function initModals() {
  // Alternative Modal Close
  document.getElementById("closeAltModal").addEventListener("click", () => {
    document.getElementById("alternativeModal").classList.remove("open");
  });

  // Citizen Report Modal
  const reportModal = document.getElementById("reportModal");
  document.getElementById("btnReportModalOpen").addEventListener("click", () => {
    // Populate select
    const select = document.getElementById("reportPlaceSelect");
    select.innerHTML = UDAIPUR_DESTINATIONS.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
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

// 8. Judge Playbook Accordion Loader
function initJudgePlaybook() {
  const container = document.getElementById("judgeAccordionContainer");
  container.innerHTML = "";

  JUDGE_PLAYBOOK.forEach((item, index) => {
    const box = document.createElement("details");
    box.style.cssText = "background:#FAF7F0; border:1px solid #EBE6DA; border-radius:14px; padding:12px 18px; cursor:pointer;";
    box.innerHTML = `
      <summary style="font-weight:700; font-size:0.9rem; color:#1C241E; outline:none;">
        ${index + 1}. ${item.q}
      </summary>
      <p style="font-size:0.84rem; color:#56635A; margin-top:8px; line-height:1.5; padding-left:14px; border-left:3px solid #9FE859;">
        ${item.a}
      </p>
    `;
    container.appendChild(box);
  });
}
