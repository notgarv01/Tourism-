// ==========================================================================
// NORUSH - PAN-INDIA & UDAIPUR TOURISM INTELLIGENCE CATALOG & DATASETS
// Covers: Udaipur (All 25 Hotspots), Jaipur, Agra & Delhi, Varanasi, Goa, Mumbai,
//         Kerala, South Heritage (Mysore, Madurai, Hampi), and Himalayas.
// Grounded in Master Blueprint & Empirical Tourism Baselines
// ==========================================================================

const INDIA_CITIES = [
  {
    "id": "all",
    "name": "All India",
    "tagline": "Pan-India National Monitoring Mesh",
    "flag": "🇮🇳",
    "center": [
      22.8,
      79.2
    ],
    "zoom": 5,
    "trafficPoint": [
      24.5764,
      73.6835
    ],
    "trafficCorridorName": "Pan-India Tourist Corridors",
    "description": "Explore and forecast crowds across 40+ destinations in 10 major tourism regions."
  },
  {
    "id": "udaipur",
    "name": "Udaipur",
    "state": "Rajasthan",
    "tagline": "City of Lakes & Mewar Royalty",
    "flag": "🏰",
    "center": [
      24.5854,
      73.685
    ],
    "zoom": 13,
    "trafficPoint": [
      24.5764,
      73.6835
    ],
    "trafficCorridorName": "City Palace - Jagdish Chowk Gate",
    "description": "Lake Pichola, City Palace, Fateh Sagar Lake, Bagore Ki Haveli, Sajjangarh."
  },
  {
    "id": "jaipur",
    "name": "Jaipur",
    "state": "Rajasthan",
    "tagline": "The Royal Pink City",
    "flag": "👑",
    "center": [
      26.93,
      75.83
    ],
    "zoom": 12,
    "trafficPoint": [
      26.9855,
      75.8513
    ],
    "trafficCorridorName": "Amer Fort Highway & Badi Chaupar",
    "description": "Amber Fort, Hawa Mahal, City Palace Jaipur, Nahargarh Fort, Jal Mahal."
  },
  {
    "id": "agra_delhi",
    "name": "Agra & Delhi",
    "state": "UP & Delhi",
    "tagline": "Mughal Wonder & National Capital",
    "flag": "🕌",
    "center": [
      27.8,
      77.8
    ],
    "zoom": 8,
    "trafficPoint": [
      27.1751,
      78.0421
    ],
    "trafficCorridorName": "Taj East Gate Access Road",
    "description": "Taj Mahal, Agra Fort, Fatehpur Sikri, Qutub Minar, Humayun's Tomb, Red Fort."
  },
  {
    "id": "varanasi",
    "name": "Varanasi",
    "state": "Uttar Pradesh",
    "tagline": "The Eternal Sacred Ganges",
    "flag": "🛕",
    "center": [
      25.312,
      83.01
    ],
    "zoom": 13,
    "trafficPoint": [
      25.3072,
      83.0104
    ],
    "trafficCorridorName": "Dashashwamedh - Godowlia Corridor",
    "description": "Kashi Vishwanath, Dashashwamedh Ghat, Assi Ghat, Sarnath Dhamek Stupa."
  },
  {
    "id": "goa",
    "name": "Goa",
    "state": "Goa",
    "tagline": "Sun, Forts & UNESCO Churches",
    "flag": "🌊",
    "center": [
      15.4909,
      73.8278
    ],
    "zoom": 11,
    "trafficPoint": [
      15.4923,
      73.7737
    ],
    "trafficCorridorName": "Candolim - Fort Aguada Coastal Stretch",
    "description": "Fort Aguada, Baga Beach, Basilica of Bom Jesus, Dudhsagar Waterfalls."
  },
  {
    "id": "mumbai",
    "name": "Mumbai",
    "state": "Maharashtra",
    "tagline": "Maximum City & Harbour Gateway",
    "flag": "🏛️",
    "center": [
      18.93,
      72.835
    ],
    "zoom": 12,
    "trafficPoint": [
      18.922,
      72.8347
    ],
    "trafficCorridorName": "Colaba Causeway & Marine Drive",
    "description": "Gateway of India, Marine Drive Promenade, Elephanta Rock Caves."
  },
  {
    "id": "kerala",
    "name": "Kerala",
    "state": "Kerala",
    "tagline": "God's Own Country & Backwaters",
    "flag": "🌴",
    "center": [
      9.85,
      76.45
    ],
    "zoom": 9,
    "trafficPoint": [
      9.9678,
      76.2428
    ],
    "trafficCorridorName": "Fort Kochi Boat Jetty Corridor",
    "description": "Alleppey Backwaters, Fort Kochi Fishing Nets, Mattancherry, Munnar Tea Hills."
  },
  {
    "id": "south_heritage",
    "name": "South Heritage",
    "state": "Karnataka & TN",
    "tagline": "Dravidian Temples & Royal Capitals",
    "flag": "🛕",
    "center": [
      12.8,
      77.2
    ],
    "zoom": 7,
    "trafficPoint": [
      12.3052,
      76.6552
    ],
    "trafficCorridorName": "Mysore Palace Gate & Chamundi Hill",
    "description": "Mysore Palace, Meenakshi Amman Temple, Hampi Vijayanagara Ruins, Brihadisvara."
  },
  {
    "id": "himalayas",
    "name": "Himalayas & North",
    "state": "Ladakh, Punjab & HP",
    "tagline": "Alpine Peaks & Sacred Sanctums",
    "flag": "🏔️",
    "center": [
      32.5,
      76.8
    ],
    "zoom": 7,
    "trafficPoint": [
      31.62,
      74.8765
    ],
    "trafficCorridorName": "Golden Temple Heritage Street",
    "description": "Golden Temple Amritsar, Pangong Tso Lake (Ladakh), Solang & Rohtang Valley."
  }
];

