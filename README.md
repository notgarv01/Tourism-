# NoRush • Smart Tourism Intelligence Engine (Udaipur Pilot)

> **"Good travels spread. Crowds don't."**  
> A predictive tourism decision engine that foresees crowd bottlenecks, preserves traveler intent with experience-matched alternatives, and dynamically replans itineraries on live disruptions.

---

## 🌟 Highlights & Key Differentiators

- **Zero-Fake AI Doctrine:** We do NOT manufacture fake real-time CCTV headcounts or satellite tracking. Instead, we use a defensible **80% Deterministic Baseline + 20% Live Empirical Proxies** approach.
- **Intent-Preserving Alternative Recommender:** Sunset boating matches sunset boating (Lake Pichola ➔ Fateh Sagar), and royal palaces match royal heritage (City Palace ➔ Ahar Cenotaphs / Bagore Ki Haveli) — never an irrelevant indoor spot.
- **Dynamic In-Trip Itinerary Re-Router (`/api/itineraries/replan`):** Recalculates multi-stop routes in `< 15 seconds` when sudden rainfall, closure, or crowd surges occur.
- **5-Badge Data Provenance Standard:** Every metric is transparently tagged as `LIVE`, `RECENT`, `HISTORICAL`, `PREDICTED`, or `SIMULATED`.
- **Waze-Style Citizen Reporting:** 1-tap queue reporting with rate-limiting and a 30-minute exponential decay half-life.
- **Judge Q&A Playbook:** 12 battle-tested technical and commercial answers built right into the app and deck.

---

## 🏛️ Udaipur Pilot Destinations Catalog

1. **City Palace** (`UDR_001`): Royal heritage complex & museum. Peak: 11:30 AM – 3:30 PM (88%+ capacity).  
   *Alternative:* Ahar Cenotaphs & Museum or Bagore Ki Haveli.
2. **Lake Pichola** (`UDR_002`): Sunset waterfront & boat cruises. Peak: 4:00 PM – 6:30 PM (96% capacity).  
   *Alternative:* Fateh Sagar Lake (2x boarding dock capacity).
3. **Fateh Sagar Lake** (`UDR_003`): Spacious waterfront promenade & sunset boating.
4. **Saheliyon-ki-Bari** (`UDR_004`): Royal courtyards & marble fountains.
5. **Sajjangarh (Monsoon Palace)** (`UDR_005`): Mountain viewpoint & sunset panorama.  
   *Alternative:* Bahubali Hills / Badi Lake.
6. **Ahar Museum & Cenotaphs** (`UDR_006`): 250 Rajput marble memorials, ancient history, low queue.
7. **Bagore Ki Haveli** (`UDR_007`): Waterfront 18th-century haveli museum & Dharohar folk dance.

---

## 🧮 Mathematical Formulation

### 1. Baseline Crowd Score Formula
$$\text{CrowdScore}(d, t) = 0.40 \cdot C_{\text{hist}}(d, \text{dow}, \text{hr}) + 0.30 \cdot S_{\text{cal}}(t) + 0.20 \cdot E_{\text{event}}(d, t) + 0.10 \cdot W_{\text{weather}}(t)$$

- **$C_{\text{hist}}$ (40%):** Historical hourly density curve for day of week.
- **$S_{\text{cal}}$ (30%):** Calendar surge factor (Weekday = 20, Weekend = 70, Festival = 95).
- **$E_{\text{event}}$ (20%):** Local event proximity (Mewar festival, evening light & sound shows).
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
│   ├── index.html       # Advocado-aesthetic responsive UI with Leaflet map
│   ├── style.css        # Vanilla CSS design system (Fraunces + Plus Jakarta Sans)
│   ├── app.js           # Prediction engine, map controller, and replan logic
│   └── data.js          # Udaipur destination metadata & Judge Playbook dataset
├── Unified_Smart_Tourism_Crowd_Prediction_Master_Blueprint.pdf   # 8-page master blueprint
├── CrowdWise_Udaipur_Hackathon_Pitch_Deck.pptx                   # 12-slide widescreen pitch deck
├── generate_unified_pdf.py                                       # ReportLab PDF synthesis generator
├── generate_pitch_deck.py                                        # python-pptx presentation generator
└── README.md                                                     # Project documentation
```

---

## 🚀 How to Run the Web App Locally

1. Open terminal in the project directory:
   ```bash
   cd app
   ```

2. Start a local HTTP server:
   ```bash
   python -m http.server 8080
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8080/index.html
   ```

---

## 📊 Presentations & Artifacts

- **Master Technical Blueprint:** [`Unified_Smart_Tourism_Crowd_Prediction_Master_Blueprint.pdf`](./Unified_Smart_Tourism_Crowd_Prediction_Master_Blueprint.pdf)
- **Hackathon Pitch Deck:** [`CrowdWise_Udaipur_Hackathon_Pitch_Deck.pptx`](./CrowdWise_Udaipur_Hackathon_Pitch_Deck.pptx)

---

## 🛡️ License

Created for the Out of Scope Hackathon Team. Built with transparency, open data, and zero fabricated claims.
