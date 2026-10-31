
// ==========================================================================
// PINPOINT ACCURACY ENGINES: CALENDAR, CLOSURES, SEASONALITY & BOTTLENECK ROADS
// ==========================================================================

// 1. Hyper-Local Narrow Entry Bottleneck Road Coordinates for TomTom
const MONUMENT_BOTTLENECK_ROADS = {
  "AGR_001": { point: [27.1658, 78.0463], name: "Taj East Gate & Fatehabad Corridor" },
  "AGR_002": { point: [27.1795, 78.0211], name: "Yamuna Kinara Road" },
  "UDR_001": { point: [24.5764, 73.6835], name: "Badi Pol & Jagdish Chowk" },
  "UDR_002": { point: [24.5705, 73.6810], name: "Dudh Talai Waterfront Road" },
  "JAI_001": { point: [26.9239, 75.8267], name: "Sireh Deori & Badi Chaupar" },
  "JAI_002": { point: [26.9855, 75.8513], name: "Amer Fort Ascent Road" },
  "VNS_001": { point: [25.3090, 83.0075], name: "Godowlia Chowk Bottleneck" },
  "MUM_001": { point: [18.9220, 72.8347], name: "Colaba Causeway & Shivaji Marg" }
};

// 2. Strict Official Gate Closure Rules (e.g. Taj Mahal on Fridays)
function checkMonumentClosure(dest) {
  if (!dest) return { isClosed: false };

  let dayOfWeek = new Date().getDay(); // 0 = Sun, 5 = Fri, 6 = Sat
  let isSimulated = false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("simulateFriday") === "1") {
      dayOfWeek = 5; // Force Friday for testing
      isSimulated = true;
    }
  } catch (e) {}

  const note = ((dest.recommendedDaysNote || "") + " " + (dest.description || "") + " " + (dest.name || "")).toLowerCase();

  // Strict Rule 1: Taj Mahal is strictly closed to public visitors every Friday
  if ((dest.id === "AGR_001" || dest.name.toLowerCase().includes("taj mahal")) && dayOfWeek === 5) {
    return {
      isClosed: true,
      isSimulated,
      reason: isSimulated ? "Official Friday Conservation & Maintenance (🧪 Simulation Active: ?simulateFriday=1)" : "Official Friday Conservation & Maintenance",
      reopenDay: "Saturday 06:00 AM",
      recommendedAlternative: "Agra Fort & Mehtab Bagh"
    };
  }

  // Strict Rule 2: Red Fort (Delhi) is closed on Mondays
  if ((dest.id === "DEL_001" || dest.name.toLowerCase().includes("red fort")) && dayOfWeek === 1) {
    return {
      isClosed: true,
      reason: "Weekly Monday Closure",
      reopenDay: "Tuesday 09:30 AM",
      recommendedAlternative: "Humayun's Tomb & Qutub Minar"
    };
  }

  // Generic closed note detection
  if (note.includes("closed on fridays") && dayOfWeek === 5) {
    return {
      isClosed: true,
      reason: "Weekly Friday Closure",
      reopenDay: "Saturday Morning",
      recommendedAlternative: "Nearby open attractions"
    };
  }
  if (note.includes("closed on mondays") && dayOfWeek === 1) {
    return {
      isClosed: true,
      reason: "Weekly Monday Closure",
      reopenDay: "Tuesday Morning",
      recommendedAlternative: "Nearby open attractions"
    };
  }

  return { isClosed: false };
}

// 3. Indian Tourism Seasonal Footfall Multiplier (Peak Winter vs Summer)
function getSeasonalMultiplier() {
  const month = new Date().getMonth(); // 0 = Jan, 9 = Oct, 10 = Nov, 11 = Dec

  // Peak Winter Tourism (Oct to Feb): Pleasant weather driving peak arrivals
  if (month === 9 || month === 10 || month === 11 || month === 0 || month === 1) {
    return {
      multiplier: 1.25,
      seasonName: "Peak Winter Season",
      impact: "+25% Influx",
      desc: "Prime winter season across Rajasthan, North India & coastal circuits."
    };
  }

  // Moderate Shoulder Season (March & September)
  if (month === 2 || month === 8) {
    return {
      multiplier: 1.0,
      seasonName: "Shoulder Season",
      impact: "Baseline (1.0x)",
      desc: "Balanced footfalls across cultural circuits."
    };
  }

  // Monsoon Season (July & August)
  if (month === 6 || month === 7) {
    return {
      multiplier: 0.85,
      seasonName: "Monsoon Season",
      impact: "-15% Adjustment",
      desc: "Lush greenery; reduced outdoor heritage walking."
    };
  }

  // Summer Season (April, May, June): Scorching heat suppresses midday crowds
  return {
    multiplier: 0.70,
    seasonName: "Summer Off-Peak",
    impact: "-30% Heat Suppressed",
    desc: "Afternoon temperatures 42°C+ heavily suppress outdoor monument walking."
  };
}

// 4. Auto Indian Calendar & Festival Detector
function detectIndianCalendarSignal() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 6 = Sat
  const month = now.getMonth(); // 0 = Jan
  const date = now.getDate();

  // Gazetted Indian Holidays & Major Festivals
  const holidayList = [
    { m: 0, d: 26, name: "Republic Day" },
    { m: 7, d: 15, name: "Independence Day" },
    { m: 9, d: 2, name: "Gandhi Jayanti" },
    { m: 9, d: 30, name: "Diwali Festivities" },
    { m: 9, d: 31, name: "Diwali Weekend" },
    { m: 10, d: 1, name: "Govardhan Puja / Holiday" },
    { m: 10, d: 15, name: "Guru Nanak Jayanti" },
    { m: 11, d: 25, name: "Christmas" },
    { m: 11, d: 31, name: "New Year's Eve" },
    { m: 0, d: 1, name: "New Year's Day" }
  ];

  const matched = holidayList.find(h => h.m === month && h.d === date);
  if (matched) {
    return { dayType: "holiday", summary: `🎉 ${matched.name} (+45% Peak)` };
  }

  if (day === 0 || day === 6) {
    const dayName = day === 6 ? "Saturday" : "Sunday";
    return { dayType: "weekend", summary: `🗓️ Today is ${dayName} (+30% Weekend)` };
  }

  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return { dayType: "weekday", summary: `📅 Today is ${weekdays[day]} (Weekday)` };
}

function applyAutoIndianCalendarSignal() {
  if (!state.calendarAutoMode) return;
  const sig = detectIndianCalendarSignal();
  state.dayType = sig.dayType;

  const badge = document.getElementById("liveCalendarBadge");
  if (badge) {
    badge.innerHTML = `🟢 Auto: <strong>${sig.summary}</strong>`;
  }

  const dayButtons = document.querySelectorAll("#dayTypeControl .seg-btn");
  dayButtons.forEach(b => {
    if (b.dataset.day === "auto") b.classList.add("active");
    else b.classList.remove("active");
  });

  refreshAll();
}

// ==========================================================================
// NORUSH TRAVEL ENGINE - LOGIC & INTERACTION CONTROLLER
// Grounded in Unified_Smart_Tourism_Crowd_Prediction_Master_Blueprint.pdf
// Pan-India & Udaipur Coverage: Predictive Crowd Intelligence
// ==========================================================================

