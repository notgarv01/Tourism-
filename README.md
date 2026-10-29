# CrowdWise • Smart Tourism Intelligence Engine for India

> **"Good travels spread. Crowds don't."**  
> A predictive tourism decision engine that foresees crowd bottlenecks, preserves traveler intent with experience-matched alternatives, and dynamically replans itineraries on live disruptions across India.

---

## 🌟 Highlights & Key Differentiators

- **Pan-India Coverage (40+ Sites across 10 Regional Hubs):** Covers Rajasthan (Udaipur & Jaipur), Golden Triangle (Agra & Delhi), Varanasi, Goa, Mumbai, Kerala, South Heritage (Mysore, Madurai, Hampi), and the Himalayas (Amritsar, Ladakh, Manali).
- **Zero-Fake AI Doctrine:** We do NOT manufacture fake real-time CCTV headcounts or satellite tracking. Instead, we use a defensible **80% Deterministic Baseline + 20% Live Empirical Proxies** approach.
- **Intent-Preserving Alternative Recommender:** Sunset boating matches sunset boating (Lake Pichola ➔ Fateh Sagar; Baga Beach ➔ Fort Aguada / Mandovi; Fort Kochi ➔ Alleppey), and royal palaces match royal heritage (City Palace ➔ Ahar Cenotaphs; Taj Mahal ➔ Fatehpur Sikri / Agra Fort) — never an irrelevant indoor spot.
- **Dynamic In-Trip Itinerary Re-Router (`/api/itineraries/replan`):** Recalculates multi-stop routes in `< 15 seconds` when sudden rainfall, closure, or crowd surges occur across 6 distinct Indian travel circuits.
- **5-Badge Data Provenance Standard:** Every metric is transparently tagged as `LIVE`, `RECENT`, `HISTORICAL`, `PREDICTED`, or `SIMULATED`.
- **Waze-Style Citizen Reporting:** 1-tap queue reporting with rate-limiting and a 30-minute exponential decay half-life.
- **Judge Q&A Playbook:** 12 battle-tested technical and commercial answers addressing national scalability, state tourism board integrations, and algorithmic transparency.

---

## 🇮🇳 Pan-India Destination Catalog & Circuits

### 1. Rajasthan Heritage
- **Udaipur (10 destinations):** City Palace, Lake Pichola, Fateh Sagar Lake, Jag Mandir, Sajjangarh Monsoon Palace, Saheliyon-ki-Bari, Ahar Cenotaphs, Bagore Ki Haveli, Vintage Car Museum, Jagdish Mandir.
- **Jaipur (5 destinations):** Amber Fort (Amer), Hawa Mahal, City Palace Jaipur, Nahargarh Fort, Jal Mahal.

### 2. Golden Triangle (North India)
- **Agra & Delhi (6 destinations):** Taj Mahal, Agra Fort, Fatehpur Sikri, Qutub Minar, Humayun's Tomb, Red Fort (Lal Qila).

### 3. Spiritual Uttar Pradesh
- **Varanasi (4 destinations):** Kashi Vishwanath Temple Corridor, Dashashwamedh Ghat Aarti, Assi Ghat, Sarnath Dhamek Stupa.

### 4. Coastal & Western India
- **Goa (4 destinations):** Fort Aguada, Baga Beach, Basilica of Bom Jesus, Dudhsagar Waterfalls.
- **Mumbai (3 destinations):** Gateway of India, Marine Drive (Queen's Necklace), Elephanta Caves.

### 5. Southern Heritage & Backwaters
- **Kerala (4 destinations):** Alleppey Backwaters & Houseboats, Mattancherry Dutch Palace, Fort Kochi Chinese Fishing Nets, Munnar Tea Plantations.
- **South Heritage (4 destinations):** Mysore Palace, Meenakshi Amman Temple (Madurai), Virupaksha Temple & Hampi Ruins, Brihadisvara Temple (Thanjavur).

### 6. Himalayas & North
- **Himalayas (3 destinations):** Golden Temple (Amritsar), Pangong Tso Lake (Ladakh), Solang Valley & Rohtang Pass (Manali).

---

## 🧮 Mathematical Formulation

### 1. Baseline Crowd Score Formula
$$\text{CrowdScore}(d, t) = 0.40 \cdot C_{\text{hist}}(d, \text{dow}, \text{hr}) + 0.30 \cdot S_{\text{cal}}(t) + 0.20 \cdot E_{\text{event}}(d, t) + 0.10 \cdot W_{\text{weather}}(t)$$

- **$C_{\text{hist}}$ (40%):** Historical hourly density curve for day of week.
- **$S_{\text{cal}}$ (30%):** Calendar surge factor (Weekday = 20, Weekend = 70, Festival = 95).
- **$E_{\text{event}}$ (20%):** Local event proximity (Aarti times, light & sound shows, festival processions).
- **$W_{\text{weather}}$ (10%):** Real-time Open-Meteo weather adjustment (heatwave $>38^\circ\text{C}$ or rain $>10\text{ mm/h}$).

**Classification Boundaries:**
- 🟢 **Low Crowd:** 0 – 34
- 🟡 **Moderate Crowd:** 35 – 64
- 🔴 **High Crowd:** 65 – 100

### 2. Intent-Preserving Utility Score
$$\text{UtilityScore}(c) = 0.30 \cdot S_{\text{low\_crowd}} + 0.25 \cdot S_{\text{intent}} + 0.20 \cdot S_{\text{travel}} + 0.15 \cdot S_{\text{hours}} + 0.10 \cdot S_{\text{weather}}$$

---

## 📁 Repository Structure

```
├── app/
│   ├── index.html       # Advocado-aesthetic UI with Pan-India Leaflet map & city selector
│   ├── style.css        # Vanilla CSS design system (Fraunces + Plus Jakarta Sans)
│   ├── app.js           # Pan-India prediction engine, map controller, and replan logic
│   └── data.js          # 40+ destinations catalog, 6 multi-stop circuits & Judge Playbook
├── server.js            # Zero-dependency Node.js HTTP server (port 8080)
├── server.py            # Python SimpleHTTP fallback server
└── README.md            # Project documentation
```

---

## 🚀 How to Run the Web App Locally

1. Open terminal in the project directory:
   ```bash
   node server.js
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:8080/index.html
   ```

---

## 🛡️ License

Created for the Out of Scope Hackathon Team. Built with transparency, open data, and zero fabricated claims.