const ALL_DESTINATIONS = [
  {
    "id": "UDR_001",
    "name": "City Palace",
    "subtitle": "Historic Royal Palace Complex Overlooking Lake Pichola",
    "displayLocation": "Old City, Udaipur",
    "category": "Historical",
    "experienceTags": [
      "royal_architecture",
      "museum",
      "scenic_overlook",
      "courtyards"
    ],
    "tags": [
      "Heritage",
      "Palace"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      24.5764,
      73.6835
    ],
    "openingHours": {
      "open": "09:00",
      "close": "17:30",
      "lastEntry": "16:30"
    },
    "avgVisitDurationMin": 150,
    "ticketPriceInr": 300,
    "capacityCeiling": 2500,
    "rating": 4.8,
    "popularChoice": true,
    "bestVisitTime": "9 AM – 11 AM",
    "bestVisitTimeNote": "(Less Crowded)",
    "recommendedDays": "Tue – Thu",
    "recommendedDaysNote": "(Lower Crowds)",
    "fragilityIndex": 0.35,
    "accessibility": {
      "wheelchair": "Partial",
      "stairs": "Significant stairs"
    },
    "image": "images/City Palace.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "The crown jewel of Mewar royalty on the banks of Lake Pichola. High bottlenecks occur at the Badi Pol gate and museum galleries between 11:30 AM and 3:30 PM.",
    "hourlyBaseline": {
      "08:00": 10,
      "09:00": 25,
      "10:00": 55,
      "11:00": 78,
      "12:00": 88,
      "13:00": 92,
      "14:00": 85,
      "15:00": 75,
      "16:00": 58,
      "17:00": 35,
      "18:00": 10
    },
    "suggestedQuietSlot": "09:00 AM - 10:30 AM",
    "alternatives": [
      "UDR_003",
      "UDR_004",
      "UDR_020",
      "UDR_021"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_002",
    "name": "Lake Pichola",
    "subtitle": "Iconic Freshwater Lake; Boat Rides & Palace Views",
    "displayLocation": "Pichola, Udaipur",
    "category": "Lakes",
    "experienceTags": [
      "sunset_waterfront",
      "boating",
      "scenic_photography",
      "palace_views"
    ],
    "tags": [
      "Lakes",
      "Boating"
    ],
    "primaryIntent": "sunset_waterfront",
    "coords": [
      24.575,
      73.678
    ],
    "openingHours": {
      "open": "06:00",
      "close": "18:30",
      "lastEntry": "17:30"
    },
    "avgVisitDurationMin": 90,
    "ticketPriceInr": 450,
    "capacityCeiling": 1800,
    "rating": 4.7,
    "popularChoice": true,
    "bestVisitTime": "9:30 AM – 11:30 AM",
    "bestVisitTimeNote": "(Less Crowded)",
    "recommendedDays": "Mon – Wed",
    "recommendedDaysNote": "(Lower Crowds)",
    "fragilityIndex": 0.4,
    "accessibility": {
      "wheelchair": "Yes (Ghats)",
      "stairs": "Minor"
    },
    "image": "images/Lake Pichola.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Iconic freshwater lake famous for sunset boat cruises around Jag Mandir and Lake Palace. Severe passenger queues form at Rameshwar Ghat between 4:00 PM and 6:30 PM.",
    "hourlyBaseline": {
      "08:00": 15,
      "09:00": 25,
      "10:00": 40,
      "11:00": 50,
      "12:00": 45,
      "13:00": 40,
      "14:00": 52,
      "15:00": 68,
      "16:00": 88,
      "17:00": 96,
      "18:00": 85
    },
    "suggestedQuietSlot": "09:30 AM - 11:30 AM",
    "alternatives": [
      "UDR_007",
      "UDR_006",
      "UDR_011",
      "UDR_018"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_003",
    "name": "Jagdish Temple",
    "subtitle": "Historic 1651 AD Vishnu Temple with Indo-Aryan Carvings",
    "displayLocation": "150m from City Palace Gate, Udaipur",
    "category": "Temples",
    "experienceTags": [
      "royal_architecture",
      "ancient_history",
      "stone_carvings",
      "cultural"
    ],
    "tags": [
      "Temples",
      "Heritage"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      24.5796,
      73.6841
    ],
    "openingHours": {
      "open": "05:00",
      "close": "22:00",
      "lastEntry": "21:30"
    },
    "avgVisitDurationMin": 45,
    "ticketPriceInr": 0,
    "capacityCeiling": 1500,
    "rating": 4.7,
    "popularChoice": true,
    "bestVisitTime": "7 AM – 9 AM",
    "bestVisitTimeNote": "(Morning Aarti)",
    "recommendedDays": "Mon – Wed",
    "recommendedDaysNote": "(Lower Crowds)",
    "fragilityIndex": 0.3,
    "accessibility": {
      "wheelchair": "No (Steep staircase)",
      "stairs": "32 stone steps"
    },
    "image": "images/JagdishTemple.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Majestic 375-year-old carved stone temple built by Maharana Jagat Singh in 1651 AD, just 150 meters outside City Palace gate. Features intricate elephant friezes, serene atmosphere, and minimal queue (<10 mins). The ideal immediate walk-in heritage alternative when City Palace has a long queue!",
    "hourlyBaseline": {
      "08:00": 20,
      "09:00": 30,
      "10:00": 42,
      "11:00": 48,
      "12:00": 38,
      "13:00": 28,
      "14:00": 18,
      "15:00": 22,
      "16:00": 36,
      "17:00": 52,
      "18:00": 62
    },
    "suggestedQuietSlot": "12:30 PM - 03:30 PM",
    "alternatives": [
      "UDR_001",
      "UDR_004",
      "UDR_020"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_004",
    "name": "Bagore Ki Haveli",
    "subtitle": "18th-Century Waterfront Haveli & Dharohar Cultural Museum",
    "displayLocation": "Gangaur Ghat, Udaipur",
    "category": "Historical",
    "experienceTags": [
      "royal_architecture",
      "museum",
      "cultural_shows",
      "lakefront"
    ],
    "tags": [
      "Historical",
      "Haveli"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      24.5794,
      73.6806
    ],
    "openingHours": {
      "open": "09:30",
      "close": "17:30",
      "lastEntry": "16:45"
    },
    "avgVisitDurationMin": 75,
    "ticketPriceInr": 100,
    "capacityCeiling": 900,
    "rating": 4.7,
    "popularChoice": true,
    "bestVisitTime": "10 AM – 1 PM",
    "bestVisitTimeNote": "(Less Crowded)",
    "recommendedDays": "Tue – Thu",
    "recommendedDaysNote": "(Lower Crowds)",
    "fragilityIndex": 0.45,
    "accessibility": {
      "wheelchair": "Limited",
      "stairs": "Historic staircases"
    },
    "image": "images/Bagore Ki Haveli.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Stately waterfront haveli at Gangaur Ghat with 138 rooms, mirrored glasswork, royal attire, and turban gallery. Evening hosts the Dharohar folk dance show.",
    "hourlyBaseline": {
      "08:00": 5,
      "09:00": 20,
      "10:00": 38,
      "11:00": 50,
      "12:00": 52,
      "13:00": 48,
      "14:00": 45,
      "15:00": 55,
      "16:00": 65,
      "17:00": 78,
      "18:00": 85
    },
    "suggestedQuietSlot": "10:00 AM - 01:00 PM",
    "alternatives": [
      "UDR_001",
      "UDR_003",
      "UDR_020"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_005",
    "name": "Gangaur Ghat",
    "subtitle": "Historic Waterfront Steps on Lake Pichola",
    "displayLocation": "Old City waterfront, Udaipur",
    "category": "Historical",
    "experienceTags": [
      "waterfront_ghat",
      "cultural_rituals",
      "lake_view",
      "photography"
    ],
    "tags": [
      "Historical",
      "Ghat"
    ],
    "primaryIntent": "sunset_waterfront",
    "coords": [
      24.5798,
      73.6803
    ],
    "openingHours": {
      "open": "05:00",
      "close": "23:00",
      "lastEntry": "22:30"
    },
    "avgVisitDurationMin": 45,
    "ticketPriceInr": 0,
    "capacityCeiling": 1200,
    "rating": 4.6,
    "popularChoice": false,
    "bestVisitTime": "6 AM – 8 AM",
    "bestVisitTimeNote": "(Peaceful Morning)",
    "recommendedDays": "Anyday",
    "recommendedDaysNote": "(Lower Crowds in Morning)",
    "fragilityIndex": 0.25,
    "accessibility": {
      "wheelchair": "Partial",
      "stairs": "Ghat steps"
    },
    "image": "images/Gangaur Ghat.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Prime ghat situated in front of Bagore Ki Haveli on Lake Pichola. Iconic for traditional festivals like Gangaur and Teej, scenic waterfront sit-outs, and sunset views.",
    "hourlyBaseline": {
      "08:00": 15,
      "09:00": 25,
      "10:00": 35,
      "11:00": 40,
      "12:00": 35,
      "13:00": 30,
      "14:00": 35,
      "15:00": 45,
      "16:00": 65,
      "17:00": 82,
      "18:00": 88
    },
    "suggestedQuietSlot": "07:00 AM - 10:00 AM",
    "alternatives": [
      "UDR_006",
      "UDR_011",
      "UDR_007"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_006",
    "name": "Ambrai Ghat (Manjhi Ghat)",
    "subtitle": "Celebrated Sunset Viewpoint Facing City Palace",
    "displayLocation": "Chandpole Waterfront, Udaipur",
    "category": "Historical",
    "experienceTags": [
      "sunset_view",
      "palace_panorama",
      "evening_ambiance",
      "photography"
    ],
    "tags": [
      "Historical",
      "Sunset Point"
    ],
    "primaryIntent": "sunset_waterfront",
    "coords": [
      24.5786,
      73.6769
    ],
    "openingHours": {
      "open": "06:00",
      "close": "22:00",
      "lastEntry": "21:30"
    },
    "avgVisitDurationMin": 60,
    "ticketPriceInr": 10,
    "capacityCeiling": 800,
    "rating": 4.7,
    "popularChoice": true,
    "bestVisitTime": "7 AM – 10 AM",
    "bestVisitTimeNote": "(Quiet & Reflective)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Less Crowded)",
    "fragilityIndex": 0.4,
    "accessibility": {
      "wheelchair": "Limited",
      "stairs": "Ghat steps"
    },
    "image": "images/Ambrai Ghat.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Opposite City Palace and Lake Palace. Offers the most photogenic night view of illuminated royal palaces. Peaks sharply between 5:30 PM and 7:30 PM.",
    "hourlyBaseline": {
      "08:00": 10,
      "09:00": 15,
      "10:00": 20,
      "11:00": 25,
      "12:00": 20,
      "13:00": 18,
      "14:00": 22,
      "15:00": 35,
      "16:00": 60,
      "17:00": 90,
      "18:00": 95
    },
    "suggestedQuietSlot": "08:00 AM - 11:00 AM",
    "alternatives": [
      "UDR_005",
      "UDR_011",
      "UDR_007"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_007",
    "name": "Fateh Sagar Lake",
    "subtitle": "Vast Northern Lake with Double Boating Dock Capacity",
    "displayLocation": "Fateh Sagar, Udaipur",
    "category": "Lakes",
    "experienceTags": [
      "sunset_waterfront",
      "lake_promenade",
      "boating",
      "open_air_cafes"
    ],
    "tags": [
      "Lakes",
      "Promenade"
    ],
    "primaryIntent": "sunset_waterfront",
    "coords": [
      24.603,
      73.673
    ],
    "openingHours": {
      "open": "06:00",
      "close": "23:00",
      "lastEntry": "22:00"
    },
    "avgVisitDurationMin": 90,
    "ticketPriceInr": 200,
    "capacityCeiling": 4500,
    "rating": 4.6,
    "popularChoice": true,
    "bestVisitTime": "10 AM – 3 PM",
    "bestVisitTimeNote": "(Less Crowded)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Lower Crowds)",
    "fragilityIndex": 0.2,
    "accessibility": {
      "wheelchair": "Yes (Full Promenade)",
      "stairs": "None"
    },
    "image": "images/FatehSagarLake.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Vast northern lake with double the boating dock capacity of Pichola, pedestrian boulevard (Mumbai Chowpatty style), and peaceful mountain views.",
    "hourlyBaseline": {
      "08:00": 20,
      "09:00": 25,
      "10:00": 30,
      "11:00": 35,
      "12:00": 32,
      "13:00": 30,
      "14:00": 38,
      "15:00": 48,
      "16:00": 62,
      "17:00": 70,
      "18:00": 74
    },
    "suggestedQuietSlot": "10:00 AM - 03:00 PM",
    "alternatives": [
      "UDR_002",
      "UDR_018",
      "UDR_011"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_008",
    "name": "Saheliyon Ki Bari",
    "subtitle": "Historic Royal Courtyard Garden with Marble Fountains",
    "displayLocation": "Saheli Marg, Udaipur",
    "category": "Gardens",
    "experienceTags": [
      "royal_architecture",
      "botanical_garden",
      "peaceful",
      "historic_fountains"
    ],
    "tags": [
      "Gardens",
      "Royal Garden"
    ],
    "primaryIntent": "nature_escape",
    "coords": [
      24.6036,
      73.6842
    ],
    "openingHours": {
      "open": "09:00",
      "close": "19:00",
      "lastEntry": "18:15"
    },
    "avgVisitDurationMin": 60,
    "ticketPriceInr": 20,
    "capacityCeiling": 1400,
    "rating": 4.5,
    "popularChoice": true,
    "bestVisitTime": "9 AM – 11 AM",
    "bestVisitTimeNote": "(Fresh & Peaceful)",
    "recommendedDays": "Mon – Wed",
    "recommendedDaysNote": "(Fewer Tour Buses)",
    "fragilityIndex": 0.3,
    "accessibility": {
      "wheelchair": "Yes (Wide pathways)",
      "stairs": "None"
    },
    "image": "images/SaheliyoKiBadi.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Built for a royal entourage of 48 maidens in the 18th century. Ornate marble elephant fountains, lotus pools, and lush manicured lawns.",
    "hourlyBaseline": {
      "08:00": 5,
      "09:00": 20,
      "10:00": 45,
      "11:00": 60,
      "12:00": 55,
      "13:00": 48,
      "14:00": 58,
      "15:00": 65,
      "16:00": 55,
      "17:00": 40,
      "18:00": 20
    },
    "suggestedQuietSlot": "09:00 AM - 10:30 AM",
    "alternatives": [
      "UDR_012",
      "UDR_015",
      "UDR_010"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_009",
    "name": "Sajjangarh (Monsoon Palace)",
    "subtitle": "Hilltop Palace Overlooking Udaipur & Sunset Views",
    "displayLocation": "Bansdara Peak, Udaipur",
    "category": "Historical",
    "experienceTags": [
      "hilltop_fort",
      "sunset_panorama",
      "aravalli_views",
      "monsoon_clouds"
    ],
    "tags": [
      "Historical",
      "Sunset Point"
    ],
    "primaryIntent": "sunset_waterfront",
    "coords": [
      24.5908,
      73.6375
    ],
    "openingHours": {
      "open": "09:00",
      "close": "18:00",
      "lastEntry": "17:15"
    },
    "avgVisitDurationMin": 120,
    "ticketPriceInr": 100,
    "capacityCeiling": 1000,
    "rating": 4.5,
    "popularChoice": true,
    "bestVisitTime": "11 AM – 2 PM",
    "bestVisitTimeNote": "(Scenic & Empty)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Less Traffic on Winding Road)",
    "fragilityIndex": 0.5,
    "accessibility": {
      "wheelchair": "No",
      "stairs": "Steep access roads & stairs"
    },
    "image": "images/SajjanGarh.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Perched 3,100 feet above sea level atop Bansdara Peak. Built by Maharana Sajjan Singh to track monsoon clouds. Extreme congestion at summit shuttle gates between 4:45 PM and 6:30 PM.",
    "hourlyBaseline": {
      "08:00": 5,
      "09:00": 15,
      "10:00": 25,
      "11:00": 30,
      "12:00": 32,
      "13:00": 28,
      "14:00": 35,
      "15:00": 55,
      "16:00": 80,
      "17:00": 98,
      "18:00": 70
    },
    "suggestedQuietSlot": "10:00 AM - 02:00 PM",
    "alternatives": [
      "UDR_014",
      "UDR_013",
      "UDR_018"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_010",
    "name": "Sajjangarh Biological Park",
    "subtitle": "Zoological & Nature Park at the Foothills of Sajjangarh",
    "displayLocation": "Foothills of Bansdara, Udaipur",
    "category": "Others",
    "experienceTags": [
      "wildlife",
      "safari_walks",
      "botanical",
      "peaceful"
    ],
    "tags": [
      "Others",
      "Wildlife Park"
    ],
    "primaryIntent": "nature_escape",
    "coords": [
      24.5885,
      73.648
    ],
    "openingHours": {
      "open": "09:00",
      "close": "17:00",
      "lastEntry": "16:15"
    },
    "avgVisitDurationMin": 120,
    "ticketPriceInr": 50,
    "capacityCeiling": 1600,
    "rating": 4.4,
    "popularChoice": false,
    "bestVisitTime": "9 AM – 11 AM",
    "bestVisitTimeNote": "(Active Animals)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Less Footfall)",
    "fragilityIndex": 0.3,
    "accessibility": {
      "wheelchair": "Yes (Golf carts available)",
      "stairs": "Paved trails"
    },
    "image": "images/SajjanGarh.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Expansive 5.19-sq-km wildlife park at the foot of Sajjangarh. Houses Asiatic lions, tigers, leopards, and birds in open moated enclosures. Clean, spacious, and uncrowded.",
    "hourlyBaseline": {
      "08:00": 0,
      "09:00": 20,
      "10:00": 40,
      "11:00": 50,
      "12:00": 45,
      "13:00": 35,
      "14:00": 40,
      "15:00": 45,
      "16:00": 30,
      "17:00": 10,
      "18:00": 0
    },
    "suggestedQuietSlot": "09:00 AM - 11:00 AM",
    "alternatives": [
      "UDR_015",
      "UDR_008",
      "UDR_018"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_011",
    "name": "Doodh Talai (Lake & Musical Garden)",
    "subtitle": "Picturesque Small Lake Adjacent to Pichola",
    "displayLocation": "Doodh Talai, Udaipur",
    "category": "Lakes",
    "experienceTags": [
      "sunset_view",
      "rock_garden",
      "lake_views",
      "family_walks"
    ],
    "tags": [
      "Lakes",
      "Gardens"
    ],
    "primaryIntent": "sunset_waterfront",
    "coords": [
      24.5695,
      73.6815
    ],
    "openingHours": {
      "open": "08:00",
      "close": "21:00",
      "lastEntry": "20:30"
    },
    "avgVisitDurationMin": 60,
    "ticketPriceInr": 20,
    "capacityCeiling": 1200,
    "rating": 4.4,
    "popularChoice": false,
    "bestVisitTime": "8 AM – 10 AM",
    "bestVisitTimeNote": "(Serene Lake Air)",
    "recommendedDays": "Tue – Thu",
    "recommendedDaysNote": "(Relaxed Pace)",
    "fragilityIndex": 0.3,
    "accessibility": {
      "wheelchair": "Partial",
      "stairs": "Terrace garden steps"
    },
    "image": "images/Doosh talai.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Charming freshwater pond at the southeastern corner of Lake Pichola with Pandit Deendayal Upadhyay Rock Garden and musical fountain. Gateway to the Karni Mata ropeway.",
    "hourlyBaseline": {
      "08:00": 10,
      "09:00": 20,
      "10:00": 30,
      "11:00": 35,
      "12:00": 30,
      "13:00": 25,
      "14:00": 30,
      "15:00": 45,
      "16:00": 65,
      "17:00": 85,
      "18:00": 80
    },
    "suggestedQuietSlot": "08:00 AM - 11:00 AM",
    "alternatives": [
      "UDR_006",
      "UDR_007",
      "UDR_012"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_012",
    "name": "Manik Lal Verma Garden",
    "subtitle": "Terraced Hillside Garden Overlooking Pichola",
    "displayLocation": "Doodh Talai Hill, Udaipur",
    "category": "Gardens",
    "experienceTags": [
      "terraced_garden",
      "scenic_overlook",
      "sunset_views",
      "quiet"
    ],
    "tags": [
      "Gardens",
      "Viewpoint"
    ],
    "primaryIntent": "nature_escape",
    "coords": [
      24.5682,
      73.6828
    ],
    "openingHours": {
      "open": "08:00",
      "close": "20:00",
      "lastEntry": "19:30"
    },
    "avgVisitDurationMin": 45,
    "ticketPriceInr": 20,
    "capacityCeiling": 800,
    "rating": 4.3,
    "popularChoice": false,
    "bestVisitTime": "8 AM – 10 AM",
    "bestVisitTimeNote": "(Very Quiet)",
    "recommendedDays": "Anyday",
    "recommendedDaysNote": "(Low Footfall Always)",
    "fragilityIndex": 0.25,
    "accessibility": {
      "wheelchair": "No",
      "stairs": "Hill steps"
    },
    "image": "images/ManikLalVermaPark.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Elevated rock garden positioned above Doodh Talai offering sweeping vantage points of Lake Pichola, Jag Mandir, and City Palace. Peaceful alternative to crowded lake promenades.",
    "hourlyBaseline": {
      "08:00": 5,
      "09:00": 15,
      "10:00": 25,
      "11:00": 30,
      "12:00": 25,
      "13:00": 20,
      "14:00": 25,
      "15:00": 35,
      "16:00": 55,
      "17:00": 70,
      "18:00": 65
    },
    "suggestedQuietSlot": "08:00 AM - 11:30 AM",
    "alternatives": [
      "UDR_008",
      "UDR_011",
      "UDR_015"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_013",
    "name": "Karni Mata Temple (Ropeway)",
    "subtitle": "Hilltop Temple on Machla Magra with Cable Car Ride",
    "displayLocation": "Machla Magra, Udaipur",
    "category": "Temples",
    "experienceTags": [
      "ropeway_ride",
      "hilltop_temple",
      "sunset_panorama",
      "spiritual"
    ],
    "tags": [
      "Temples",
      "Ropeway"
    ],
    "primaryIntent": "scenic_pilgrimage",
    "coords": [
      24.567,
      73.685
    ],
    "openingHours": {
      "open": "06:00",
      "close": "20:30",
      "lastEntry": "20:00"
    },
    "avgVisitDurationMin": 75,
    "ticketPriceInr": 100,
    "capacityCeiling": 1000,
    "rating": 4.6,
    "popularChoice": true,
    "bestVisitTime": "6:30 AM – 8:30 AM",
    "bestVisitTimeNote": "(Morning Calm)",
    "recommendedDays": "Mon – Wed",
    "recommendedDaysNote": "(Ropeway Queue <10m)",
    "fragilityIndex": 0.4,
    "accessibility": {
      "wheelchair": "Partial (Cable car assistance)",
      "stairs": "Temple plinth stairs"
    },
    "image": "images/Karni mata.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Situated atop Machla Magra hill, accessible by a thrilling 4-minute ropeway ride or walking staircase. Features unbroken panoramic sunset views over City Palace and Lake Pichola.",
    "hourlyBaseline": {
      "08:00": 15,
      "09:00": 25,
      "10:00": 35,
      "11:00": 45,
      "12:00": 40,
      "13:00": 30,
      "14:00": 35,
      "15:00": 50,
      "16:00": 75,
      "17:00": 95,
      "18:00": 85
    },
    "suggestedQuietSlot": "08:00 AM - 11:00 AM",
    "alternatives": [
      "UDR_003",
      "UDR_009",
      "UDR_014"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_014",
    "name": "Moti Magri / Maharana Pratap Memorial",
    "subtitle": "Historic Hilltop Park with Bronze Statue & Fateh Sagar Views",
    "displayLocation": "Moti Magri, Udaipur",
    "category": "Historical",
    "experienceTags": [
      "bronze_memorial",
      "patriotism",
      "lake_views",
      "tranquil_gardens"
    ],
    "tags": [
      "Historical",
      "Memorial"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      24.5992,
      73.6795
    ],
    "openingHours": {
      "open": "09:00",
      "close": "18:00",
      "lastEntry": "17:30"
    },
    "avgVisitDurationMin": 60,
    "ticketPriceInr": 100,
    "capacityCeiling": 1500,
    "rating": 4.5,
    "popularChoice": false,
    "bestVisitTime": "9 AM – 11 AM",
    "bestVisitTimeNote": "(Cool Morning Air)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Lower Crowds)",
    "fragilityIndex": 0.25,
    "accessibility": {
      "wheelchair": "Yes (Vehicle driven to top)",
      "stairs": "Minor"
    },
    "image": "images/MotiMagri_MaharanaPratapMemorial.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Pearl Hill dedicated to Mewar's legendary warrior Maharana Pratap and his loyal steed Chetak. Offers tranquil landscaped trails and panoramic vistas across Fateh Sagar Lake.",
    "hourlyBaseline": {
      "08:00": 5,
      "09:00": 20,
      "10:00": 35,
      "11:00": 45,
      "12:00": 40,
      "13:00": 35,
      "14:00": 40,
      "15:00": 50,
      "16:00": 60,
      "17:00": 50,
      "18:00": 20
    },
    "suggestedQuietSlot": "09:00 AM - 11:30 AM",
    "alternatives": [
      "UDR_007",
      "UDR_008",
      "UDR_009"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_015",
    "name": "Gulab Bagh & Zoo",
    "subtitle": "Historic 100-Acre Rose Garden, Library & Heritage Toy Train",
    "displayLocation": "Bapu Bazaar Road, Udaipur",
    "category": "Gardens",
    "experienceTags": [
      "rose_garden",
      "heritage_trees",
      "library",
      "toy_train"
    ],
    "tags": [
      "Gardens",
      "Park"
    ],
    "primaryIntent": "nature_escape",
    "coords": [
      24.5725,
      73.693
    ],
    "openingHours": {
      "open": "06:00",
      "close": "18:00",
      "lastEntry": "17:30"
    },
    "avgVisitDurationMin": 90,
    "ticketPriceInr": 25,
    "capacityCeiling": 3000,
    "rating": 4.3,
    "popularChoice": false,
    "bestVisitTime": "7 AM – 9:30 AM",
    "bestVisitTimeNote": "(Joggers & Fresh Blooms)",
    "recommendedDays": "Anyday",
    "recommendedDaysNote": "(Vast Grounds, Rarely Congested)",
    "fragilityIndex": 0.2,
    "accessibility": {
      "wheelchair": "Yes (Flat paved tracks)",
      "stairs": "None"
    },
    "image": "images/GulabBaghAndZoo.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Built in 1881 by Maharana Sajjan Singh, spanning 100 acres with rare flora, a century-old Victoria Hall library (Saraswati Bhawan), and vintage toy train.",
    "hourlyBaseline": {
      "08:00": 25,
      "09:00": 30,
      "10:00": 35,
      "11:00": 40,
      "12:00": 30,
      "13:00": 25,
      "14:00": 30,
      "15:00": 40,
      "16:00": 55,
      "17:00": 50,
      "18:00": 30
    },
    "suggestedQuietSlot": "11:00 AM - 03:30 PM",
    "alternatives": [
      "UDR_008",
      "UDR_010",
      "UDR_012"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_016",
    "name": "Shilpgram (Rural Arts & Crafts Complex)",
    "subtitle": "Living Heritage Village Showcasing Folk Crafts & Artisans",
    "displayLocation": "Havala Village, Udaipur",
    "category": "Others",
    "experienceTags": [
      "folk_crafts",
      "rural_huts",
      "artisan_workshops",
      "cultural_dance"
    ],
    "tags": [
      "Others",
      "Craft Village"
    ],
    "primaryIntent": "cultural_immersion",
    "coords": [
      24.6185,
      73.654
    ],
    "openingHours": {
      "open": "11:00",
      "close": "19:00",
      "lastEntry": "18:15"
    },
    "avgVisitDurationMin": 120,
    "ticketPriceInr": 50,
    "capacityCeiling": 2200,
    "rating": 4.6,
    "popularChoice": false,
    "bestVisitTime": "11 AM – 1:30 PM",
    "bestVisitTimeNote": "(Artisans Unhurried)",
    "recommendedDays": "Tue – Fri",
    "recommendedDaysNote": "(Low Footfall)",
    "fragilityIndex": 0.25,
    "accessibility": {
      "wheelchair": "Partial (Unpaved village paths)",
      "stairs": "Hut plinths"
    },
    "image": "images/Shilpgram.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "70-acre living ethnographic museum 3 km west of Udaipur, showcasing authentic rural dwellings of Rajasthan, Gujarat, and Goa. Features daily folk dance, pottery, and weaving.",
    "hourlyBaseline": {
      "08:00": 0,
      "09:00": 0,
      "10:00": 10,
      "11:00": 25,
      "12:00": 40,
      "13:00": 45,
      "14:00": 48,
      "15:00": 55,
      "16:00": 65,
      "17:00": 55,
      "18:00": 30
    },
    "suggestedQuietSlot": "11:00 AM - 01:30 PM",
    "alternatives": [
      "UDR_004",
      "UDR_020",
      "UDR_010"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_017",
    "name": "Under the Sun Aquarium",
    "subtitle": "India's Largest Public Fish Aquarium Gallery",
    "displayLocation": "Fateh Sagar Paal, Udaipur",
    "category": "Others",
    "experienceTags": [
      "marine_life",
      "aqua_tunnel",
      "indoor_ac",
      "family_friendly"
    ],
    "tags": [
      "Others",
      "Aquarium"
    ],
    "primaryIntent": "family_entertainment",
    "coords": [
      24.6045,
      73.6765
    ],
    "openingHours": {
      "open": "08:00",
      "close": "23:00",
      "lastEntry": "22:15"
    },
    "avgVisitDurationMin": 60,
    "ticketPriceInr": 120,
    "capacityCeiling": 900,
    "rating": 4.3,
    "popularChoice": false,
    "bestVisitTime": "11 AM – 2 PM",
    "bestVisitTimeNote": "(Escaping Afternoon Heat)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(No School Crowds)",
    "fragilityIndex": 0.3,
    "accessibility": {
      "wheelchair": "Yes",
      "stairs": "None"
    },
    "image": "images/FatehSagarLake.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Located near Fateh Sagar Lake; features 125m long aquarium galleries showcasing over 150 species of marine and freshwater fishes, touch tanks, and VR experiences.",
    "hourlyBaseline": {
      "08:00": 10,
      "09:00": 20,
      "10:00": 35,
      "11:00": 50,
      "12:00": 60,
      "13:00": 62,
      "14:00": 58,
      "15:00": 60,
      "16:00": 70,
      "17:00": 75,
      "18:00": 65
    },
    "suggestedQuietSlot": "08:30 AM - 10:30 AM",
    "alternatives": [
      "UDR_007",
      "UDR_010",
      "UDR_016"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_018",
    "name": "Badi Lake (Bahubali Hills)",
    "subtitle": "Scenic Mountain-Cradled Lake & Dramatic Hilltop Viewpoint",
    "displayLocation": "12 km North of Udaipur",
    "category": "Lakes",
    "experienceTags": [
      "nature_escape",
      "hiking_trail",
      "chhatris",
      "unspoiled_views"
    ],
    "tags": [
      "Lakes",
      "Trekking"
    ],
    "primaryIntent": "nature_escape",
    "coords": [
      24.6235,
      73.6265
    ],
    "openingHours": {
      "open": "06:00",
      "close": "18:30",
      "lastEntry": "17:45"
    },
    "avgVisitDurationMin": 90,
    "ticketPriceInr": 10,
    "capacityCeiling": 1500,
    "rating": 4.7,
    "popularChoice": true,
    "bestVisitTime": "6 AM – 9 AM",
    "bestVisitTimeNote": "(Sunrise Trek)",
    "recommendedDays": "Mon – Fri",
    "recommendedDaysNote": "(Serene & Uncrowded)",
    "fragilityIndex": 0.35,
    "accessibility": {
      "wheelchair": "Partial (Lake bank)",
      "stairs": "Steep hill hike to Bahubali"
    },
    "image": "images/BadiLake.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Built by Maharana Raj Singh I in 1680. Surrounded by dramatic Aravalli hills, its famous Bahubali Hill peak offers breathtaking sunrise panoramas without the commercial chaos.",
    "hourlyBaseline": {
      "08:00": 20,
      "09:00": 25,
      "10:00": 30,
      "11:00": 35,
      "12:00": 30,
      "13:00": 25,
      "14:00": 30,
      "15:00": 42,
      "16:00": 68,
      "17:00": 80,
      "18:00": 60
    },
    "suggestedQuietSlot": "06:30 AM - 09:30 AM",
    "alternatives": [
      "UDR_007",
      "UDR_019",
      "UDR_022"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_019",
    "name": "Udai Sagar Lake",
    "subtitle": "Historic 16th-Century Reservoir Built by Maharana Udai Singh",
    "displayLocation": "13 km East of Udaipur",
    "category": "Lakes",
    "experienceTags": [
      "ancient_dam",
      "quiet_waters",
      "countryside",
      "nature"
    ],
    "tags": [
      "Lakes",
      "Historic Dam"
    ],
    "primaryIntent": "nature_escape",
    "coords": [
      24.5828,
      73.8055
    ],
    "openingHours": {
      "open": "06:00",
      "close": "19:00",
      "lastEntry": "18:30"
    },
    "avgVisitDurationMin": 60,
    "ticketPriceInr": 0,
    "capacityCeiling": 1200,
    "rating": 4.4,
    "popularChoice": false,
    "bestVisitTime": "7 AM – 10 AM",
    "bestVisitTimeNote": "(Tranquil Lakeside)",
    "recommendedDays": "Anyday",
    "recommendedDaysNote": "(Consistently Peaceful)",
    "fragilityIndex": 0.25,
    "accessibility": {
      "wheelchair": "Partial",
      "stairs": "Embankment steps"
    },
    "image": "images/UdaiSagarLake.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Constructed by Maharana Udai Singh 13 km east of Udaipur to supply water to his kingdom. A peaceful, uncrowded expanse with an ancient dam wall and tranquil rural vistas.",
    "hourlyBaseline": {
      "08:00": 10,
      "09:00": 15,
      "10:00": 20,
      "11:00": 25,
      "12:00": 22,
      "13:00": 18,
      "14:00": 22,
      "15:00": 30,
      "16:00": 42,
      "17:00": 55,
      "18:00": 50
    },
    "suggestedQuietSlot": "Anytime (Consistently Peaceful)",
    "alternatives": [
      "UDR_018",
      "UDR_022",
      "UDR_007"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_020",
    "name": "Ahar Cenotaphs & Ahar Museum",
    "subtitle": "Historic Royal Cenotaphs & Archaeological Exhibits",
    "displayLocation": "Ahar, Udaipur",
    "category": "Historical",
    "experienceTags": [
      "royal_architecture",
      "ancient_history",
      "peaceful",
      "cenotaphs"
    ],
    "tags": [
      "Historical",
      "Cenotaphs"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      24.588,
      73.719
    ],
    "openingHours": {
      "open": "10:00",
      "close": "17:00",
      "lastEntry": "16:30"
    },
    "avgVisitDurationMin": 75,
    "ticketPriceInr": 20,
    "capacityCeiling": 800,
    "rating": 4.4,
    "popularChoice": false,
    "bestVisitTime": "10 AM – 1 PM",
    "bestVisitTimeNote": "(Peaceful)",
    "recommendedDays": "Anyday",
    "recommendedDaysNote": "(Consistently Low Footfall)",
    "fragilityIndex": 0.6,
    "accessibility": {
      "wheelchair": "Partial",
      "stairs": "Paved pathways"
    },
    "image": "images/AharCenotaphs.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Over 250 domed marble cenotaphs commemorating the Maharanas of Mewar. Exquisite Rajput architecture dating back 400 years, rarely congested. Perfect heritage alternative to City Palace.",
    "hourlyBaseline": {
      "08:00": 5,
      "09:00": 10,
      "10:00": 18,
      "11:00": 24,
      "12:00": 22,
      "13:00": 20,
      "14:00": 25,
      "15:00": 28,
      "16:00": 20,
      "17:00": 10,
      "18:00": 5
    },
    "suggestedQuietSlot": "Anytime (Consistently Low Crowd)",
    "alternatives": [
      "UDR_001",
      "UDR_003",
      "UDR_004"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_021",
    "name": "Jagmandir Island Palace",
    "subtitle": "Historic Island Palace & Gardens in Lake Pichola",
    "displayLocation": "Lake Pichola Island, Udaipur",
    "category": "Historical",
    "experienceTags": [
      "island_palace",
      "marble_elephants",
      "lake_views",
      "royal_retreat"
    ],
    "tags": [
      "Historical",
      "Island Palace"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      24.5678,
      73.6783
    ],
    "openingHours": {
      "open": "10:00",
      "close": "18:00",
      "lastEntry": "17:00"
    },
    "avgVisitDurationMin": 90,
    "ticketPriceInr": 400,
    "capacityCeiling": 1000,
    "rating": 4.7,
    "popularChoice": true,
    "bestVisitTime": "10 AM – 12:30 PM",
    "bestVisitTimeNote": "(Less Crowded Ferry)",
    "recommendedDays": "Tue – Thu",
    "recommendedDaysNote": "(Lower Crowds)",
    "fragilityIndex": 0.4,
    "accessibility": {
      "wheelchair": "Partial (Ferry boarding assistance)",
      "stairs": "Courtyard levels"
    },
    "image": "images/JagmandirIslandPalace.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Built on an island in Lake Pichola, also known as 'Lake Garden Palace'. Renowned for its row of sculpted marble elephants, ornate dome pavilions, and royal fountain courtyards.",
    "hourlyBaseline": {
      "08:00": 0,
      "09:00": 10,
      "10:00": 35,
      "11:00": 50,
      "12:00": 55,
      "13:00": 48,
      "14:00": 52,
      "15:00": 65,
      "16:00": 80,
      "17:00": 85,
      "18:00": 40
    },
    "suggestedQuietSlot": "10:00 AM - 12:30 PM",
    "alternatives": [
      "UDR_001",
      "UDR_002",
      "UDR_004"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_022",
    "name": "Jaisamand Lake",
    "subtitle": "Asia's 2nd Largest Artificial Lake & Nature Sanctuary",
    "displayLocation": "48 km South-East of Udaipur",
    "category": "Lakes",
    "experienceTags": [
      "massive_lake",
      "marble_chhatris",
      "wildlife_sanctuary",
      "day_excursion"
    ],
    "tags": [
      "Lakes",
      "Sanctuary"
    ],
    "primaryIntent": "nature_escape",
    "coords": [
      24.2415,
      73.9635
    ],
    "openingHours": {
      "open": "07:00",
      "close": "18:30",
      "lastEntry": "17:30"
    },
    "avgVisitDurationMin": 180,
    "ticketPriceInr": 0,
    "capacityCeiling": 3500,
    "rating": 4.6,
    "popularChoice": false,
    "bestVisitTime": "8 AM – 11 AM",
    "bestVisitTimeNote": "(Breezy Morning)",
    "recommendedDays": "Anyday",
    "recommendedDaysNote": "(Vast Expanse)",
    "fragilityIndex": 0.2,
    "accessibility": {
      "wheelchair": "Partial",
      "stairs": "Embankment stairs"
    },
    "image": "images/JaisamandLake.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Asia's second-largest artificial lake (~48 km from Udaipur) built in 1685. Features six intricately carved marble cenotaphs, island tribal settlements, and a wildlife sanctuary.",
    "hourlyBaseline": {
      "08:00": 5,
      "09:00": 15,
      "10:00": 30,
      "11:00": 45,
      "12:00": 52,
      "13:00": 50,
      "14:00": 55,
      "15:00": 58,
      "16:00": 50,
      "17:00": 35,
      "18:00": 15
    },
    "suggestedQuietSlot": "08:00 AM - 11:00 AM",
    "alternatives": [
      "UDR_018",
      "UDR_019",
      "UDR_007"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_023",
    "name": "Sahastra Bahu (Sas-Bahu) Temples",
    "subtitle": "10th-Century Carved Temple Complex in Ancient Nagda",
    "displayLocation": "Nagda, 22 km North of Udaipur",
    "category": "Temples",
    "experienceTags": [
      "ancient_temple",
      "sandstone_carvings",
      "archaeological",
      "quiet_heritage"
    ],
    "tags": [
      "Temples",
      "Ancient Heritage"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      24.7212,
      73.7176
    ],
    "openingHours": {
      "open": "06:00",
      "close": "18:00",
      "lastEntry": "17:30"
    },
    "avgVisitDurationMin": 60,
    "ticketPriceInr": 25,
    "capacityCeiling": 600,
    "rating": 4.6,
    "popularChoice": false,
    "bestVisitTime": "8 AM – 11 AM",
    "bestVisitTimeNote": "(Serene Atmosphere)",
    "recommendedDays": "Mon – Fri",
    "recommendedDaysNote": "(Low Footfall)",
    "fragilityIndex": 0.55,
    "accessibility": {
      "wheelchair": "No",
      "stairs": "Stone plinths"
    },
    "image": "images/SahastrabahuTemple.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Magnificent 1,000-year-old twin temple complex dedicated to Lord Vishnu in Nagda (~22 km north of Udaipur). Features astonishingly intricate Torana gateways and ceiling friezes.",
    "hourlyBaseline": {
      "08:00": 10,
      "09:00": 20,
      "10:00": 32,
      "11:00": 38,
      "12:00": 30,
      "13:00": 25,
      "14:00": 28,
      "15:00": 35,
      "16:00": 40,
      "17:00": 30,
      "18:00": 15
    },
    "suggestedQuietSlot": "Anytime (Very Low Crowd Pressure)",
    "alternatives": [
      "UDR_003",
      "UDR_020",
      "UDR_025"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_024",
    "name": "Haldighati Battlefield & Museum",
    "subtitle": "Historic Battlefield Region Associated with Maharana Pratap",
    "displayLocation": "Haldighati, 40 km North of Udaipur",
    "category": "Historical",
    "experienceTags": [
      "historic_battlefield",
      "pratap_museum",
      "yellow_soil",
      "patriotic"
    ],
    "tags": [
      "Historical",
      "Battlefield"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      24.891,
      73.705
    ],
    "openingHours": {
      "open": "09:00",
      "close": "18:00",
      "lastEntry": "17:15"
    },
    "avgVisitDurationMin": 90,
    "ticketPriceInr": 100,
    "capacityCeiling": 1800,
    "rating": 4.5,
    "popularChoice": false,
    "bestVisitTime": "9 AM – 10:30 AM",
    "bestVisitTimeNote": "(Pleasant Weather)",
    "recommendedDays": "Tue – Thu",
    "recommendedDaysNote": "(Lower Crowds)",
    "fragilityIndex": 0.25,
    "accessibility": {
      "wheelchair": "Yes (Museum galleries)",
      "stairs": "Minor"
    },
    "image": "images/Haldighati.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Famous mountain pass in the Aravallis (~40 km from Udaipur) where the heroic Battle of Haldighati was fought in 1576. Features the yellow-turmeric soil pass, Chetak Samadhi, and museum.",
    "hourlyBaseline": {
      "08:00": 5,
      "09:00": 20,
      "10:00": 42,
      "11:00": 58,
      "12:00": 62,
      "13:00": 55,
      "14:00": 60,
      "15:00": 65,
      "16:00": 52,
      "17:00": 30,
      "18:00": 10
    },
    "suggestedQuietSlot": "09:00 AM - 10:30 AM",
    "alternatives": [
      "UDR_014",
      "UDR_023",
      "UDR_025"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "UDR_025",
    "name": "Nathdwara / Shrinathji Temple",
    "subtitle": "Major Pilgrimage Destination & Renowned Temple Town",
    "displayLocation": "Nathdwara, 45 km North-East of Udaipur",
    "category": "Temples",
    "experienceTags": [
      "sacred_pilgrimage",
      "vaishnav_darshan",
      "heritage_town",
      "pichwai_art"
    ],
    "tags": [
      "Temples",
      "Pilgrimage"
    ],
    "primaryIntent": "scenic_pilgrimage",
    "coords": [
      24.9312,
      73.8188
    ],
    "openingHours": {
      "open": "05:30",
      "close": "19:30",
      "lastEntry": "19:00"
    },
    "avgVisitDurationMin": 120,
    "ticketPriceInr": 0,
    "capacityCeiling": 5000,
    "rating": 4.8,
    "popularChoice": true,
    "bestVisitTime": "1 PM – 3 PM",
    "bestVisitTimeNote": "(Bazaar Quiet / Temple Closed)",
    "recommendedDays": "Tue – Thu",
    "recommendedDaysNote": "(Less Pilgrimage Rush)",
    "fragilityIndex": 0.5,
    "accessibility": {
      "wheelchair": "Partial (Crowded bazaars)",
      "stairs": "Temple thresholds"
    },
    "image": "images/Nathdwara.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/udaipur.html",
    "description": "Renowned 17th-century shrine of Shrinathji (~45 km from Udaipur) on the banks of Banas River. Draws devotees from around the world for festive darshan, famous prasad, and Pichwai paintings.",
    "hourlyBaseline": {
      "08:00": 50,
      "09:00": 65,
      "10:00": 80,
      "11:00": 88,
      "12:00": 45,
      "13:00": 20,
      "14:00": 25,
      "15:00": 55,
      "16:00": 75,
      "17:00": 90,
      "18:00": 82
    },
    "suggestedQuietSlot": "01:00 PM - 03:00 PM (Temple Closed / Bazaar Quiet)",
    "alternatives": [
      "UDR_003",
      "UDR_013",
      "UDR_023"
    ],
    "cityId": "udaipur",
    "cityName": "Udaipur",
    "state": "Rajasthan"
  },
  {
    "id": "AGR_001",
    "name": "Taj Mahal",
    "cityId": "agra_delhi",
    "cityName": "Agra & Delhi",
    "state": "Uttar Pradesh",
    "subtitle": "Mughal Wonder • Agra",
    "displayLocation": "Tajganj, Agra, Uttar Pradesh",
    "category": "Historical",
    "experienceTags": [
      "mughal_wonder",
      "unesco_world_heritage",
      "marble_mausoleum",
      "yamuna_view"
    ],
    "tags": [
      "7 Wonders",
      "UNESCO",
      "Mughal",
      "Mausoleum"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      27.1751,
      78.0421
    ],
    "openingHours": {
      "open": "06:00",
      "close": "18:30",
      "lastEntry": "17:30"
    },
    "avgVisitDurationMin": 180,
    "ticketPriceInr": 250,
    "capacityCeiling": 12000,
    "rating": 4.9,
    "popularChoice": true,
    "bestVisitTime": "06:00 AM – 08:00 AM",
    "bestVisitTimeNote": "(Sunrise, Minimal Queue)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Closed on Fridays)",
    "fragilityIndex": 0.85,
    "accessibility": {
      "wheelchair": "Yes (Golf carts available)",
      "stairs": "Ramps provided"
    },
    "image": "images/AGR_001.jpg",
    "officialSource": "https://www.tajmahal.gov.in",
    "description": "Universally admired masterpiece of world heritage. Severe bottlenecks form at East Gate security turnstiles between 10:30 AM and 3:30 PM.",
    "hourlyBaseline": {
      "08:00": 35,
      "09:00": 60,
      "10:00": 85,
      "11:00": 96,
      "12:00": 98,
      "13:00": 94,
      "14:00": 90,
      "15:00": 88,
      "16:00": 78,
      "17:00": 65,
      "18:00": 30
    },
    "suggestedQuietSlot": "06:00 AM - 08:00 AM (Sunrise)",
    "alternatives": [
      "AGR_002",
      "AGR_003"
    ]
  },
  {
    "id": "AGR_002",
    "name": "Agra Fort",
    "cityId": "agra_delhi",
    "cityName": "Agra & Delhi",
    "state": "Uttar Pradesh",
    "subtitle": "UNESCO Fortress • Agra",
    "displayLocation": "Rakabganj, Agra, Uttar Pradesh",
    "category": "Historical",
    "experienceTags": [
      "red_sandstone",
      "mughal_fortress",
      "palaces",
      "taj_views"
    ],
    "tags": [
      "UNESCO",
      "Fort",
      "Mughal"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      27.1795,
      78.0211
    ],
    "openingHours": {
      "open": "06:00",
      "close": "18:00",
      "lastEntry": "17:15"
    },
    "avgVisitDurationMin": 120,
    "ticketPriceInr": 50,
    "capacityCeiling": 6000,
    "rating": 4.7,
    "popularChoice": false,
    "bestVisitTime": "08:30 AM – 10:30 AM",
    "bestVisitTimeNote": "(Cooler & Spaced)",
    "recommendedDays": "Mon – Wed",
    "recommendedDaysNote": "(Low Weekend Rush)",
    "fragilityIndex": 0.4,
    "accessibility": {
      "wheelchair": "Partial (Cobbled path)",
      "stairs": "Moderate"
    },
    "image": "images/AGR_002.jpg",
    "officialSource": "https://asi.nic.in",
    "description": "Massive 16th-century Mughal fortress in red sandstone. Features Jahangir's Palace and Diwan-i-Khas with views of the Taj Mahal across the Yamuna.",
    "hourlyBaseline": {
      "08:00": 15,
      "09:00": 30,
      "10:00": 50,
      "11:00": 70,
      "12:00": 75,
      "13:00": 68,
      "14:00": 60,
      "15:00": 58,
      "16:00": 45,
      "17:00": 30,
      "18:00": 15
    },
    "suggestedQuietSlot": "08:30 AM - 10:30 AM",
    "alternatives": [
      "AGR_001",
      "AGR_003"
    ]
  },
  {
    "id": "AGR_003",
    "name": "Fatehpur Sikri",
    "cityId": "agra_delhi",
    "cityName": "Agra & Delhi",
    "state": "Uttar Pradesh",
    "subtitle": "Imperial Ghost City • Agra District",
    "displayLocation": "Fatehpur Sikri, Uttar Pradesh",
    "category": "Historical",
    "experienceTags": [
      "buland_darwaza",
      "unesco",
      "emperor_akbar",
      "spacious_courtyards"
    ],
    "tags": [
      "UNESCO",
      "Imperial City",
      "Spiritual"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      27.0945,
      77.6679
    ],
    "openingHours": {
      "open": "06:00",
      "close": "18:00",
      "lastEntry": "17:15"
    },
    "avgVisitDurationMin": 120,
    "ticketPriceInr": 50,
    "capacityCeiling": 4500,
    "rating": 4.6,
    "popularChoice": false,
    "bestVisitTime": "09:00 AM – 11:30 AM",
    "bestVisitTimeNote": "(Breezy & Uncrowded)",
    "recommendedDays": "Tue – Thu",
    "recommendedDaysNote": "(Consistently Low)",
    "fragilityIndex": 0.35,
    "accessibility": {
      "wheelchair": "Yes (Electric shuttle from parking)",
      "stairs": "Ramps"
    },
    "image": "images/AGR_003.jpg",
    "officialSource": "https://asi.nic.in",
    "description": "Akbar's 16th-century walled red sandstone city, home to the colossal Buland Darwaza and Jama Masjid. Vast open courtyards disperse crowds effortlessly.",
    "hourlyBaseline": {
      "08:00": 10,
      "09:00": 20,
      "10:00": 38,
      "11:00": 48,
      "12:00": 50,
      "13:00": 45,
      "14:00": 40,
      "15:00": 38,
      "16:00": 30,
      "17:00": 18,
      "18:00": 5
    },
    "suggestedQuietSlot": "Anytime before 12:00 PM",
    "alternatives": [
      "AGR_002",
      "AGR_001"
    ]
  },
  {
    "id": "DEL_001",
    "name": "Qutub Minar",
    "cityId": "agra_delhi",
    "cityName": "Agra & Delhi",
    "state": "Delhi",
    "subtitle": "Towering Victory Minaret • South Delhi",
    "displayLocation": "Mehrauli, New Delhi",
    "category": "Historical",
    "experienceTags": [
      "islamic_architecture",
      "unesco_world_heritage",
      "iron_pillar",
      "lush_lawns"
    ],
    "tags": [
      "UNESCO",
      "Tower",
      "Lawns"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      28.5245,
      77.1855
    ],
    "openingHours": {
      "open": "07:00",
      "close": "21:00",
      "lastEntry": "20:00"
    },
    "avgVisitDurationMin": 90,
    "ticketPriceInr": 40,
    "capacityCeiling": 5000,
    "rating": 4.6,
    "popularChoice": false,
    "bestVisitTime": "08:00 AM – 10:00 AM",
    "bestVisitTimeNote": "(Morning Serenity)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Lower Crowds)",
    "fragilityIndex": 0.4,
    "accessibility": {
      "wheelchair": "Yes",
      "stairs": "Paved garden paths"
    },
    "image": "images/DEL_001.jpg",
    "officialSource": "https://delhitourism.gov.in",
    "description": "73-meter fluted red sandstone victory tower built in 1192 AD. Surrounding park contains the 1,600-year-old rust-resistant Gupta iron pillar.",
    "hourlyBaseline": {
      "08:00": 15,
      "09:00": 32,
      "10:00": 55,
      "11:00": 68,
      "12:00": 70,
      "13:00": 65,
      "14:00": 60,
      "15:00": 68,
      "16:00": 74,
      "17:00": 60,
      "18:00": 35
    },
    "suggestedQuietSlot": "08:00 AM - 10:00 AM",
    "alternatives": [
      "DEL_002",
      "DEL_003"
    ]
  },
  {
    "id": "DEL_002",
    "name": "Humayun's Tomb",
    "cityId": "agra_delhi",
    "cityName": "Agra & Delhi",
    "state": "Delhi",
    "subtitle": "Mughal Garden Tomb • Nizamuddin East",
    "displayLocation": "Mathura Rd, New Delhi",
    "category": "Historical",
    "experienceTags": [
      "charbagh_garden",
      "unesco_world_heritage",
      "persian_symmetry",
      "quiet_walks"
    ],
    "tags": [
      "UNESCO",
      "Garden Tomb",
      "Peaceful"
    ],
    "primaryIntent": "quiet_gardens",
    "coords": [
      28.5933,
      77.2507
    ],
    "openingHours": {
      "open": "06:00",
      "close": "18:00",
      "lastEntry": "17:15"
    },
    "avgVisitDurationMin": 90,
    "ticketPriceInr": 40,
    "capacityCeiling": 3500,
    "rating": 4.7,
    "popularChoice": false,
    "bestVisitTime": "07:00 AM – 09:30 AM",
    "bestVisitTimeNote": "(Peaceful Birds & Mist)",
    "recommendedDays": "Tue – Fri",
    "recommendedDaysNote": "(Low Crowds)",
    "fragilityIndex": 0.35,
    "accessibility": {
      "wheelchair": "Yes",
      "stairs": "Ramps at garden channels"
    },
    "image": "images/DEL_002.jpg",
    "officialSource": "https://delhitourism.gov.in",
    "description": "The architectural precursor to the Taj Mahal. Set amidst 30 acres of geometric Persian Charbagh gardens with peaceful water fountains.",
    "hourlyBaseline": {
      "08:00": 10,
      "09:00": 22,
      "10:00": 40,
      "11:00": 52,
      "12:00": 48,
      "13:00": 42,
      "14:00": 45,
      "15:00": 55,
      "16:00": 60,
      "17:00": 42,
      "18:00": 18
    },
    "suggestedQuietSlot": "07:00 AM - 09:30 AM",
    "alternatives": [
      "DEL_001",
      "DEL_003"
    ]
  },
  {
    "id": "DEL_003",
    "name": "Red Fort (Lal Qila)",
    "cityId": "agra_delhi",
    "cityName": "Agra & Delhi",
    "state": "Delhi",
    "subtitle": "Historic Fort • Old Delhi",
    "displayLocation": "Netaji Subhash Marg, Chandni Chowk, Delhi",
    "category": "Historical",
    "experienceTags": [
      "mughal_citadel",
      "lahori_gate",
      "chandni_chowk",
      "sound_and_light"
    ],
    "tags": [
      "UNESCO",
      "Citadel",
      "National Icon"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      28.6562,
      77.241
    ],
    "openingHours": {
      "open": "09:30",
      "close": "16:30",
      "lastEntry": "16:00"
    },
    "avgVisitDurationMin": 120,
    "ticketPriceInr": 35,
    "capacityCeiling": 7000,
    "rating": 4.5,
    "popularChoice": false,
    "bestVisitTime": "09:30 AM – 11:00 AM",
    "bestVisitTimeNote": "(Early Entry)",
    "recommendedDays": "Tue – Thu",
    "recommendedDaysNote": "(Closed on Mondays)",
    "fragilityIndex": 0.5,
    "accessibility": {
      "wheelchair": "Yes",
      "stairs": "Ramps"
    },
    "image": "images/DEL_003.jpg",
    "officialSource": "https://delhitourism.gov.in",
    "description": "Seat of the Mughal Empire for 200 years. Lahori Gate and Chatta Chowk market experience substantial bottlenecks on weekends and national holidays.",
    "hourlyBaseline": {
      "08:00": 5,
      "09:00": 25,
      "10:00": 60,
      "11:00": 80,
      "12:00": 85,
      "13:00": 82,
      "14:00": 78,
      "15:00": 75,
      "16:00": 65,
      "17:00": 30,
      "18:00": 10
    },
    "suggestedQuietSlot": "09:30 AM - 11:00 AM",
    "alternatives": [
      "DEL_002",
      "DEL_001"
    ]
  },
  {
    "id": "JAI_001",
    "name": "Amber Fort (Amer)",
    "cityId": "jaipur",
    "cityName": "Jaipur",
    "state": "Rajasthan",
    "subtitle": "Hilltop Fortress • Amer, Jaipur",
    "displayLocation": "Devisinghpura, Amer, Jaipur, Rajasthan",
    "category": "Historical",
    "experienceTags": [
      "hilltop_palace",
      "sheesh_mahal",
      "maota_lake",
      "rajput_architecture"
    ],
    "tags": [
      "UNESCO",
      "Hill Fort",
      "Palace",
      "Mirror Work"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      26.9855,
      75.8513
    ],
    "openingHours": {
      "open": "08:00",
      "close": "17:30",
      "lastEntry": "16:45"
    },
    "avgVisitDurationMin": 150,
    "ticketPriceInr": 100,
    "capacityCeiling": 4000,
    "rating": 4.8,
    "popularChoice": true,
    "bestVisitTime": "08:00 AM – 10:00 AM",
    "bestVisitTimeNote": "(Less Traffic on Ghat Road)",
    "recommendedDays": "Mon – Wed",
    "recommendedDaysNote": "(Lower Tourist Buses)",
    "fragilityIndex": 0.45,
    "accessibility": {
      "wheelchair": "Limited (Steep ramp)",
      "stairs": "Substantial stone steps"
    },
    "image": "images/JAI_001.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/jaipur.html",
    "description": "Opulent Rajput hill fortress towering over Maota Lake. Famous for the Sheesh Mahal (Mirror Palace). Severe coach bottlenecks clog Amer Road between 11 AM and 3 PM.",
    "hourlyBaseline": {
      "08:00": 15,
      "09:00": 40,
      "10:00": 75,
      "11:00": 92,
      "12:00": 95,
      "13:00": 88,
      "14:00": 82,
      "15:00": 75,
      "16:00": 60,
      "17:00": 35,
      "18:00": 10
    },
    "suggestedQuietSlot": "08:00 AM - 10:00 AM",
    "alternatives": [
      "JAI_004",
      "JAI_005",
      "JAI_003"
    ]
  },
  {
    "id": "JAI_002",
    "name": "Hawa Mahal",
    "cityId": "jaipur",
    "cityName": "Jaipur",
    "state": "Rajasthan",
    "subtitle": "Palace of Winds • Pink City",
    "displayLocation": "Badi Choupad, J.D.A. Market, Jaipur",
    "category": "Historical",
    "experienceTags": [
      "honeycomb_facade",
      "953_windows",
      "pink_sandstone",
      "old_bazaar"
    ],
    "tags": [
      "Iconic",
      "Pink City",
      "Palace"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      26.9239,
      75.8267
    ],
    "openingHours": {
      "open": "09:00",
      "close": "17:00",
      "lastEntry": "16:30"
    },
    "avgVisitDurationMin": 60,
    "ticketPriceInr": 50,
    "capacityCeiling": 1200,
    "rating": 4.6,
    "popularChoice": false,
    "bestVisitTime": "09:00 AM – 10:30 AM",
    "bestVisitTimeNote": "(Morning Golden Light on Facade)",
    "recommendedDays": "Tue – Thu",
    "recommendedDaysNote": "(Lower Market Congestion)",
    "fragilityIndex": 0.5,
    "accessibility": {
      "wheelchair": "No (Ramps but steep)",
      "stairs": "Narrow corridors"
    },
    "image": "images/JAI_002.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/jaipur.html",
    "description": "Five-story pink sandstone screen with 953 jharokhas (casements). Badi Chaupar street front sees severe pedestrian bottlenecks in the afternoon.",
    "hourlyBaseline": {
      "08:00": 5,
      "09:00": 30,
      "10:00": 65,
      "11:00": 82,
      "12:00": 85,
      "13:00": 78,
      "14:00": 72,
      "15:00": 80,
      "16:00": 85,
      "17:00": 55,
      "18:00": 20
    },
    "suggestedQuietSlot": "09:00 AM - 10:30 AM",
    "alternatives": [
      "JAI_003",
      "JAI_005"
    ]
  },
  {
    "id": "JAI_003",
    "name": "City Palace Jaipur",
    "cityId": "jaipur",
    "cityName": "Jaipur",
    "state": "Rajasthan",
    "subtitle": "Royal Residence • Pink City, Jaipur",
    "displayLocation": "Tulsi Marg, Gangori Bazaar, Jaipur",
    "category": "Historical",
    "experienceTags": [
      "chandra_mahal",
      "peacock_gate",
      "royal_museum",
      "armoury"
    ],
    "tags": [
      "Palace",
      "Museum",
      "Heritage"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      26.9258,
      75.8236
    ],
    "openingHours": {
      "open": "09:30",
      "close": "17:00",
      "lastEntry": "16:30"
    },
    "avgVisitDurationMin": 120,
    "ticketPriceInr": 200,
    "capacityCeiling": 2200,
    "rating": 4.6,
    "popularChoice": false,
    "bestVisitTime": "09:30 AM – 11:00 AM",
    "bestVisitTimeNote": "(Smooth Courtyard Entry)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Lower Crowds)",
    "fragilityIndex": 0.35,
    "accessibility": {
      "wheelchair": "Yes (Courtyards flat)",
      "stairs": "Ramps"
    },
    "image": "images/JAI_003.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/jaipur.html",
    "description": "Royal residence complex blending Mughal and Rajput architecture, featuring the world-famous Pritam Niwas Chowk with Peacock Gate.",
    "hourlyBaseline": {
      "08:00": 5,
      "09:00": 25,
      "10:00": 55,
      "11:00": 75,
      "12:00": 82,
      "13:00": 80,
      "14:00": 72,
      "15:00": 65,
      "16:00": 50,
      "17:00": 25,
      "18:00": 5
    },
    "suggestedQuietSlot": "09:30 AM - 11:00 AM",
    "alternatives": [
      "JAI_002",
      "JAI_005"
    ]
  },
  {
    "id": "JAI_004",
    "name": "Nahargarh Fort",
    "cityId": "jaipur",
    "cityName": "Jaipur",
    "state": "Rajasthan",
    "subtitle": "Sunset Ridge • Aravalli Hills",
    "displayLocation": "Krishna Nagar, Brahampuri, Jaipur",
    "category": "Historical",
    "experienceTags": [
      "sunset_viewpoint",
      "panoramic_city_view",
      "madhavendra_bhawan",
      "open_air_cafes"
    ],
    "tags": [
      "Viewpoint",
      "Sunset",
      "Fort"
    ],
    "primaryIntent": "sunset_waterfront",
    "coords": [
      26.9373,
      75.8156
    ],
    "openingHours": {
      "open": "10:00",
      "close": "20:00",
      "lastEntry": "19:00"
    },
    "avgVisitDurationMin": 90,
    "ticketPriceInr": 50,
    "capacityCeiling": 1500,
    "rating": 4.7,
    "popularChoice": false,
    "bestVisitTime": "11:00 AM – 02:00 PM",
    "bestVisitTimeNote": "(Day Panorama, Low Traffic)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Sunset Ridge Choked on Weekends)",
    "fragilityIndex": 0.4,
    "accessibility": {
      "wheelchair": "Partial",
      "stairs": "Paved ramps"
    },
    "image": "images/JAI_004.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/jaipur.html",
    "description": "Stands on the edge of the Aravalli Hills overlooking the entire Pink City. Sunset sees heavy vehicle congestion on the winding ghat road.",
    "hourlyBaseline": {
      "08:00": 5,
      "09:00": 10,
      "10:00": 20,
      "11:00": 30,
      "12:00": 32,
      "13:00": 30,
      "14:00": 42,
      "15:00": 65,
      "16:00": 90,
      "17:00": 98,
      "18:00": 85
    },
    "suggestedQuietSlot": "11:00 AM - 02:00 PM",
    "alternatives": [
      "JAI_005",
      "JAI_001"
    ]
  },
  {
    "id": "JAI_005",
    "name": "Jal Mahal (Water Palace)",
    "cityId": "jaipur",
    "cityName": "Jaipur",
    "state": "Rajasthan",
    "subtitle": "Man Sagar Lake Promenade • Jaipur",
    "displayLocation": "Amer Road, Jaipur, Rajasthan",
    "category": "Lakes",
    "experienceTags": [
      "water_palace",
      "lake_promenade",
      "migratory_birds",
      "peaceful_stroll"
    ],
    "tags": [
      "Lake",
      "Water Palace",
      "Promenade"
    ],
    "primaryIntent": "sunset_waterfront",
    "coords": [
      26.9535,
      75.8462
    ],
    "openingHours": {
      "open": "06:00",
      "close": "22:00",
      "lastEntry": "21:30"
    },
    "avgVisitDurationMin": 45,
    "ticketPriceInr": 0,
    "capacityCeiling": 3000,
    "rating": 4.5,
    "popularChoice": false,
    "bestVisitTime": "07:00 AM – 09:00 AM",
    "bestVisitTimeNote": "(Morning Calm, Crisp Reflections)",
    "recommendedDays": "Mon – Fri",
    "recommendedDaysNote": "(Low Crowds)",
    "fragilityIndex": 0.2,
    "accessibility": {
      "wheelchair": "Yes (Full paved promenade)",
      "stairs": "None"
    },
    "image": "images/JAI_005.jpg",
    "officialSource": "https://www.tourism.rajasthan.gov.in/jaipur.html",
    "description": "Serene 18th-century palace floating in the middle of Man Sagar Lake. Beautiful landscaped lakeside boulevard with zero ticket wait time.",
    "hourlyBaseline": {
      "08:00": 15,
      "09:00": 20,
      "10:00": 25,
      "11:00": 30,
      "12:00": 28,
      "13:00": 25,
      "14:00": 32,
      "15:00": 48,
      "16:00": 65,
      "17:00": 78,
      "18:00": 80
    },
    "suggestedQuietSlot": "07:00 AM - 09:00 AM",
    "alternatives": [
      "JAI_004",
      "JAI_001"
    ]
  },
  {
    "id": "VNS_001",
    "name": "Kashi Vishwanath Temple",
    "cityId": "varanasi",
    "cityName": "Varanasi",
    "state": "Uttar Pradesh",
    "subtitle": "Sacred Jyotirlinga • Varanasi",
    "displayLocation": "Vishwanath Gali, Godowlia, Varanasi",
    "category": "Temples",
    "experienceTags": [
      "golden_temple",
      "ganga_corridor",
      "shiva_sanctum",
      "spiritual_heritage"
    ],
    "tags": [
      "Jyotirlinga",
      "Sacred",
      "Corridor"
    ],
    "primaryIntent": "spiritual",
    "coords": [
      25.3109,
      83.0107
    ],
    "openingHours": {
      "open": "03:00",
      "close": "23:00",
      "lastEntry": "22:00"
    },
    "avgVisitDurationMin": 90,
    "ticketPriceInr": 0,
    "capacityCeiling": 8000,
    "rating": 4.9,
    "popularChoice": true,
    "bestVisitTime": "04:30 AM – 06:30 AM",
    "bestVisitTimeNote": "(Mangala Aarti, Low Wait)",
    "recommendedDays": "Tue – Thu",
    "recommendedDaysNote": "(Mondays Extensively Packed)",
    "fragilityIndex": 0.65,
    "accessibility": {
      "wheelchair": "Yes (Through new Corridor ramps)",
      "stairs": "Ramps available"
    },
    "image": "images/VNS_001.jpg",
    "officialSource": "https://shrikashivishwanath.org",
    "description": "One of the twelve holiest Jyotirlinga shrines. The newly opened Grand Corridor connects the temple directly to Manikarnika Ghat with improved crowd circulation.",
    "hourlyBaseline": {
      "08:00": 40,
      "09:00": 70,
      "10:00": 90,
      "11:00": 95,
      "12:00": 90,
      "13:00": 60,
      "14:00": 55,
      "15:00": 75,
      "16:00": 85,
      "17:00": 92,
      "18:00": 96
    },
    "suggestedQuietSlot": "04:30 AM - 06:30 AM (Dawn)",
    "alternatives": [
      "VNS_004",
      "VNS_003"
    ]
  },
  {
    "id": "VNS_002",
    "name": "Dashashwamedh Ghat",
    "cityId": "varanasi",
    "cityName": "Varanasi",
    "state": "Uttar Pradesh",
    "subtitle": "Ganga Evening Aarti • Varanasi",
    "displayLocation": "Dashashwamedh Ghat Rd, Varanasi",
    "category": "Historical",
    "experienceTags": [
      "ganga_aarti",
      "brass_lamps",
      "boat_seating",
      "holy_ghat"
    ],
    "tags": [
      "Ghat",
      "Aarti",
      "Ganges",
      "Spiritual"
    ],
    "primaryIntent": "spiritual",
    "coords": [
      25.3072,
      83.0104
    ],
    "openingHours": {
      "open": "04:00",
      "close": "23:00",
      "lastEntry": "22:30"
    },
    "avgVisitDurationMin": 90,
    "ticketPriceInr": 0,
    "capacityCeiling": 10000,
    "rating": 4.8,
    "popularChoice": true,
    "bestVisitTime": "05:30 AM – 07:30 AM",
    "bestVisitTimeNote": "(Morning Subah-e-Banaras)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Extreme Surge for 6:30 PM Aarti)",
    "fragilityIndex": 0.55,
    "accessibility": {
      "wheelchair": "Limited (Steep stone ghat steps)",
      "stairs": "50+ stone steps"
    },
    "image": "images/VNS_002.jpg",
    "officialSource": "https://varanasi.nic.in",
    "description": "The main and most spectacular ghat on the Ganges. Hundreds gather on wooden boats and stone steps for the synchronized evening Maha Aarti.",
    "hourlyBaseline": {
      "08:00": 35,
      "09:00": 30,
      "10:00": 25,
      "11:00": 20,
      "12:00": 15,
      "13:00": 15,
      "14:00": 20,
      "15:00": 40,
      "16:00": 65,
      "17:00": 92,
      "18:00": 98
    },
    "suggestedQuietSlot": "05:30 AM - 08:00 AM (Sunrise Boat)",
    "alternatives": [
      "VNS_003",
      "VNS_004"
    ]
  },
  {
    "id": "VNS_003",
    "name": "Assi Ghat",
    "cityId": "varanasi",
    "cityName": "Varanasi",
    "state": "Uttar Pradesh",
    "subtitle": "Southern Waterfront • Varanasi",
    "displayLocation": "Shivala, Varanasi, Uttar Pradesh",
    "category": "Lakes",
    "experienceTags": [
      "subah_e_banaras",
      "yoga_at_dawn",
      "open_air_cafes",
      "peaceful_river"
    ],
    "tags": [
      "Ghat",
      "Sunrise",
      "Yoga",
      "Cafes"
    ],
    "primaryIntent": "sunset_waterfront",
    "coords": [
      25.2885,
      83.0063
    ],
    "openingHours": {
      "open": "04:30",
      "close": "23:00",
      "lastEntry": "22:30"
    },
    "avgVisitDurationMin": 75,
    "ticketPriceInr": 0,
    "capacityCeiling": 3500,
    "rating": 4.7,
    "popularChoice": false,
    "bestVisitTime": "05:00 AM – 07:00 AM",
    "bestVisitTimeNote": "(Morning Ragas & Yoga)",
    "recommendedDays": "Anyday",
    "recommendedDaysNote": "(Vastly More Relaxed than Dashashwamedh)",
    "fragilityIndex": 0.25,
    "accessibility": {
      "wheelchair": "Partial (Gentle slope to upper ghat)",
      "stairs": "Moderate"
    },
    "image": "images/VNS_003.jpg",
    "officialSource": "https://varanasi.nic.in",
    "description": "The southernmost major ghat where the Assi river meets the sacred Ganga. Hosts Subah-e-Banaras morning music and provides a calm, intent-preserving alternative.",
    "hourlyBaseline": {
      "08:00": 45,
      "09:00": 30,
      "10:00": 20,
      "11:00": 18,
      "12:00": 15,
      "13:00": 15,
      "14:00": 20,
      "15:00": 30,
      "16:00": 48,
      "17:00": 65,
      "18:00": 70
    },
    "suggestedQuietSlot": "10:00 AM - 03:00 PM (Quiet Promenade)",
    "alternatives": [
      "VNS_002",
      "VNS_004"
    ]
  },
  {
    "id": "VNS_004",
    "name": "Sarnath Dhamek Stupa",
    "cityId": "varanasi",
    "cityName": "Varanasi",
    "state": "Uttar Pradesh",
    "subtitle": "Buddhist World Heritage • Sarnath",
    "displayLocation": "Sarnath, Varanasi, Uttar Pradesh",
    "category": "Historical",
    "experienceTags": [
      "first_sermon",
      "ashoka_pillar",
      "archaeological_park",
      "monasteries"
    ],
    "tags": [
      "UNESCO Tentative",
      "Buddhism",
      "Stupa",
      "Archaeology"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      25.3811,
      83.0242
    ],
    "openingHours": {
      "open": "06:00",
      "close": "18:00",
      "lastEntry": "17:15"
    },
    "avgVisitDurationMin": 120,
    "ticketPriceInr": 25,
    "capacityCeiling": 3000,
    "rating": 4.7,
    "popularChoice": false,
    "bestVisitTime": "08:30 AM – 11:00 AM",
    "bestVisitTimeNote": "(Lush Peaceful Monastic Gardens)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Low Crowds)",
    "fragilityIndex": 0.3,
    "accessibility": {
      "wheelchair": "Yes (Flat paved park)",
      "stairs": "None"
    },
    "image": "images/VNS_004.jpg",
    "officialSource": "https://asi.nic.in",
    "description": "Venerable 500 AD cylindrical stupa where Lord Buddha gave his first sermon. Located 10 km north of Varanasi, surrounded by deer park and tranquil gardens.",
    "hourlyBaseline": {
      "08:00": 10,
      "09:00": 20,
      "10:00": 35,
      "11:00": 45,
      "12:00": 40,
      "13:00": 35,
      "14:00": 38,
      "15:00": 45,
      "16:00": 40,
      "17:00": 25,
      "18:00": 10
    },
    "suggestedQuietSlot": "08:30 AM - 11:00 AM",
    "alternatives": [
      "VNS_001",
      "VNS_003"
    ]
  },
  {
    "id": "GOA_001",
    "name": "Fort Aguada",
    "cityId": "goa",
    "cityName": "Goa",
    "state": "Goa",
    "subtitle": "17th C. Portuguese Citadel • Candolim",
    "displayLocation": "Aguada Fort Rd, Candolim, Goa",
    "category": "Historical",
    "experienceTags": [
      "portuguese_fortress",
      "lighthouse",
      "arabian_sea_panorama",
      "ramparts"
    ],
    "tags": [
      "Fort",
      "Lighthouse",
      "Sea View",
      "Heritage"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      15.4923,
      73.7737
    ],
    "openingHours": {
      "open": "09:30",
      "close": "18:00",
      "lastEntry": "17:30"
    },
    "avgVisitDurationMin": 90,
    "ticketPriceInr": 50,
    "capacityCeiling": 2500,
    "rating": 4.6,
    "popularChoice": true,
    "bestVisitTime": "09:30 AM – 11:30 AM",
    "bestVisitTimeNote": "(Breezy, Less Car Parking Jam)",
    "recommendedDays": "Mon – Wed",
    "recommendedDaysNote": "(Lower Crowds)",
    "fragilityIndex": 0.35,
    "accessibility": {
      "wheelchair": "Partial (Cobbled paths)",
      "stairs": "Moderate"
    },
    "image": "images/GOA_001.jpg",
    "officialSource": "https://goatourism.gov.in",
    "description": "Iconic 1612 Portuguese fortress overlooking Sinquerim beach and the Arabian Sea. Contains a four-story lighthouse and ancient water cistern.",
    "hourlyBaseline": {
      "08:00": 5,
      "09:00": 20,
      "10:00": 48,
      "11:00": 65,
      "12:00": 60,
      "13:00": 55,
      "14:00": 62,
      "15:00": 78,
      "16:00": 92,
      "17:00": 95,
      "18:00": 70
    },
    "suggestedQuietSlot": "09:30 AM - 11:30 AM",
    "alternatives": [
      "GOA_003",
      "GOA_004"
    ]
  },
  {
    "id": "GOA_002",
    "name": "Baga Beach",
    "cityId": "goa",
    "cityName": "Goa",
    "state": "Goa",
    "subtitle": "Coastal Promenade & Shacks • North Goa",
    "displayLocation": "Baga, Calangute, Goa",
    "category": "Beaches",
    "experienceTags": [
      "golden_sand",
      "water_sports",
      "beach_shacks",
      "sunset_hub"
    ],
    "tags": [
      "Beach",
      "Coastal",
      "Sunset",
      "Water Sports"
    ],
    "primaryIntent": "sunset_waterfront",
    "coords": [
      15.5553,
      73.7516
    ],
    "openingHours": {
      "open": "06:00",
      "close": "23:30",
      "lastEntry": "23:00"
    },
    "avgVisitDurationMin": 120,
    "ticketPriceInr": 0,
    "capacityCeiling": 8000,
    "rating": 4.4,
    "popularChoice": true,
    "bestVisitTime": "07:00 AM – 10:00 AM",
    "bestVisitTimeNote": "(Morning Jogging & Calm Tide)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Extreme Weekend Rush)",
    "fragilityIndex": 0.45,
    "accessibility": {
      "wheelchair": "Limited (Sand)",
      "stairs": "None"
    },
    "image": "images/GOA_002.jpg",
    "officialSource": "https://goatourism.gov.in",
    "description": "North Goa's most famous beach stretch. Severe vehicular gridlock forms on Tito's Lane and Baga creek bridge after 5:00 PM.",
    "hourlyBaseline": {
      "08:00": 15,
      "09:00": 25,
      "10:00": 40,
      "11:00": 50,
      "12:00": 55,
      "13:00": 50,
      "14:00": 58,
      "15:00": 72,
      "16:00": 90,
      "17:00": 98,
      "18:00": 96
    },
    "suggestedQuietSlot": "07:00 AM - 10:00 AM",
    "alternatives": [
      "GOA_001",
      "GOA_004"
    ]
  },
  {
    "id": "GOA_003",
    "name": "Basilica of Bom Jesus",
    "cityId": "goa",
    "cityName": "Goa",
    "state": "Goa",
    "subtitle": "UNESCO Baroque Landmark • Old Goa",
    "displayLocation": "Old Goa Rd, Bainguinim, Goa",
    "category": "Historical",
    "experienceTags": [
      "unesco_world_heritage",
      "baroque_architecture",
      "st_francis_xavier",
      "colonial_history"
    ],
    "tags": [
      "UNESCO",
      "Church",
      "Colonial",
      "Heritage"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      15.5009,
      73.9116
    ],
    "openingHours": {
      "open": "09:00",
      "close": "18:30",
      "lastEntry": "18:00"
    },
    "avgVisitDurationMin": 60,
    "ticketPriceInr": 0,
    "capacityCeiling": 2000,
    "rating": 4.7,
    "popularChoice": false,
    "bestVisitTime": "09:00 AM – 10:30 AM",
    "bestVisitTimeNote": "(Serene Courtyards)",
    "recommendedDays": "Mon – Fri",
    "recommendedDaysNote": "(Sunday Mass Peaks)",
    "fragilityIndex": 0.4,
    "accessibility": {
      "wheelchair": "Yes",
      "stairs": "Ramps available"
    },
    "image": "images/GOA_003.jpg",
    "officialSource": "https://goatourism.gov.in",
    "description": "Consecrated in 1605, this UNESCO World Heritage church is a premier example of Jesuit Baroque architecture containing the mortal remains of St. Francis Xavier.",
    "hourlyBaseline": {
      "08:00": 5,
      "09:00": 25,
      "10:00": 50,
      "11:00": 68,
      "12:00": 60,
      "13:00": 50,
      "14:00": 58,
      "15:00": 65,
      "16:00": 60,
      "17:00": 45,
      "18:00": 20
    },
    "suggestedQuietSlot": "09:00 AM - 10:30 AM",
    "alternatives": [
      "GOA_001",
      "GOA_004"
    ]
  },
  {
    "id": "GOA_004",
    "name": "Dudhsagar Waterfalls",
    "cityId": "goa",
    "cityName": "Goa",
    "state": "Goa",
    "subtitle": "Tiered Cataract • Mollem National Park",
    "displayLocation": "Sonaulim, Goa-Karnataka Border",
    "category": "Nature",
    "experienceTags": [
      "four_tiered_falls",
      "jeep_safari",
      "western_ghats",
      "lush_jungle"
    ],
    "tags": [
      "Waterfall",
      "Nature",
      "Safari",
      "Adventure"
    ],
    "primaryIntent": "peaceful_nature",
    "coords": [
      15.3144,
      74.3143
    ],
    "openingHours": {
      "open": "08:30",
      "close": "16:00",
      "lastEntry": "14:00"
    },
    "avgVisitDurationMin": 240,
    "ticketPriceInr": 500,
    "capacityCeiling": 1800,
    "rating": 4.8,
    "popularChoice": false,
    "bestVisitTime": "08:30 AM – 10:30 AM",
    "bestVisitTimeNote": "(First Jeep Slot, Zero Riverbed Queues)",
    "recommendedDays": "Tue – Thu",
    "recommendedDaysNote": "(Permit Queues Jam on Weekends)",
    "fragilityIndex": 0.6,
    "accessibility": {
      "wheelchair": "No (River crossings & boulders)",
      "stairs": "Natural trail"
    },
    "image": "images/GOA_004.jpg",
    "officialSource": "https://goatourism.gov.in",
    "description": "Spectacular 310-meter four-tiered milky waterfall cascading down the Western Ghats. Governed by Mollem jeep permits that bottleneck after 11 AM.",
    "hourlyBaseline": {
      "08:00": 20,
      "09:00": 55,
      "10:00": 85,
      "11:00": 94,
      "12:00": 88,
      "13:00": 75,
      "14:00": 50,
      "15:00": 30,
      "16:00": 10,
      "17:00": 5,
      "18:00": 0
    },
    "suggestedQuietSlot": "08:30 AM (First Safari Slot)",
    "alternatives": [
      "GOA_001",
      "GOA_003"
    ]
  },
  {
    "id": "MUM_001",
    "name": "Gateway of India",
    "cityId": "mumbai",
    "cityName": "Mumbai",
    "state": "Maharashtra",
    "subtitle": "Harbour Arch • Colaba, Mumbai",
    "displayLocation": "Apollo Bandar, Colaba, Mumbai",
    "category": "Historical",
    "experienceTags": [
      "indo_saracenic_arch",
      "harbour_boats",
      "taj_mahal_palace",
      "seafront_plaza"
    ],
    "tags": [
      "Arch",
      "Harbour",
      "Colaba",
      "Sea View"
    ],
    "primaryIntent": "sunset_waterfront",
    "coords": [
      18.922,
      72.8347
    ],
    "openingHours": {
      "open": "06:00",
      "close": "23:00",
      "lastEntry": "22:30"
    },
    "avgVisitDurationMin": 60,
    "ticketPriceInr": 0,
    "capacityCeiling": 6000,
    "rating": 4.6,
    "popularChoice": true,
    "bestVisitTime": "07:00 AM – 09:00 AM",
    "bestVisitTimeNote": "(Morning Breeze & Pigeons)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Extreme Weekend Gathering)",
    "fragilityIndex": 0.4,
    "accessibility": {
      "wheelchair": "Yes (Plaza is flat)",
      "stairs": "None"
    },
    "image": "images/MUM_001.jpg",
    "officialSource": "https://www.maharashtratourism.gov.in",
    "description": "26-meter basalt arch built to commemorate the 1911 royal visit of King George V. Heavy security bottlenecks form at the metal detector gates on Sunday afternoons.",
    "hourlyBaseline": {
      "08:00": 15,
      "09:00": 25,
      "10:00": 42,
      "11:00": 55,
      "12:00": 50,
      "13:00": 48,
      "14:00": 58,
      "15:00": 75,
      "16:00": 90,
      "17:00": 98,
      "18:00": 95
    },
    "suggestedQuietSlot": "07:00 AM - 09:00 AM",
    "alternatives": [
      "MUM_002",
      "MUM_003"
    ]
  },
  {
    "id": "MUM_002",
    "name": "Marine Drive (Queen's Necklace)",
    "cityId": "mumbai",
    "cityName": "Mumbai",
    "state": "Maharashtra",
    "subtitle": "Arabian Sea Promenade • South Mumbai",
    "displayLocation": "Netaji Subhash Chandra Bose Rd, Mumbai",
    "category": "Lakes",
    "experienceTags": [
      "curved_promenade",
      "art_deco_buildings",
      "sunset_skyline",
      "tetrapods"
    ],
    "tags": [
      "Promenade",
      "Sunset",
      "Art Deco",
      "Open Sea"
    ],
    "primaryIntent": "sunset_waterfront",
    "coords": [
      18.9432,
      72.823
    ],
    "openingHours": {
      "open": "05:00",
      "close": "23:59",
      "lastEntry": "23:59"
    },
    "avgVisitDurationMin": 90,
    "ticketPriceInr": 0,
    "capacityCeiling": 12000,
    "rating": 4.8,
    "popularChoice": false,
    "bestVisitTime": "06:00 AM – 08:30 AM",
    "bestVisitTimeNote": "(Morning Joggers & Sea Breeze)",
    "recommendedDays": "Anyday",
    "recommendedDaysNote": "(Vast 3.6km Boulevard Disperses Crowds)",
    "fragilityIndex": 0.15,
    "accessibility": {
      "wheelchair": "Yes (Wide smooth sidewalk)",
      "stairs": "None"
    },
    "image": "images/MUM_002.jpg",
    "officialSource": "https://www.maharashtratourism.gov.in",
    "description": "3.6-kilometer-long C-shaped boulevard along the coast. UNESCO-listed Art Deco buildings line the street with generous walking space.",
    "hourlyBaseline": {
      "08:00": 25,
      "09:00": 20,
      "10:00": 15,
      "11:00": 12,
      "12:00": 10,
      "13:00": 12,
      "14:00": 20,
      "15:00": 40,
      "16:00": 70,
      "17:00": 90,
      "18:00": 94
    },
    "suggestedQuietSlot": "06:00 AM - 08:30 AM or 11 AM - 3 PM",
    "alternatives": [
      "MUM_001",
      "MUM_003"
    ]
  },
  {
    "id": "MUM_003",
    "name": "Elephanta Caves",
    "cityId": "mumbai",
    "cityName": "Mumbai",
    "state": "Maharashtra",
    "subtitle": "Rock-Cut Caves • Mumbai Harbour",
    "displayLocation": "Gharapuri Island, Raigad District, Maharashtra",
    "category": "Historical",
    "experienceTags": [
      "trimurti_sculpture",
      "unesco_world_heritage",
      "harbour_ferry",
      "rock_cut_temples"
    ],
    "tags": [
      "UNESCO",
      "Island",
      "Cave Temples",
      "Shiva"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      18.9633,
      72.9315
    ],
    "openingHours": {
      "open": "09:30",
      "close": "17:30",
      "lastEntry": "16:00"
    },
    "avgVisitDurationMin": 180,
    "ticketPriceInr": 40,
    "capacityCeiling": 2200,
    "rating": 4.5,
    "popularChoice": false,
    "bestVisitTime": "09:00 AM – 11:00 AM",
    "bestVisitTimeNote": "(First Ferry Slot from Gateway)",
    "recommendedDays": "Tue – Thu",
    "recommendedDaysNote": "(Closed on Mondays)",
    "fragilityIndex": 0.5,
    "accessibility": {
      "wheelchair": "No (120 stone steps to caves)",
      "stairs": "Toy train available from dock"
    },
    "image": "images/MUM_003.jpg",
    "officialSource": "https://asi.nic.in",
    "description": "UNESCO World Heritage rock-cut cave temples dating to 5th-8th century AD, featuring the monumental 7-meter Trimurti Shiva sculpture.",
    "hourlyBaseline": {
      "08:00": 5,
      "09:00": 20,
      "10:00": 52,
      "11:00": 78,
      "12:00": 80,
      "13:00": 72,
      "14:00": 60,
      "15:00": 45,
      "16:00": 20,
      "17:00": 5,
      "18:00": 0
    },
    "suggestedQuietSlot": "09:00 AM (Take the 9:00 AM ferry)",
    "alternatives": [
      "MUM_001",
      "MUM_002"
    ]
  },
  {
    "id": "KER_001",
    "name": "Alleppey Backwaters & Houseboats",
    "cityId": "kerala",
    "cityName": "Kerala",
    "state": "Kerala",
    "subtitle": "Vembanad Lake Canals • Alappuzha",
    "displayLocation": "Punnamada Jetty, Alappuzha, Kerala",
    "category": "Lakes",
    "experienceTags": [
      "kettuvallam_houseboat",
      "palm_fringed_canals",
      "paddy_fields",
      "village_life"
    ],
    "tags": [
      "Backwaters",
      "Houseboat",
      "Lagoon",
      "Serene"
    ],
    "primaryIntent": "sunset_waterfront",
    "coords": [
      9.4981,
      76.3388
    ],
    "openingHours": {
      "open": "06:00",
      "close": "18:30",
      "lastEntry": "17:30"
    },
    "avgVisitDurationMin": 240,
    "ticketPriceInr": 800,
    "capacityCeiling": 3000,
    "rating": 4.8,
    "popularChoice": true,
    "bestVisitTime": "08:00 AM – 10:30 AM",
    "bestVisitTimeNote": "(Morning Calm, Crisp Canal Reflections)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Lower Weekend Boat Surcharge)",
    "fragilityIndex": 0.35,
    "accessibility": {
      "wheelchair": "Yes (Boarding ramps at modern jetties)",
      "stairs": "Minor"
    },
    "image": "images/KER_001.jpg",
    "officialSource": "https://www.keralatourism.org",
    "description": "Famous network of tranquil lagoons, lakes, and crisscrossing canals running parallel to the Arabian Sea. Punnamada Jetty boarding queues peak around 12:00 PM.",
    "hourlyBaseline": {
      "08:00": 20,
      "09:00": 40,
      "10:00": 65,
      "11:00": 85,
      "12:00": 90,
      "13:00": 82,
      "14:00": 70,
      "15:00": 75,
      "16:00": 88,
      "17:00": 80,
      "18:00": 40
    },
    "suggestedQuietSlot": "08:00 AM - 10:30 AM",
    "alternatives": [
      "KER_003",
      "KER_002"
    ]
  },
  {
    "id": "KER_002",
    "name": "Mattancherry Dutch Palace",
    "cityId": "kerala",
    "cityName": "Kerala",
    "state": "Kerala",
    "subtitle": "Mural Museum • Fort Kochi",
    "displayLocation": "Palace Rd, Mattancherry, Kochi, Kerala",
    "category": "Historical",
    "experienceTags": [
      "kerala_murals",
      "portuguese_palace",
      "raja_of_kochi",
      "wooden_ceilings"
    ],
    "tags": [
      "Palace",
      "Murals",
      "Heritage",
      "Museum"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      9.9582,
      76.2592
    ],
    "openingHours": {
      "open": "09:45",
      "close": "16:45",
      "lastEntry": "16:15"
    },
    "avgVisitDurationMin": 60,
    "ticketPriceInr": 10,
    "capacityCeiling": 800,
    "rating": 4.5,
    "popularChoice": false,
    "bestVisitTime": "10:00 AM – 11:30 AM",
    "bestVisitTimeNote": "(Breezy Gallery Stroll)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Closed on Fridays)",
    "fragilityIndex": 0.5,
    "accessibility": {
      "wheelchair": "No (Historic wooden stairs)",
      "stairs": "Moderate"
    },
    "image": "images/KER_002.jpg",
    "officialSource": "https://asi.nic.in",
    "description": "Built by the Portuguese in 1555 and renovated by the Dutch. Contains some of India's finest mythological Hindu temple murals executed in warm earth pigments.",
    "hourlyBaseline": {
      "08:00": 5,
      "09:00": 15,
      "10:00": 42,
      "11:00": 62,
      "12:00": 65,
      "13:00": 55,
      "14:00": 58,
      "15:00": 60,
      "16:00": 40,
      "17:00": 10,
      "18:00": 0
    },
    "suggestedQuietSlot": "10:00 AM - 11:30 AM",
    "alternatives": [
      "KER_003",
      "KER_001"
    ]
  },
  {
    "id": "KER_003",
    "name": "Fort Kochi Chinese Fishing Nets",
    "cityId": "kerala",
    "cityName": "Kerala",
    "state": "Kerala",
    "subtitle": "Vasco da Gama Square • Fort Kochi",
    "displayLocation": "River Rd, Fort Kochi, Kochi, Kerala",
    "category": "Historical",
    "experienceTags": [
      "cantilevered_nets",
      "sunset_harbour",
      "street_fish_stalls",
      "heritage_promenade"
    ],
    "tags": [
      "Waterfront",
      "Heritage",
      "Sunset",
      "Iconic"
    ],
    "primaryIntent": "sunset_waterfront",
    "coords": [
      9.9678,
      76.2428
    ],
    "openingHours": {
      "open": "06:00",
      "close": "22:00",
      "lastEntry": "21:30"
    },
    "avgVisitDurationMin": 60,
    "ticketPriceInr": 0,
    "capacityCeiling": 2500,
    "rating": 4.6,
    "popularChoice": false,
    "bestVisitTime": "07:00 AM – 09:00 AM",
    "bestVisitTimeNote": "(Morning Catch & Minimal Crowd)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Lower Crowds)",
    "fragilityIndex": 0.25,
    "accessibility": {
      "wheelchair": "Yes (Promenade is paved)",
      "stairs": "None"
    },
    "image": "images/KER_003.jpg",
    "officialSource": "https://www.keralatourism.org",
    "description": "Famous cantilevered fishing nets introduced by 14th-century Chinese explorer Zheng He. Beautiful waterfront stroll with zero ticketing bottleneck.",
    "hourlyBaseline": {
      "08:00": 15,
      "09:00": 20,
      "10:00": 28,
      "11:00": 32,
      "12:00": 30,
      "13:00": 25,
      "14:00": 35,
      "15:00": 55,
      "16:00": 78,
      "17:00": 92,
      "18:00": 88
    },
    "suggestedQuietSlot": "07:00 AM - 09:00 AM",
    "alternatives": [
      "KER_002",
      "KER_001"
    ]
  },
  {
    "id": "KER_004",
    "name": "Munnar Tea Plantations",
    "cityId": "kerala",
    "cityName": "Kerala",
    "state": "Kerala",
    "subtitle": "Emerald Hills & Estates • Idukki",
    "displayLocation": "KDHP Tea Estate, Munnar, Kerala",
    "category": "Nature",
    "experienceTags": [
      "tea_gardens",
      "misty_hills",
      "tea_museum",
      "anamudi_peaks"
    ],
    "tags": [
      "Tea Gardens",
      "Hills",
      "Mist",
      "Nature"
    ],
    "primaryIntent": "peaceful_nature",
    "coords": [
      10.0889,
      77.0595
    ],
    "openingHours": {
      "open": "09:00",
      "close": "17:00",
      "lastEntry": "16:30"
    },
    "avgVisitDurationMin": 150,
    "ticketPriceInr": 150,
    "capacityCeiling": 3000,
    "rating": 4.8,
    "popularChoice": false,
    "bestVisitTime": "08:30 AM – 11:00 AM",
    "bestVisitTimeNote": "(Morning Sunlight & Low Ghat Fog)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Low Weekend Traffic)",
    "fragilityIndex": 0.3,
    "accessibility": {
      "wheelchair": "Yes (Museum and factory)",
      "stairs": "Gentle slopes"
    },
    "image": "images/KER_004.jpg",
    "officialSource": "https://www.keralatourism.org",
    "description": "Vast carpet of emerald-green tea plantations perched 1,600m above sea level in the Western Ghats. Features the Tata Tea Museum and cool highland breeze.",
    "hourlyBaseline": {
      "08:00": 10,
      "09:00": 30,
      "10:00": 55,
      "11:00": 70,
      "12:00": 72,
      "13:00": 65,
      "14:00": 60,
      "15:00": 58,
      "16:00": 42,
      "17:00": 20,
      "18:00": 5
    },
    "suggestedQuietSlot": "08:30 AM - 11:00 AM",
    "alternatives": [
      "KER_001",
      "KER_002"
    ]
  },
  {
    "id": "SOU_001",
    "name": "Mysore Palace",
    "cityId": "south_heritage",
    "cityName": "South Heritage",
    "state": "Karnataka",
    "subtitle": "Wodeyar Royal Seat • Mysuru",
    "displayLocation": "Sayyaji Rao Rd, Mysuru, Karnataka",
    "category": "Historical",
    "experienceTags": [
      "indo_saracenic",
      "durbar_hall",
      "stained_glass",
      "100k_lights_illumination"
    ],
    "tags": [
      "Palace",
      "Royal",
      "Heritage",
      "Illumination"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      12.3052,
      76.6552
    ],
    "openingHours": {
      "open": "10:00",
      "close": "17:30",
      "lastEntry": "17:00"
    },
    "avgVisitDurationMin": 120,
    "ticketPriceInr": 100,
    "capacityCeiling": 7000,
    "rating": 4.8,
    "popularChoice": true,
    "bestVisitTime": "10:00 AM – 11:30 AM",
    "bestVisitTimeNote": "(Comfortable Tour Before Noon Buses)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Sunday 7 PM Illumination Sparks 50k Visitors)",
    "fragilityIndex": 0.4,
    "accessibility": {
      "wheelchair": "Yes (Electric carts & ramps)",
      "stairs": "Ramps"
    },
    "image": "images/SOU_001.jpg",
    "officialSource": "https://www.mysorepalace.karnataka.gov.in",
    "description": "Magnificent seat of the Kingdom of Mysore, famous for its carved mahogany ceilings, solid silver doors, and 97,000 bulbs illuminating on Sunday evenings.",
    "hourlyBaseline": {
      "08:00": 5,
      "09:00": 25,
      "10:00": 55,
      "11:00": 80,
      "12:00": 85,
      "13:00": 80,
      "14:00": 75,
      "15:00": 78,
      "16:00": 70,
      "17:00": 50,
      "18:00": 30
    },
    "suggestedQuietSlot": "10:00 AM - 11:30 AM",
    "alternatives": [
      "SOU_002",
      "SOU_003"
    ]
  },
  {
    "id": "SOU_002",
    "name": "Meenakshi Amman Temple",
    "cityId": "south_heritage",
    "cityName": "South Heritage",
    "state": "Tamil Nadu",
    "subtitle": "Dravidian Architectural Marvel • Madurai",
    "displayLocation": "Madurai Main, Madurai, Tamil Nadu",
    "category": "Temples",
    "experienceTags": [
      "14_gopurams",
      "thousand_pillar_hall",
      "golden_lotus_tank",
      "dravidian_sculptures"
    ],
    "tags": [
      "Temple",
      "Dravidian",
      "UNESCO Tentative",
      "Gopuram"
    ],
    "primaryIntent": "spiritual",
    "coords": [
      9.9195,
      78.1193
    ],
    "openingHours": {
      "open": "05:00",
      "close": "22:00",
      "lastEntry": "21:15"
    },
    "avgVisitDurationMin": 120,
    "ticketPriceInr": 50,
    "capacityCeiling": 9000,
    "rating": 4.9,
    "popularChoice": true,
    "bestVisitTime": "06:00 AM – 08:30 AM",
    "bestVisitTimeNote": "(Morning Darshan, Minimal Queue)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Festivals See Massive Influx)",
    "fragilityIndex": 0.5,
    "accessibility": {
      "wheelchair": "Yes (Available at East tower)",
      "stairs": "Low stone thresholds"
    },
    "image": "images/SOU_002.jpg",
    "officialSource": "https://maduraimeenakshi.org",
    "description": "Legendary historic temple complex with 14 towering gopurams encrusted with thousands of brightly painted mythological stone figures.",
    "hourlyBaseline": {
      "08:00": 35,
      "09:00": 60,
      "10:00": 82,
      "11:00": 88,
      "12:00": 65,
      "13:00": 20,
      "14:00": 20,
      "15:00": 45,
      "16:00": 70,
      "17:00": 88,
      "18:00": 94
    },
    "suggestedQuietSlot": "06:00 AM - 08:30 AM (Morning)",
    "alternatives": [
      "SOU_001",
      "SOU_004"
    ]
  },
  {
    "id": "SOU_003",
    "name": "Virupaksha Temple & Hampi Ruins",
    "cityId": "south_heritage",
    "cityName": "South Heritage",
    "state": "Karnataka",
    "subtitle": "Vijayanagara UNESCO City • Hampi",
    "displayLocation": "Hampi Bazaar, Vijayanagara District, Karnataka",
    "category": "Historical",
    "experienceTags": [
      "unesco_world_heritage",
      "boulder_landscape",
      "stone_chariot",
      "tungabhadra_river"
    ],
    "tags": [
      "UNESCO",
      "Ancient Ruins",
      "Boulder Hills",
      "Empire"
    ],
    "primaryIntent": "royal_heritage",
    "coords": [
      15.335,
      76.46
    ],
    "openingHours": {
      "open": "06:00",
      "close": "18:00",
      "lastEntry": "17:15"
    },
    "avgVisitDurationMin": 180,
    "ticketPriceInr": 40,
    "capacityCeiling": 4000,
    "rating": 4.8,
    "popularChoice": false,
    "bestVisitTime": "06:30 AM – 09:30 AM",
    "bestVisitTimeNote": "(Cool Weather on Stone Pavements)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Low Crowds)",
    "fragilityIndex": 0.45,
    "accessibility": {
      "wheelchair": "Limited (Uneven boulder terrain)",
      "stairs": "Stone steps"
    },
    "image": "images/SOU_003.jpg",
    "officialSource": "https://asi.nic.in",
    "description": "Capital of the 14th-century Vijayanagara Empire spanning 4,100 hectares of ruins, monoliths, and ancient riverbank temples.",
    "hourlyBaseline": {
      "08:00": 15,
      "09:00": 35,
      "10:00": 60,
      "11:00": 75,
      "12:00": 70,
      "13:00": 55,
      "14:00": 50,
      "15:00": 55,
      "16:00": 65,
      "17:00": 50,
      "18:00": 20
    },
    "suggestedQuietSlot": "06:30 AM - 09:30 AM",
    "alternatives": [
      "SOU_001",
      "SOU_002"
    ]
  },
  {
    "id": "SOU_004",
    "name": "Brihadisvara Temple",
    "cityId": "south_heritage",
    "cityName": "South Heritage",
    "state": "Tamil Nadu",
    "subtitle": "Great Living Chola Temple • Thanjavur",
    "displayLocation": "Membalam Rd, Thanjavur, Tamil Nadu",
    "category": "Temples",
    "experienceTags": [
      "granite_vimana",
      "chola_dynasty",
      "unesco_world_heritage",
      "nandi_monolith"
    ],
    "tags": [
      "UNESCO",
      "Chola",
      "Granite",
      "Architecture"
    ],
    "primaryIntent": "spiritual",
    "coords": [
      10.7828,
      79.1318
    ],
    "openingHours": {
      "open": "06:00",
      "close": "20:30",
      "lastEntry": "20:00"
    },
    "avgVisitDurationMin": 90,
    "ticketPriceInr": 0,
    "capacityCeiling": 4500,
    "rating": 4.8,
    "popularChoice": false,
    "bestVisitTime": "07:00 AM – 09:30 AM",
    "bestVisitTimeNote": "(Cool Granite Flagstones)",
    "recommendedDays": "Mon – Fri",
    "recommendedDaysNote": "(Low Crowds)",
    "fragilityIndex": 0.35,
    "accessibility": {
      "wheelchair": "Yes (Ramps at cloistered courtyard)",
      "stairs": "Low steps"
    },
    "image": "images/SOU_004.jpg",
    "officialSource": "https://asi.nic.in",
    "description": "Built by Emperor Rajaraja Chola I in 1010 AD entirely of granite. Its 66-meter high sanctum tower is capped by an 80-tonne monolithic stone dome.",
    "hourlyBaseline": {
      "08:00": 20,
      "09:00": 35,
      "10:00": 50,
      "11:00": 58,
      "12:00": 40,
      "13:00": 15,
      "14:00": 15,
      "15:00": 35,
      "16:00": 60,
      "17:00": 78,
      "18:00": 75
    },
    "suggestedQuietSlot": "07:00 AM - 09:30 AM",
    "alternatives": [
      "SOU_002",
      "SOU_001"
    ]
  },
  {
    "id": "HIM_001",
    "name": "Golden Temple (Harmandir Sahib)",
    "cityId": "himalayas",
    "cityName": "Himalayas & North",
    "state": "Punjab",
    "subtitle": "Spiritual Sanctum • Amritsar",
    "displayLocation": "Golden Temple Rd, Amritsar, Punjab",
    "category": "Temples",
    "experienceTags": [
      "gilded_sanctum",
      "amrit_sarovar_pool",
      "world_largest_langar",
      "divine_kirtan"
    ],
    "tags": [
      "Sacred",
      "Golden Temple",
      "Langar",
      "Pool"
    ],
    "primaryIntent": "spiritual",
    "coords": [
      31.62,
      74.8765
    ],
    "openingHours": {
      "open": "03:00",
      "close": "23:59",
      "lastEntry": "23:59"
    },
    "avgVisitDurationMin": 120,
    "ticketPriceInr": 0,
    "capacityCeiling": 15000,
    "rating": 4.9,
    "popularChoice": true,
    "bestVisitTime": "04:00 AM – 06:30 AM",
    "bestVisitTimeNote": "(Palki Sahib Ceremony, Low Parikrama Wait)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Massive Weekend Footfalls)",
    "fragilityIndex": 0.3,
    "accessibility": {
      "wheelchair": "Yes (Provided by temple authority)",
      "stairs": "Ramps at all 4 entrances"
    },
    "image": "images/HIM_001.jpg",
    "officialSource": "https://sgpc.net",
    "description": "The holiest Gurdwara of Sikhism. Gilded in 500 kg of pure gold leaf surrounded by the Amrit Sarovar. The world's largest free community kitchen (Langar) serves 100,000 daily.",
    "hourlyBaseline": {
      "08:00": 50,
      "09:00": 65,
      "10:00": 78,
      "11:00": 85,
      "12:00": 90,
      "13:00": 85,
      "14:00": 80,
      "15:00": 82,
      "16:00": 88,
      "17:00": 92,
      "18:00": 95
    },
    "suggestedQuietSlot": "04:00 AM - 06:30 AM (Dawn)",
    "alternatives": [
      "HIM_002",
      "HIM_003"
    ]
  },
  {
    "id": "HIM_002",
    "name": "Pangong Tso Lake",
    "cityId": "himalayas",
    "cityName": "Himalayas & North",
    "state": "Ladakh",
    "subtitle": "High-Altitude Endorheic Lake • Ladakh (4,250m)",
    "displayLocation": "Pangong Tso, Leh District, Ladakh",
    "category": "Lakes",
    "experienceTags": [
      "colour_changing_waters",
      "himalayan_peaks",
      "trans_himalaya",
      "chang_la_pass"
    ],
    "tags": [
      "High Altitude",
      "Lake",
      "Himalayas",
      "Ladakh"
    ],
    "primaryIntent": "peaceful_nature",
    "coords": [
      33.7595,
      78.6674
    ],
    "openingHours": {
      "open": "06:00",
      "close": "18:00",
      "lastEntry": "17:00"
    },
    "avgVisitDurationMin": 180,
    "ticketPriceInr": 450,
    "capacityCeiling": 1500,
    "rating": 4.9,
    "popularChoice": false,
    "bestVisitTime": "07:00 AM – 10:30 AM",
    "bestVisitTimeNote": "(Calm Water Surface, Crystal Sky)",
    "recommendedDays": "Mon – Thu",
    "recommendedDaysNote": "(Permit Checkpoints Smooth)",
    "fragilityIndex": 0.8,
    "accessibility": {
      "wheelchair": "No (High altitude 14,000ft, rough terrain)",
      "stairs": "None"
    },
    "image": "images/HIM_002.jpg",
    "officialSource": "https://leh.nic.in",
    "description": "World's highest saltwater lake at 4,250m, stretching 134 km across India and Tibet. Changes color from deep emerald to vibrant azure throughout the day.",
    "hourlyBaseline": {
      "08:00": 10,
      "09:00": 25,
      "10:00": 45,
      "11:00": 65,
      "12:00": 75,
      "13:00": 70,
      "14:00": 60,
      "15:00": 45,
      "16:00": 30,
      "17:00": 15,
      "18:00": 5
    },
    "suggestedQuietSlot": "07:00 AM - 10:30 AM",
    "alternatives": [
      "HIM_001",
      "HIM_003"
    ]
  },
  {
    "id": "HIM_003",
    "name": "Solang Valley & Rohtang Pass",
    "cityId": "himalayas",
    "cityName": "Himalayas & North",
    "state": "Himachal Pradesh",
    "subtitle": "Alpine Valley & Glacial Ridge • Manali",
    "displayLocation": "Solang, Burwa, Manali, Himachal Pradesh",
    "category": "Nature",
    "experienceTags": [
      "snow_slopes",
      "paragliding",
      "atal_tunnel",
      "pine_forests"
    ],
    "tags": [
      "Alpine",
      "Snow",
      "Adventure",
      "Valleys"
    ],
    "primaryIntent": "peaceful_nature",
    "coords": [
      32.3166,
      77.1578
    ],
    "openingHours": {
      "open": "08:00",
      "close": "18:00",
      "lastEntry": "16:30"
    },
    "avgVisitDurationMin": 180,
    "ticketPriceInr": 100,
    "capacityCeiling": 3500,
    "rating": 4.6,
    "popularChoice": false,
    "bestVisitTime": "08:00 AM – 10:00 AM",
    "bestVisitTimeNote": "(Early Arrival Avoids Atal Tunnel Jam)",
    "recommendedDays": "Tue – Thu",
    "recommendedDaysNote": "(Extreme Weekend Manali Highway Jams)",
    "fragilityIndex": 0.7,
    "accessibility": {
      "wheelchair": "Partial (Paved base areas)",
      "stairs": "Cable car available"
    },
    "image": "images/HIM_003.jpg",
    "officialSource": "https://himachaltourism.gov.in",
    "description": "Side valley at the top of the Kullu Valley famous for alpine vistas and adventure sports. Gateway to Atal Tunnel and Rohtang Pass.",
    "hourlyBaseline": {
      "08:00": 15,
      "09:00": 45,
      "10:00": 80,
      "11:00": 95,
      "12:00": 92,
      "13:00": 85,
      "14:00": 78,
      "15:00": 65,
      "16:00": 50,
      "17:00": 25,
      "18:00": 5
    },
    "suggestedQuietSlot": "08:00 AM - 10:00 AM",
    "alternatives": [
      "HIM_001",
      "HIM_002"
    ]
  }
];

const UDAIPUR_DESTINATIONS = ALL_DESTINATIONS.filter(d => d.cityId === 'udaipur');

const ITINERARY_CIRCUITS = [
  {
    "id": "udaipur_circuit",
    "name": "Udaipur Royal & Lakes Circuit",
    "cityName": "Udaipur, Rajasthan",
    "circuitTag": "4 STOPS • 1-DAY HERITAGE ITINERARY",
    "stops": [
      {
        "stopIndex": 1,
        "time": "09:30 AM",
        "placeId": "UDR_001",
        "name": "City Palace",
        "desc": "Visited early before morning tour buses arrive.",
        "provBadge": "Historical: Low",
        "provClass": "prov-hist",
        "waitText": "Wait: <10 min",
        "waitColor": "#9FE859"
      },
      {
        "stopIndex": 2,
        "time": "12:15 PM",
        "placeId": "UDR_004",
        "name": "Saheliyon-ki-Bari",
        "desc": "Shaded royal fountains and courtyard gardens.",
        "provBadge": "Predicted: Mod",
        "provClass": "prov-pred",
        "waitText": "Wait: 15 min",
        "waitColor": "#F59E0B"
      },
      {
        "stopIndex": 3,
        "time": "04:00 PM",
        "placeId": "UDR_002",
        "name": "Lake Pichola Boating",
        "desc": "Sunset cruise around Jag Mandir island palace.",
        "provBadge": "Live: Mod",
        "provClass": "prov-live",
        "waitText": "Dock: 15 min",
        "waitColor": "#9FE859",
        "swappable": true,
        "swappedName": "Bagore Haveli Museum",
        "swappedDesc": "Swapped to indoor glasswork galleries due to rain.",
        "swappedBadge": "Indoor Safe",
        "swappedWait": "Zero Rain Risk",
        "disruptionReason": "Outdoor boating flagged High Weather Risk (Rain: 18mm/h). Swapped with indoor Bagore Ki Haveli Museum. Transit distance reduced by 1.4 km & weather penalty eliminated!"
      },
      {
        "stopIndex": 4,
        "time": "06:45 PM",
        "placeId": "UDR_007",
        "name": "Bagore Ki Haveli",
        "desc": "Dharohar cultural folk dance & sunset ghats.",
        "provBadge": "Predicted: Mod",
        "provClass": "prov-pred",
        "waitText": "Evening Seat OK",
        "waitColor": "#9FE859"
      }
    ]
  },
  {
    "id": "golden_triangle",
    "name": "Golden Triangle: Agra & Delhi Circuit",
    "cityName": "Agra & Delhi, UP / Delhi",
    "circuitTag": "4 STOPS • MUGHAL MASTERPIECE CIRCUIT",
    "stops": [
      {
        "stopIndex": 1,
        "time": "06:15 AM",
        "placeId": "AGR_001",
        "name": "Taj Mahal (Sunrise)",
        "desc": "Sunrise entry via East Gate turnstile before crowd peak.",
        "provBadge": "Live: Low",
        "provClass": "prov-live",
        "waitText": "Wait: <8 min",
        "waitColor": "#9FE859"
      },
      {
        "stopIndex": 2,
        "time": "10:30 AM",
        "placeId": "AGR_002",
        "name": "Agra Fort",
        "desc": "Jahangir Palace and Diwan-i-Khas sandstone galleries.",
        "provBadge": "Predicted: Mod",
        "provClass": "prov-pred",
        "waitText": "Wait: 18 min",
        "waitColor": "#F59E0B"
      },
      {
        "stopIndex": 3,
        "time": "02:30 PM",
        "placeId": "AGR_003",
        "name": "Fatehpur Sikri",
        "desc": "Spacious Buland Darwaza and Akbar imperial complex.",
        "provBadge": "Historical: Mod",
        "provClass": "prov-hist",
        "waitText": "Courtyard: Easy",
        "waitColor": "#9FE859",
        "swappable": true,
        "swappedName": "Humayun's Tomb (Covered Galleries)",
        "swappedDesc": "Swapped to covered Persian tomb corridors to avoid sudden monsoon rain.",
        "swappedBadge": "Indoor Protected",
        "swappedWait": "Zero Queue",
        "disruptionReason": "Exposed stone courtyards flagged Extreme Weather Surge. Automatically rerouted to sheltered Humayun's Tomb galleries, saving 55 minutes waiting in downpour."
      },
      {
        "stopIndex": 4,
        "time": "05:45 PM",
        "placeId": "DEL_001",
        "name": "Qutub Minar Park",
        "desc": "Evening lighting on victory tower and park stroll.",
        "provBadge": "Live: Low",
        "provClass": "prov-live",
        "waitText": "Entry: Fast-Track",
        "waitColor": "#9FE859"
      }
    ]
  },
  {
    "id": "jaipur_circuit",
    "name": "Jaipur Pink City Royal Circuit",
    "cityName": "Jaipur, Rajasthan",
    "circuitTag": "4 STOPS • HILL FORTS & PALACES",
    "stops": [
      {
        "stopIndex": 1,
        "time": "08:15 AM",
        "placeId": "JAI_001",
        "name": "Amber Fort",
        "desc": "Early hilltop entry to Sheesh Mahal before tour buses choke Amer Rd.",
        "provBadge": "Historical: Low",
        "provClass": "prov-hist",
        "waitText": "Gate: <12 min",
        "waitColor": "#9FE859"
      },
      {
        "stopIndex": 2,
        "time": "11:30 AM",
        "placeId": "JAI_005",
        "name": "Jal Mahal Promenade",
        "desc": "Walk along Man Sagar Lake with view of floating water palace.",
        "provBadge": "Predicted: Low",
        "provClass": "prov-pred",
        "waitText": "Open Access",
        "waitColor": "#9FE859"
      },
      {
        "stopIndex": 3,
        "time": "02:45 PM",
        "placeId": "JAI_002",
        "name": "Hawa Mahal Facade",
        "desc": "Pink City street view and casements photography.",
        "provBadge": "Live: Mod",
        "provClass": "prov-live",
        "waitText": "Wait: 15 min",
        "waitColor": "#F59E0B",
        "swappable": true,
        "swappedName": "City Palace Armoury Museum",
        "swappedDesc": "Swapped to indoor Chandra Mahal galleries due to torrential downpour.",
        "swappedBadge": "Rain Safe",
        "swappedWait": "No Rain Delay",
        "disruptionReason": "Heavy rain alert at Badi Chaupar street. Instantly swapped with indoor City Palace Museum, shielding visitors from rain and preserving royal heritage."
      },
      {
        "stopIndex": 4,
        "time": "05:30 PM",
        "placeId": "JAI_004",
        "name": "Nahargarh Fort Ridge",
        "desc": "Panoramic sunset view over the entire illuminated Pink City.",
        "provBadge": "Live: Mod",
        "provClass": "prov-live",
        "waitText": "Sunset Spot OK",
        "waitColor": "#9FE859"
      }
    ]
  },
  {
    "id": "varanasi_circuit",
    "name": "Spiritual Varanasi Ganges Circuit",
    "cityName": "Varanasi, Uttar Pradesh",
    "circuitTag": "4 STOPS • SACRED WATER & GANGES",
    "stops": [
      {
        "stopIndex": 1,
        "time": "05:15 AM",
        "placeId": "VNS_001",
        "name": "Kashi Vishwanath Corridor",
        "desc": "Dawn darshan via Ganga Corridor with minimal security delay.",
        "provBadge": "Live: Low",
        "provClass": "prov-live",
        "waitText": "Wait: <15 min",
        "waitColor": "#9FE859"
      },
      {
        "stopIndex": 2,
        "time": "09:00 AM",
        "placeId": "VNS_003",
        "name": "Assi Ghat Waterfront",
        "desc": "Subah-e-Banaras morning music and quiet riverside promenade.",
        "provBadge": "Historical: Low",
        "provClass": "prov-hist",
        "waitText": "Calm Flow",
        "waitColor": "#9FE859"
      },
      {
        "stopIndex": 3,
        "time": "01:30 PM",
        "placeId": "VNS_004",
        "name": "Sarnath Dhamek Stupa",
        "desc": "Peaceful deer park and ancient Ashokan archaeological museum.",
        "provBadge": "Predicted: Mod",
        "provClass": "prov-pred",
        "waitText": "Park Walk: Low",
        "waitColor": "#9FE859",
        "swappable": true,
        "swappedName": "Sarnath Archaeological Museum (Indoor)",
        "swappedDesc": "Swapped to air-conditioned Lion Capital indoor museum halls.",
        "swappedBadge": "Climate Safe",
        "swappedWait": "Zero Delay",
        "disruptionReason": "Extreme afternoon heatwave (>39°C) detected. Replaced outdoor stupa walk with air-conditioned Sarnath Archaeological Museum, preserving Buddhist heritage."
      },
      {
        "stopIndex": 4,
        "time": "06:15 PM",
        "placeId": "VNS_002",
        "name": "Dashashwamedh Ghat Aarti",
        "desc": "Pre-reserved boat vantage point for the grand evening Ganga Aarti.",
        "provBadge": "Live: High",
        "provClass": "prov-live",
        "waitText": "Boat Seat Ready",
        "waitColor": "#9FE859"
      }
    ]
  },
  {
    "id": "goa_circuit",
    "name": "Goa Coastal, Fort & Heritage Circuit",
    "cityName": "Goa (North & Old Goa)",
    "circuitTag": "4 STOPS • SUN, FORTS & SHACKS",
    "stops": [
      {
        "stopIndex": 1,
        "time": "09:00 AM",
        "placeId": "GOA_001",
        "name": "Fort Aguada",
        "desc": "Morning breeze and 17th-century lighthouse views over Arabian Sea.",
        "provBadge": "Live: Low",
        "provClass": "prov-live",
        "waitText": "Wait: <10 min",
        "waitColor": "#9FE859"
      },
      {
        "stopIndex": 2,
        "time": "12:00 PM",
        "placeId": "GOA_003",
        "name": "Basilica of Bom Jesus",
        "desc": "St. Francis Xavier baroque UNESCO shrine in Old Goa.",
        "provBadge": "Predicted: Mod",
        "provClass": "prov-pred",
        "waitText": "Entry: Smooth",
        "waitColor": "#9FE859"
      },
      {
        "stopIndex": 3,
        "time": "03:30 PM",
        "placeId": "GOA_002",
        "name": "Baga Beach Shacks",
        "desc": "Beachfront dining and coastal promenade.",
        "provBadge": "Live: Mod",
        "provClass": "prov-live",
        "waitText": "Shack Seating OK",
        "waitColor": "#F59E0B",
        "swappable": true,
        "swappedName": "Reis Magos Fort Museum",
        "swappedDesc": "Swapped to restored hilltop cultural museum due to high surf and rain.",
        "swappedBadge": "Weather Protected",
        "swappedWait": "Zero Queue",
        "disruptionReason": "Coastal high-surf and rainfall alert triggered. Rerouted from open beach to covered Reis Magos Fort Museum, preventing vacation disruption."
      },
      {
        "stopIndex": 4,
        "time": "06:15 PM",
        "placeId": "GOA_001",
        "name": "Sinquerim Sunset Cliff",
        "desc": "Watch the sun sink into the Arabian Sea from the coastal cliffside.",
        "provBadge": "Historical: Low",
        "provClass": "prov-hist",
        "waitText": "Sunset Scenic",
        "waitColor": "#9FE859"
      }
    ]
  },
  {
    "id": "kerala_circuit",
    "name": "Kerala Backwaters & Spice Circuit",
    "cityName": "Kochi & Alleppey, Kerala",
    "circuitTag": "4 STOPS • SERENE WATERS & SPICE",
    "stops": [
      {
        "stopIndex": 1,
        "time": "07:30 AM",
        "placeId": "KER_003",
        "name": "Fort Kochi Chinese Nets",
        "desc": "Early morning fisherman haul and harbour promenade.",
        "provBadge": "Historical: Low",
        "provClass": "prov-hist",
        "waitText": "Wait: None",
        "waitColor": "#9FE859"
      },
      {
        "stopIndex": 2,
        "time": "10:30 AM",
        "placeId": "KER_002",
        "name": "Mattancherry Dutch Palace",
        "desc": "World-class 16th-century temple murals and royal artifacts.",
        "provBadge": "Predicted: Low",
        "provClass": "prov-pred",
        "waitText": "Entry: Fast",
        "waitColor": "#9FE859"
      },
      {
        "stopIndex": 3,
        "time": "01:30 PM",
        "placeId": "KER_001",
        "name": "Alleppey Houseboat Canal",
        "desc": "Lunch cruise through coconut-fringed backwater channels.",
        "provBadge": "Live: Mod",
        "provClass": "prov-live",
        "waitText": "Dock: Ready",
        "waitColor": "#9FE859",
        "swappable": true,
        "swappedName": "International Coir Museum (Indoor)",
        "swappedDesc": "Swapped to indoor traditional craft & coir gallery on heavy monsoon alert.",
        "swappedBadge": "Rain Safe",
        "swappedWait": "Immediate Entry",
        "disruptionReason": "Severe canal squall flagged High Water Risk. Swapped with nearby International Coir Museum, averting lake suspension."
      },
      {
        "stopIndex": 4,
        "time": "05:45 PM",
        "placeId": "KER_004",
        "name": "Vembanad Sunset Deck",
        "desc": "Panoramic lake breeze as evening birds return to roost.",
        "provBadge": "Live: Low",
        "provClass": "prov-live",
        "waitText": "Deck Calm",
        "waitColor": "#9FE859"
      }
    ]
  }
];