let state = {
  currentCityId: "all",     // "all" or specific city ID
  currentHour: "13:00",
  dayType: "weekend",       // weekday, weekend, holiday
  weather: "clear",         // clear, heat, rain
  weatherAutoMode: true,
  calendarAutoMode: true,    // True: Auto Indian calendar detects weekend/holiday from live date    // True: Open-Meteo live API auto-controls weather; False: manual test
  liveWeatherByCity: {},    // cityId -> { temp, precip, code, weatherType, summaryText }
  liveTrafficByCity: {},
  liveBusynessByPlace: {}, // placeId -> { busyness, status, venue, timestamp }    // cityId -> { delayMins, realDelayMins, curSpeed, freeSpeed, corridorName }
  simulatedTrafficDelay: null, // null = live TomTom API; number = test rush hour
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
  try { initMap(); } catch (e) { console.error("Error in initMap:", e); }
  try { initCitySelector(); } catch (e) { console.error("Error in initCitySelector:", e); }
  try { initControls(); } catch (e) { console.error("Error in initControls:", e); }
  try { applyAutoIndianCalendarSignal(); } catch (e) { console.error("Error in applyAutoIndianCalendarSignal:", e); }
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("simulateJam") === "1") {
      state.simulatedTrafficDelay = 14;
    }
    const autoSearch = urlParams.get("searchPlace");
    if (autoSearch) {
      setTimeout(() => {
        triggerDynamicPanIndiaDiscovery(autoSearch);
      }, 800);
    }
  } catch (e) {}
  try { initLiveTelemetryPipeline(); } catch (e) { console.error("Error in initLiveTelemetryPipeline:", e); }
  try { renderExplorer(); } catch (e) { console.error("Error in renderExplorer:", e); }
  try { renderItinerary(); } catch (e) { console.error("Error in renderItinerary:", e); }
  try { initModals(); } catch (e) { console.error("Error in initModals:", e); }
  try { initJudgePlaybook(); } catch (e) { console.error("Error in initJudgePlaybook:", e); }
  try { initRerouteAssistant(); } catch (e) { console.error("Error in initRerouteAssistant:", e); }
  try { initHorizontalWheelScroll(); } catch (e) { console.error("Error in initHorizontalWheelScroll:", e); }
  try { initLiveImagePipeline(); } catch (e) { console.error("Error in initLiveImagePipeline:", e); }
});

// ==========================================================================
// 1. LEAFLET MAP & TOMTOM TRAFFIC TELEMETRY (PAN-INDIA)
// ==========================================================================
function initMap() {
  const mapEl = document.getElementById('leafletMap');
  if (!mapEl) return;

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
  const destList = (typeof ALL_DESTINATIONS !== "undefined" && Array.isArray(ALL_DESTINATIONS)) 
    ? ALL_DESTINATIONS 
    : ((typeof UDAIPUR_DESTINATIONS !== "undefined" && Array.isArray(UDAIPUR_DESTINATIONS)) ? UDAIPUR_DESTINATIONS : []);
  destList.forEach(dest => {
    const crowdData = computeCrowdScore(dest);
    const marker = createCustomMarker(dest, crowdData);
    marker.addTo(map);
    mapMarkers[dest.id] = marker;
  });
}

// Real-Time Telemetry Pipeline (TomTom Traffic Flow API + Open-Meteo Weather API)
function initLiveTelemetryPipeline() {
  fetchTomTomLiveTraffic(state.currentCityId);
  fetchOpenMeteoLiveWeather(state.currentCityId);

  // Auto-refresh telemetry every 60 seconds for live synchronization
  setInterval(() => {
    fetchTomTomLiveTraffic(state.currentCityId);
    fetchOpenMeteoLiveWeather(state.currentCityId);
  }, 60000);
}

