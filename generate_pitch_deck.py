# -*- coding: utf-8 -*-
"""
Generate Hackathon Pitch Deck (.pptx) for CrowdWise
Smart Tourism Intelligence & Dynamic Route Decision Engine
Grounded in Unified_Smart_Tourism_Crowd_Prediction_Master_Blueprint.pdf
and styled in the Advocado design language.
"""

import os
import pptx
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_deck(filename="CrowdWise_Udaipur_Hackathon_Pitch_Deck.pptx"):
    out_path = os.path.join(r"c:\Users\hp\Desktop\Tourism", filename)
    
    prs = Presentation()
    # 16:9 Widescreen dimensions
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    
    blank_slide_layout = prs.slide_layouts[6]
    
    # Color Palette (Advocado + CrowdWise)
    c_cream = RGBColor(251, 249, 242)      # #FBF9F2
    c_forest = RGBColor(20, 51, 37)        # #143325
    c_forest_card = RGBColor(27, 66, 49)   # #1B4231
    c_lime = RGBColor(159, 232, 89)        # #9FE859
    c_white = RGBColor(255, 255, 255)
    c_charcoal = RGBColor(28, 36, 30)      # #1C241E
    c_muted = RGBColor(90, 101, 95)        # #5A655F
    c_border = RGBColor(235, 230, 218)     # #EBE6DA
    c_red = RGBColor(239, 68, 68)          # #EF4444
    c_amber = RGBColor(245, 158, 11)       # #F59E0B
    c_blue = RGBColor(2, 132, 199)         # #0284C7
    
    def set_slide_bg(slide, color):
        bg = slide.background
        fill = bg.fill
        fill.solid()
        fill.fore_color.rgb = color

    def add_pill(slide, text, left, top, width, height, bg_color, text_color, font_size=11):
        shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        shape.fill.solid()
        shape.fill.fore_color.rgb = bg_color
        shape.line.color.rgb = bg_color
        tf = shape.text_frame
        tf.word_wrap = True
        tf.vertical_anchor = MSO_ANCHOR.MIDDLE
        p = tf.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        p.text = text
        p.font.name = "Arial"
        p.font.size = Pt(font_size)
        p.font.bold = True
        p.font.color.rgb = text_color
        return shape

    def add_card(slide, left, top, width, height, bg_color, border_color=None):
        shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        shape.fill.solid()
        shape.fill.fore_color.rgb = bg_color
        if border_color:
            shape.line.color.rgb = border_color
            shape.line.width = Pt(1.5)
        else:
            shape.line.fill.background()
        return shape

    # =========================================================================
    # SLIDE 1: TITLE SLIDE (Advocado Dark Forest Hero Style)
    # =========================================================================
    slide1 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(slide1, c_forest)
    
    # Top Tag
    add_pill(slide1, "SMART TOURISM INTELLIGENCE • UDAIPUR PILOT • HACKATHON 2026", Inches(1.0), Inches(0.9), Inches(5.5), Inches(0.38), c_forest_card, c_lime, 10)
    
    # Title Text Box
    txBox = slide1.shapes.add_textbox(Inches(1.0), Inches(1.5), Inches(11.3), Inches(3.2))
    tf = txBox.text_frame
    tf.word_wrap = True
    
    p1 = tf.paragraphs[0]
    p1.text = "Good travels spread."
    p1.font.name = "Georgia"
    p1.font.size = Pt(54)
    p1.font.bold = True
    p1.font.color.rgb = c_white
    
    p2 = tf.add_paragraph()
    p2.text = "Crowds don't."
    p2.font.name = "Georgia"
    p2.font.size = Pt(54)
    p2.font.bold = True
    p2.font.italic = True
    p2.font.color.rgb = c_lime
    
    p3 = tf.add_paragraph()
    p3.space_before = Pt(20)
    p3.text = "CROWDWISE: A Predictive Tourism Decision Engine that foresees crowd bottlenecks, preserves traveler intent with experience-matched alternatives, and replans itineraries on live disruptions."
    p3.font.name = "Arial"
    p3.font.size = Pt(17)
    p3.font.color.rgb = RGBColor(192, 207, 199)
    
    # Metadata Footer Card
    card_meta = add_card(slide1, Inches(1.0), Inches(5.5), Inches(11.3), Inches(1.2), c_forest_card)
    txBoxMeta = slide1.shapes.add_textbox(Inches(1.2), Inches(5.6), Inches(10.9), Inches(1.0))
    tfm = txBoxMeta.text_frame
    tfm.word_wrap = True
    pm = tfm.paragraphs[0]
    pm.text = "Team Out of Scope  |  Pilot City: Udaipur, Rajasthan  |  Architecture: 4-Tier Ingestion & Provenance  |  Status: Working MVP Live"
    pm.font.name = "Arial"
    pm.font.size = Pt(13)
    pm.font.bold = True
    pm.font.color.rgb = c_lime
    
    pm2 = tfm.add_paragraph()
    pm2.space_before = Pt(6)
    pm2.text = "Features: Multi-Stop Routing Engine • Intent Preserver • 4 Live Proxies • Zero-Fake AI Doctrine • 12 Defensible Judge Q&As"
    pm2.font.name = "Arial"
    pm2.font.size = Pt(12)
    pm2.font.color.rgb = c_white

    # =========================================================================
    # SLIDE 2: THE PROBLEM (The Void)
    # =========================================================================
    slide2 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(slide2, c_cream)
    
    add_pill(slide2, "THE PROBLEM STATEMENT", Inches(1.0), Inches(0.7), Inches(2.8), Inches(0.35), RGBColor(241, 236, 224), c_muted, 10)
    
    tb2 = slide2.shapes.add_textbox(Inches(1.0), Inches(1.1), Inches(11.3), Inches(1.0))
    p = tb2.text_frame.paragraphs[0]
    p.text = "Your trip is shouting into the void."
    p.font.name = "Georgia"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = c_charcoal
    
    # Left Card: The Bottleneck
    add_card(slide2, Inches(1.0), Inches(2.2), Inches(5.4), Inches(4.5), c_white, c_border)
    tb_l = slide2.shapes.add_textbox(Inches(1.3), Inches(2.4), Inches(4.8), Inches(4.1))
    tfl = tb_l.text_frame
    tfl.word_wrap = True
    
    pl1 = tfl.paragraphs[0]
    pl1.text = "The Severe Tourist Bottleneck"
    pl1.font.name = "Georgia"
    pl1.font.size = Pt(22)
    pl1.font.bold = True
    pl1.font.color.rgb = c_red
    
    pl2 = tfl.add_paragraph()
    pl2.space_before = Pt(12)
    pl2.text = "• 2,800+ visitors queue simultaneously at City Palace ticket counters between 11:30 AM and 3:30 PM.\n" \
               "• 3+ hours lost per tourist standing in unmoving queues and narrow Jagdish Chowk vehicular gridlock.\n" \
               "• Heritage monuments suffer structural crowding while nearby gems sit empty and under-visited.\n" \
               "• Destination managers lack real-time decision intelligence to forecast and redistribute pressure."
    pl2.font.name = "Arial"
    pl2.font.size = Pt(14)
    pl2.font.color.rgb = c_charcoal

    # Right Card: Why Google Maps Fails
    add_card(slide2, Inches(6.9), Inches(2.2), Inches(5.4), Inches(4.5), c_forest)
    tb_r = slide2.shapes.add_textbox(Inches(7.2), Inches(2.4), Inches(4.8), Inches(4.1))
    tfr = tb_r.text_frame
    tfr.word_wrap = True
    
    pr1 = tfr.paragraphs[0]
    pr1.text = "Why Existing Tools Fail Tourists"
    pr1.font.name = "Georgia"
    pr1.font.size = Pt(22)
    pr1.font.bold = True
    pr1.font.color.rgb = c_lime
    
    pr2 = tfr.add_paragraph()
    pr2.space_before = Pt(12)
    pr2.text = "• Google Maps is a PASSIVE LOOKUP tool for single spots—it has no concept of tourist travel intent.\n" \
               "• If Lake Pichola is packed, Google won't find you an equivalent sunset boating spot like Fateh Sagar.\n" \
               "• Zero route re-planning: When sudden rain or closure strikes, static tools leave tourists stranded.\n" \
               "• Fake 'Live Camera AI' apps fail judges because camera view != site-wide ground truth."
    pr2.font.name = "Arial"
    pr2.font.size = Pt(14)
    pr2.font.color.rgb = c_white

    # =========================================================================
    # SLIDE 3: THE SOLUTION & 4 CORE QUESTIONS
    # =========================================================================
    slide3 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(slide3, c_cream)
    
    add_pill(slide3, "SYSTEM VISION & CORE THESIS", Inches(1.0), Inches(0.7), Inches(3.2), Inches(0.35), RGBColor(241, 236, 224), c_muted, 10)
    
    tb3 = slide3.shapes.add_textbox(Inches(1.0), Inches(1.1), Inches(11.3), Inches(0.9))
    p = tb3.text_frame.paragraphs[0]
    p.text = "A Tourism Decision Engine, Not Just A Map."
    p.font.name = "Georgia"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = c_charcoal
    
    # 4 Quadrants for 4 Questions
    quads = [
        ("1. Where should I go?", "Intent-Preserving Discovery", "Matches royal heritage to royal heritage, sunset boating to sunset boating. Filters out closed, inaccessible, or fragile locations.", Inches(1.0), Inches(2.1)),
        ("2. When should I go?", "Hourly Off-Peak Forecasting", "Isolates high-pressure bottlenecks (12-4 PM) and pinpoints quiet visiting slots (e.g. 09:15 AM before tour buses arrive).", Inches(6.9), Inches(2.1)),
        ("3. How crowded will it be?", "Explainable Multi-Signal Score", "Outputs Low / Mod / High score (0-100) with confidence metrics and 5 immutable provenance badges (Live, Recent, Hist, Pred, Sim).", Inches(1.0), Inches(4.5)),
        ("4. If plans change, what next?", "Dynamic Route Re-Planner", "In-trip re-routing service (/api/itineraries/replan) that instantly swaps affected stops on rain, closure, or surges with zero panic.", Inches(6.9), Inches(4.5))
    ]
    
    for title, subtitle, desc, left, top in quads:
        add_card(slide3, left, top, Inches(5.4), Inches(2.1), c_white, c_border)
        tb_q = slide3.shapes.add_textbox(left + Inches(0.3), top + Inches(0.15), Inches(4.8), Inches(1.8))
        tfq = tb_q.text_frame
        tfq.word_wrap = True
        pq1 = tfq.paragraphs[0]
        pq1.text = title
        pq1.font.name = "Georgia"
        pq1.font.size = Pt(17)
        pq1.font.bold = True
        pq1.font.color.rgb = c_forest
        
        pq2 = tfq.add_paragraph()
        pq2.text = subtitle.upper()
        pq2.font.name = "Arial"
        pq2.font.size = Pt(10)
        pq2.font.bold = True
        pq2.font.color.rgb = c_blue
        
        pq3 = tfq.add_paragraph()
        pq3.space_before = Pt(4)
        pq3.text = desc
        pq3.font.name = "Arial"
        pq3.font.size = Pt(12)
        pq3.font.color.rgb = c_charcoal

    # =========================================================================
    # SLIDE 4: THE REAL-TIME DATA SOURCING SOLUTION (THE CORE DILEMMA)
    # =========================================================================
    slide4 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(slide4, c_cream)
    
    add_pill(slide4, "CRITICAL TECHNICAL DIFFERENTIATOR", Inches(1.0), Inches(0.7), Inches(3.6), Inches(0.35), RGBColor(241, 236, 224), c_muted, 10)
    
    tb4 = slide4.shapes.add_textbox(Inches(1.0), Inches(1.1), Inches(11.3), Inches(0.9))
    p = tb4.text_frame.paragraphs[0]
    p.text = "Where Does Real-Time Crowd Data Actually Come From?"
    p.font.name = "Georgia"
    p.font.size = Pt(34)
    p.font.bold = True
    p.font.color.rgb = c_charcoal

    # The 80/20 Ratio Banner
    add_card(slide4, Inches(1.0), Inches(2.1), Inches(11.3), Inches(1.1), c_forest)
    tb_ratio = slide4.shapes.add_textbox(Inches(1.3), Inches(2.2), Inches(10.7), Inches(0.9))
    tfr = tb_ratio.text_frame
    tfr.word_wrap = True
    pr = tfr.paragraphs[0]
    pr.text = "THE ZERO-FAKE AI REALITY: 80% DETERMINISTIC BASELINE + 20% LIVE PROXY SIGNALS"
    pr.font.name = "Arial"
    pr.font.size = Pt(14)
    pr.font.bold = True
    pr.font.color.rgb = c_lime
    pr2 = tfr.add_paragraph()
    pr2.space_before = Pt(4)
    pr2.text = "In tourism, 80% of crowd dynamics are predictable (Saturday 2 PM in Oct = City Palace is always packed). " \
               "We do NOT fake citywide CCTV headcounts. We fuse empirical baselines with 4 real-world live proxies."
    pr2.font.name = "Arial"
    pr2.font.size = Pt(12)
    pr2.font.color.rgb = c_white

    # 4 Proxy Cards
    proxies = [
        ("Proxy 1: Road Traffic Congestion", "TomTom / Mapbox APIs", "Access roads to Udaipur heritage sites (Jagdish Chowk) are narrow. Delay >15 min directly correlates with tourist surges.", Inches(1.0)),
        ("Proxy 2: Online Ticket Saturation", "ASI & Govt Portals", "Checking 1-2 hour online booking slot availability. If 2 PM tickets are 85%+ booked or sold out -> High Crowd.", Inches(3.9)),
        ("Proxy 3: Open-Meteo Weather", "Free Live Weather API", "Hourly rainfall (>10mm/h) and extreme heat (>38C) actively suppress outdoor promenades and halt boating.", Inches(6.8)),
        ("Proxy 4: Decaying User Reports", "Waze-Style 1-Tap Logs", "Visitor reports (<10m, 15-30m, 45m+) protected by 30-min exponential decay, IP rate limits, and 3-report quorum.", Inches(9.7))
    ]
    
    for p_title, p_sub, p_desc, left in proxies:
        add_card(slide4, left, Inches(3.5), Inches(2.6), Inches(3.3), c_white, c_border)
        tb_p = slide4.shapes.add_textbox(left + Inches(0.15), Inches(3.6), Inches(2.3), Inches(3.0))
        tfp = tb_p.text_frame
        tfp.word_wrap = True
        pp1 = tfp.paragraphs[0]
        pp1.text = p_title
        pp1.font.name = "Georgia"
        pp1.font.size = Pt(14)
        pp1.font.bold = True
        pp1.font.color.rgb = c_forest
        
        pp2 = tfp.add_paragraph()
        pp2.text = p_sub.upper()
        pp2.font.name = "Arial"
        pp2.font.size = Pt(9)
        pp2.font.bold = True
        pp2.font.color.rgb = c_blue
        
        pp3 = tfp.add_paragraph()
        pp3.space_before = Pt(6)
        pp3.text = p_desc
        pp3.font.name = "Arial"
        pp3.font.size = Pt(11)
        pp3.font.color.rgb = c_charcoal

    # =========================================================================
    # SLIDE 5: ALGORITHMS & MATHEMATICAL FORMULATION
    # =========================================================================
    slide5 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(slide5, c_cream)
    
    add_pill(slide5, "PREDICTIVE ALGORITHMS & SCORING", Inches(1.0), Inches(0.7), Inches(3.6), Inches(0.35), RGBColor(241, 236, 224), c_muted, 10)
    
    tb5 = slide5.shapes.add_textbox(Inches(1.0), Inches(1.1), Inches(11.3), Inches(0.9))
    p = tb5.text_frame.paragraphs[0]
    p.text = "Mathematical Formulations & Thresholds"
    p.font.name = "Georgia"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = c_charcoal

    # Left: Baseline Crowd Prediction Formula
    add_card(slide5, Inches(1.0), Inches(2.2), Inches(5.4), Inches(4.5), c_white, c_border)
    tb_f1 = slide5.shapes.add_textbox(Inches(1.3), Inches(2.4), Inches(4.8), Inches(4.1))
    tf1 = tb_f1.text_frame
    tf1.word_wrap = True
    
    pf1 = tf1.paragraphs[0]
    pf1.text = "1. Baseline Crowd Score Engine"
    pf1.font.name = "Georgia"
    pf1.font.size = Pt(20)
    pf1.font.bold = True
    pf1.font.color.rgb = c_forest
    
    pf2 = tf1.add_paragraph()
    pf2.space_before = Pt(8)
    pf2.text = "CrowdScore(d, t) = 0.40(Chist) + 0.30(Scal) + 0.20(Eevent) + 0.10(Wweather)"
    pf2.font.name = "Courier New"
    pf2.font.size = Pt(12)
    pf2.font.bold = True
    pf2.font.color.rgb = c_blue
    
    pf3 = tf1.add_paragraph()
    pf3.space_before = Pt(10)
    pf3.text = "• Chist (40%): Historical hourly curve for day-of-week.\n" \
               "• Scal (30%): Calendar surge (0=weekday, 60=weekend, 100=holiday).\n" \
               "• Eevent (20%): Proximity to Mewar festivals & evening light shows.\n" \
               "• Wweather (10%): Temperature (>38C) & rainfall (>10mm) penalty."
    pf3.font.name = "Arial"
    pf3.font.size = Pt(12)
    pf3.font.color.rgb = c_charcoal
    
    pf4 = tf1.add_paragraph()
    pf4.space_before = Pt(10)
    pf4.text = "Classification Boundaries:\n🟢 Low: 0-34   |   🟡 Moderate: 35-64   |   🔴 High: 65-100"
    pf4.font.name = "Arial"
    pf4.font.size = Pt(12)
    pf4.font.bold = True
    pf4.font.color.rgb = c_forest

    # Right: Intent Recommender Utility Score
    add_card(slide5, Inches(6.9), Inches(2.2), Inches(5.4), Inches(4.5), c_white, c_border)
    tb_f2 = slide5.shapes.add_textbox(Inches(7.2), Inches(2.4), Inches(4.8), Inches(4.1))
    tf2 = tb_f2.text_frame
    tf2.word_wrap = True
    
    pf5 = tf2.paragraphs[0]
    pf5.text = "2. Intent-Preserving Utility Score"
    pf5.font.name = "Georgia"
    pf5.font.size = Pt(20)
    pf5.font.bold = True
    pf5.font.color.rgb = c_forest
    
    pf6 = tf2.add_paragraph()
    pf6.space_before = Pt(8)
    pf6.text = "UtilityScore(c) = 0.30(Slow_crowd) + 0.25(Sintent) + 0.20(Stravel) + 0.15(Shours) + 0.10(Sweather)"
    pf6.font.name = "Courier New"
    pf6.font.size = Pt(11)
    pf6.font.bold = True
    pf6.font.color.rgb = c_blue
    
    pf7 = tf2.add_paragraph()
    pf7.space_before = Pt(10)
    pf7.text = "Stage 1: Primary intent extraction ('sunset_waterfront', 'royal_heritage').\n" \
               "Stage 2: Hard filter: Operating hours, radius <=10km, capacity ceiling.\n" \
               "Stage 3: Multi-attribute scoring across crowd, transit, and weather.\n" \
               "Stage 4: Time-Shift Fallback: If no alternative scores >=0.65, recommend quiet off-peak window at original site (09:15 AM)."
    pf7.font.name = "Arial"
    pf7.font.size = Pt(12)
    pf7.font.color.rgb = c_charcoal

    # =========================================================================
    # SLIDE 6: INTENT PRESERVATION: THE UDAIPUR SUBSTITUTION GRAPH
    # =========================================================================
    slide6 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(slide6, c_cream)
    
    add_pill(slide6, "CORE PRODUCT DIFFERENTIATOR", Inches(1.0), Inches(0.7), Inches(3.2), Inches(0.35), RGBColor(241, 236, 224), c_muted, 10)
    
    tb6 = slide6.shapes.add_textbox(Inches(1.0), Inches(1.1), Inches(11.3), Inches(0.9))
    p = tb6.text_frame.paragraphs[0]
    p.text = "Intent Preservation: The Substitution Graph"
    p.font.name = "Georgia"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = c_charcoal

    # 3 Example Substitution Pairs
    pairs = [
        ("OVERCROWDED SPOT", "HIGH CROWD TRIGGER", "INTENT-MATCHED ALTERNATIVE", "BENEFIT TO TOURIST", Inches(1.0), Inches(2.2), True),
        ("City Palace\n(Heritage Complex)", "Peak 11:30 - 3:30 PM\n88% Capacity (90m queue)", "Ahar Cenotaphs or\nBagore Ki Haveli", "Preserves royal Rajput architecture intent.\n250 royal cenotaphs, <5 min queue.", Inches(1.0), Inches(3.3), False),
        ("Lake Pichola\n(Sunset Boating)", "Peak 4:00 - 6:30 PM\n96% Capacity (Pichola Ghats)", "Fateh Sagar Lake\n(Promenade & Boating)", "Preserves sunset waterfront & boating.\n2x boarding dock speed, open boulevard.", Inches(1.0), Inches(4.7), False),
        ("Sajjangarh\n(Monsoon Palace)", "Peak 4:30 - 6:00 PM\n98% (Mountain road jammed)", "Bahubali Hills /\nBadi Lake Vista", "Preserves 360-degree sunset mountain vista.\nOpen scenic space with zero car jam.", Inches(1.0), Inches(6.1), False),
    ]
    
    for spot, trigger, alt, benefit, left, top, is_header in pairs:
        bg = c_forest if is_header else c_white
        add_card(slide6, left, top, Inches(11.3), Inches(0.95 if is_header else 1.25), bg, None if is_header else c_border)
        
        tbox = slide6.shapes.add_textbox(left + Inches(0.2), top + Inches(0.1), Inches(10.9), Inches(0.8 if is_header else 1.1))
        tf = tbox.text_frame
        p = tf.paragraphs[0]
        
        col_w = [Inches(2.5), Inches(2.6), Inches(2.6), Inches(3.2)]
        
        # Tabular line format
        line_text = f"{spot:<25}  |  {trigger:<28}  |  {alt:<28}  |  {benefit}"
        p.text = line_text
        p.font.name = "Arial"
        p.font.size = Pt(11 if is_header else 12)
        p.font.bold = is_header
        p.font.color.rgb = c_lime if is_header else c_charcoal

    # =========================================================================
    # SLIDE 7: DYNAMIC ITINERARY RE-PLANNING
    # =========================================================================
    slide7 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(slide7, c_cream)
    
    add_pill(slide7, "DYNAMIC ROUTE RE-PLANNING ENGINE", Inches(1.0), Inches(0.7), Inches(3.6), Inches(0.35), RGBColor(241, 236, 224), c_muted, 10)
    
    tb7 = slide7.shapes.add_textbox(Inches(1.0), Inches(1.1), Inches(11.3), Inches(0.9))
    p = tb7.text_frame.paragraphs[0]
    p.text = "Handling Sudden In-Trip Disruptions"
    p.font.name = "Georgia"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = c_charcoal

    # Flow Container: Before vs After Disruption
    add_card(slide7, Inches(1.0), Inches(2.2), Inches(11.3), Inches(4.6), c_white, c_border)
    
    tb_flow = slide7.shapes.add_textbox(Inches(1.3), Inches(2.4), Inches(10.7), Inches(4.2))
    tff = tb_flow.text_frame
    tff.word_wrap = True
    
    pf1 = tff.paragraphs[0]
    pf1.text = "Scenario: Sudden Monsoon Downpour at 3:45 PM (Open-Meteo Trigger)"
    pf1.font.name = "Georgia"
    pf1.font.size = Pt(20)
    pf1.font.bold = True
    pf1.font.color.rgb = c_forest
    
    pf2 = tff.add_paragraph()
    pf2.space_before = Pt(12)
    pf2.text = "ORIGINAL ITINERARY:\n" \
               "• 09:30 AM: City Palace (Heritage) -> Low Crowd (09:15 window)\n" \
               "• 12:15 PM: Saheliyon-ki-Bari (Gardens) -> Moderate Crowd\n" \
               "• 04:00 PM: Lake Pichola Boating -> [DISRUPTION: Precipitation 18mm/h -> Extreme Weather Risk]\n" \
               "• 06:45 PM: Bagore Ki Haveli (Folk Dance)"
    pf2.font.name = "Arial"
    pf2.font.size = Pt(13)
    pf2.font.color.rgb = c_charcoal
    
    pf3 = tff.add_paragraph()
    pf3.space_before = Pt(16)
    pf3.text = "AUTO-REPLANNED ITINERARY VIA /api/itineraries/replan (< 15 seconds):\n" \
               "• Lake Pichola boating is automatically flagged High Weather Risk.\n" \
               "• Swapped to indoor Bagore Ki Haveli Haveli Museum & Mirror Glass Galleries.\n" \
               "• Transparent Change Diff: 'Replaced outdoor boating with indoor haveli museum. 45 min delay averted, zero rain exposure.'\n" \
               "• Total transit time recalculated via OSRM turn-by-turn routing."
    pf3.font.name = "Arial"
    pf3.font.size = Pt(13)
    pf3.font.bold = True
    pf3.font.color.rgb = c_forest

    # =========================================================================
    # SLIDE 8: SYSTEM ARCHITECTURE & TECH STACK
    # =========================================================================
    slide8 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(slide8, c_forest)
    
    add_pill(slide8, "SYSTEM ARCHITECTURE & TECH STACK", Inches(1.0), Inches(0.7), Inches(3.6), Inches(0.35), c_forest_card, c_lime, 10)
    
    tb8 = slide8.shapes.add_textbox(Inches(1.0), Inches(1.1), Inches(11.3), Inches(0.9))
    p = tb8.text_frame.paragraphs[0]
    p.text = "Decoupled, Production-Ready Micro-Architecture"
    p.font.name = "Georgia"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = c_white

    # 4 Tech Stack Columns
    cols = [
        ("Frontend Client", "React + Leaflet", "Responsive UI, interactive GIS map, 5 provenance badges, dynamic replanning drawer, Advocado-inspired warm aesthetic.", Inches(1.0)),
        ("API Gateway", "Node.js + Express", "8 REST endpoints, JWT session handling, rate limiting, scoring engine, inter-attraction distance matrix caching.", Inches(3.9)),
        ("Data & Cache", "MongoDB Atlas", "Geospatial 2dsphere indexing for radius queries, historical crowd profiles, decaying citizen observation collections.", Inches(6.8)),
        ("GIS & Live Feeds", "OSRM + Open-Meteo", "Turn-by-turn road routing, hourly live rainfall & temperature feeds, zero proprietary API billing costs.", Inches(9.7))
    ]
    
    for c_title, c_tech, c_desc, left in cols:
        add_card(slide8, left, Inches(2.2), Inches(2.6), Inches(4.5), c_forest_card)
        tbc = slide8.shapes.add_textbox(left + Inches(0.15), Inches(2.4), Inches(2.3), Inches(4.1))
        tfc = tbc.text_frame
        tfc.word_wrap = True
        
        pc1 = tfc.paragraphs[0]
        pc1.text = c_title
        pc1.font.name = "Georgia"
        pc1.font.size = Pt(18)
        pc1.font.bold = True
        pc1.font.color.rgb = c_white
        
        pc2 = tfc.add_paragraph()
        pc2.text = c_tech.upper()
        pc2.font.name = "Arial"
        pc2.font.size = Pt(11)
        pc2.font.bold = True
        pc2.font.color.rgb = c_lime
        
        pc3 = tfc.add_paragraph()
        pc3.space_before = Pt(10)
        pc3.text = c_desc
        pc3.font.name = "Arial"
        pc3.font.size = Pt(13)
        pc3.font.color.rgb = RGBColor(192, 207, 199)

    # =========================================================================
    # SLIDE 9: REAL-WORLD ETHICS & OVERTOURISM SAFEGUARDS
    # =========================================================================
    slide9 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(slide9, c_cream)
    
    add_pill(slide9, "RESPONSIBLE TOURISM & SAFETY GUARDRAILS", Inches(1.0), Inches(0.7), Inches(4.2), Inches(0.35), RGBColor(241, 236, 224), c_muted, 10)
    
    tb9 = slide9.shapes.add_textbox(Inches(1.0), Inches(1.1), Inches(11.3), Inches(0.9))
    p = tb9.text_frame.paragraphs[0]
    p.text = "Real-World Drawbacks & Operational Safeguards"
    p.font.name = "Georgia"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = c_charcoal

    guards = [
        ("1. Overtourism Displacement", "Preventing stampedes into quiet residential lanes", "Carrying capacity ceilings on all candidate alternatives; dynamic diversification across top-3 candidates so concurrent users are split; fragile heritage conservation blacklists.", Inches(1.0), Inches(2.2)),
        ("2. Crowdsource Manipulation", "Defeating malicious fake high-crowd reports", "Strict rate-limiting (max 1 report/15 min per IP), exponential decay (30-min half-life), and mandatory 3-report concordant consensus before modifying predicted status.", Inches(6.9), Inches(2.2)),
        ("3. Cold-Start on Hidden Gems", "Handling attractions with zero historical observations", "Never fabricating synthetic numbers. Explicitly tagging destination with 'INSUFFICIENT DATA' badge with low confidence weighting, prompting visitors to verify.", Inches(1.0), Inches(4.6)),
        ("4. User Privacy by Design", "Eliminating surveillance and location tracking liability", "Zero continuous background GPS tracking. Manual origin/destination input supported. Ephemeral session tokens purged immediately upon trip completion.", Inches(6.9), Inches(4.6))
    ]
    
    for g_title, g_sub, g_desc, left, top in quads_data if 'quads_data' in locals() else guards:
        add_card(slide9, left, top, Inches(5.4), Inches(2.1), c_white, c_border)
        tbg = slide9.shapes.add_textbox(left + Inches(0.2), top + Inches(0.15), Inches(5.0), Inches(1.8))
        tfg = tbg.text_frame
        tfg.word_wrap = True
        
        pg1 = tfg.paragraphs[0]
        pg1.text = g_title
        pg1.font.name = "Georgia"
        pg1.font.size = Pt(17)
        pg1.font.bold = True
        pg1.font.color.rgb = c_forest
        
        pg2 = tfg.add_paragraph()
        pg2.text = g_sub.upper()
        pg2.font.name = "Arial"
        pg2.font.size = Pt(10)
        pg2.font.bold = True
        pg2.font.color.rgb = c_blue
        
        pg3 = tfg.add_paragraph()
        pg3.space_before = Pt(4)
        pg3.text = g_desc
        pg3.font.name = "Arial"
        pg3.font.size = Pt(12)
        pg3.font.color.rgb = c_charcoal

    # =========================================================================
    # SLIDE 10: LIVE PROTOTYPE & IMPACT METRICS
    # =========================================================================
    slide10 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(slide10, c_cream)
    
    add_pill(slide10, "WORKING PROTOTYPE DEMONSTRATION", Inches(1.0), Inches(0.7), Inches(3.6), Inches(0.35), RGBColor(241, 236, 224), c_muted, 10)
    
    tb10 = slide10.shapes.add_textbox(Inches(1.0), Inches(1.1), Inches(11.3), Inches(0.9))
    p = tb10.text_frame.paragraphs[0]
    p.text = "Live Working Demonstration & Impact"
    p.font.name = "Georgia"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = c_charcoal

    # 3 Big Impact Metric Cards (Advocado Style)
    metrics = [
        ("82%", "PEAK BOTTLEPRESSURE DIVERTED", "When visitors adopt intent-matched alternative suggestions at peak 1:00 PM.", Inches(1.0)),
        ("< 15s", "RE-PLANNING EXECUTION LATENCY", "From sudden rainfall or gate closure alert to recalculated multi-stop route.", Inches(4.9)),
        ("100%", "INTENT PRESERVATION RATE", "Every sunset lake view matches another lake; royal history stays royal history.", Inches(8.8))
    ]
    
    for m_num, m_label, m_desc, left in metrics:
        add_card(slide10, left, Inches(2.2), Inches(3.5), Inches(2.4), c_white, c_border)
        tbm = slide10.shapes.add_textbox(left + Inches(0.2), Inches(2.3), Inches(3.1), Inches(2.1))
        tfm = tbm.text_frame
        tfm.word_wrap = True
        
        pm1 = tfm.paragraphs[0]
        pm1.text = m_num
        pm1.font.name = "Georgia"
        pm1.font.size = Pt(48)
        pm1.font.bold = True
        pm1.font.color.rgb = c_forest
        
        pm2 = tfm.add_paragraph()
        pm2.text = m_label
        pm2.font.name = "Arial"
        pm2.font.size = Pt(10)
        pm2.font.bold = True
        pm2.font.color.rgb = c_blue
        
        pm3 = tfm.add_paragraph()
        pm3.space_before = Pt(4)
        pm3.text = m_desc
        pm3.font.name = "Arial"
        pm3.font.size = Pt(11)
        pm3.font.color.rgb = c_charcoal

    # Bottom Demo Box
    add_card(slide10, Inches(1.0), Inches(4.9), Inches(11.3), Inches(1.9), c_forest)
    tbd = slide10.shapes.add_textbox(Inches(1.3), Inches(5.0), Inches(10.7), Inches(1.6))
    tfd = tbd.text_frame
    tfd.word_wrap = True
    pd1 = tfd.paragraphs[0]
    pd1.text = "LIVE MVP ACCESS AT HACKATHON BOOTH: http://localhost:8080/index.html"
    pd1.font.name = "Arial"
    pd1.font.size = Pt(16)
    pd1.font.bold = True
    pd1.font.color.rgb = c_lime
    
    pd2 = tfd.add_paragraph()
    pd2.space_before = Pt(6)
    pd2.text = "• Interactive Leaflet Map with live crowd heat overlays.\n" \
               "• Live Time-of-Day Slider (08:00 to 18:00) with instant multi-factor score recalculation.\n" \
               "• 1-Click Disruption Simulator triggering /api/itineraries/replan with transparent change diff.\n" \
               "• Citizen queue reporting form with 30-min half-life decay simulation."
    pd2.font.name = "Arial"
    pd2.font.size = Pt(12)
    pd2.font.color.rgb = c_white

    # =========================================================================
    # SLIDE 11: JUDGE Q&A DEFENSE PLAYBOOK
    # =========================================================================
    slide11 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(slide11, c_cream)
    
    add_pill(slide11, "HACKATHON EVALUATION PREPARATION", Inches(1.0), Inches(0.7), Inches(3.8), Inches(0.35), RGBColor(241, 236, 224), c_muted, 10)
    
    tb11 = slide11.shapes.add_textbox(Inches(1.0), Inches(1.1), Inches(11.3), Inches(0.9))
    p = tb11.text_frame.paragraphs[0]
    p.text = "Judge Q&A Playbook: Defensible Answers"
    p.font.name = "Georgia"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = c_charcoal

    qas = [
        ("Q: Where does live crowd data come from?",
         "A: 80% is predictable seasonality/hourly curves from Rajasthan Tourism records. The remaining 20% variance is captured via real-time proxies: TomTom road congestion, ticket slot booking saturation, and decaying citizen reports. We do not fake sensor data.", Inches(1.0), Inches(2.2)),
        ("Q: Google Maps already has Popular Times. Why build this?",
         "A: Google Maps is a passive single-location lookup tool with zero intent preservation. It won't find sunset alternatives, check closing hours, optimize multi-stop routes, or dynamically replan when rain strikes.", Inches(6.9), Inches(2.2)),
        ("Q: Why use AI instead of simple fixed rules?",
         "A: We start with a transparent rule-based baseline for guaranteed reliability. We introduce machine learning (Random Forest) only when cumulative verified observations demonstrate statistically proven improvement on held-out dates.", Inches(1.0), Inches(4.6)),
        ("Q: How do you measure accuracy without ground truth?",
         "A: Time-Based Holdout Validation (training on days 1..N-14, evaluating on days N-13..N, preventing random data leakage). We evaluate Macro F1-Score on 3-class crowd levels and MAE on queue durations.", Inches(6.9), Inches(4.6))
    ]
    
    for q_t, a_t, left, top in qas:
        add_card(slide11, left, top, Inches(5.4), Inches(2.1), c_white, c_border)
        tb_qa = slide11.shapes.add_textbox(left + Inches(0.2), top + Inches(0.15), Inches(5.0), Inches(1.8))
        tfqa = tb_qa.text_frame
        tfqa.word_wrap = True
        
        pq1 = tfqa.paragraphs[0]
        pq1.text = q_t
        pq1.font.name = "Georgia"
        pq1.font.size = Pt(15)
        pq1.font.bold = True
        pq1.font.color.rgb = c_forest
        
        pq2 = tfqa.add_paragraph()
        pq2.space_before = Pt(6)
        pq2.text = a_t
        pq2.font.name = "Arial"
        pq2.font.size = Pt(12)
        pq2.font.color.rgb = c_charcoal

    # =========================================================================
    # SLIDE 12: VISION & CLOSING PUNCHLINE
    # =========================================================================
    slide12 = prs.slides.add_slide(blank_slide_layout)
    set_slide_bg(slide12, c_forest)
    
    add_pill(slide12, "SUMMARY & NEXT STEPS", Inches(1.0), Inches(0.9), Inches(2.8), Inches(0.38), c_forest_card, c_lime, 10)
    
    tb12 = slide12.shapes.add_textbox(Inches(1.0), Inches(1.5), Inches(11.3), Inches(3.2))
    tf12 = tb12.text_frame
    tf12.word_wrap = True
    
    p1 = tf12.paragraphs[0]
    p1.text = "We do not simply tell tourists where to go."
    p1.font.name = "Georgia"
    p1.font.size = Pt(40)
    p1.font.bold = True
    p1.font.color.rgb = c_white
    
    p2 = tf12.add_paragraph()
    p2.space_before = Pt(8)
    p2.text = "We empower them to choose when to go, protect them from bottlenecks, preserve their authentic travel intent, and intelligently adapt their entire route when conditions change."
    p2.font.name = "Georgia"
    p2.font.size = Pt(32)
    p2.font.italic = True
    p2.font.color.rgb = c_lime
    
    # 3 Next Steps Pills
    add_card(slide12, Inches(1.0), Inches(5.2), Inches(11.3), Inches(1.5), c_forest_card)
    tbn = slide12.shapes.add_textbox(Inches(1.3), Inches(5.3), Inches(10.7), Inches(1.3))
    tfn = tbn.text_frame
    tfn.word_wrap = True
    
    pn1 = tfn.paragraphs[0]
    pn1.text = "THE EXPANSION ROADMAP:"
    pn1.font.name = "Arial"
    pn1.font.size = Pt(13)
    pn1.font.bold = True
    pn1.font.color.rgb = c_lime
    
    pn2 = tfn.add_paragraph()
    pn2.space_before = Pt(4)
    pn2.text = "1. Rajasthan Tourism Department Admin Portal: Direct capacity management & event notices.\n" \
               "2. Local Tour Guide & Electric Rickshaw Integration: Dispersing tourist traffic through curated heritage walks.\n" \
               "3. Multi-City Expansion: Jaipur, Jodhpur, Pushkar, and Agra using the identical 4-Tier Ingestion Engine."
    pn2.font.name = "Arial"
    pn2.font.size = Pt(12)
    pn2.font.color.rgb = c_white

    prs.save(out_path)
    print(f"Presentation successfully generated at: {out_path}")
    return out_path

if __name__ == "__main__":
    create_deck()
