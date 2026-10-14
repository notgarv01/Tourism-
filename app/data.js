// Udaipur Destinations Catalog and Historical Baseline Hourly Profiles
// Grounded in Unified_Smart_Tourism_Crowd_Prediction_Master_Blueprint.pdf

const UDAIPUR_DESTINATIONS = [
  {
    id: "UDR_001",
    name: "City Palace",
    subtitle: "Royal Residence & Museum Complex",
    category: "Heritage",
    experienceTags: ["royal_architecture", "museum", "scenic_overlook", "courtyards"],
    primaryIntent: "royal_heritage",
    coords: [24.5764, 73.6835],
    openingHours: { open: "09:00", close: "17:30", lastEntry: "16:30" },
    avgVisitDurationMin: 150,
    ticketPriceInr: 300,
    capacityCeiling: 2500,
    fragilityIndex: 0.35,
    accessibility: { wheelchair: "Partial", stairs: "Significant stairs" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "The crown jewel of Mewar royalty on the banks of Lake Pichola. High bottlenecks occur at the Badi Pol gate and museum galleries between 11:30 AM and 3:30 PM.",
    // Hourly baseline occupancy profile (0 to 100) on a typical weekday
    hourlyBaseline: {
      "08:00": 10, "09:00": 25, "10:00": 55, "11:00": 78,
      "12:00": 88, "13:00": 92, "14:00": 85, "15:00": 75,
      "16:00": 58, "17:00": 35, "18:00": 10
    },
    suggestedQuietSlot: "09:00 AM - 10:30 AM",
    alternatives: ["UDR_008", "UDR_007", "UDR_006"] // Jagdish Mandir (150m away), Bagore Haveli, Ahar Cenotaphs
  },
  {
    id: "UDR_002",
    name: "Lake Pichola",
    subtitle: "Historic Waterfront & Boating Promenade",
    category: "Waterfront",
    experienceTags: ["sunset_waterfront", "boating", "scenic_photography", "palace_views"],
    primaryIntent: "sunset_waterfront",
    coords: [24.5750, 73.6780],
    openingHours: { open: "06:00", close: "18:30", lastEntry: "17:30" },
    avgVisitDurationMin: 90,
    ticketPriceInr: 450,
    capacityCeiling: 1800,
    fragilityIndex: 0.40,
    accessibility: { wheelchair: "Yes (Ghats)", stairs: "Minor" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "Iconic freshwater lake famous for sunset boat cruises around Jag Mandir and Lake Palace. Severe passenger queues form at Rameshwar Ghat between 4:00 PM and 6:30 PM.",
    hourlyBaseline: {
      "08:00": 15, "09:00": 25, "10:00": 40, "11:00": 50,
      "12:00": 45, "13:00": 40, "14:00": 52, "15:00": 68,
      "16:00": 88, "17:00": 96, "18:00": 85
    },
    suggestedQuietSlot: "09:30 AM - 11:30 AM",
    alternatives: ["UDR_003", "UDR_008"] // Fateh Sagar Lake, Dudh Talai
  },
  {
    id: "UDR_003",
    name: "Fateh Sagar Lake",
    subtitle: "Spacious Promenade & Island Gardens",
    category: "Waterfront",
    experienceTags: ["sunset_waterfront", "lake_promenade", "boating", "open_air_cafes"],
    primaryIntent: "sunset_waterfront",
    coords: [24.6030, 73.6730],
    openingHours: { open: "06:00", close: "23:00", lastEntry: "22:00" },
    avgVisitDurationMin: 90,
    ticketPriceInr: 200,
    capacityCeiling: 4500,
    fragilityIndex: 0.20,
    accessibility: { wheelchair: "Yes (Full Promenade)", stairs: "None" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "Vast northern lake with double the boating dock capacity of Pichola, pedestrian boulevard (Mumbai Chowpatty style), and peaceful mountain views.",
    hourlyBaseline: {
      "08:00": 20, "09:00": 25, "10:00": 30, "11:00": 35,
      "12:00": 32, "13:00": 30, "14:00": 38, "15:00": 48,
      "16:00": 62, "17:00": 70, "18:00": 74
    },
    suggestedQuietSlot: "10:00 AM - 03:00 PM",
    alternatives: ["UDR_002"]
  },
  {
    id: "UDR_004",
    name: "Saheliyon-ki-Bari",
    subtitle: "Courtyard of Maidens & Royal Fountains",
    category: "Garden",
    experienceTags: ["royal_gardens", "fountains", "shaded_walking", "relaxed"],
    primaryIntent: "quiet_gardens",
    coords: [24.6067, 73.6853],
    openingHours: { open: "09:00", close: "19:00", lastEntry: "18:30" },
    avgVisitDurationMin: 60,
    ticketPriceInr: 50,
    capacityCeiling: 1200,
    fragilityIndex: 0.30,
    accessibility: { wheelchair: "Yes", stairs: "Paved ramps" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "Historic landscaped royal pleasure garden built for 48 royal attendants. Features marble fountains, lotus pools, and ancient pavilions.",
    hourlyBaseline: {
      "08:00": 10, "09:00": 30, "10:00": 55, "11:00": 72,
      "12:00": 68, "13:00": 60, "14:00": 55, "15:00": 62,
      "16:00": 50, "17:00": 35, "18:00": 20
    },
    suggestedQuietSlot: "09:00 AM - 10:30 AM",
    alternatives: ["UDR_009"] // Gulab Bagh
  },
  {
    id: "UDR_005",
    name: "Sajjangarh (Monsoon Palace)",
    subtitle: "Hilltop Fortress & Panoramic Vista",
    category: "Viewpoint",
    experienceTags: ["mountain_vista", "sunset_panorama", "palace_ruins", "scenic"],
    primaryIntent: "sunset_waterfront",
    coords: [24.5934, 73.6375],
    openingHours: { open: "09:00", close: "18:15", lastEntry: "17:30" },
    avgVisitDurationMin: 90,
    ticketPriceInr: 155,
    capacityCeiling: 1000,
    fragilityIndex: 0.50,
    accessibility: { wheelchair: "Limited", stairs: "Steep access" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "Perched 3,100 feet above sea level on Bansdara mountain. Offers breathtaking 360-degree views of Udaipur's lakes and sunset. Mountain road gets choked at 5:00 PM.",
    hourlyBaseline: {
      "08:00": 5,  "09:00": 15, "10:00": 25, "11:00": 30,
      "12:00": 35, "13:00": 30, "14:00": 40, "15:00": 60,
      "16:00": 85, "17:00": 98, "18:00": 70
    },
    suggestedQuietSlot: "10:00 AM - 02:00 PM",
    alternatives: ["UDR_010"] // Bahubali Hills
  },
  {
    id: "UDR_006",
    name: "Ahar Museum & Cenotaphs",
    subtitle: "Mewar Royal Memorials & Ancient Antiquities",
    category: "Heritage",
    experienceTags: ["royal_architecture", "ancient_history", "peaceful", "cenotaphs"],
    primaryIntent: "royal_heritage",
    coords: [24.5880, 73.7190],
    openingHours: { open: "10:00", close: "17:00", lastEntry: "16:30" },
    avgVisitDurationMin: 75,
    ticketPriceInr: 20,
    capacityCeiling: 800,
    fragilityIndex: 0.60,
    accessibility: { wheelchair: "Partial", stairs: "Paved pathways" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "Over 250 domed marble cenotaphs commemorating the Maharanas of Mewar. Exquisite Rajput architecture dating back 400 years, rarely congested. Perfect heritage alternative to City Palace.",
    hourlyBaseline: {
      "08:00": 5,  "09:00": 10, "10:00": 18, "11:00": 24,
      "12:00": 22, "13:00": 20, "14:00": 25, "15:00": 28,
      "16:00": 20, "17:00": 10, "18:00": 5
    },
    suggestedQuietSlot: "Anytime (Consistently Low Crowd)",
    alternatives: ["UDR_001"]
  },
  {
    id: "UDR_007",
    name: "Bagore Ki Haveli",
    subtitle: "Lakefront 18th-Century Haveli Museum",
    category: "Heritage",
    experienceTags: ["royal_architecture", "museum", "cultural_shows", "lakefront"],
    primaryIntent: "royal_heritage",
    coords: [24.5794, 73.6806],
    openingHours: { open: "09:30", close: "17:30", lastEntry: "16:45" },
    avgVisitDurationMin: 75,
    ticketPriceInr: 100,
    capacityCeiling: 900,
    fragilityIndex: 0.45,
    accessibility: { wheelchair: "Limited", stairs: "Historic staircases" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "Stately waterfront haveli at Gangaur Ghat with 138 rooms, mirrored glasswork, royal attire, and turban gallery. Evening hosts the Dharohar folk dance show.",
    hourlyBaseline: {
      "08:00": 5,  "09:00": 20, "10:00": 38, "11:00": 50,
      "12:00": 52, "13:00": 48, "14:00": 45, "15:00": 55,
      "16:00": 65, "17:00": 78, "18:00": 85
    },
    suggestedQuietSlot: "10:00 AM - 01:00 PM",
    alternatives: ["UDR_001", "UDR_006"]
  },
  {
    id: "UDR_008",
    name: "Jagdish Mandir (Temple)",
    subtitle: "1651 AD Indo-Aryan Carved Stone Temple",
    category: "Heritage",
    experienceTags: ["royal_architecture", "ancient_history", "stone_carvings", "cultural"],
    primaryIntent: "royal_heritage",
    coords: [24.5796, 73.6841],
    openingHours: { open: "05:00", close: "22:00", lastEntry: "21:30" },
    avgVisitDurationMin: 45,
    ticketPriceInr: 0,
    capacityCeiling: 1500,
    fragilityIndex: 0.30,
    accessibility: { wheelchair: "No (Steep staircase)", stairs: "32 stone steps" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "Majestic 375-year-old carved stone temple built by Maharana Jagat Singh, just 150 meters outside City Palace gate. Features intricate elephant friezes, serene atmosphere, and minimal queue (<10 mins). The ideal immediate walk-in heritage alternative when City Palace has a long queue!",
    hourlyBaseline: {
      "08:00": 20, "09:00": 30, "10:00": 42, "11:00": 48,
      "12:00": 38, "13:00": 28, "14:00": 18, "15:00": 22,
      "16:00": 36, "17:00": 52, "18:00": 62
    },
    suggestedQuietSlot: "12:30 PM - 03:30 PM",
    alternatives: ["UDR_001", "UDR_007"]
  }
];

// 12 Defensible Judge Questions & Answers for quick evaluation
const JUDGE_PLAYBOOK = [
  {
    q: "Where does your real-time crowd data actually come from?",
    a: "We use a pragmatic 4-tier model: 80% is predictable seasonality & historical hourly profiles. The remaining 20% dynamic variance is captured through empirical real-time proxies: surrounding road traffic delay (TomTom/OSM), ASI/Rajasthan ticket slot saturation, and decaying citizen reports (30-min half-life). We do NOT fake satellite or CCTV feeds."
  },
  {
    q: "Google Maps already has Popular Times. Why build this?",
    a: "Google Maps is a passive single-location lookup tool that does not understand tourist intent. If you want a sunset lake view and Pichola is packed, Google won't recommend Fateh Sagar, verify its closing hours, and dynamically re-route your entire 4-stop afternoon itinerary."
  },
  {
    q: "Why use AI instead of simple fixed rules?",
    a: "We start with a transparent rule-based baseline for 100% operational reliability. We introduce tabular ML (Random Forest) only when empirical observations show statistically validated improvement on held-out test dates."
  },
  {
    q: "How do you measure accuracy without ground truth?",
    a: "We use Time-Based Holdout Validation (training on days 1..N-14, evaluating on days N-13..N, preventing random data leakage). We measure Macro F1-score across Low/Mod/High categories and MAE on queue durations."
  },
  {
    q: "What if a tourist wants sunset and you suggest a museum?",
    a: "Our Intent-Preservation algorithm strictly prevents this. Candidates must match the primary experience tag ('sunset_waterfront'). If no valid alternative exists, we trigger a Time-Shift recommendation at the original site rather than an unappealing alternative."
  },
  {
    q: "Won't this app overcrowd quiet alternative sites?",
    a: "We enforce site carrying capacity ceilings, exclude fragile residential/conservation zones, and dynamically randomize the top-3 suggestions across concurrent user sessions to prevent synchronized stampedes."
  },
  {
    q: "How do you prevent malicious fake crowd reports?",
    a: "Reports are session-hashed, rate-limited to 1 per 15 minutes, subject to exponential decay (30-min half-life), and require a quorum of 3 concordant reports before modifying status."
  },
  {
    q: "What about the cold-start problem for hidden gems?",
    a: "We display an explicit 'INSUFFICIENT DATA' badge with category-level baseline confidence, rather than inventing false numeric precision."
  },
  {
    q: "What happens if all alternatives are crowded?",
    a: "The engine transparently discloses regional high-pressure alerts and suggests optimal off-peak visiting windows (e.g. early morning tomorrow)."
  },
  {
    q: "Are you storing user location histories?",
    a: "Zero background GPS tracking. Users manually choose origins and destinations. Ephemeral tokens are purged immediately upon itinerary completion."
  },
  {
    q: "Is this achievable in a hackathon sprint?",
    a: "Yes. The core MVP runs on React, Node/Express, Leaflet/OSM, and Open-Meteo with verified Udaipur metadata. Stretch computer vision is cleanly decoupled."
  },
  {
    q: "Why can't you just scrape public CCTV feeds (OSIRIS)?",
    a: "Camera field-of-view does not equal ground truth. A single camera has occlusions and blind spots. Computer vision is valid only for calibrated gate ingress counts."
  }
];