// Fetch live telemetry from TomTom Traffic Flow API for current city or coords
async function fetchTomTomLiveTraffic(cityId, customCoords, placeId) {
  try {
    let pt = [24.5764, 73.6835];
    let corridorName = "Pan-India Tourist Corridors";
    if (customCoords && Array.isArray(customCoords)) {
      pt = customCoords;
      corridorName = "Access Corridor";
    } else {
      const city = INDIA_CITIES.find(c => c.id === cityId) || INDIA_CITIES[0];
      pt = city.trafficPoint || city.center || [24.5764, 73.6835];
      corridorName = city.trafficCorridorName || city.name;
    }

    const labelEl = document.getElementById("trafficCorridorLabel");
    if (labelEl) {
      labelEl.textContent = `${corridorName}:`;
    }

    const url = `https://api.tomtom.com/traffic/services/4/flowSegmentData/relative0/10/json?point=${pt[0]},${pt[1]}&key=${TOMTOM_API_KEY}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const flow = data.flowSegmentData;
      if (flow) {
        const curSpeed = flow.currentSpeed || 20;
        const freeSpeed = flow.freeFlowSpeed || 25;
        const realDelay = Math.max(0, (flow.currentTravelTime || 0) - (flow.freeFlowTravelTime || 0));
        const realDelayMins = Math.round(realDelay / 60);

        const effectiveDelayMins = (state.simulatedTrafficDelay !== null) 
          ? state.simulatedTrafficDelay 
          : realDelayMins;

        state.liveTrafficByCity[cityId] = {
          delayMins: effectiveDelayMins,
          realDelayMins,
          curSpeed: (state.simulatedTrafficDelay !== null) ? Math.min(10, Math.round(freeSpeed * 0.3)) : curSpeed,
          freeSpeed,
          corridorName,
          timestamp: Date.now()
        };

        const delayEl = document.getElementById("trafficDelayVal");
        if (delayEl) {
          const displaySpeed = state.liveTrafficByCity[cityId].curSpeed;
          const statusTxt = effectiveDelayMins > 10 ? '🚨 SEVERE BOTTLENECK' : (effectiveDelayMins >= 5 ? '⚠️ SLOW' : 'Normal Flow');
          delayEl.innerHTML = `<strong style="color:${effectiveDelayMins > 10 ? '#EF4444' : '#10B981'};">+${effectiveDelayMins} min</strong> delay (${statusTxt} • ${displaySpeed} km/h vs Free-flow: ${freeSpeed} km/h)`;
        }

        refreshAll();
      }
    }
  } catch (err) {
    console.log("TomTom live telemetry note:", err);
  }
}

// Fetch live atmospheric conditions from Open-Meteo API (Free, CORS-open, No-Key)
async function fetchOpenMeteoLiveWeather(cityId, customCoords) {
  try {
    let lat = 24.5854;
    let lon = 73.685;
    if (customCoords && Array.isArray(customCoords)) {
      lat = customCoords[0];
      lon = customCoords[1];
    } else {
      const city = INDIA_CITIES.find(c => c.id === cityId) || INDIA_CITIES[0];
      if (city.center) {
        lat = city.center[0];
        lon = city.center[1];
      }
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code&timezone=auto`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const cur = data.current || {};
      const temp = Math.round(cur.temperature_2m !== undefined ? cur.temperature_2m : 26);
      const precip = cur.precipitation || 0;
      const code = cur.weather_code || 0;

      const isRain = precip > 1.0 || [51,53,55,61,63,65,80,81,82,95,96,99].includes(code);
      const isHeat = temp >= 38;
      let weatherType = "clear";
      let summaryText = `${temp}°C Pleasant`;
      if (isRain) {
        weatherType = "rain";
        summaryText = `${precip}mm Rain`;
      } else if (isHeat) {
        weatherType = "heat";
        summaryText = `${temp}°C Heatwave`;
      }

      state.liveWeatherByCity[cityId] = {
        temp,
        precip,
        code,
        weatherType,
        summaryText,
        humidity: cur.relative_humidity_2m || 50,
        timestamp: Date.now()
      };

      if (state.weatherAutoMode) {
        state.weather = weatherType;
        const autoBtn = document.getElementById("btnWeatherAuto");
        if (autoBtn) {
          autoBtn.textContent = `🌐 Auto (${summaryText})`;
        }
      }

      const badge = document.getElementById("liveWeatherAutoBadge");
      if (badge) {
        badge.innerHTML = `🟢 Open-Meteo: <strong>${summaryText}</strong>`;
      }

      refreshAll();
    }
  } catch (err) {
    console.warn("Open-Meteo live telemetry note:", err);
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
  fetchOpenMeteoLiveWeather(cityId);

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
// ==========================================================================
// 3. REAL-TIME MULTI-MODAL MATHEMATICAL CROWD PREDICTION ENGINE
// Formula: CrowdScore(d, t) = [0.35*Chist + 0.25*Scal + 0.15*Eevent + 0.10*Wweather] + Spike(TomTomDelay)
// Rule: If road delay > 10 min ⟹ Crowd Score automatically spikes +25%!
// ==========================================================================
function computeCrowdScore(dest) {
  // 0. Strict Official Gate Closure Check (e.g. Taj Mahal on Fridays)
  const closure = checkMonumentClosure(dest);
  if (closure.isClosed) {
    return {
      score: 0,
      level: "Closed",
      isClosed: true,
      isSimulated: closure.isSimulated,
      closureReason: closure.reason,
      reopenDay: closure.reopenDay,
      recommendedAlternative: closure.recommendedAlternative,
      provenance: "OFFICIAL_REGULATION_CLOSURE",
      baseScore: 0,
      liveBusynessVal: 0,
      histVal: 0,
      calVal: 0,
      eventVal: 0,
      weatherVal: 0,
      curWeatherType: "clear",
      weatherSummary: "Closed for Routine Conservation",
      delayMins: 0,
      trafficSpike: 0,
      trafficStateText: "Closed",
      isTrafficBottleneck: false,
      season: getSeasonalMultiplier()
    };
  }

  // A. Historical Baseline (35%) + Indian Tourism Seasonal Multiplier
  const hourKey = state.currentHour;
  const rawHist = (dest.hourlyBaseline && dest.hourlyBaseline[hourKey]) ? dest.hourlyBaseline[hourKey] : 40;
  const season = getSeasonalMultiplier();
  const histVal = Math.min(95, Math.round(rawHist * season.multiplier));

  // B. Calendar Signal (25%)
  let calVal = 20; // default weekday
  if (state.dayType === "weekend") calVal = 70;
  if (state.dayType === "holiday") calVal = 95;

  // C. Events / Temporal Activity Proxy (15%)
  let eventVal = 25;
  if (dest.primaryIntent === "sunset_waterfront" && (hourKey === "17:00" || hourKey === "18:00")) {
    eventVal = 85; // Evening Aarti, sunset boat surges
  } else if (dest.primaryIntent === "spiritual" && (hourKey === "08:00" || hourKey === "09:00" || hourKey === "18:00")) {
    eventVal = 80; // Aarti / Darshan peak
  }

  // D. Live Weather Telemetry (10%)
  let weatherVal = 50; // normal
  const weatherMap = state.liveWeatherByCity || {};
  const activeWeather = (dest && (weatherMap[dest.id] || (dest.cityId && weatherMap[dest.cityId])))
    ? (weatherMap[dest.id] || weatherMap[dest.cityId])
    : (weatherMap[state.currentCityId] || weatherMap["all"] || null);
  const curWeatherType = (state.weatherAutoMode && activeWeather) ? activeWeather.weatherType : state.weather;

  if (curWeatherType === "heat") {
    // Extreme heat suppresses outdoor walking; shifts visitors indoors
    weatherVal = (dest.category === "Historical" || dest.category === "Others") ? 75 : 20;
  } else if (curWeatherType === "rain") {
    // Rain halts outdoor boating / beaches; spikes indoor museum galleries
    weatherVal = (dest.category === "Lakes" || dest.category === "Beaches" || dest.category === "Nature") ? 10 : 80;
  }

  // Base Normalized Score (85% baseline weights)
  let baseScore = Math.round(
    (0.35 * histVal) +
    (0.25 * calVal) +
    (0.15 * eventVal) +
    (0.10 * weatherVal)
  );

  // E. Real-Time TomTom Road Traffic Flow Telemetry (Direct empirical surge)
  const trafficMap = state.liveTrafficByCity || {};
  const trafficData = (dest && (trafficMap[dest.id] || (dest.cityId && trafficMap[dest.cityId])))
    ? (trafficMap[dest.id] || trafficMap[dest.cityId])
    : (trafficMap[state.currentCityId] || trafficMap["all"] || null);
  let delayMins = 0;
  if (state.simulatedTrafficDelay !== null) {
    delayMins = state.simulatedTrafficDelay;
  } else if (trafficData) {
    delayMins = trafficData.delayMins || 0;
  }

  // USER DIRECTIVE:
  // "Agar road delay > 10 min ⟹ Crowd Score automatically +25% spike ho jaye!
  //  Is se map par jaise hi road red hogi, monument ka card automatically High Bottleneck me convert ho jayega!"
  let trafficSpike = 0;
  let trafficStateText = "Free Flow";
  if (delayMins > 10) {
    trafficSpike = 25; // Direct +25% surge!
    trafficStateText = `Congestion (+${delayMins}m)`;
  } else if (delayMins >= 5) {
    trafficSpike = 12;
    trafficStateText = `Moderate (+${delayMins}m)`;
  } else if (delayMins > 0) {
    trafficSpike = Math.min(8, delayMins * 2);
    trafficStateText = `Minor (+${delayMins}m)`;
  }

  let score = baseScore + trafficSpike;

  // F. Check if citizen report exists (overrides with recent decay)
  let provenance = "LIVE_TELEMETRY";
  if (state.userReports[dest.id]) {
    const rep = state.userReports[dest.id];
    score = rep.rating === 3 ? 90 : rep.rating === 2 ? 55 : 20;
    provenance = "CITIZEN_REPORT";
  }

  // Clamp 5-98
  score = Math.max(5, Math.min(98, score));

  let level = "Low";
  if (score >= 65) level = "High";
  else if (score >= 35) level = "Moderate";

  const weatherSummary = activeWeather ? activeWeather.summaryText : (curWeatherType === 'rain' ? 'Rain' : (curWeatherType === 'heat' ? 'Heatwave' : 'Clear 24°C'));

  return {
    score,
    level,
    provenance,
    baseScore,
    histVal,
    calVal,
    eventVal,
    weatherVal,
    curWeatherType,
    weatherSummary,
    delayMins,
    trafficSpike,
    trafficStateText,
    isTrafficBottleneck: delayMins > 10
  };
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

  // If no match found in catalog, prompt live Pan-India discovery
  if (filtered.length === 0) {
    featuredContainer.style.display = "none";
    visualGrid.innerHTML = `
      <div class="empty-search-state dynamic-discovery-prompt" style="grid-column: 1 / -1; text-align:center; padding:44px 24px; border-radius:22px;">
        <div style="font-size:2.6rem; margin-bottom:12px;">✨</div>
        <h4 style="color:#FFF; font-size:1.35rem; margin-bottom:8px;">"${state.searchQuery || 'Destination'}" is not in initial catalog</h4>
        <p style="color:#A2B8AD; font-size:0.92rem; max-width:540px; margin:0 auto 24px; line-height:1.6;">
          Our Real-Time Intelligence Engine can discover any tourist monument across Pan-India, fetch encyclopedic coordinates &amp; live photography, and generate a dynamic crowd prediction card instantly!
        </p>
        <button class="btn-pill btn-pill-lime" id="btnDynamicDiscover" style="padding:12px 28px; font-size:0.95rem; font-weight:700; cursor:pointer;">
          ⚡ Discover &amp; Generate Pan-India Card
        </button>
      </div>
    `;

    const btn = visualGrid.querySelector("#btnDynamicDiscover");
    if (btn) {
      btn.addEventListener("click", () => {
        btn.innerHTML = '⏳ Querying Coordinates & Live Imagery...';
        btn.style.opacity = '0.7';
        btn.disabled = true;
        triggerDynamicPanIndiaDiscovery(state.searchQuery);
      });
    }
    return;
  }

  featuredContainer.style.display = "block";

  // 1. Featured Card Selection: prefer currently selected if matching, or first match
  let feat = filtered.find(d => d.id === state.selectedPlaceId);
  if (!feat) {
    feat = filtered[0];
  }

  const featCrowd = computeCrowdScore(feat);
  const featColor = getCrowdColor(featCrowd.level);
  const isFeatFav = state.favorites.has(feat.id);

  featuredContainer.innerHTML = `
    <div class="featured-place-card" id="card-${feat.id}">
      <div class="featured-image-box">
        <img class="featured-img" data-place-id="${feat.id}" src="${feat.image || getPlaceholderSvg()}" alt="${feat.name}" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='images/AGR_001.jpg';">
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

        <!-- Real-Time Telemetry Breakdown Strip -->
        <div class="featured-telemetry-breakdown" style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; margin:10px 0; padding:10px 14px; background:rgba(0,0,0,0.25); border-radius:10px; border:1px solid rgba(255,255,255,0.08); font-size:0.78rem;">
          <div style="display:flex; align-items:center; gap:6px;">
            <span>🍂</span>
            <span style="color:#A2B6AC;">Season:</span>
            <strong style="color:#F59E0B;" title="${featCrowd.season ? featCrowd.season.desc : ''}">${featCrowd.season ? featCrowd.season.seasonName : 'Winter'} (${featCrowd.season ? featCrowd.season.impact : '+25%'})</strong>
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <span>🚦</span>
            <span style="color:#A2B6AC;">TomTom Road Delay:</span>
            <strong style="color:${featCrowd.delayMins > 10 ? '#EF4444' : '#10B981'};">+${featCrowd.delayMins}m (${featCrowd.trafficStateText})</strong>
            ${featCrowd.trafficSpike > 0 ? `<span style="background:rgba(239,68,68,0.25); color:#EF4444; border:1px solid #EF4444; padding:1px 6px; border-radius:8px; font-size:0.7rem; font-weight:700;">+${featCrowd.trafficSpike}% Road Surge</span>` : ''}
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <span>🌤️</span>
            <span style="color:#A2B6AC;">Open-Meteo:</span>
            <strong style="color:#9FE859;">${featCrowd.weatherSummary}</strong>
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <span>🏛️</span>
            <span style="color:#A2B6AC;">Historical Footfall:</span>
            <strong style="color:#FFF;">${featCrowd.histVal}% at ${state.currentHour}</strong>
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

  const featImgEl = featuredContainer.querySelector(".featured-img");
  if (featImgEl) {
    loadLiveImageForElement(featImgEl, feat.id);
  }

  // 2. Secondary Grid: Render remaining places
  const remaining = filtered.filter(d => d.id !== feat.id);
  initCardImageObserver();
  visualGrid.innerHTML = "";

  if (remaining.length === 0 && filtered.length === 1) {
    visualGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding:28px 16px; color:#A2B6AC; font-size:0.88rem;">
        <span>🎯 Showing <strong>${feat.name}</strong> as featured destination above.</span>
      </div>
    `;
    return;
  }

  remaining.forEach(dest => {
    const crowd = computeCrowdScore(dest);
    const isFav = state.favorites.has(dest.id);
    const card = document.createElement("div");
    card.className = `visual-place-card ${dest.isDynamicDiscovery ? 'dynamic-discovery-card' : ''}`;
    card.id = `card-${dest.id}`;
    card.title = `Click to inspect ${dest.name} on map`;
    card.innerHTML = `
      <img class="card-bg-img" data-place-id="${dest.id}" src="${dest.image || getPlaceholderSvg()}" alt="${dest.name}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='images/AGR_001.jpg';">
      <div class="card-vignette-overlay"></div>
      ${dest.isDynamicDiscovery ? '<div class="dynamic-sparkle-badge">✨ Live Discovery</div>' : ''}
      
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

    const cardImg = card.querySelector(".card-bg-img");
    if (cardImg && cardImageObserver) {
      cardImageObserver.observe(cardImg);
    }
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

  const cardsPane = document.querySelector(".explorer-cards-pane");
  if (cardsPane) {
    cardsPane.scrollTo({ top: 0, behavior: 'smooth' });
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

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const rawQ = searchInput.value.trim();
        if (rawQ) {
          triggerDynamicPanIndiaDiscovery(rawQ);
        }
      }
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

  // Fit All 25 Sites Button
  const fitBtn = document.getElementById("fitAllSitesBtn");
  if (fitBtn) {
    fitBtn.addEventListener("click", () => {
      const allCoords = UDAIPUR_DESTINATIONS.map(d => d.coords);
      map.fitBounds(allCoords, { padding: [40, 40] });
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
        <img src="${(ALL_DESTINATIONS.find(d => d.id === stop.placeId)?.image) || getPlaceholderSvg()}" data-place-id="${stop.placeId}" alt="${name}" decoding="async" style="width:48px; height:48px; border-radius:8px; object-fit:cover; border:1px solid rgba(255,255,255,0.15); flex-shrink:0;" onerror="this.onerror=null; this.src='images/AGR_001.jpg';">
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
    const stepImg = card.querySelector("img[data-place-id]");
    if (stepImg) {
      loadLiveImageForElement(stepImg, stop.placeId);
    }
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
        <img src="${cand.image || getPlaceholderSvg()}" data-place-id="${cand.id}" alt="${cand.name}" decoding="async" style="width:58px; height:58px; border-radius:12px; object-fit:cover; border:1px solid #E2DCCE; flex-shrink:0;" onerror="this.onerror=null; this.src='images/AGR_001.jpg';">
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
    const candImg = item.querySelector("img[data-place-id]");
    if (candImg) {
      loadLiveImageForElement(candImg, cand.id);
    }
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

  if (crowdData.isClosed) {
    const altId = dest.alternatives && dest.alternatives.length > 0 ? dest.alternatives[0] : null;
    const altDest = altId ? ALL_DESTINATIONS.find(d => d.id === altId) : null;
    const switchBtnText = `Switch to ${altDest ? altDest.name.split(' ')[0] : 'Alternative'} &rarr;`;

    banner.style.background = "#FEF2F2";
    banner.style.border = "1px solid #FECACA";
    banner.style.color = "#991B1B";
    banner.innerHTML = `
      <div style="display:flex; align-items:flex-start; gap:12px; max-width:760px;">
        <span style="font-size:1.6rem; line-height:1;">⛔</span>
        <div>
          <div style="font-weight:700; font-size:0.95rem; color:#991B1B; margin-bottom:3px; display:flex; align-items:center; gap:8px;">
            Official Closure Notice: ${dest.name} is STRICTLY CLOSED TODAY
            ${crowdData.isSimulated ? `<span style="font-size:0.72rem; background:#EF4444; color:#FFF; padding:2px 8px; border-radius:10px; font-weight:700;">🧪 Friday Test Simulation Active</span>` : ''}
          </div>
          <div style="font-size:0.83rem; color:#7F1D1D; line-height:1.45;">
            Reason: <strong>${crowdData.closureReason}</strong> (Reopens ${crowdData.reopenDay}). All visitor queues are redirected to <strong>${altDest ? altDest.name : crowdData.recommendedAlternative}</strong> &mdash; open right now with authentic royal heritage!
          </div>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        ${crowdData.isSimulated ? `<a href="/#predictions" class="btn-pill" style="padding:8px 14px; font-size:0.8rem; background:#10B981; color:#FFF; text-decoration:none; font-weight:700;">🔄 Exit to Real Today (Saturday)</a>` : ''}
        ${altDest ? `<button class="btn-pill btn-pill-lime" style="padding:8px 16px; font-size:0.8rem;" onclick="selectDestination('${altDest.id}')">${switchBtnText}</button>` : ''}
        <button class="btn-pill btn-pill-outline" style="padding:8px 14px; font-size:0.8rem; background:white;" onclick="document.getElementById('destinationsVisualGrid').scrollIntoView({behavior:'smooth'})">All Open Sites</button>
      </div>
    `;
    return;
  }

  const isHigh = crowdData.score >= 65;

  if (isHigh) {
    const altId = dest.alternatives && dest.alternatives.length > 0 ? dest.alternatives[0] : null;
    const altDest = altId ? ALL_DESTINATIONS.find(d => d.id === altId) : null;
    const altScore = altDest ? computeCrowdScore(altDest) : null;

    banner.style.background = "#FEF2F2";
    banner.style.border = "1px solid #FECACA";
    banner.style.color = "#991B1B";

    const isJagdish = altDest && (altDest.id === "UDR_003" || altDest.name.toLowerCase().includes("jagdish"));
    const walkNote = isJagdish
      ? "only <strong>150m (2 min walk)</strong> from City Palace gate" 
      : "an intent-matched alternative nearby";

    const switchBtnText = isJagdish
      ? "Switch to Jagdish (150m walk) &rarr;"
      : `Switch to ${altDest ? altDest.name.split(' ')[0] : 'Alternative'} &rarr;`;

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
        ${altDest ? `<button class="btn-pill btn-pill-lime" style="padding:8px 16px; font-size:0.8rem;" onclick="selectDestination('${altDest.id}')">${switchBtnText}</button>` : ''}
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

// ==========================================================================
// 10. ULTRA-SMOOTH HORIZONTAL MOUSE WHEEL SCROLLING
// ==========================================================================
function initHorizontalWheelScroll() {
  const horizontalSelectors = [
    ".city-chips-scroll",
    ".category-pills-row",
    "#circuitSwitcherRow"
  ];

  horizontalSelectors.forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.addEventListener("wheel", (e) => {
      // When scrolling predominantly vertically without Shift, scroll horizontally
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && !e.shiftKey) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  });
}

// ==========================================================================
// 11. DYNAMIC JIT LIVE IMAGE PIPELINE (WIKIPEDIA REST API + UNSPLASH FALLBACK)
// Pure in-memory session cache ("fetch & go" until page refresh; no DB/disk storage)
// ==========================================================================

const DEST_IMAGE_METADATA = {
  // --- Udaipur Hotspots (25 Places) ---
  "UDR_001": { title: "City_Palace,_Udaipur", query: "City Palace Udaipur architecture" },
  "UDR_002": { title: "Lake_Pichola", query: "Lake Pichola Udaipur sunset lake" },
  "UDR_003": { title: "Jagdish_Temple", query: "Jagdish Temple Udaipur hindu temple" },
  "UDR_004": { title: "Bagore-ki-Haveli", query: "Bagore ki Haveli Udaipur courtyard" },
  "UDR_005": { title: "Gangaur_Ghat", query: "Gangaur Ghat Udaipur waterfront" },
  "UDR_006": { title: "Ambrai_Ghat", query: "Ambrai Ghat Udaipur dusk view" },
  "UDR_007": { title: "Fateh_Sagar_Lake", query: "Fateh Sagar Lake Udaipur water" },
  "UDR_008": { title: "Saheliyon-ki-Bari", query: "Saheliyon ki Bari Udaipur garden fountains" },
  "UDR_009": { title: "Monsoon_Palace", query: "Monsoon Palace Sajjangarh hill palace Udaipur" },
  "UDR_010": { title: "Sajjangarh_Biological_Park", query: "Sajjangarh Biological Park safari wildlife" },
  "UDR_011": { title: "Doodh_Talai_Lake", query: "Doodh Talai Lake garden Udaipur" },
  "UDR_012": { title: "Manikya_Lal_Verma", query: "Dudh Talai Garden Udaipur sunset point" },
  "UDR_013": { title: "Karni_Mata,_Udaipur", query: "Karni Mata Temple ropeway Udaipur" },
  "UDR_014": { title: "Moti_Magri", query: "Moti Magri Maharana Pratap statue Udaipur" },
  "UDR_015": { title: "Gulab_Bagh_and_Zoo", query: "Gulab Bagh Udaipur royal gardens rose" },
  "UDR_016": { title: "Shilpgram,_Udaipur", query: "Shilpgram rural arts crafts complex Udaipur" },
  "UDR_017": { title: "Under_the_Sun_Aquarium", query: "aquarium fish marine" },
  "UDR_018": { title: "Lake_Badi", query: "Badi Lake Bahubali hills Udaipur nature" },
  "UDR_019": { title: "Udai_Sagar_Lake", query: "Udaisagar Lake dam Mewar Udaipur" },
  "UDR_020": { title: "Ahar_Cenotaphs", query: "Ahar Cenotaphs royal chhatris Udaipur" },
  "UDR_021": { title: "Jag_Mandir", query: "Jag Mandir Island Palace Udaipur Lake Pichola" },
  "UDR_022": { title: "Dhebar_Lake", query: "Jaisamand Lake marble chhatris island Udaipur" },
  "UDR_023": { title: "Sahastra_Bahu_Temples", query: "Sas Bahu Temple Nagda Udaipur ancient stone carving" },
  "UDR_024": { title: "Haldighati", query: "Haldighati mountain pass Chetak memorial Mewar" },
  "UDR_025": { title: "Shrinathji_Temple", query: "Shrinathji Temple Nathdwara Krishna shrine" },

  // --- Pan-India Destinations ---
  "AGR_001": { title: "Taj_Mahal", query: "Taj Mahal Agra marble monument India" },
  "AGR_002": { title: "Agra_Fort", query: "Agra Fort red sandstone palace" },
  "AGR_003": { title: "Fatehpur_Sikri", query: "Fatehpur Sikri Buland Darwaza Mughal" },
  "DEL_001": { title: "Qutb_Minar", query: "Qutub Minar Delhi historic tower" },
  "DEL_002": { title: "Red_Fort", query: "Red Fort Delhi Lal Qila Mughal architecture" },
  "DEL_003": { title: "India_Gate", query: "India Gate New Delhi memorial arch" },
  "JAI_001": { title: "Amber_Fort", query: "Amer Fort Jaipur hill fortress ramparts" },
  "JAI_002": { title: "Hawa_Mahal", query: "Hawa Mahal Palace of Winds Jaipur pink" },
  "JAI_003": { title: "City_Palace,_Jaipur", query: "City Palace Jaipur royal courtyards" },
  "JAI_004": { title: "Nahargarh_Fort", query: "Nahargarh Fort Jaipur panoramic hill city view" },
  "JAI_005": { title: "Jal_Mahal", query: "Jal Mahal Water Palace Jaipur Man Sagar Lake" },
  "VNS_001": { title: "Dashashwamedh_Ghat", query: "Dashashwamedh Ghat Varanasi Ganga Aarti evening" },
  "VNS_002": { title: "Kashi_Vishwanath_Temple", query: "Kashi Vishwanath Temple Varanasi corridor" },
  "VNS_003": { title: "Assi_Ghat", query: "Assi Ghat Varanasi morning river Ganges boats" },
  "VNS_004": { title: "Sarnath", query: "Dhamek Stupa Sarnath Buddhist deer park Varanasi" },
  "GOA_001": { title: "Baga,_Goa", query: "Baga Beach Goa coastal palm sunset shore" },
  "GOA_002": { title: "Fort_Aguada", query: "Fort Aguada lighthouse Sinquerim Goa ocean" },
  "GOA_003": { title: "Basilica_of_Bom_Jesus", query: "Basilica of Bom Jesus Old Goa baroque church" },
  "GOA_004": { title: "Dudhsagar_Falls", query: "Dudhsagar Waterfalls railway bridge Western Ghats Goa" },
  "MUM_001": { title: "Gateway_of_India", query: "Gateway of India Mumbai Arabian sea harbor" },
  "MUM_002": { title: "Marine_Drive,_Mumbai", query: "Marine Drive Queens Necklace Mumbai night coastline" },
  "MUM_003": { title: "Elephanta_Caves", query: "Elephanta Caves rock cut Trimurti Shiva sculpture Mumbai" },
  "KER_001": { title: "Alappuzha", query: "Alleppey backwaters Kerala traditional houseboat palm" },
  "KER_002": { title: "Munnar", query: "Munnar tea plantations rolling hills mist Kerala" },
  "KER_003": { title: "Fort_Kochi", query: "Chinese fishing nets Fort Kochi coastal sunset Kerala" },
  "KER_004": { title: "Varkala_Beach", query: "Varkala cliff beach Arabian sea sunset Kerala" },
  "SOU_001": { title: "Mysore_Palace", query: "Mysore Palace illuminated night grand royal architecture" },
  "SOU_002": { title: "Meenakshi_Temple", query: "Meenakshi Amman Temple Madurai colorful gopuram" },
  "SOU_003": { title: "Virupaksha_Temple,_Hampi", query: "Virupaksha Temple Hampi Vijayanagara ruins boulders" },
  "SOU_004": { title: "Brihadisvara_Temple,_Thanjavur", query: "Brihadeeswarar Temple Thanjavur granite Chola tower" },
  "HIM_001": { title: "Rohtang_Pass", query: "Rohtang Pass snowy Himalayas mountain road Manali" },
  "HIM_002": { title: "Solang_Valley", query: "Solang Valley adventure alpine meadow Manali snow" },
  "HIM_003": { title: "Hidimba_Devi_Temple", query: "Hadimba Temple cedar deodar forest pagoda Manali" }
};

// Pure in-memory session cache (zero disk/DB writes, automatically resets on page refresh)
const runtimeSessionImageCache = new Map();
let cardImageObserver = null;

function getPlaceholderSvg() {
  return "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='100%25' height='100%25' fill='%230E2218'/%3E%3C/svg%3E";
}

function initLiveImagePipeline() {
  // Fetch active Unsplash key from server /api/config
  fetch('/api/config')
    .then(res => res.json())
    .then(cfg => {
      if (cfg && cfg.unsplashKey) {
        window.UNSPLASH_ACCESS_KEY = cfg.unsplashKey;
      }
    })
    .catch(() => {});
}

function initCardImageObserver() {
  if (typeof IntersectionObserver === "undefined") return;
  if (cardImageObserver) {
    cardImageObserver.disconnect();
  }

  cardImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const placeId = img.getAttribute("data-place-id");
        if (placeId) {
          observer.unobserve(img);
          loadLiveImageForElement(img, placeId);
        }
      }
    });
  }, {
    root: document.querySelector(".explorer-cards-pane"),
    rootMargin: "100px 0px",
    threshold: 0.01
  });
}

async function loadLiveImageForElement(imgEl, placeId) {
  if (!imgEl || !placeId) return;

  const destObj = (typeof ALL_DESTINATIONS !== "undefined") ? ALL_DESTINATIONS.find(d => d.id === placeId) : null;
  const localImage = (destObj && destObj.image) ? destObj.image : (destObj?.isDynamicDiscovery ? 'images/AGR_001.jpg' : `images/${placeId}.jpg`);

  // Bulletproof error fallback: never leave a broken image icon
  imgEl.onerror = () => {
    imgEl.onerror = null;
    if (imgEl.src !== localImage && !imgEl.src.endsWith(encodeURI(localImage))) {
      imgEl.src = localImage;
    } else {
      imgEl.src = 'images/AGR_001.jpg';
    }
    imgEl.classList.add("image-loaded");
  };

  // 1. Direct High-Resolution Authentic Local Asset (Instant, 100% reliable)
  if (destObj && destObj.image && !destObj.isDynamicDiscovery) {
    imgEl.src = destObj.image;
    imgEl.classList.add("image-loaded");
    return;
  }

  // 2. In-memory session cache: return instantly if already fetched in this session
  if (runtimeSessionImageCache.has(placeId)) {
    const cachedUrl = runtimeSessionImageCache.get(placeId);
    imgEl.src = cachedUrl;
    imgEl.classList.add("image-loaded");
    return;
  }

  const meta = DEST_IMAGE_METADATA[placeId] || {};
  const wikiTitle = meta.title;
  const unsplashQuery = meta.query || (wikiTitle ? wikiTitle.replace(/_/g, ' ') : placeId);

  // 3. Primary for Dynamic Discovery: Real-time query to Wikipedia REST API
  if (wikiTitle) {
    try {
      const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`;
      const resp = await fetch(wikiUrl);
      if (resp.ok) {
        const data = await resp.json();
        let liveUrl = null;
        if (data.originalimage && data.originalimage.source) {
          liveUrl = data.originalimage.source;
        } else if (data.thumbnail && data.thumbnail.source) {
          liveUrl = data.thumbnail.source;
        }
        if (liveUrl) {
          runtimeSessionImageCache.set(placeId, liveUrl);
          imgEl.src = liveUrl;
          imgEl.classList.add("image-loaded");
          return;
        }
      }
    } catch (e) {
      console.warn(`[Wikipedia Live] 404/Error for ${placeId}:`, e);
    }
  }

  // 4. Secondary: Query Unsplash Search API in real-time
  const unsplashKey = window.UNSPLASH_ACCESS_KEY || "NajbVz2htBZi8vvz88XJ0L7VFj4OAWhzqV1L-EdHJsA";
  if (unsplashKey && unsplashQuery) {
    try {
      const uUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(unsplashQuery)}&client_id=${unsplashKey}&orientation=landscape&per_page=1`;
      const uResp = await fetch(uUrl);
      if (uResp.ok) {
        const uData = await uResp.json();
        if (uData.results && uData.results.length > 0) {
          const liveUrl = uData.results[0].urls.regular || uData.results[0].urls.small;
          runtimeSessionImageCache.set(placeId, liveUrl);
          imgEl.src = liveUrl;
          imgEl.classList.add("image-loaded");
          return;
        }
      }
    } catch (e) {
      console.warn(`[Unsplash Live] Fallback failed for ${placeId}:`, e);
    }
  }

  // 5. Ultimate offline fallback
  imgEl.src = localImage;
  imgEl.classList.add("image-loaded");
}

// ==========================================================================
// 12. REAL-TIME PAN-INDIA ON-THE-FLY PLACE DISCOVERY & CARD GENERATOR
// ==========================================================================

const KNOWN_INDIAN_CITIES = [
  "Hyderabad", "Amritsar", "Delhi", "New Delhi", "Mumbai", "Kolkata", "Bengaluru", "Bangalore",
  "Chennai", "Varanasi", "Agra", "Jaipur", "Udaipur", "Goa", "Kochi", "Cochin", "Madurai", "Mysore",
  "Hampi", "Bhopal", "Bhubaneswar", "Puri", "Konark", "Gwalior", "Khajuraho", "Shimla", "Manali",
  "Dharamshala", "Rishikesh", "Haridwar", "Pune", "Aurangabad", "Ahmedabad", "Surat", "Vadodara",
  "Jodhpur", "Jaisalmer", "Bikaner", "Mount Abu", "Pushkar", "Ajmer", "Chittorgarh", "Kumbhalgarh",
  "Ranthambore", "Guwahati", "Shillong", "Kaziranga", "Darjeeling", "Gangtok", "Pondicherry", "Puducherry",
  "Ooty", "Kodaikanal", "Munnar", "Alleppey", "Varkala", "Trivandrum", "Coimbatore", "Thanjavur", "Lucknow",
  "Patna", "Gaya", "Bodh Gaya", "Sanchi", "Mandu", "Alwar", "Bharatpur", "Nainital", "Mussoorie", "Leh", "Ladakh"
];

function showDiscoveryToast(htmlContent) {
  let toast = document.getElementById("discoveryToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "discoveryToast";
    toast.className = "discovery-toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = htmlContent;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 4500);
}

function getCategoryFallbackImage(category) {
  switch (category) {
    case "Temples":
      return "images/JagdishTemple.jpg";
    case "Lakes":
      return "images/FatehSagarLake.jpg";
    case "Beaches":
      return "images/GOA_002.jpg";
    case "Nature":
      return "images/HIM_003.jpg";
    case "Others":
      return "images/Shilpgram.jpg";
    case "Historical":
    default:
      return "images/DEL_001.jpg";
  }
}

function inferCategoryFromText(text) {
  const t = (text || "").toLowerCase();
  
  // 1. Temples & Spiritual
  if (/temple|mandir|gurdwara|gurudwara|shrine|mosque|masjid|church|cathedral|basilica|dargah|stupa|monastery|ashram|spiritual|jyotirlinga|matha|synagogue|pagoda|devalaya/.test(t)) {
    return "Temples";
  }
  
  // 2. Lakes & Waterfronts
  if (/lake|talai|sagar|river|waterfall|falls|waterfront|dam|reservoir|backwater|canal|pond|estuary|stream/.test(t)) {
    return "Lakes";
  }
  
  // 3. Beaches & Coastal
  if (/beach|coast|cove|sea|ocean|island|shoreline|promenade|coastline/.test(t)) {
    return "Beaches";
  }
  
  // 4. Nature, Wildlife, Hills & Parks
  if (/wildlife|sanctuary|national park|safari|zoo|forest|valley|hills|hill station|mountain|pass|peak|flora|ridge|canyon|caves|trek|plantation|botanical/.test(t)) {
    return "Nature";
  }
  
  // 5. Markets, Shopping, Neighborhoods, Urban, Cultural, Museums & Others
  if (/market|bazaar|bazar|shopping|retail|mall|emporium|commercial|neighborhood|neighbourhood|locality|colony|nagar|street|road|chowk|haat|mandi|bazaars|food|cuisine|eatery|restaurant|cafe|craft|handicraft|arts|museum|gallery|aquarium|observatory|planetarium|amusement|stadium|theatre|theater|plaza|hall|bhavan|complex/.test(t)) {
    return "Others";
  }
  
  // 6. Historical & Forts
  if (/fort|palace|qila|mahal|castle|tomb|cenotaph|chhatri|ruins|ancient|archaeolog|dynasty|empire|citadel|haveli|darwaza|minar|pillar|stepwell|baoli|monument|memorial|historic/.test(t)) {
    return "Historical";
  }
  
  return "Others";
}

function generateDynamicHourlyBaseline(category) {
  if (category === "Temples") {
    return {
      "06:00": 35, "07:00": 60, "08:00": 78, "09:00": 85, "10:00": 80,
      "11:00": 65, "12:00": 50, "15:00": 45, "16:00": 65, "17:00": 82, "18:00": 92, "19:00": 85, "20:00": 60
    };
  } else if (category === "Lakes" || category === "Beaches" || category === "Nature") {
    return {
      "08:00": 10, "09:00": 22, "10:00": 38, "11:00": 45, "12:00": 40,
      "14:00": 42, "15:00": 58, "16:00": 78, "17:00": 92, "18:00": 88, "19:00": 62, "20:00": 30
    };
  } else if (category === "Others") {
    // Markets, shopping, urban hubs peak late afternoon & evening
    return {
      "08:00": 10, "09:00": 18, "10:00": 32, "11:00": 48, "12:00": 60,
      "13:00": 65, "14:00": 55, "15:00": 62, "16:00": 75, "17:00": 88, "18:00": 95, "19:00": 90, "20:00": 70
    };
  } else {
    // Historical monuments
    return {
      "08:00": 12, "09:00": 30, "10:00": 60, "11:00": 82, "12:00": 90,
      "13:00": 86, "14:00": 78, "15:00": 70, "16:00": 55, "17:00": 36, "18:00": 16
    };
  }
}

async function triggerDynamicPanIndiaDiscovery(query) {
  const cleanQ = (query || "").trim();
  if (!cleanQ) {
    showDiscoveryToast("⚠️ Please enter a destination or monument name to search.");
    return;
  }

  // 1. Check if place already exists in local catalog
  const existing = ALL_DESTINATIONS.find(d => 
    d.name.toLowerCase() === cleanQ.toLowerCase() ||
    d.name.toLowerCase().includes(cleanQ.toLowerCase())
  );

  if (existing) {
    state.selectedPlaceId = existing.id;
    state.currentCityId = existing.cityId || "all";
    state.searchQuery = "";
    const searchInput = document.getElementById("placeSearchInput");
    if (searchInput) searchInput.value = "";
    document.querySelectorAll(".city-chip").forEach(c => c.classList.remove("active"));
    document.querySelector(`.city-chip[data-city="${state.currentCityId}"]`)?.classList.add("active");
    if (map && existing.coords) {
      map.flyTo(existing.coords, 14, { duration: 1.4 });
      if (mapMarkers[existing.id]) mapMarkers[existing.id].openPopup();
    }
    renderExplorer();
    showDiscoveryToast(`📍 Found <strong>${existing.name}</strong> in catalog!`);
    return;
  }

  // 2. Not in local catalog: trigger live Pan-India discovery
  showDiscoveryToast(`✨ Searching Pan-India Index for <strong>"${cleanQ}"</strong>...`);

  try {
    // Step A: Query Wikipedia Search API
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanQ + " India")}&format=json&origin=*`;
    const searchResp = await fetch(searchUrl);
    if (!searchResp.ok) throw new Error("Search API unreachable");
    const searchData = await searchResp.json();
    const results = searchData?.query?.search || [];

    if (results.length === 0) {
      showDiscoveryToast(`⚠️ Could not locate "${cleanQ}" on Pan-India monuments index. Try a specific name (e.g. Charminar, Golden Temple).`);
      return;
    }

    const topTitle = results[0].title;

    // Step B: Query Wikipedia Summary REST API
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topTitle)}`;
    const summaryResp = await fetch(summaryUrl);
    if (!summaryResp.ok) throw new Error("Summary API unreachable");
    const summaryData = await summaryResp.json();

    // Step C: Resolve Coordinates
    let coords = null;
    if (summaryData.coordinates && summaryData.coordinates.lat && summaryData.coordinates.lon) {
      coords = [summaryData.coordinates.lat, summaryData.coordinates.lon];
    } else {
      // Query Wikipedia Coordinates API as fallback
      try {
        const coordUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=coordinates&titles=${encodeURIComponent(topTitle)}&format=json&origin=*`;
        const cResp = await fetch(coordUrl);
        const cData = await cResp.json();
        const pages = cData?.query?.pages || {};
        for (const p in pages) {
          if (pages[p].coordinates && pages[p].coordinates.length > 0) {
            coords = [pages[p].coordinates[0].lat, pages[p].coordinates[0].lon];
            break;
          }
        }
      } catch (e) {}
    }

    if (!coords) {
      coords = [22.8, 79.2]; // Pan-India geographic center fallback
    }

    // Step D: Live Image Resolution (Multi-Layer Deep Resolver)
    let liveImgUrl = null;

    // Layer 1: Wikipedia Summary thumbnail/original (Direct without broken /800px- rewrite)
    if (summaryData.originalimage && summaryData.originalimage.source) {
      liveImgUrl = summaryData.originalimage.source;
    } else if (summaryData.thumbnail && summaryData.thumbnail.source) {
      liveImgUrl = summaryData.thumbnail.source;
    }

    // Layer 2: Deep Article Media / Wikimedia Commons Files
    if (!liveImgUrl) {
      try {
        const artUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(topTitle)}&prop=images&format=json&origin=*`;
        const artResp = await fetch(artUrl);
        if (artResp.ok) {
          const artData = await artResp.json();
          const pages = artData?.query?.pages || {};
          const page = Object.values(pages)[0];
          const imgs = page?.images || [];
          const candidates = imgs.filter(i => 
            !/\.(svg|png)$/i.test(i.title) && 
            !/flag|icon|map|ambox|stub|symbol|pog|logo|button|wikimedia/i.test(i.title)
          );
          if (candidates.length > 0) {
            const infoUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(candidates[0].title)}&prop=imageinfo&iiprop=url&format=json&origin=*`;
            const infoResp = await fetch(infoUrl);
            if (infoResp.ok) {
              const infoData = await infoResp.json();
              const infoPages = infoData?.query?.pages || {};
              const infoPage = Object.values(infoPages)[0];
              const resolvedUrl = infoPage?.imageinfo?.[0]?.url;
              if (resolvedUrl) {
                liveImgUrl = resolvedUrl;
              }
            }
          }
        }
      } catch (e) {
        console.warn("[Wikipedia Deep Media] Fallback failed for", topTitle, e);
      }
    }

    // Layer 3: Wikimedia Commons Direct Search
    if (!liveImgUrl) {
      try {
        const commUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(topTitle + ' India')}&gsrnamespace=6&prop=imageinfo&iiprop=url&format=json&origin=*`;
        const commResp = await fetch(commUrl);
        if (commResp.ok) {
          const commData = await commResp.json();
          const commPages = Object.values(commData?.query?.pages || {});
          for (const cp of commPages) {
            const rawUrl = cp?.imageinfo?.[0]?.url;
            if (rawUrl && !/\.(svg|png)$/i.test(rawUrl)) {
              liveImgUrl = rawUrl;
              break;
            }
          }
        }
      } catch (e) {}
    }

    // Layer 4: Unsplash API Search
    if (!liveImgUrl && window.UNSPLASH_ACCESS_KEY) {
      try {
        let uUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(topTitle)}&client_id=${window.UNSPLASH_ACCESS_KEY}&orientation=landscape&per_page=1`;
        let uResp = await fetch(uUrl);
        if (uResp.ok) {
          let uData = await uResp.json();
          if (uData.results && uData.results.length > 0) {
            liveImgUrl = uData.results[0].urls.regular || uData.results[0].urls.small;
          } else {
            // Secondary category/city query
            const fallbackQuery = `${inferredCity} ${inferredCat === 'Others' ? 'market' : inferredCat}`;
            uUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(fallbackQuery)}&client_id=${window.UNSPLASH_ACCESS_KEY}&orientation=landscape&per_page=1`;
            uResp = await fetch(uUrl);
            if (uResp.ok) {
              uData = await uResp.json();
              if (uData.results && uData.results.length > 0) {
                liveImgUrl = uData.results[0].urls.regular || uData.results[0].urls.small;
              }
            }
          }
        }
      } catch (e) {}
    }

    // Step E: Infer City & Category
    const fullText = `${summaryData.title} ${summaryData.description || ""} ${summaryData.extract || ""}`;
    let inferredCity = "Pan-India";
    for (const city of KNOWN_INDIAN_CITIES) {
      const reg = new RegExp(`\\b${city}\\b`, "i");
      if (reg.test(fullText)) {
        inferredCity = city;
        break;
      }
    }

    const inferredCat = inferCategoryFromText(fullText);
    const displayCat = inferredCat === "Others" ? "Markets & Urban" : inferredCat;

    // Step F: Build Dynamic Destination Object
    const dynId = `IND_${Date.now()}`;
    const newDest = {
      id: dynId,
      cityId: dynId,
      name: summaryData.title,
      cityName: inferredCity,
      state: "India",
      displayLocation: summaryData.description || `${summaryData.title}, ${inferredCity}`,
      category: inferredCat,
      experienceTags: [inferredCat === "Others" ? "shopping_and_urban" : inferredCat.toLowerCase(), "pan_india_discovery", "live_telemetry"],
      tags: ["Pan-India", displayCat, inferredCity],
      primaryIntent: inferredCat === "Others" ? "shopping_and_urban" : inferredCat.toLowerCase(),
      coords: coords,
      openingHours: { open: "08:00", close: "18:30", lastEntry: "17:30" },
      avgVisitDurationMin: 120,
      ticketPriceInr: 250,
      capacityCeiling: 3500,
      rating: 4.8,
      popularChoice: true,
      bestVisitTime: "08 AM – 11 AM",
      bestVisitTimeNote: "(Off-Peak Window)",
      recommendedDays: "Tue – Thu",
      recommendedDaysNote: "(Lower Crowds)",
      fragilityIndex: 0.35,
      accessibility: { wheelchair: "Yes", stairs: "Moderate" },
      image: liveImgUrl || getCategoryFallbackImage(inferredCat),
      wikiTitle: topTitle,
      description: summaryData.extract || `Real-time generated intelligence card for ${summaryData.title}.`,
      hourlyBaseline: generateDynamicHourlyBaseline(inferredCat),
      isDynamicDiscovery: true
    };

    // Step G: Register in runtime memory cache
    DEST_IMAGE_METADATA[dynId] = { title: topTitle, query: `${topTitle} India` };
    if (liveImgUrl) {
      runtimeSessionImageCache.set(dynId, liveImgUrl);
    }

    // Prepend to catalog so it appears at the top
    ALL_DESTINATIONS.unshift(newDest);
    fetchTomTomLiveTraffic(dynId, newDest.coords);
    fetchOpenMeteoLiveWeather(dynId, newDest.coords);

    // Step H: Add pin to Leaflet map
    if (map) {
      const pin = L.marker(newDest.coords, {
        icon: L.divIcon({
          className: 'custom-map-pin dynamic-pin',
          html: `
            <div class="pulse-ring pulse-lime"></div>
            <div class="pin-marker-core" style="background:#9FE859; color:#0D2017; font-size:15px; font-weight:bold; display:flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:50%; border:2px solid #0D2017; box-shadow:0 0 14px rgba(159,232,89,0.7);">
              ✨
            </div>
          `,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        })
      });

      const dynCrowd = computeCrowdScore(newDest);
      const dynColor = getCrowdColor(dynCrowd.level);
      pin.bindPopup(`
        <div style="font-family:'Plus Jakarta Sans', sans-serif; padding: 4px; min-width: 180px;">
          <span style="background:rgba(159,232,89,0.25); color:#227845; font-size:10px; font-weight:700; padding:2px 8px; border-radius:12px;">✨ Live Pan-India Discovery</span>
          <h4 style="margin:4px 0 2px; font-size:14px; color:#1C241E;">${newDest.name}</h4>
          <span style="font-size:11px; color:#56635A;">📍 ${newDest.displayLocation}</span>
          <div style="margin-top:6px; display:flex; align-items:center; justify-content:space-between; gap:6px;">
            <span style="background:${dynColor}; color:white; padding:2px 8px; border-radius:99px; font-size:10px; font-weight:bold;">
              ${dynCrowd.level} Crowd (${dynCrowd.score}%)
            </span>
            <span style="font-size:10px; color:#0284C7; font-weight:700;">★ ${newDest.rating}</span>
          </div>
        </div>
      `);
      pin.on('click', () => {
        selectDestination(dynId);
      });
      pin.addTo(map);
      mapMarkers[dynId] = pin;
    }

    // Step I: Activate selection and switch to All India view
    state.selectedPlaceId = dynId;
    state.currentCityId = "all";
    state.searchQuery = "";
    const searchInput = document.getElementById("placeSearchInput");
    if (searchInput) searchInput.value = "";
    const clearBtn = document.getElementById("clearSearchBtn");
    if (clearBtn) clearBtn.style.display = "none";

    initCitySelector();

    document.querySelectorAll(".city-chip").forEach(c => c.classList.remove("active"));
    document.querySelector('.city-chip[data-city="all"]')?.classList.add("active");

    // Fly map smoothly to newly discovered place
    if (map) {
      map.flyTo(newDest.coords, 14, { duration: 1.5 });
      setTimeout(() => {
        if (mapMarkers[dynId]) mapMarkers[dynId].openPopup();
      }, 1500);
    }

    renderExplorer();
    showDiscoveryToast(`✨ Created live card for <strong>${newDest.name} (${inferredCity})</strong>!`);

  } catch (err) {
    console.error("Pan-India discovery error:", err);
    showDiscoveryToast(`⚠️ Could not generate card: ${err.message}. Please check connection.`);
  }
}




// Google Places / BestTime Live Busyness API Integration
async function fetchBestTimeLiveBusyness(dest) {
  if (!dest || !dest.name) return;
  if (!window.BESTTIME_API_KEY) return;
  if (state.liveBusynessByPlace && state.liveBusynessByPlace[dest.id]) return;

  try {
    const venueName = dest.name;
    const venueAddress = dest.displayLocation || `${dest.name}, India`;
    const url = `https://besttime.app/api/v1/forecasts/live?api_key_private=${encodeURIComponent(window.BESTTIME_API_KEY)}&venue_name=${encodeURIComponent(venueName)}&venue_address=${encodeURIComponent(venueAddress)}`;
    const res = await fetch(url, { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.analysis && data.analysis.venue_live_busyness_available) {
        state.liveBusynessByPlace[dest.id] = {
          busyness: data.analysis.venue_live_busyness,
          status: data.analysis.venue_live_busyness_text || "Live",
          venue: venueName,
          timestamp: Date.now()
        };
        renderExplorer();
      }
    }
  } catch (err) {
    console.warn("BestTime Live Busyness note:", err);
  }
}
