// Udaipur Destinations Catalog and Historical Baseline Hourly Profiles
// Grounded in Udaipur_Tourist_Hotspots_25_Places.pdf & Unified_Smart_Tourism_Crowd_Prediction_Master_Blueprint.pdf

const UDAIPUR_DESTINATIONS = [
  {
    id: "UDR_001",
    name: "City Palace",
    subtitle: "Historic Royal Palace Complex Overlooking Lake Pichola",
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
    hourlyBaseline: {
      "08:00": 10, "09:00": 25, "10:00": 55, "11:00": 78,
      "12:00": 88, "13:00": 92, "14:00": 85, "15:00": 75,
      "16:00": 58, "17:00": 35, "18:00": 10
    },
    suggestedQuietSlot: "09:00 AM - 10:30 AM",
    alternatives: ["UDR_003", "UDR_004", "UDR_020", "UDR_021"] // Jagdish Temple (150m walk), Bagore Ki Haveli, Ahar Cenotaphs, Jagmandir
  },
  {
    id: "UDR_002",
    name: "Lake Pichola",
    subtitle: "Iconic Lake; Boat Rides & Palace Views",
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
    alternatives: ["UDR_007", "UDR_006", "UDR_011", "UDR_018"] // Fateh Sagar, Ambrai Ghat, Doodh Talai, Badi Lake
  },
  {
    id: "UDR_003",
    name: "Jagdish Temple",
    subtitle: "Historic 1651 AD Vishnu Temple with Indo-Aryan Carvings",
    category: "Temple",
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
    alternatives: ["UDR_001", "UDR_004", "UDR_020"]
  },
  {
    id: "UDR_004",
    name: "Bagore Ki Haveli",
    subtitle: "18th-Century Haveli & Museum near Gangaur Ghat",
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
    alternatives: ["UDR_001", "UDR_003", "UDR_020"]
  },
  {
    id: "UDR_005",
    name: "Gangaur Ghat",
    subtitle: "Famous Lakeside Ghat & Photography Spot",
    category: "Waterfront",
    experienceTags: ["lakefront_ghat", "photography", "cultural_rituals", "lake_views"],
    primaryIntent: "sunset_waterfront",
    coords: [24.5799, 73.6811],
    openingHours: { open: "05:00", close: "23:00", lastEntry: "22:30" },
    avgVisitDurationMin: 45,
    ticketPriceInr: 0,
    capacityCeiling: 1200,
    fragilityIndex: 0.35,
    accessibility: { wheelchair: "Yes (Upper terrace)", stairs: "Ghat steps" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "Prime historic waterfront ghat adjoining Bagore Ki Haveli on Lake Pichola. A lively hub for local festivals, sunset photography, and peaceful morning temple rituals.",
    hourlyBaseline: {
      "08:00": 25, "09:00": 30, "10:00": 35, "11:00": 40,
      "12:00": 30, "13:00": 25, "14:00": 32, "15:00": 45,
      "16:00": 70, "17:00": 88, "18:00": 92
    },
    suggestedQuietSlot: "08:00 AM - 11:00 AM",
    alternatives: ["UDR_006", "UDR_011", "UDR_002"]
  },
  {
    id: "UDR_006",
    name: "Ambrai Ghat",
    subtitle: "Popular Waterfront Viewpoint Facing City Palace",
    category: "Viewpoint",
    experienceTags: ["city_palace_view", "sunset_panorama", "lakefront", "peaceful"],
    primaryIntent: "sunset_waterfront",
    coords: [24.5772, 73.6766],
    openingHours: { open: "05:30", close: "20:00", lastEntry: "19:30" },
    avgVisitDurationMin: 60,
    ticketPriceInr: 10,
    capacityCeiling: 800,
    fragilityIndex: 0.40,
    accessibility: { wheelchair: "Partial", stairs: "Gentle steps" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "Also known as Manjhi Ghat, situated directly opposite City Palace across Lake Pichola. Renowned for spectacular twilight reflections of the floodlit palace complex.",
    hourlyBaseline: {
      "08:00": 15, "09:00": 20, "10:00": 25, "11:00": 25,
      "12:00": 20, "13:00": 18, "14:00": 25, "15:00": 45,
      "16:00": 75, "17:00": 95, "18:00": 98
    },
    suggestedQuietSlot: "09:00 AM - 02:00 PM",
    alternatives: ["UDR_005", "UDR_011", "UDR_007"]
  },
  {
    id: "UDR_007",
    name: "Fateh Sagar Lake",
    subtitle: "Scenic Lake with Islands, Boating & Hill Views",
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
    alternatives: ["UDR_002", "UDR_018", "UDR_014"]
  },
  {
    id: "UDR_008",
    name: "Saheliyon Ki Bari",
    subtitle: "Historic Garden with Fountains, Marble Features & Greenery",
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
    alternatives: ["UDR_015", "UDR_012"]
  },
  {
    id: "UDR_009",
    name: "Sajjangarh (Monsoon Palace)",
    subtitle: "Hilltop Palace Famous for Panoramic Sunset & City Views",
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
    alternatives: ["UDR_013", "UDR_014", "UDR_018"]
  },
  {
    id: "UDR_010",
    name: "Sajjangarh Biological Park",
    subtitle: "Wildlife Park at the Foothills of the Aravallis",
    category: "Nature",
    experienceTags: ["wildlife", "nature_walk", "zoo", "family_friendly"],
    primaryIntent: "wildlife_nature",
    coords: [24.5905, 73.6558],
    openingHours: { open: "09:00", close: "17:30", lastEntry: "16:45" },
    avgVisitDurationMin: 120,
    ticketPriceInr: 40,
    capacityCeiling: 2000,
    fragilityIndex: 0.25,
    accessibility: { wheelchair: "Yes (Golf carts available)", stairs: "Paved paths" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "Sprawling botanical and zoological habitat housing lions, tigers, panthers, and Himalayan black bears in naturalistic open enclosures along Bansdara hill.",
    hourlyBaseline: {
      "08:00": 10, "09:00": 25, "10:00": 45, "11:00": 60,
      "12:00": 55, "13:00": 48, "14:00": 52, "15:00": 58,
      "16:00": 45, "17:00": 30, "18:00": 10
    },
    suggestedQuietSlot: "09:00 AM - 10:30 AM",
    alternatives: ["UDR_015", "UDR_009"]
  },
  {
    id: "UDR_011",
    name: "Doodh Talai",
    subtitle: "Small Lake & Hill Area with Scenic City Views",
    category: "Waterfront",
    experienceTags: ["scenic_lake", "promenade", "sunset_views", "peaceful"],
    primaryIntent: "sunset_waterfront",
    coords: [24.5714, 73.6828],
    openingHours: { open: "06:00", close: "21:30", lastEntry: "21:00" },
    avgVisitDurationMin: 60,
    ticketPriceInr: 0,
    capacityCeiling: 1400,
    fragilityIndex: 0.30,
    accessibility: { wheelchair: "Yes (Promenade)", stairs: "None" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "Picturesque small lake adjoining Lake Pichola, serving as the base station for the Karni Mata ropeway and adjacent musical fountain gardens.",
    hourlyBaseline: {
      "08:00": 15, "09:00": 20, "10:00": 30, "11:00": 35,
      "12:00": 30, "13:00": 25, "14:00": 35, "15:00": 50,
      "16:00": 75, "17:00": 85, "18:00": 90
    },
    suggestedQuietSlot: "09:00 AM - 01:00 PM",
    alternatives: ["UDR_006", "UDR_005", "UDR_012"]
  },
  {
    id: "UDR_012",
    name: "Manik Lal Verma Garden",
    subtitle: "Hill Garden & Viewpoint around Doodh Talai",
    category: "Garden",
    experienceTags: ["hill_garden", "musical_fountain", "lake_overlook", "sunset"],
    primaryIntent: "quiet_gardens",
    coords: [24.5707, 73.6842],
    openingHours: { open: "09:00", close: "21:00", lastEntry: "20:30" },
    avgVisitDurationMin: 45,
    ticketPriceInr: 20,
    capacityCeiling: 1000,
    fragilityIndex: 0.25,
    accessibility: { wheelchair: "Partial", stairs: "Garden steps" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "Terraced hilltop garden overlooking Doodh Talai and Lake Pichola. Features evening musical fountain light shows and panoramic vantage points.",
    hourlyBaseline: {
      "08:00": 10, "09:00": 20, "10:00": 30, "11:00": 35,
      "12:00": 30, "13:00": 25, "14:00": 30, "15:00": 45,
      "16:00": 65, "17:00": 80, "18:00": 85
    },
    suggestedQuietSlot: "10:00 AM - 02:00 PM",
    alternatives: ["UDR_008", "UDR_015", "UDR_011"]
  },
  {
    id: "UDR_013",
    name: "Karni Mata Temple",
    subtitle: "Hilltop Temple Accessible by Ropeway with Panoramic Views",
    category: "Temple",
    experienceTags: ["ropeway", "panoramic_views", "temple", "sunset_vista"],
    primaryIntent: "scenic_pilgrimage",
    coords: [24.5700, 73.6860],
    openingHours: { open: "04:30", close: "21:30", lastEntry: "21:00" },
    avgVisitDurationMin: 75,
    ticketPriceInr: 110,
    capacityCeiling: 900,
    fragilityIndex: 0.45,
    accessibility: { wheelchair: "No", stairs: "Ropeway or steep stairs" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "Located atop Machhla Magra hill. The ropeway ride delivers breathtaking aerial views of the entire City Palace, Lake Pichola, and Aravalli range, peaking at sunset.",
    hourlyBaseline: {
      "08:00": 20, "09:00": 30, "10:00": 40, "11:00": 45,
      "12:00": 35, "13:00": 30, "14:00": 40, "15:00": 60,
      "16:00": 85, "17:00": 95, "18:00": 88
    },
    suggestedQuietSlot: "08:00 AM - 11:00 AM",
    alternatives: ["UDR_009", "UDR_003", "UDR_012"]
  },
  {
    id: "UDR_014",
    name: "Moti Magri / Maharana Pratap Memorial",
    subtitle: "Maharana Pratap Memorial Overlooking Fateh Sagar",
    category: "Heritage",
    experienceTags: ["memorial", "historic_bronze", "hilltop_lake_view", "gardens"],
    primaryIntent: "royal_heritage",
    coords: [24.6002, 73.6788],
    openingHours: { open: "09:00", close: "18:00", lastEntry: "17:30" },
    avgVisitDurationMin: 60,
    ticketPriceInr: 100,
    capacityCeiling: 1500,
    fragilityIndex: 0.25,
    accessibility: { wheelchair: "Yes (Paved roads)", stairs: "Gentle slopes" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "Historic Pearl Hill memorial honoring Maharana Pratap with a grand bronze statue astride his faithful steed Chetak, overlooking Fateh Sagar Lake and Japanese rock gardens.",
    hourlyBaseline: {
      "08:00": 10, "09:00": 25, "10:00": 40, "11:00": 55,
      "12:00": 50, "13:00": 45, "14:00": 48, "15:00": 55,
      "16:00": 65, "17:00": 70, "18:00": 50
    },
    suggestedQuietSlot: "09:00 AM - 11:00 AM",
    alternatives: ["UDR_007", "UDR_008", "UDR_001"]
  },
  {
    id: "UDR_015",
    name: "Gulab Bagh",
    subtitle: "Large Historic Garden with Greenery & Heritage Attractions",
    category: "Garden",
    experienceTags: ["botanical_garden", "roses", "historic_library", "family_picnic"],
    primaryIntent: "quiet_gardens",
    coords: [24.5746, 73.6936],
    openingHours: { open: "06:00", close: "20:00", lastEntry: "19:30" },
    avgVisitDurationMin: 75,
    ticketPriceInr: 25,
    capacityCeiling: 3000,
    fragilityIndex: 0.20,
    accessibility: { wheelchair: "Yes (Wide flat paths)", stairs: "None" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "100-acre royal garden laid out by Maharana Sajjan Singh in 1881. Houses ancient step-wells, hundreds of rose varieties, Victoria Hall Museum & library, and toy train ride.",
    hourlyBaseline: {
      "08:00": 25, "09:00": 30, "10:00": 35, "11:00": 40,
      "12:00": 35, "13:00": 30, "14:00": 35, "15:00": 45,
      "16:00": 60, "17:00": 72, "18:00": 75
    },
    suggestedQuietSlot: "11:00 AM - 03:00 PM",
    alternatives: ["UDR_008", "UDR_012", "UDR_010"]
  },
  {
    id: "UDR_016",
    name: "Shilpgram",
    subtitle: "Rural Arts & Crafts Complex Showcasing Regional Culture",
    category: "Cultural",
    experienceTags: ["folk_art", "handicrafts", "cultural_village", "workshops"],
    primaryIntent: "cultural_crafts",
    coords: [24.6185, 73.6601],
    openingHours: { open: "11:00", close: "19:00", lastEntry: "18:15" },
    avgVisitDurationMin: 120,
    ticketPriceInr: 50,
    capacityCeiling: 2500,
    fragilityIndex: 0.25,
    accessibility: { wheelchair: "Partial (Unpaved village paths)", stairs: "Minor" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "A living ethnographic museum west of Udaipur featuring 26 traditional village huts representing indigenous lifestyle and crafts of Rajasthan, Gujarat, and Goa.",
    hourlyBaseline: {
      "08:00": 0,   "09:00": 0,   "10:00": 10, "11:00": 30,
      "12:00": 45, "13:00": 50, "14:00": 55, "15:00": 65,
      "16:00": 78, "17:00": 75, "18:00": 60
    },
    suggestedQuietSlot: "11:00 AM - 01:30 PM",
    alternatives: ["UDR_004", "UDR_017"]
  },
  {
    id: "UDR_017",
    name: "Under the Sun Fish Aquarium",
    subtitle: "Interactive & High-Tech Aquarium beside Fateh Sagar",
    category: "Entertainment",
    experienceTags: ["indoor_aquarium", "marine_life", "family_friendly", "all_weather"],
    primaryIntent: "covered_indoor",
    coords: [24.6015, 73.6775],
    openingHours: { open: "08:00", close: "23:00", lastEntry: "22:15" },
    avgVisitDurationMin: 60,
    ticketPriceInr: 120,
    capacityCeiling: 800,
    fragilityIndex: 0.15,
    accessibility: { wheelchair: "Yes (Ramps & Level floors)", stairs: "None" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "India's largest public walkthrough freshwater aquarium featuring over 150 exotic species, tactile fish pools, and climate-controlled galleries. Prime rain-safe destination!",
    hourlyBaseline: {
      "08:00": 10, "09:00": 20, "10:00": 35, "11:00": 45,
      "12:00": 50, "13:00": 48, "14:00": 52, "15:00": 60,
      "16:00": 70, "17:00": 75, "18:00": 65
    },
    suggestedQuietSlot: "09:00 AM - 11:30 AM",
    alternatives: ["UDR_004", "UDR_020", "UDR_016"]
  },
  {
    id: "UDR_018",
    name: "Badi Lake",
    subtitle: "Peaceful Scenic Lake Surrounded by Aravalli Hills",
    category: "Nature",
    experienceTags: ["quiet_lake", "mountain_hills", "bahubali_trek", "nature_photography"],
    primaryIntent: "nature_escape",
    coords: [24.6180, 73.6185],
    openingHours: { open: "06:00", close: "19:00", lastEntry: "18:30" },
    avgVisitDurationMin: 90,
    ticketPriceInr: 0,
    capacityCeiling: 1500,
    fragilityIndex: 0.30,
    accessibility: { wheelchair: "Partial (Embankment)", stairs: "Trek to Bahubali Hill" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "Also known as Jiyan Sagar, built in 1680. Far quieter than Pichola, surrounded by unspoiled Aravalli hills and stone chhatris. Popular for the Bahubali Hill viewpoint hike.",
    hourlyBaseline: {
      "08:00": 15, "09:00": 20, "10:00": 25, "11:00": 30,
      "12:00": 25, "13:00": 20, "14:00": 28, "15:00": 45,
      "16:00": 68, "17:00": 80, "18:00": 75
    },
    suggestedQuietSlot: "08:00 AM - 01:00 PM",
    alternatives: ["UDR_007", "UDR_019", "UDR_009"]
  },
  {
    id: "UDR_019",
    name: "Udai Sagar Lake",
    subtitle: "Historic 1565 AD Lake & Quieter Lakeside Destination",
    category: "Nature",
    experienceTags: ["historic_dam", "quiet_waterfront", "nature_retreat", "scenic"],
    primaryIntent: "nature_escape",
    coords: [24.5828, 73.8055],
    openingHours: { open: "06:00", close: "19:00", lastEntry: "18:30" },
    avgVisitDurationMin: 60,
    ticketPriceInr: 0,
    capacityCeiling: 1200,
    fragilityIndex: 0.25,
    accessibility: { wheelchair: "Partial", stairs: "Embankment steps" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "Constructed by Maharana Udai Singh 13 km east of Udaipur to supply water to his kingdom. A peaceful, uncrowded expanse with an ancient dam wall and tranquil rural vistas.",
    hourlyBaseline: {
      "08:00": 10, "09:00": 15, "10:00": 20, "11:00": 25,
      "12:00": 22, "13:00": 18, "14:00": 22, "15:00": 30,
      "16:00": 42, "17:00": 55, "18:00": 50
    },
    suggestedQuietSlot: "Anytime (Consistently Peaceful)",
    alternatives: ["UDR_018", "UDR_022"]
  },
  {
    id: "UDR_020",
    name: "Ahar Cenotaphs & Ahar Museum",
    subtitle: "Historic Royal Cenotaphs & Archaeological Exhibits",
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
    alternatives: ["UDR_001", "UDR_003", "UDR_004"]
  },
  {
    id: "UDR_021",
    name: "Jagmandir Island Palace",
    subtitle: "Historic Island Palace & Gardens in Lake Pichola",
    category: "Heritage",
    experienceTags: ["island_palace", "marble_elephants", "lake_views", "royal_retreat"],
    primaryIntent: "royal_heritage",
    coords: [24.5678, 73.6783],
    openingHours: { open: "10:00", close: "18:00", lastEntry: "17:00" },
    avgVisitDurationMin: 90,
    ticketPriceInr: 400,
    capacityCeiling: 1000,
    fragilityIndex: 0.40,
    accessibility: { wheelchair: "Partial (Ferry boarding assistance)", stairs: "Courtyard levels" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "Built on an island in Lake Pichola, also known as 'Lake Garden Palace'. Renowned for its row of sculpted marble elephants, ornate dome pavilions, and royal fountain courtyards.",
    hourlyBaseline: {
      "08:00": 0,   "09:00": 10, "10:00": 35, "11:00": 50,
      "12:00": 55, "13:00": 48, "14:00": 52, "15:00": 65,
      "16:00": 80, "17:00": 85, "18:00": 40
    },
    suggestedQuietSlot: "10:00 AM - 12:30 PM",
    alternatives: ["UDR_001", "UDR_002", "UDR_004"]
  },
  {
    id: "UDR_022",
    name: "Jaisamand Lake",
    subtitle: "Large Historic Artificial Lake & Popular Nature Escape",
    category: "Nature",
    experienceTags: ["massive_lake", "marble_chhatris", "wildlife_sanctuary", "day_excursion"],
    primaryIntent: "nature_escape",
    coords: [24.2415, 73.9635],
    openingHours: { open: "07:00", close: "18:30", lastEntry: "17:30" },
    avgVisitDurationMin: 180,
    ticketPriceInr: 0,
    capacityCeiling: 3500,
    fragilityIndex: 0.20,
    accessibility: { wheelchair: "Partial", stairs: "Embankment stairs" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "Asia's second-largest artificial lake (~48 km from Udaipur) built in 1685. Features six intricately carved marble cenotaphs, island tribal settlements, and a wildlife sanctuary.",
    hourlyBaseline: {
      "08:00": 5,  "09:00": 15, "10:00": 30, "11:00": 45,
      "12:00": 52, "13:00": 50, "14:00": 55, "15:00": 58,
      "16:00": 50, "17:00": 35, "18:00": 15
    },
    suggestedQuietSlot: "08:00 AM - 11:00 AM",
    alternatives: ["UDR_018", "UDR_019"]
  },
  {
    id: "UDR_023",
    name: "Sahastra Bahu (Sas-Bahu) Temples",
    subtitle: "10th-Century Carved Temple Complex in Ancient Nagda",
    category: "Heritage",
    experienceTags: ["ancient_temple", "sandstone_carvings", "archaeological", "quiet_heritage"],
    primaryIntent: "royal_heritage",
    coords: [24.7212, 73.7176],
    openingHours: { open: "06:00", close: "18:00", lastEntry: "17:30" },
    avgVisitDurationMin: 60,
    ticketPriceInr: 25,
    capacityCeiling: 600,
    fragilityIndex: 0.55,
    accessibility: { wheelchair: "No", stairs: "Stone plinths" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "Magnificent 1,000-year-old twin temple complex dedicated to Lord Vishnu in Nagda (~22 km north of Udaipur). Features astonishingly intricate Torana gateways and ceiling friezes.",
    hourlyBaseline: {
      "08:00": 10, "09:00": 20, "10:00": 32, "11:00": 38,
      "12:00": 30, "13:00": 25, "14:00": 28, "15:00": 35,
      "16:00": 40, "17:00": 30, "18:00": 15
    },
    suggestedQuietSlot: "Anytime (Very Low Crowd Pressure)",
    alternatives: ["UDR_003", "UDR_020", "UDR_025"]
  },
  {
    id: "UDR_024",
    name: "Haldighati Battlefield & Museum",
    subtitle: "Historic Battlefield Region Associated with Maharana Pratap",
    category: "Heritage",
    experienceTags: ["historic_battlefield", "pratap_museum", "yellow_soil", "patriotic"],
    primaryIntent: "royal_heritage",
    coords: [24.8910, 73.7050],
    openingHours: { open: "09:00", close: "18:00", lastEntry: "17:15" },
    avgVisitDurationMin: 90,
    ticketPriceInr: 100,
    capacityCeiling: 1800,
    fragilityIndex: 0.25,
    accessibility: { wheelchair: "Yes (Museum galleries)", stairs: "Minor" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "Famous mountain pass in the Aravallis (~40 km from Udaipur) where the heroic Battle of Haldighati was fought in 1576. Features the yellow-turmeric soil pass, Chetak Samadhi, and museum.",
    hourlyBaseline: {
      "08:00": 5,  "09:00": 20, "10:00": 42, "11:00": 58,
      "12:00": 62, "13:00": 55, "14:00": 60, "15:00": 65,
      "16:00": 52, "17:00": 30, "18:00": 10
    },
    suggestedQuietSlot: "09:00 AM - 10:30 AM",
    alternatives: ["UDR_014", "UDR_023", "UDR_025"]
  },
  {
    id: "UDR_025",
    name: "Nathdwara / Shrinathji Temple",
    subtitle: "Major Pilgrimage Destination & Temple Town",
    category: "Temple",
    experienceTags: ["sacred_pilgrimage", "vaishnav_darshan", "heritage_town", "pichwai_art"],
    primaryIntent: "scenic_pilgrimage",
    coords: [24.9312, 73.8188],
    openingHours: { open: "05:30", close: "19:30", lastEntry: "19:00" },
    avgVisitDurationMin: 120,
    ticketPriceInr: 0,
    capacityCeiling: 5000,
    fragilityIndex: 0.50,
    accessibility: { wheelchair: "Partial (Crowded bazaars)", stairs: "Temple thresholds" },
    officialSource: "https://www.tourism.rajasthan.gov.in/udaipur.html",
    description: "Renowned 17th-century shrine of Shrinathji (~45 km from Udaipur) on the banks of Banas River. Draws devotees from around the world for festive darshan, famous prasad, and Pichwai paintings.",
    hourlyBaseline: {
      "08:00": 50, "09:00": 65, "10:00": 80, "11:00": 88,
      "12:00": 45, "13:00": 20, "14:00": 25, "15:00": 55,
      "16:00": 75, "17:00": 90, "18:00": 82
    },
    suggestedQuietSlot: "01:00 PM - 03:00 PM (Temple Closed / Bazaar Quiet)",
    alternatives: ["UDR_003", "UDR_013", "UDR_023"]
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
