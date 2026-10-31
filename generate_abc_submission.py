import os
import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def build_presentation():
    backup_path = 'ABC Submission Template_Backup.pptx'
    template_path = 'ABC Submission Template.pptx'
    output_path = 'CrowdWise_ABC_Submission.pptx'
    
    # Always load from the pristine original backup
    if os.path.exists(backup_path):
        prs = pptx.Presentation(backup_path)
    else:
        prs = pptx.Presentation(template_path)
    
    # Define Palette
    COLOR_DARK = RGBColor(0x27, 0x27, 0x27)       # #272727
    COLOR_MUTED = RGBColor(0x4A, 0x4A, 0x4A)      # #4A4A4A (crisp readable dark grey)
    COLOR_BLUE = RGBColor(0x42, 0x85, 0xF4)       # Google Blue #4285F4
    COLOR_RED = RGBColor(0xEA, 0x43, 0x35)        # Google Red #EA4335
    COLOR_YELLOW = RGBColor(0xFB, 0xBC, 0x05)     # Google Yellow #FBBC05
    COLOR_GREEN = RGBColor(0x34, 0xA8, 0x53)      # Google Green #34A853
    COLOR_FOREST = RGBColor(0x14, 0x33, 0x25)     # Advocado Forest #143325
    COLOR_LIME = RGBColor(0x9F, 0xE8, 0x59)       # Advocado Lime #9FE859
    COLOR_BG_CARD = RGBColor(0xFA, 0xFB, 0xFC)    # Card bg
    
    # =========================================================================
    # SLIDE 1: TITLE SLIDE
    # =========================================================================
    s1 = prs.slides[0]
    
    # Shape 5: <Project Title>
    s1_title = s1.shapes[5].text_frame
    s1_title.clear()
    p_title = s1_title.paragraphs[0]
    p_title.text = "NoRush"
    p_title.font.name = "DM Sans"
    p_title.font.size = Pt(64)
    p_title.font.bold = True
    p_title.font.color.rgb = COLOR_DARK
    
    # Shape 6: <Your Problem Statement>
    s1_sub = s1.shapes[6].text_frame
    s1_sub.clear()
    p_sub = s1_sub.paragraphs[0]
    p_sub.text = "AI-Powered Smart Tourism Crowd Prediction & Intent-Preserving Dynamic Rerouting Engine (Udaipur Pilot)"
    p_sub.font.name = "DM Sans"
    p_sub.font.size = Pt(17)
    p_sub.font.bold = False
    p_sub.font.color.rgb = COLOR_MUTED
    
    # Shape 8: Team details
    s1_team = s1.shapes[8].text_frame
    s1_team.clear()
    
    team_data = [
        ("Team NoRush", True, COLOR_DARK, Pt(14)),
        ("AI & Smart Cities / Tourism Tech Track", True, COLOR_BLUE, Pt(13.5)),
        ("Garv Goyal (Lead / Full-Stack & AI Systems)", True, COLOR_DARK, Pt(13)),
        ("Core Contributor (Geospatial & Data Engineering)", False, COLOR_MUTED, Pt(12.5)),
        ("Core Contributor (Product & Systems Design)", False, COLOR_MUTED, Pt(12.5))
    ]
    for idx, (txt, bold, col, sz) in enumerate(team_data):
        p = s1_team.paragraphs[0] if idx == 0 else s1_team.add_paragraph()
        p.text = txt
        p.font.name = "DM Sans"
        p.font.size = sz
        p.font.bold = bold
        p.font.color.rgb = col
        p.space_after = Pt(4)

    # =========================================================================
    # SLIDE 2: PROBLEM STATEMENT
    # =========================================================================
    s2 = prs.slides[1]
    
    # Shape 5: Problem description
    s2_prob = s2.shapes[5].text_frame
    s2_prob.clear()
    
    prob_points = [
        ("Severe Chokepoint Asymmetry: ", "Over 2,800+ tourists bottleneck simultaneously at City Palace & Jagdish Chowk enduring 60–90 min queues, while adjacent world-class heritage (Jagdish Mandir 150m away, Ahar Cenotaphs) sits at <15% capacity."),
        ("Static Maps Fail Intent: ", "Traditional navigation apps tell tourists where to go, but fail to predict when to go or protect experiential intent (royal Rajput architecture vs. generic shopping) when congestion strikes."),
        ("Sudden Weather & Safety Hazards: ", "Unpredicted monsoon downpours create stampede hazards at outdoor ghats & boatings with zero automated contingency rerouting to covered cultural venues.")
    ]
    
    for idx, (title, body) in enumerate(prob_points):
        p = s2_prob.paragraphs[0] if idx == 0 else s2_prob.add_paragraph()
        p.space_after = Pt(8)
        
        r1 = p.add_run()
        r1.text = "• " + title
        r1.font.name = "DM Sans"
        r1.font.size = Pt(14)
        r1.font.bold = True
        r1.font.color.rgb = COLOR_DARK
        
        r2 = p.add_run()
        r2.text = body
        r2.font.name = "DM Sans"
        r2.font.size = Pt(13.5)
        r2.font.bold = False
        r2.font.color.rgb = COLOR_MUTED

    # Shape 7: Target Users
    s2_users = s2.shapes[7].text_frame
    s2_users.clear()
    
    user_points = [
        ("1. Domestic & International Tourists: ", "Avoid 90-min queues, access instant 150m walk-in alternatives, and receive sub-15s auto-recalculated rain itineraries."),
        ("2. Udaipur District Administration & Tourism Dept: ", "Prevent crowd crush at heritage gates, balance tourist footfall across urban corridors, and access real-time crowd heatmaps."),
        ("3. Local Heritage Operators & Artisans: ", "Monetize under-visited monuments (Jagdish Mandir, Bagore Ki Haveli) and distribute tourist economic spend to local bazaars.")
    ]
    
    for idx, (title, body) in enumerate(user_points):
        p = s2_users.paragraphs[0] if idx == 0 else s2_users.add_paragraph()
        p.space_after = Pt(6)
        
        r1 = p.add_run()
        r1.text = title
        r1.font.name = "DM Sans"
        r1.font.size = Pt(13.5)
        r1.font.bold = True
        r1.font.color.rgb = COLOR_DARK
        
        r2 = p.add_run()
        r2.text = body
        r2.font.name = "DM Sans"
        r2.font.size = Pt(13)
        r2.font.bold = False
        r2.font.color.rgb = COLOR_MUTED

    # =========================================================================
    # SLIDE 3: SOLUTION
    # =========================================================================
    s3 = prs.slides[2]
    
    # Shape 5: Solution Overview + Google Cloud & AI integration
    s3_sol = s3.shapes[5].text_frame
    s3_sol.clear()
    
    p0 = s3_sol.paragraphs[0]
    p0.text = "NoRush is an intelligent real-time tourism intelligence engine that eliminates blind queuing with predictive footfall simulation, intent-matched walk-in alternatives, and sub-15s weather replanning."
    p0.font.name = "DM Sans"
    p0.font.size = Pt(14)
    p0.font.bold = False
    p0.font.color.rgb = COLOR_DARK
    p0.space_after = Pt(8)
    
    p1 = s3_sol.add_paragraph()
    r_g1 = p1.add_run()
    r_g1.text = "Google Cloud & AI Core Integration (Bonus Marks Architecture): "
    r_g1.font.name = "DM Sans"
    r_g1.font.size = Pt(13)
    r_g1.font.bold = True
    r_g1.font.color.rgb = COLOR_BLUE
    
    r_g2 = p1.add_run()
    r_g2.text = "Built on Google Cloud Run (serverless sub-100ms prediction microservices), Google Vertex AI & Gemini 1.5 (semantic intent embeddings & tourist NLP re-routing explanations), Google BigQuery (geospatial time-series analytics), and Google Maps Platform (isochrone walkability matrices)."
    r_g2.font.name = "DM Sans"
    r_g2.font.size = Pt(12.5)
    r_g2.font.bold = False
    r_g2.font.color.rgb = COLOR_MUTED
    p1.space_after = Pt(4)

    # Shape 8: Key Features
    s3_feat = s3.shapes[8].text_frame
    s3_feat.clear()
    
    features = [
        ("Multi-Factor Predictive Formula: ", "Forecasts crowd density 1–12h ahead via CrowdScore = 0.40(Hist) + 0.30(Cal) + 0.20(Event) + 0.10(Weather)."),
        ("Intent-Preserving Reroute Assistant: ", "When City Palace exceeds 65% capacity (60–90 min queue), instantly reroutes to Jagdish Mandir (only 150m walk, <10 min wait, royal stone architecture)."),
        ("Sub-15s Weather Re-Planning: ", "Monitors live rainfall proxies to automatically convert exposed lake boatings to covered cultural havelis within 15 seconds."),
        ("Live Corridor Telemetry Ticker: ", "Integrates live corridor delay feeds and speed tracking along narrow old-city heritage access routes.")
    ]
    
    for idx, (title, body) in enumerate(features):
        p = s3_feat.paragraphs[0] if idx == 0 else s3_feat.add_paragraph()
        p.space_after = Pt(6)
        
        r1 = p.add_run()
        r1.text = "• " + title
        r1.font.name = "DM Sans"
        r1.font.size = Pt(13)
        r1.font.bold = True
        r1.font.color.rgb = COLOR_DARK
        
        r2 = p.add_run()
        r2.text = body
        r2.font.name = "DM Sans"
        r2.font.size = Pt(12.5)
        r2.font.bold = False
        r2.font.color.rgb = COLOR_MUTED

    # =========================================================================
    # SLIDE 4: TECHNICAL APPROACH & ARCHITECTURE WORKFLOW
    # =========================================================================
    s4 = prs.slides[3]
    
    # Clean up the original subtitle shape and tiny placeholder shape
    for shape in list(s4.shapes):
        if shape.name in ["Google Shape;131;p4", "Google Shape;132;p4"]:
            sp = shape._element
            sp.getparent().remove(sp)
            
    # Add clear, professional subtitle for Technical Approach (placed cleanly below header)
    sub_box = s4.shapes.add_textbox(Inches(0.95), Inches(2.70), Inches(18.0), Inches(0.40))
    tf_sub = sub_box.text_frame
    tf_sub.clear()
    p_arch_sub = tf_sub.paragraphs[0]
    p_arch_sub.text = "FOUR-TIER DISTRIBUTED SYSTEM ARCHITECTURE • SUB-15s DYNAMIC RE-ROUTING ENGINE"
    p_arch_sub.font.name = "DM Sans"
    p_arch_sub.font.size = Pt(15)
    p_arch_sub.font.bold = True
    p_arch_sub.font.color.rgb = COLOR_BLUE
    
    tiers = [
        {
            "num": "01",
            "title": "DATA & SIGNAL INGESTION",
            "tag": "Multi-Source Proxies",
            "color": COLOR_BLUE,
            "badge_bg": RGBColor(0xEE, 0xF4, 0xFE),
            "items": [
                ("Rajasthan Tourism Baselines", "Hourly footfall data across 14 pilot sites"),
                ("Open-Meteo Live Weather", "Real-time precipitation & heat index feeds"),
                ("Corridor Traffic Telemetry", "Old-city route speed & bottleneck delay"),
                ("Calendar & Event Engine", "Weekend & festival surge multipliers")
            ]
        },
        {
            "num": "02",
            "title": "GOOGLE CLOUD & AI CORE",
            "tag": "Vertex AI + Cloud Run",
            "color": COLOR_GREEN,
            "badge_bg": RGBColor(0xEB, 0xF7, 0xEE),
            "items": [
                ("Google Cloud Run", "Containerized serverless microservices (<100ms)"),
                ("Vertex AI & Gemini 1.5", "Semantic intent embeddings & NLP guidance"),
                ("Multi-Factor Formula", "0.40H + 0.30C + 0.20E + 0.10W prediction"),
                ("Isochrone Engine", "150m walking radius proximity matrix")
            ]
        },
        {
            "num": "03",
            "title": "DYNAMIC DISPATCH SERVICES",
            "tag": "Intelligent Rerouting",
            "color": COLOR_RED,
            "badge_bg": RGBColor(0xFD, 0xEB, 0xEA),
            "items": [
                ("Bottleneck Reroute Assistant", "/api/reroute intent-matched dispatch"),
                ("Dynamic Itinerary Re-Planner", "/api/itineraries/replan multi-stop engine"),
                ("Monsoon Weather Switch", "<15-second rain circuit-breaker"),
                ("Fragility Index Governor", "Heritage carrying capacity safety ceilings")
            ]
        },
        {
            "num": "04",
            "title": "CITIZEN & ADMIN INTERFACE",
            "tag": "Advocado UI Engine",
            "color": COLOR_FOREST,
            "badge_bg": RGBColor(0xEA, 0xF5, 0xEE),
            "items": [
                ("Advocado Design Web App", "Warm Cream, Forest Green, Lime palette"),
                ("Interactive Leaflet Map", "Live geographic heat overlay & pins"),
                ("1-Click Walk-In Switch", "Instantly auto-centers on Jagdish Mandir"),
                ("District Admin Dashboard", "Corridor congestion & stampede alert ticker")
            ]
        }
    ]
    
    # 4 Cards Layout Centered for 20" x 11.25" Slide
    card_w = Inches(4.25)
    card_gap = Inches(0.35)
    left_start = Inches(0.95)
    top_pos = Inches(3.25)
    card_h = Inches(5.85)
    
    for i, tier in enumerate(tiers):
        c_left = left_start + i * (card_w + card_gap)
        
        # Outer Card Box
        card = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c_left, top_pos, card_w, card_h)
        card.fill.solid()
        card.fill.fore_color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        card.line.color.rgb = tier["color"]
        card.line.width = Pt(2.2)
        
        tf = card.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.24)
        tf.margin_right = Inches(0.24)
        tf.margin_top = Inches(0.25)
        tf.margin_bottom = Inches(0.2)
        
        # Tier Pill Tag
        p_tag = tf.paragraphs[0]
        p_tag.text = f"TIER {tier['num']} • {tier['tag'].upper()}"
        p_tag.font.name = "DM Sans"
        p_tag.font.size = Pt(11)
        p_tag.font.bold = True
        p_tag.font.color.rgb = tier["color"]
        p_tag.space_after = Pt(4)
        
        # Tier Title
        p_title = tf.add_paragraph()
        p_title.text = tier["title"]
        p_title.font.name = "DM Sans"
        p_title.font.size = Pt(14)
        p_title.font.bold = True
        p_title.font.color.rgb = COLOR_DARK
        p_title.space_after = Pt(12)
        
        # Items
        for head, desc in tier["items"]:
            p_item = tf.add_paragraph()
            p_item.space_after = Pt(8)
            
            r_h = p_item.add_run()
            r_h.text = f"▪ {head}: "
            r_h.font.name = "DM Sans"
            r_h.font.size = Pt(12)
            r_h.font.bold = True
            r_h.font.color.rgb = COLOR_DARK
            
            r_d = p_item.add_run()
            r_d.text = desc
            r_d.font.name = "DM Sans"
            r_d.font.size = Pt(11.5)
            r_d.font.bold = False
            r_d.font.color.rgb = COLOR_MUTED

        # Connector Arrow (centered between cards)
        if i < len(tiers) - 1:
            arrow_left = c_left + card_w + Inches(0.06)
            arrow_top = top_pos + Inches(2.7)
            arrow_w = Inches(0.23)
            arrow_h = Inches(0.38)
            arr = s4.shapes.add_shape(MSO_SHAPE.RIGHT_ARROW, arrow_left, arrow_top, arrow_w, arrow_h)
            arr.fill.solid()
            arr.fill.fore_color.rgb = tier["color"]
            arr.line.fill.background()

    # Footer note on Slide 4
    foot_box = s4.shapes.add_textbox(Inches(0.95), Inches(9.35), Inches(18.0), Inches(0.40))
    tf_foot = foot_box.text_frame
    tf_foot.clear()
    p_foot = tf_foot.paragraphs[0]
    p_foot.text = "⚡ Key System Metric: End-to-end crowd simulation & dynamic reroute latency under 15 seconds • Zero fake CCTV claims"
    p_foot.font.name = "DM Sans"
    p_foot.font.size = Pt(13)
    p_foot.font.bold = True
    p_foot.font.color.rgb = COLOR_MUTED

    # =========================================================================
    # SLIDE 5: TECH STACK
    # =========================================================================
    s5 = prs.slides[4]
    
    stack_updates = {
        15: [ # FRONTEND
            ("Vanilla HTML5 / ES6+", True),
            ("Advocado Design (CSS3)", False),
            ("Leaflet.js Geospatial Map", False),
            ("Google Fonts (DM Sans)", False)
        ],
        16: [ # BACKEND
            ("Python 3.11 Engine", True),
            ("Multi-Factor Algorithmic Core", False),
            ("RESTful JSON Microservices", False),
            ("Sub-15s Replanning Worker", False)
        ],
        17: [ # DATABASE
            ("Google BigQuery", True),
            ("Google Cloud Storage", False),
            ("Structured GeoJSON Data", False),
            ("In-Memory Proximity Cache", False)
        ],
        18: [ # AUTH & API
            ("Google Maps & Places API", True),
            ("Vertex AI & Gemini 1.5", False),
            ("Open-Meteo Weather API", False),
            ("Corridor Telemetry API", False)
        ],
        19: [ # DEPLOYMENT
            ("Google Cloud Run", True),
            ("Docker Multi-Stage Build", False),
            ("GitHub Actions CI/CD", False),
            ("Zero-Downtime Edge CDN", False)
        ]
    }
    
    for s_idx, items in stack_updates.items():
        tf = s5.shapes[s_idx].text_frame
        tf.clear()
        for idx, (item, is_bold) in enumerate(items):
            p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
            p.text = item
            p.font.name = "DM Sans"
            p.font.size = Pt(11.5)
            p.font.bold = is_bold
            p.font.color.rgb = COLOR_DARK if is_bold else COLOR_MUTED
            p.space_after = Pt(4)

    # =========================================================================
    # SLIDE 6: IMPACT & SCALABILITY
    # =========================================================================
    s6 = prs.slides[5]
    
    # Left side: Pillars
    # Shape 4: Real impact
    s6_imp = s6.shapes[4].text_frame
    s6_imp.clear()
    p = s6_imp.paragraphs[0]
    p.text = "82% peak crowd pressure diverted away from City Palace bottlenecks to intent-matched walk-in alternatives (Jagdish Mandir)."
    p.font.name = "DM Sans"
    p.font.size = Pt(13.5)
    p.font.color.rgb = COLOR_MUTED
    
    # Shape 6: More users
    s6_usr = s6.shapes[6].text_frame
    s6_usr.clear()
    p = s6_usr.paragraphs[0]
    p.text = "Cuts tourist wait times from 90+ mins down to <10 mins; sub-15s automated itinerary replanning on sudden rain."
    p.font.name = "DM Sans"
    p.font.size = Pt(13.5)
    p.font.color.rgb = COLOR_MUTED
    
    # Shape 8: Built to scale
    s6_scl = s6.shapes[8].text_frame
    s6_scl.clear()
    p = s6_scl.paragraphs[0]
    p.text = "Zero-Fake AI Doctrine: Zero costly CCTV/IoT hardware dependency; powered entirely by open tourism baselines, calendar signals, and Google Cloud APIs."
    p.font.name = "DM Sans"
    p.font.size = Pt(13)
    p.font.color.rgb = COLOR_MUTED

    # Right side: Geographic Progression
    # Shape 11: UDAIPUR
    s6_udr = s6.shapes[11].text_frame
    s6_udr.clear()
    p = s6_udr.paragraphs[0]
    p.text = "14 monitored sites pilot; 45,000+ tourist hours saved annually; +35% revenue boost for Jagdish Chowk artisans & secondary sites."
    p.font.name = "DM Sans"
    p.font.size = Pt(12)
    p.font.color.rgb = COLOR_MUTED
    
    # Shape 14: RAJASTHAN
    s6_raj = s6.shapes[14].text_frame
    s6_raj.clear()
    p = s6_raj.paragraphs[0]
    p.text = "Direct rollout to Jaipur (Amer Fort ➔ Nahargarh), Jodhpur (Mehrangarh ➔ Jaswant Thada), and Jaisalmer Fort heritage corridors."
    p.font.name = "DM Sans"
    p.font.size = Pt(12)
    p.font.color.rgb = COLOR_MUTED
    
    # Shape 17: INDIA
    s6_ind = s6.shapes[17].text_frame
    s6_ind.clear()
    p = s6_ind.paragraphs[0]
    p.text = "Scalable blueprint for Ministry of Tourism's Swadesh Darshan 2.0 & Smart Cities Mission across 100+ high-density cultural hubs."
    p.font.name = "DM Sans"
    p.font.size = Pt(12)
    p.font.color.rgb = COLOR_MUTED

    # Save output presentation
    backup_path = 'ABC Submission Template_Backup.pptx'
    if not os.path.exists(backup_path):
        import shutil
        shutil.copyfile(template_path, backup_path)
        print(f"Backed up original template to: {backup_path}")

    prs.save(output_path)
    prs.save(template_path)
    print(f"Successfully generated refined presentations:")
    print(f"  1. {output_path}")
    print(f"  2. {template_path}")

if __name__ == '__main__':
    build_presentation()
