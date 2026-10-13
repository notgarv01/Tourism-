# -*- coding: utf-8 -*-
"""
Smart Tourism Intelligence System (Udaipur CrowdWise)
Unified Master Blueprint & Comprehensive Implementation Guide
Synthesized from:
1. smart_tourism_intelligence_blueprint.pdf
2. tourist_crowd_app_challenges_and_solutions.pdf
3. Udaipur_Tourist_Crowd_Prediction_Hackathon_Guide.pdf
"""

import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """
    Two-pass canvas to dynamically compute total pages and render running headers and footers.
    Uses pure ASCII characters to guarantee crisp font rendering across all PDF viewers.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        page_width, page_height = letter

        # Running header on pages > 1
        if self._pageNumber > 1:
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(colors.HexColor("#1E293B"))
            self.drawString(38, page_height - 24, "SMART TOURISM INTELLIGENCE SYSTEM")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#64748B"))
            self.drawRightString(page_width - 38, page_height - 24, "Unified Master Blueprint & Hackathon Guide")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.6)
            self.line(38, page_height - 28, page_width - 38, page_height - 28)

        # Running footer on all pages
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.6)
        self.line(38, 30, page_width - 38, 30)

        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        self.drawString(38, 19, "Udaipur CrowdWise Pilot | Technical, Algorithmic & Sourcing Blueprint")
        self.drawRightString(page_width - 38, 19, f"Page {self._pageNumber} of {page_count}")
        self.restoreState()


def build_pdf(filename="Unified_Smart_Tourism_Crowd_Prediction_Master_Blueprint.pdf"):
    pdf_path = os.path.join(r"c:\Users\hp\Desktop\Tourism", filename)
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=38,
        rightMargin=38,
        topMargin=26,
        bottomMargin=26
    )

    printable_width = letter[0] - 76  # 536 pt

    # Base Styles
    styles = getSampleStyleSheet()

    # Custom Color Palettes
    c_primary = colors.HexColor("#0F172A")    # Deep Navy
    c_accent = colors.HexColor("#0284C7")     # Ocean Blue
    c_dark = colors.HexColor("#1E293B")       # Slate
    c_body = colors.HexColor("#334155")       # Charcoal Body
    c_border = colors.HexColor("#CBD5E1")     # Light border

    # Paragraph Styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=19,
        leading=23,
        textColor=c_primary,
        alignment=0,
        spaceAfter=3
    )

    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=c_accent,
        spaceAfter=8
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15.5,
        textColor=c_primary,
        spaceBefore=7,
        spaceAfter=3,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=c_accent,
        spaceBefore=7,
        spaceAfter=3,
        keepWithNext=True
    )

    h3_style = ParagraphStyle(
        'SectionH3',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.6,
        leading=11.5,
        textColor=c_dark,
        spaceBefore=5,
        spaceAfter=2,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.0,
        leading=11.1,
        textColor=c_body,
        spaceAfter=3.5
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=10.7,
        textColor=c_body,
        leftIndent=11,
        firstLineIndent=-7,
        spaceAfter=2
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.6,
        leading=10,
        textColor=colors.white,
        alignment=0
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.4,
        leading=9.8,
        textColor=c_dark
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.4,
        leading=9.8,
        textColor=c_primary
    )

    callout_style = ParagraphStyle(
        'CalloutText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=10.8,
        textColor=colors.HexColor("#0C4A6E")
    )

    code_style = ParagraphStyle(
        'CodeSnippet',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=7.0,
        leading=9.2,
        textColor=colors.HexColor("#0F172A")
    )

    story = []

    def make_callout(text, title="KEY ARCHITECTURAL PRINCIPLE", bg_color="#F0F9FF", border_color="#0284C7"):
        content = [
            Paragraph(f"<b>{title}:</b> {text}", ParagraphStyle('inner_callout', parent=callout_style, textColor=colors.HexColor("#0369A1")))
        ]
        t = Table([[content]], colWidths=[printable_width])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor(bg_color)),
            ('BOX', (0,0), (-1,-1), 1, colors.HexColor(border_color)),
            ('TOPPADDING', (0,0), (-1,-1), 4.5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4.5),
            ('LEFTPADDING', (0,0), (-1,-1), 7),
            ('RIGHTPADDING', (0,0), (-1,-1), 7),
        ]))
        return t

    def make_table(header_row, data_rows, col_widths):
        formatted_header = [Paragraph(col, table_header_style) for col in header_row]
        formatted_data = []
        for r_idx, row in enumerate(data_rows):
            f_row = []
            for c_idx, cell in enumerate(row):
                if isinstance(cell, str):
                    if c_idx == 0:
                        f_row.append(Paragraph(cell, table_cell_bold))
                    else:
                        f_row.append(Paragraph(cell, table_cell_style))
                else:
                    f_row.append(cell)
            formatted_data.append(f_row)

        table_data = [formatted_header] + formatted_data
        t = Table(table_data, colWidths=col_widths, repeatRows=1)
        ts = [
            ('BACKGROUND', (0, 0), (-1, 0), c_primary),
            ('ALIGN', (0, 0), (-1, 0), 'LEFT'),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('TOPPADDING', (0, 0), (-1, -1), 3),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
            ('LEFTPADDING', (0, 0), (-1, -1), 4),
            ('RIGHTPADDING', (0, 0), (-1, -1), 4),
            ('GRID', (0, 0), (-1, -1), 0.5, c_border),
        ]
        for i in range(1, len(table_data)):
            if i % 2 == 0:
                ts.append(('BACKGROUND', (0, i), (-1, i), colors.HexColor("#F8FAFC")))
            else:
                ts.append(('BACKGROUND', (0, i), (-1, i), colors.white))

        t.setStyle(TableStyle(ts))
        return t

    # ==========================================
    # HEADER BANNER & METADATA
    # ==========================================
    story.append(Paragraph("SMART TOURISM & CROWD PREDICTION SYSTEM", title_style))
    story.append(Paragraph("<b>Unified Master Technical Blueprint, Algorithmic Engine & Operational Guide</b><br/>"
                           "<i>Comprehensive Synthesis of Systems Blueprint, Challenges & Mitigations Brief, and Udaipur Pilot Guide</i>", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=c_accent, spaceBefore=0, spaceAfter=7))

    meta_data = [
        [
            Paragraph("<b>Pilot Destination:</b> Udaipur, Rajasthan", table_cell_style),
            Paragraph("<b>Target Domain:</b> Predictive Tourism Engine", table_cell_style),
            Paragraph("<b>Evaluation:</b> Hackathon & Production MVP", table_cell_style),
            Paragraph("<b>Methodology:</b> Hybrid Baseline & Provenance", table_cell_style)
        ]
    ]
    t_meta = Table(meta_data, colWidths=[printable_width*0.27, printable_width*0.28, printable_width*0.23, printable_width*0.22])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F1F5F9")),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 5.5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5.5),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 6))

    # ==========================================
    # 1. EXECUTIVE SUMMARY & FOUNDATIONAL VISION
    # ==========================================
    story.append(Paragraph("1. Executive Summary & Foundational System Vision", h1_style))
    story.append(Paragraph(
        "Modern tourism experiences severe structural inefficiencies: visitors disproportionately congregate at premier heritage monuments "
        "and waterfronts at predictable peak hours, generating multi-hour queues, vehicular gridlock, and degraded visitor experiences. "
        "Concurrently, high-value alternative cultural and leisure assets remain under-visited, and municipal authorities lack unified "
        "decision intelligence to forecast and redistribute crowd pressure.",
        body_style
    ))
    story.append(Paragraph(
        "<b>Core Product Thesis:</b> This platform is an intelligent <i>Tourism Decision Engine</i>--not a passive tourist directory, static map, or generic chatbot. "
        "It empowers travelers and destination managers by resolving four fundamental real-time inquiries:",
        body_style
    ))
    story.append(Paragraph("&bull; <b>Where should I go?</b> Curated destination discovery filtered by deep traveler intent, physical accessibility, and real-time site status.", bullet_style))
    story.append(Paragraph("&bull; <b>When should I go?</b> Granular hourly crowd forecasting that isolates high-pressure surges from quiet visiting windows.", bullet_style))
    story.append(Paragraph("&bull; <b>How crowded will it be?</b> Explainable, multi-signal crowd density projections (Low / Moderate / High) accompanied by explicit confidence metrics.", bullet_style))
    story.append(Paragraph("&bull; <b>If conditions change, what is the best next step?</b> Dynamic multi-stop itinerary replanning that preserves user intent, accounts for transit times, and routes away from emerging bottlenecks.", bullet_style))

    story.append(Spacer(1, 4))
    story.append(make_callout(
        "The system enforces a strict 'Zero-Fake AI' doctrine. The application never synthesizes artificial real-time headcounts or masquerades historical patterns as live CCTV feeds. Every crowd metric displayed carries an immutable provenance badge (Live, Recent, Historical, Predicted, or Simulated) with timestamps and data source attribution.",
        title="CORE CREDIBILITY DOCTRINE (ZERO-FAKE AI)",
        bg_color="#FEF2F2",
        border_color="#DC2626"
    ))
    story.append(Spacer(1, 5))

    story.append(Paragraph("Scope of Synthesis Across Source Documents", h2_style))
    story.append(Paragraph(
        "This master document systematically merges the three foundational inputs: (1) <i>Smart Tourism Intelligence Blueprint</i> (system architecture, 8 endpoints, dynamic routing, and data freshness); "
        "(2) <i>Challenges, Drawbacks & Practical Solutions Brief</i> (risk engineering, overtourism fragility, cold-start mitigation, and 12 judge defenses); "
        "and (3) <i>Udaipur Tourist Crowd Prediction Guide</i> (Udaipur pilot dataset, 0-100 baseline heuristic formula, observation schema, and Open-Meteo integration). "
        "Where problems overlap, this blueprint extracts and implements the most rigorous, production-grade solution.",
        body_style
    ))
    story.append(Spacer(1, 8))

    # ==========================================
    # 2. COMPARATIVE PROBLEM-SOLUTION MATRIX
    # ==========================================
    story.append(Paragraph("2. Comparative Problem-Solution Synthesis Matrix", h1_style))
    story.append(Paragraph(
        "A rigorous comparative audit of all three source documents reveals key development dilemmas. "
        "The matrix below contrasts the individual proposals and articulates the synthesized best-in-class solution adopted:",
        body_style
    ))

    synth_headers = ["Domain & Challenge", "Blueprint Proposal (Doc 1)", "Risk Brief Proposal (Doc 2)", "Udaipur Guide (Doc 3)", "Synthesized Best-in-Class Solution & Engineering Rationale"]
    synth_data = [
        [
            "1. Scarcity of Hourly Crowd Data",
            "Use historical weekly profiles; seek operator ties; test demo UI with synthetic data.",
            "Start small; use validated public data; timestamped user reports; never treat missing as low.",
            "4 data methods: 30-min volunteer logs, visitor form, operator records, holiday feeds; full schema.",
            "<b>4-Tier Ingestion & Live Proxy Pipeline:</b> Merges standardized schemas with 4 live proxy signals: road congestion (TomTom/OSM), ticket slot booking saturation, live popular times, and decaying citizen reports."
        ],
        [
            "2. Dynamic Crowd Prediction",
            "Baseline rules: Day + Hour + Holiday + Weather; 1-3h horizon; compare error.",
            "Combine calendar, weather, recent reports; show confidence; evaluate vs baseline.",
            "Weighted formula: 40% hist + 30% wkd/hol + 20% event + 10% weather; low/mod/high thresholds.",
            "<b>Calibrated 0-100 Heuristic Model:</b> Adopts Doc 3's explicit normalized weighting formula and category thresholds, enhanced with Doc 1's 1-3h forecast window and Doc 2's time-based holdout validation."
        ],
        [
            "3. Alternative Place Recommendation",
            "Recommend comparable category & distance; multi-factor scoring; avoid single spot.",
            "Match primary experience first (sunset, heritage); filter by distance/time; offer quiet slot fallback.",
            "Rank by proximity, open status, interest fit; candidate Udaipur alternatives listed.",
            "<b>Experience-Preserving Intent Matching:</b> Adopts Doc 2's intent preservation (e.g. sunset for sunset). If no qualified alternative exists, triggers a 'Time-Shift' recommendation at original site rather than an irrelevant site."
        ],
        [
            "4. Overtourism & Fragility Risks",
            "Add capacity/fragility constraints to candidate scoring.",
            "Deep analysis of displacement risks to quiet/residential sites; exclude fragile sites.",
            "Responsible filters; avoid unsafe or environmentally sensitive areas.",
            "<b>Fragility & Carrying Capacity Ceilings:</b> Implements hard site capacity ceilings, dynamic alternative diversification (spreading users across top-3 alternatives), and fragile heritage blacklists."
        ],
        [
            "5. Sudden Disruptions & Replanning",
            "Dynamic itinerary replanning endpoints (/api/itineraries/replan); 5 stress scenarios.",
            "User-triggered refresh; clear input change diffs; no unverified live claims.",
            "Single alternative place + quieter time slot recommendation.",
            "<b>Multi-Stop Dynamic Itinerary Re-Router:</b> Adopts Doc 1's full route permutation optimization and 5 stress scenarios, paired with Doc 2's transparent change diffing."
        ],
        [
            "6. Computer Vision & CCTV Feasibility",
            "OSIRIS reality check; camera view != whole site; YOLO zone counter; fallback to unknown.",
            "Warns against claiming fake live camera counts; stick to verified observations.",
            "Not included in MVP; focus on verified observations.",
            "<b>Bounded Entrance Gateway Module (Stretch):</b> Clarifies CCTV as a localized entrance gate counter only (Doc 1), strictly privacy-compliant (no facial tracking), falling back to baseline when feed degrades."
        ],
        [
            "7. Crowdsource Noise & Manipulation",
            "Treat user reports as noisy; apply moderation & decay.",
            "Timestamp enforcement; duplicate & spike detection; rate limits; plausibility checks.",
            "Store sample_count & anonymous session IDs in crowd report collection.",
            "<b>Integrity Crowdsourcing Engine:</b> Synthesizes Doc 2's duplicate/rate limiting with Doc 3's sample tracking and an exponential half-life decay function (30-min half-life, 3-report consensus)."
        ]
    ]

    t_synth = make_table(
        synth_headers,
        synth_data,
        [printable_width*0.16, printable_width*0.19, printable_width*0.20, printable_width*0.20, printable_width*0.25]
    )
    story.append(t_synth)
    story.append(Spacer(1, 8))

    # ==========================================
    # 3. DATA ARCHITECTURE, PROVENANCE & PROXIES
    # ==========================================
    story.append(Paragraph("3. Data Architecture, Sourcing Pipelines & Provenance Standards", h1_style))
    story.append(Paragraph(
        "A major vulnerability in tourism prediction prototypes is ambiguous data origin. "
        "The architecture establishes a 4-Tier Data Pipeline with empirical live proxies and a mandatory 5-Badge Provenance Taxonomy.",
        body_style
    ))

    story.append(Paragraph("A. Real-Time Crowd Sourcing: The 4-Tier Ingestion & Live Proxy Pipeline", h2_style))
    story.append(Paragraph(
        "Where does real-time crowd data genuinely come from? Instead of claiming impossible citywide satellite or CCTV sensors, "
        "the architecture fuzes verified historical baselines with four pragmatic, defensible real-time proxy signals:",
        body_style
    ))
    story.append(Paragraph("&bull; <b>Tier 1: Verified Historical Baselines (80% Weight):</b> Curated hourly profiles for 15-30 core attractions mapped across day-of-week, peak tourist season (Oct-March in Rajasthan), and calendar holiday cycles.", bullet_style))
    story.append(Paragraph("&bull; <b>Tier 2A: Surrounding Road Traffic Congestion Proxy (Live Signal):</b> Monitored via TomTom/OSM Traffic APIs. Narrow heritage access lanes (e.g. Jagdish Chowk approaching City Palace) experience severe vehicular delays (>15 min) directly proportional to tourist footfall surges.", bullet_style))
    story.append(Paragraph("&bull; <b>Tier 2B: Online Ticketing / Slot Availability Proxy (Live Signal):</b> Querying Rajasthan Tourism and ASI online booking portal saturation. Time slots that reach 85%+ booking or 'Sold Out' status trigger an automatic High Crowd state.", bullet_style))
    story.append(Paragraph("&bull; <b>Tier 2C: Live Weather Contextual Signals (Live Feed):</b> Automated Open-Meteo ingestion (precipitation, heat index >38C, rain alerts) to adjust outdoor promenade and lake boating capacity dynamically.", bullet_style))
    story.append(Paragraph("&bull; <b>Tier 3: Crowdsourced Queue Micro-Reporting (Waze-Style Signal):</b> 1-tap visitor reports ('Queue: <10m | 15-30m | 45m+'). Protected by IP/session rate limits and an exponential half-life decay function (30-min half-life, 3-report consensus).", bullet_style))
    story.append(Paragraph("&bull; <b>Tier 4: Bounded Entrance Gate Flow Counting (Optional Edge Hardware / CCTV):</b> Localized person detection at monitored ticket turnstiles using edge YOLOv8, calculating ingress rate (persons/min). Zero video or facial storage.", bullet_style))

    story.append(Spacer(1, 4))
    story.append(Paragraph("B. The 5-Badge Data Provenance Standard", h2_style))
    story.append(Paragraph(
        "Every UI element that displays crowd metrics must include a visual indicator badge corresponding to exactly one of the following states:",
        body_style
    ))

    badge_headers = ["Badge Label", "Visual Styling", "Definition & Criteria", "Permitted UI Claims & Constraints"]
    badge_data = [
        ["LIVE", "Green (Pill)", "Verified direct hardware sensor, ticket turnstile count, or CCTV gate count updated within <15 mins.", "May claim 'Current Measured Flow'. Must specify exact gate/camera zone."],
        ["RECENT", "Teal (Pill)", "3+ concordant crowdsourced visitor reports or volunteer logs submitted within 15-45 mins.", "Display as 'Recent Visitor Report (N=X)'. Shows timestamp."],
        ["HISTORICAL", "Slate (Pill)", "Baseline crowd pattern derived from empirical seasonal, day-of-week, and hourly averages.", "Display as 'Typical Pattern'. Never label as real-time occupancy."],
        ["PREDICTED", "Blue (Pill)", "Algorithmic synthesis combining historical baseline, calendar events, and hourly weather forecast.", "Display as 'Forecast (Confidence: X%)'. Show input factors in tooltip."],
        ["SIMULATED", "Purple (Pill)", "Synthetic or scenario-generated data utilized for demo validation or crowd redistribution modeling.", "Mandatory disclaimer: 'Demo Simulation Mode - Not Measured Data'."]
    ]
    t_badges = make_table(badge_headers, badge_data, [printable_width*0.14, printable_width*0.15, printable_width*0.41, printable_width*0.30])
    story.append(t_badges)
    story.append(Spacer(1, 5))

    story.append(Paragraph("C. Canonical Data Schemas", h2_style))
    story.append(Paragraph("<b>1. Destination Entity Schema (MongoDB Collection: destinations):</b>", h3_style))

    schema_dest_text = (
        "{\n"
        '  "_id": "UDR_001", "name": "City Palace", "category": "Heritage",\n'
        '  "experience_tags": ["royal_architecture", "museum", "scenic_overlook", "courtyards"],\n'
        '  "coordinates": { "lat": 24.5764, "lng": 73.6835 },\n'
        '  "opening_hours": { "open": "09:00", "close": "17:30", "last_entry": "16:30" },\n'
        '  "avg_visit_duration_min": 150, "capacity_ceiling": 2500, "fragility_index": 0.35,\n'
        '  "accessibility": { "wheelchair": "partial", "stairs_required": true },\n'
        '  "official_source": "https://www.tourism.rajasthan.gov.in/udaipur.html", "last_verified": "2026-10-10T08:00:00Z"\n'
        "}"
    )
    story.append(Paragraph(schema_dest_text.replace('\n', '<br/>').replace(' ', '&nbsp;'), code_style))

    story.append(Spacer(1, 3))
    story.append(Paragraph("<b>2. Crowd Observation Dataset Schema (MongoDB Collection: crowd_observations):</b>", h3_style))
    schema_obs_text = (
        "{\n"
        '  "_id": "OBS_99421", "destination_id": "UDR_001", "observed_at": "2026-10-17T11:30:00Z",\n'
        '  "crowd_score": 78, "crowd_level": "High", "temperature_c": 31.4, "rainfall_mm": 0.0,\n'
        '  "is_weekend": true, "is_holiday": false, "event_nearby": false,\n'
        '  "data_provenance": "PREDICTED", // LIVE | RECENT | HISTORICAL | PREDICTED | SIMULATED\n'
        '  "sample_count": 8, "confidence_score": 0.84\n'
        "}"
    )
    story.append(Paragraph(schema_obs_text.replace('\n', '<br/>').replace(' ', '&nbsp;'), code_style))
    story.append(Spacer(1, 8))

    # ==========================================
    # 4. PREDICTIVE MODELING & ALGORITHMS
    # ==========================================
    story.append(Paragraph("4. Predictive Modeling & Recommendation Logic", h1_style))
    story.append(Paragraph(
        "The algorithmic core separates prediction from recommendation: crowd forecasting estimates future density, while the "
        "decision engine determines how the traveler should optimize their itinerary based on that forecast.",
        body_style
    ))

    story.append(Paragraph("A. Baseline Heuristic Crowd Forecasting Formulation", h2_style))
    story.append(Paragraph(
        "When real-time sensor streams are sparse, the system utilizes a robust, deterministic multi-factor formula. "
        "Each input is normalized to the [0, 100] interval before linear combination:",
        body_style
    ))

    formula_text = (
        "<b>CrowdScore(d, t) = 0.40 * C<sub>hist</sub>(d, dow, hr) + 0.30 * S<sub>cal</sub>(t) + 0.20 * E<sub>event</sub>(d, t) + 0.10 * W<sub>weather</sub>(t)</b><br/><br/>"
        "&bull; <b>C<sub>hist</sub>(d, dow, hr):</b> Historical density baseline for destination <i>d</i> at specific day-of-week and hour.<br/>"
        "&bull; <b>S<sub>cal</sub>(t):</b> Calendar surge factor (0 for regular weekday, 60 for standard weekend, 100 for major national/state holidays).<br/>"
        "&bull; <b>E<sub>event</sub>(d, t):</b> Local event proximity modifier (Mewar Festival, Shilpgram Crafts Fair, lake light shows).<br/>"
        "&bull; <b>W<sub>weather</sub>(t):</b> Weather penalty index (heat wave &gt;38C or heavy rain &gt;10mm/h suppresses outdoor lake visits; pleasant 22C boosts crowds).<br/><br/>"
        "<b>Classification Boundaries:</b><br/>"
        "&bull; <b>Low Crowd:</b> Score 0 to 34 &nbsp;|&nbsp; <b>Moderate Crowd:</b> Score 35 to 64 &nbsp;|&nbsp; <b>High Crowd:</b> Score 65 to 100"
    )
    story.append(make_callout(formula_text, title="MATHEMATICAL BASELINE FORMULA & THRESHOLDS", bg_color="#F8FAFC", border_color="#0D9488"))
    story.append(Spacer(1, 5))

    story.append(Paragraph("B. Machine Learning Classification Pipeline (When Observations Exist)", h2_style))
    story.append(Paragraph(
        "When cumulative empirical observations exceed 500 validated samples, a tabular classifier (Random Forest or Gradient Boosted Decision Tree) "
        "is engaged via a Python microservice. The model predicts 3-class crowd levels based on engineered features:",
        body_style
    ))
    story.append(Paragraph("&bull; <b>Feature Vector:</b> `[dest_id_encoded, hour_of_day, day_of_week, is_weekend, is_holiday, temp_c, precip_mm, event_radius_km, rolling_3hr_crowd_mean]`", bullet_style))
    story.append(Paragraph("&bull; <b>Validation Strategy:</b> Strict <i>Time-Based Holdout Split</i> (training on days 1..N-14, testing on days N-13..N). Random cross-validation is strictly forbidden as near-duplicate hourly temporal records cause severe optimistic leakage.", bullet_style))
    story.append(Paragraph("&bull; <b>Evaluation Metrics:</b> Macro F1-Score, Balanced Accuracy, and Multiclass Confusion Matrix evaluated against the simple baseline.", bullet_style))

    story.append(Spacer(1, 3))
    story.append(Paragraph("C. Experience-Preserving Alternative Recommender Algorithm", h2_style))
    story.append(Paragraph(
        "A common flaw in crowd navigation apps is recommending an irrelevant destination simply because it is empty. "
        "The recommender algorithm enforces <b>Intent Preservation</b> across four sequential stages:",
        body_style
    ))
    story.append(Paragraph("1. <b>Primary Experience Extraction:</b> Identify user's active intent (e.g., 'Sunset & Waterfront', 'Royal Heritage & Museums', 'Quiet Gardens').", bullet_style))
    story.append(Paragraph("2. <b>Hard Constraint Filtering:</b> Eliminate candidates that are currently closed, exceed maximum travel distance (>10 km), or exceed site fragility thresholds.", bullet_style))
    story.append(Paragraph("3. <b>Multi-Attribute Utility Scoring:</b> Rank surviving candidates via:", bullet_style))

    score_rec = (
        "<b>UtilityScore(c) = 0.30 * S<sub>low_crowd</sub> + 0.25 * S<sub>experience_fit</sub> + 0.20 * S<sub>travel_time</sub> + 0.15 * S<sub>hours_fit</sub> + 0.10 * S<sub>weather_safety</sub></b>"
    )
    story.append(Paragraph(score_rec, code_style))
    story.append(Paragraph("4. <b>Time-Shift Fallback:</b> If no candidate achieves UtilityScore >= 0.65, do not offer an unappealing alternative. Instead, recommend an <i>Optimal Quiet Time Window</i> at the original attraction (e.g., 'Visit City Palace tomorrow at 09:15 AM before tour buses arrive').", bullet_style))

    story.append(Spacer(1, 3))
    story.append(Paragraph("D. Dynamic Multi-Stop Itinerary Planner & Re-Router", h2_style))
    story.append(Paragraph(
        "For multi-destination day tours, the system calculates full visit permutation orders minimizing a joint cost function: "
        "<i>Cost = TravelTime(routes) + w1 * PredictedCrowdExposure + w2 * OpeningHourViolations</i>. "
        "If an in-trip disruption occurs (e.g., flash rainfall at Fateh Sagar or extreme ticket queue at City Palace), the `/api/itineraries/replan` "
        "service recalculates remaining stops, swaps in an experience-matched alternative or shifts the sequence, and generates a visual explanation of the adjustment.",
        body_style
    ))
    story.append(Spacer(1, 8))

    # ==========================================
    # 5. SYSTEM ARCHITECTURE & TECH STACK
    # ==========================================
    story.append(Paragraph("5. System Architecture & Recommended Tech Stack", h1_style))
    story.append(Paragraph(
        "The system employs a decoupled, production-ready micro-architecture designed for rapid deployment, sub-200ms API response times, "
        "and complete server-side isolation of private credentials and routing tokens.",
        body_style
    ))

    arch_headers = ["Layer", "Selected Technology", "Architectural Role", "Engineering Justification"]
    arch_data = [
        ["Frontend UI", "React.js + Vite + Tailwind CSS", "Responsive tourist app, interactive maps, crowd cards, badge tags, replan drawer.", "Fast build cycle, lightweight bundle, rapid responsive component styling."],
        ["Mapping / GIS", "Leaflet + OpenStreetMap Tiles", "Geographic rendering of attractions, crowd heat overlays, and transit routes.", "Zero API licensing cost, open data compliance, excellent mobile touch support."],
        ["Backend API Gateway", "Node.js + Express.js", "REST endpoints, JWT session handling, rate-limiting, caching, scoring pipeline.", "High concurrent I/O throughput, single-language JS stack for MVP speed."],
        ["Database Layer", "MongoDB Atlas", "Document stores for destinations, observation series, user reports, and saved itineraries.", "Flexible schema for diverse metadata, 2dsphere indexing for geospatial radius queries."],
        ["Routing Engine", "OSRM / OpenRouteService", "Turn-by-turn driving & walking transit durations and distances between stops.", "Avoids expensive Google Directions API billing; open-source routing algorithms."],
        ["Weather Service", "Open-Meteo API", "Hourly precipitation, ambient temperature, heat index, and 7-day forecast.", "Completely free open API, no API key required, reliable historical and forecast endpoints."],
        ["ML Microservice (Optional)", "Python + FastAPI + Scikit-Learn", "Executes Random Forest / tabular inference when observation volume justifies it.", "Kept isolated from core Express server; deployed only if ML model beats baseline."],
        ["Computer Vision (Stretch)", "OpenCV + YOLOv8 Edge Node", "Anonymous ingress/egress counting at entrance chokepoint video streams.", "Zone-restricted detection; counts aggregated to numbers; zero video or facial storage."]
    ]
    t_arch = make_table(arch_headers, arch_data, [printable_width*0.16, printable_width*0.22, printable_width*0.34, printable_width*0.28])
    story.append(t_arch)
    story.append(Spacer(1, 6))

    # ==========================================
    # 6. REST API SPECIFICATION
    # ==========================================
    story.append(Paragraph("6. Complete REST API Specification", h1_style))
    story.append(Paragraph(
        "The backend exposes 8 RESTful endpoints engineered with input validation, caching headers, and structured error envelopes.",
        body_style
    ))

    api_headers = ["HTTP Method & Route", "Parameters / Body", "Primary Response Payload", "Description & Guardrails"]
    api_data = [
        [
            "GET /api/places",
            "Query: area=udaipur & category=all & wheelchair=false",
            "{ places: [ { id, name, category, coords, hours, tags, fragility } ] }",
            "Returns verified attraction catalog with metadata. Cached for 24 hours."
        ],
        [
            "GET /api/crowd/predict",
            "Query: placeId=UDR_001 & date=2026-10-17 & time=11:00",
            "{ placeId, crowdScore: 78, crowdLevel: 'High', provenance: 'PREDICTED', confidence: 0.85, factors: { hist: 80, cal: 90, weather: 60 } }",
            "Calculates crowd density. Returns factors explaining prediction."
        ],
        [
            "GET /api/crowd/best-time",
            "Query: placeId=UDR_001 & date=2026-10-17",
            "{ placeId, date, recommendedWindows: [ { start: '09:00', end: '11:00', crowdLevel: 'Low' } ] }",
            "Returns optimal low-crowd visiting slots respecting attraction opening hours."
        ],
        [
            "GET /api/alternatives/:placeId",
            "Query: maxDistKm=8 & targetExperience=heritage",
            "{ originalPlace, alternatives: [ { id, name, utilityScore, crowdLevel, transitMin, experienceFit } ] }",
            "Ranks experience-matched alternatives. Fallback to time-shift if none qualify."
        ],
        [
            "POST /api/itineraries/plan",
            "Body: { startTime, endTime, placeIds: [...], mobility, interests }",
            "{ itinerary: [ { stopIndex, placeId, arrivalTime, visitMin, crowdRisk } ], totalTravelMin }",
            "Generates crowd-optimized multi-stop sequence minimizing queue and transit."
        ],
        [
            "POST /api/itineraries/replan",
            "Body: { currentItinerary, disruptionType: 'RAIN'|'CROWD_SURGE', location }",
            "{ revisedItinerary, changeDiff: { replacedStop, newStop, reason: 'High queue surge detected' } }",
            "Recalculates remaining stops on disruption with transparent diff explanation."
        ],
        [
            "POST /api/reports/crowd",
            "Body: { placeId, crowdRating: 1|2|3, sessionHash, userLat, userLng }",
            "{ success: true, message: 'Report accepted', newSampleCount: 9 }",
            "Submits citizen crowd report. Rate-limited to 1 report / 15 min / IP / place."
        ],
        [
            "GET /api/health",
            "None",
            "{ status: 'OK', database: 'connected', weatherApi: 'reachable', uptimeSec: 86400 }",
            "System liveness probe and third-party API connectivity monitor."
        ]
    ]
    t_api = make_table(api_headers, api_data, [printable_width*0.22, printable_width*0.23, printable_width*0.30, printable_width*0.25])
    story.append(t_api)
    story.append(Spacer(1, 8))

    # ==========================================
    # 7. UDAIPUR PILOT IMPLEMENTATION
    # ==========================================
    story.append(Paragraph("7. Udaipur Pilot Implementation & Destination Catalog", h1_style))
    story.append(Paragraph(
        "To ensure hackathon credibility, the system is grounded in a verified catalog of core attractions in Udaipur, Rajasthan. "
        "The catalog maps each attraction to its primary experience category, baseline capacity, and viable substitution candidates:",
        body_style
    ))

    udr_headers = ["Attraction Name", "Category & Experience", "Operating Hours", "Peak Density Hours", "Viable Alternative Substitutes (Experience-Matched)"]
    udr_data = [
        [
            "City Palace (UDR_001)",
            "Royal Heritage, Museum, Panoramic Overlook",
            "09:00 - 17:30 (Daily)",
            "11:00 - 15:30 (Weekends/Holidays)",
            "<b>Ahar Museum & Cenotaphs</b> (Historical Architecture, Low Crowd) or <b>Bagore Ki Haveli</b> (Lakefront Heritage Museum)."
        ],
        [
            "Lake Pichola (UDR_002)",
            "Waterfront, Boating, Sunset Scenic",
            "06:00 - 18:30 (Boating till 17:00)",
            "16:00 - 18:30 (Sunset surge)",
            "<b>Fateh Sagar Lake</b> (Expansive waterfront promenade, sunset boating, less congested boarding) or <b>Dudh Talai</b>."
        ],
        [
            "Fateh Sagar Lake (UDR_003)",
            "Lakefront Promenade, Outdoor, Street Food",
            "Open 24/7 (Boating 08:00 - 18:00)",
            "17:00 - 20:30 (Evening walking/food)",
            "<b>Nehru Garden</b> (Island park within lake) or <b>Purohito Ka Talab</b> (Scenic quiet lakefront, 12 km)."
        ],
        [
            "Saheliyon-ki-Bari (UDR_004)",
            "Royal Gardens, Fountains, Relaxed Walk",
            "09:00 - 19:00 (Daily)",
            "11:30 - 14:00 (Tourist coaches)",
            "<b>Gulab Bagh (Rose Garden)</b> (Vast heritage park, shaded walking) or <b>Sajjangarh Biological Park</b>."
        ],
        [
            "Sajjangarh / Monsoon Palace (UDR_005)",
            "Mountain Vista, Sunset Panorama, Heritage",
            "09:00 - 18:00 (Daily)",
            "16:30 - 18:15 (Sunset bottleneck)",
            "<b>Bahubali Hills / Badi Lake</b> (Scenic sunset panoramic view, open nature) or <b>Karni Mata Ropeway Viewpoint</b>."
        ],
        [
            "Ahar Cenotaphs & Museum (UDR_006)",
            "Royal Memorials, Ancient History, Peaceful",
            "10:00 - 17:00 (Closed Mondays)",
            "Rarely congested (Consistently Low)",
            "Primary high-utility substitute for overcrowded City Palace history buffs seeking authentic Mewar architecture."
        ]
    ]
    t_udr = make_table(udr_headers, udr_data, [printable_width*0.18, printable_width*0.21, printable_width*0.15, printable_width*0.18, printable_width*0.28])
    story.append(t_udr)
    story.append(Spacer(1, 5))

    story.append(Paragraph("Experience Substitution Graph Rationale", h2_style))
    story.append(Paragraph(
        "A naive algorithm might recommend a quiet botanical nursery when a tourist wants to see City Palace. That creates friction. "
        "Our experience substitution graph links attractions by <i>Experiential Equivalence</i>. Ahar Cenotaphs offers striking Rajput royal marble architecture "
        "and centuries of Mewar royal history without the crush of 2,000 visitors in narrow Palace corridors. Similarly, Fateh Sagar Lake matches the sunset boat ride "
        "experience of Lake Pichola while operating twice the boat boarding capacity. Intent is preserved, crowding is diffused.",
        body_style
    ))
    story.append(Spacer(1, 8))

    # ==========================================
    # 8. REAL-WORLD DRAWBACKS & MITIGATIONS
    # ==========================================
    story.append(Paragraph("8. Real-World Drawbacks, Failure Modes & Robust Mitigations", h1_style))
    story.append(Paragraph(
        "Engineering an honest, robust application requires pre-empting real-world vulnerabilities. "
        "The following operational guardrails are embedded into the core system:",
        body_style
    ))

    risk_headers = ["Identified Real-World Risk", "Operational & User Impact", "Algorithmic & Technical Mitigation"]
    risk_data = [
        [
            "1. Trust Erosion via False Low Predictions",
            "Tourist arrives at an attraction predicted 'Low' to find long queues, causing immediate user abandonment.",
            "Display confidence intervals, source recency, and sample size. Avoid exact headcounts; clearly frame output as an estimated likelihood. Prompt users to contribute real-time queue reports."
        ],
        [
            "2. Overtourism Displacement to Fragile Sites",
            "Redirecting thousands of tourists to quiet residential areas or delicate monuments causes local disruption.",
            "Implement carrying capacity ceilings; exclude ecologically sensitive sites; dynamically randomize top-3 suggestions across concurrent user sessions to prevent coordinated surges."
        ],
        [
            "3. Cold Start for Hidden Attractions",
            "Lesser-known attractions have zero historical data, resulting in blank or misleading predictions.",
            "Utilize category heuristics (e.g., historical average of secondary heritage sites); explicitly label output as 'Preliminary Estimate - Limited Data'; avoid pseudo-precise numeric ratings."
        ],
        [
            "4. Spam & Manipulated Crowdsource Reports",
            "Malicious actors or competing vendors submit fake 'High Crowd' reports to divert tourists away.",
            "Enforce IP/session geofencing, maximum 1 report / 15 min, and exponential temporal decay (30-min half-life). Require a quorum of 3 concordant reports before shifting category."
        ],
        [
            "5. Escalating Routing & Map API Costs",
            "Frequent map and route calculations incur severe billing charges on commercial platforms.",
            "Rely on Leaflet and self-hosted / public OSRM / OpenRouteService instances. Cache inter-attraction transit matrices on server startup; refresh matrix only on road network alterations."
        ],
        [
            "6. Stale Operating Hours & Closures",
            "Directing visitors to an attraction that is closed for maintenance, VIP visits, or holidays.",
            "Provide an authorized Admin Dashboard for local operators; display 'Last Verified' timestamps; link directly to official Rajasthan Tourism portals for real-time verification."
        ],
        [
            "7. User Privacy & Location Tracking",
            "Continuous background GPS tracking creates legal exposure and user battery drain.",
            "Zero background geolocation tracking. Allow users to manually select destination and starting point. Transient session tokens are purged; zero retention of personal travel histories."
        ],
        [
            "8. Digital Signal Demographic Bias",
            "Smartphone crowdsource data over-represents younger tech-savvy tourists, ignoring large tour group buses.",
            "Weight tour bus arrival schedules into the calendar factor (S_cal); calibrate baseline historical data using official ticket counter figures rather than raw mobile telemetry."
        ]
    ]
    t_risk = make_table(risk_headers, risk_data, [printable_width*0.22, printable_width*0.34, printable_width*0.44])
    story.append(t_risk)
    story.append(Spacer(1, 8))

    # ==========================================
    # 9. JUDGE Q&A PLAYBOOK
    # ==========================================
    story.append(Paragraph("9. Judge Q&A Playbook: 12 Defensible Answers", h1_style))
    story.append(Paragraph(
        "Hackathon juries frequently scrutinize data realism, AI claims, and competitive differentiation. "
        "The team should deliver the following defensible, battle-tested responses:",
        body_style
    ))

    qa_list = [
        ("Q1: Where does real-time crowd data actually come from? Can you genuinely get live occupancy without proprietary government sensors?",
         "Answer: Yes, via a pragmatic 4-tier hybrid pipeline. 80% of crowd dynamics are deterministic (historical weekly patterns, seasonality, calendar holidays, and Open-Meteo weather). The remaining 20% dynamic variance is captured via empirical real-time proxies: road traffic congestion surrounding the site (TomTom/OSM APIs), official ticket slot booking saturation rates, and Waze-style decaying citizen reports. We never fabricate sensor readings; we fuse verified proxies with transparent provenance badges."),

        ("Q2: Google Maps already has 'Popular Times'. Why does your application need to exist?",
         "Answer: Google Maps is a passive lookup tool for single locations--it does not understand tourist intent. If you want a sunset lake view and Lake Pichola is packed, Google won't automatically find you an equivalent sunset waterfront like Fateh Sagar, check whether it's currently open, optimize transit time, and dynamically re-order your entire 4-stop afternoon itinerary."),

        ("Q3: Why use an AI or machine learning model instead of simple fixed rules?",
         "Answer: We start with an explicit, transparent rule-based baseline for guaranteed reliability. We introduce machine learning (Random Forest) only when cumulative verified observations demonstrate a statistically measurable improvement over the baseline on held-out test dates."),

        ("Q4: How do you mathematically measure whether your predictions are accurate?",
         "Answer: We perform Time-Based Holdout Validation on historical observations (e.g., training on earlier weeks and evaluating on later weeks, avoiding random data leakage). We evaluate Macro F1-Score on 3-class crowd levels (Low/Mod/High) and Mean Absolute Error on queue duration."),

        ("Q5: What happens if a tourist specifically wants a sunset view and you suggest an indoor museum?",
         "Answer: That is an architectural failure our system explicitly prevents through Intent Preservation. Our recommender matches experience tags first ('sunset_waterfront'). If no alternative sunset spot is feasible, we do NOT recommend an irrelevant museum; we offer a 'Time-Shift' recommendation at the original site."),

        ("Q6: If everyone uses your app, won't you just create a massive crowd at the alternative location?",
         "Answer: We prevent coordinated displacement through dynamic alternative diversification. The system scores candidate alternatives and distributes concurrent user sessions across the top-3 candidates. Furthermore, we enforce site carrying capacity ceilings and fragility thresholds."),

        ("Q7: How do you prevent malicious users from spamming fake crowd reports?",
         "Answer: Community reporting is guarded by session hashing, strict rate-limiting (max 1 report per 15 min per attraction), and an exponential half-life decay function (30-min half-life). A single report is never treated as ground truth; a quorum of 3 concordant reports is required to shift predicted status."),

        ("Q8: What if an attraction has no data at all (Cold-Start Problem)?",
         "Answer: We never guess or display an unsubstantiated score. The system displays an 'Insufficient Data' badge, applies category-level baselines with low confidence weighting, and prompts on-site visitors to submit the first verified observation."),

        ("Q9: What if all alternative attractions are predicted to be crowded?",
         "Answer: We do not promise an empty city. The engine transparently informs the user that overall regional pressure is High, suggests shifting visit hours (e.g., early morning tomorrow), or identifies the least-crowded alternative while clearly stating expected wait times."),

        ("Q10: Are you storing user location histories or violating privacy?",
         "Answer: Absolutely not. The platform does not track background GPS. Users can enter destinations manually. Session data is anonymous, stored in transient cache, and purged upon itinerary completion."),

        ("Q11: Can a working prototype of this actually be built within a 24-48 hour hackathon?",
         "Answer: Yes, because our MVP architecture is pragmatic. We use React, Node/Express, Leaflet/OSM, and Open-Meteo with verified CSV/MongoDB seed data for 15 core Udaipur attractions. Complex stretch features like YOLO CCTV edge processing are modularized and optional."),

        ("Q12: If public CCTV feeds exist (e.g., OSIRIS), why can't you just use them for real-time counts?",
         "Answer: Camera availability does not equal ground truth. A single CCTV camera view suffers from occlusions, limited angles, blind spots, and lighting degradation. It cannot count an entire complex like City Palace. Computer vision is valid only for calibrated entrance gate chokepoints.")
    ]

    for q, a in qa_list:
        story.append(Paragraph(f"<b>{q}</b>", h3_style))
        story.append(Paragraph(f"<i>{a}</i>", body_style))
        story.append(Spacer(1, 1.2))

    story.append(Spacer(1, 8))

    # ==========================================
    # 10. ROADMAP, STRESS TESTS & DEMO SCRIPT
    # ==========================================
    story.append(Paragraph("10. Hackathon Execution Roadmap, Stress Scenarios & Demo Script", h1_style))
    story.append(Paragraph(
        "To maximize team velocity and ensure an airtight demo presentation, follow this structured execution plan:",
        body_style
    ))

    story.append(Paragraph("A. 7-Phase Hackathon Sprint Roadmap", h2_style))
    phase_headers = ["Phase", "Core Deliverables & Tasks", "Success Milestone"]
    phase_data = [
        ["Phase 1: Scope & Dataset", "Curate verified metadata for 15 Udaipur destinations. Define schemas.", "Validated `destinations.json` dataset."],
        ["Phase 2: Baseline Engine", "Implement normalized 0-100 crowd score heuristic. Open-Meteo hook.", "Deterministic `/api/crowd/predict` output."],
        ["Phase 3: Recommender Core", "Build intent-preserving alternative matcher and `/api/itineraries/plan`.", "Experience-preserving alternative ranking."],
        ["Phase 4: Frontend Map & UI", "React + Leaflet map view, attraction cards, crowd badges, filter bars.", "Interactive UI displaying crowd badges."],
        ["Phase 5: Replanning Service", "Implement `/api/itineraries/replan` with disruption triggers & diffing.", "Dynamic route update on disruption."],
        ["Phase 6: Stress Validation", "Run 5 real-world stress scenarios. Test offline fallbacks.", "Zero unhandled exceptions or NaN values."],
        ["Phase 7: Demo Rehearsal", "Rehearse 5-minute judge pitch. Verify provenance badges.", "Polished, defensible, end-to-end demo."]
    ]
    t_phase = make_table(phase_headers, phase_data, [printable_width*0.22, printable_width*0.52, printable_width*0.26])
    story.append(t_phase)
    story.append(Spacer(1, 5))

    story.append(Paragraph("B. The 5 Stress Testing Scenarios", h2_style))
    story.append(Paragraph("&bull; <b>1. Peak Bottleneck at City Palace:</b> Simulate a user selecting City Palace at 13:00 on Saturday (Score 88 - High). System recommends shifting to 09:15 AM or swapping to Ahar Cenotaphs / Bagore Ki Haveli.", bullet_style))
    story.append(Paragraph("&bull; <b>2. Sudden Flash Downpour:</b> Inject Open-Meteo precipitation spike (15mm/hr). Outdoor lake boating at Lake Pichola is flagged 'Weather Alert - High Risk'; system reroutes to covered museum galleries.", bullet_style))
    story.append(Paragraph("&bull; <b>3. Unscheduled Monument Closure:</b> Flag Saheliyon-ki-Bari as closed in admin panel. System flags active itinerary, removes stop, and recalculates remaining schedule seamlessly.", bullet_style))
    story.append(Paragraph("&bull; <b>4. Late Tourist Arrival:</b> Tourist starts trip at 15:30 instead of 10:00. Engine eliminates attractions closing before arrival, recalculates visit windows, and prioritizes evening-accessible spots (Fateh Sagar, Bagore dance show).", bullet_style))
    story.append(Paragraph("&bull; <b>5. Mid-Trip Preference Pivot:</b> User switches preference from 'Museums' to 'Sunset & Relaxed'. Itinerary updates from indoor cenotaphs to Monsoon Palace viewpoint or Badi Lake waterfront.", bullet_style))

    story.append(Spacer(1, 5))
    story.append(Paragraph("C. Step-by-Step 5-Minute Pitch & Demo Storyline", h2_style))
    story.append(Paragraph("&bull; <b>Minute 0:00 - 0:45 | The Problem Hook:</b> Show photo/video of massive queues at City Palace ticket counter. Explain that tourists lose 3+ hours and authorities suffer unmanaged gridlock while nearby gems sit empty.", bullet_style))
    story.append(Paragraph("&bull; <b>Minute 0:45 - 2:00 | The Core Experience:</b> Tourist plans a 1-day Udaipur itinerary. System warns City Palace will peak at 13:00 (High Crowd - Provenance: Predicted). App suggests booking morning slot or exploring Ahar Cenotaphs.", bullet_style))
    story.append(Paragraph("&bull; <b>Minute 2:00 - 3:15 | The Differentiator (Dynamic Replanning):</b> Simulate an afternoon thunderstorm or queue spike. Trigger 'Replan My Route'. App shifts order, preserves sunset waterfront intent at Fateh Sagar, and shows why each change was made.", bullet_style))
    story.append(Paragraph("&bull; <b>Minute 3:15 - 4:15 | Architecture & Zero-Fake AI Defense:</b> Present the 4-Tier Ingestion Pipeline, Provenance Badges, and Open-Meteo integration. Show that no fake headcounts are manufactured.", bullet_style))
    story.append(Paragraph("&bull; <b>Minute 4:15 - 5:00 | Impact & Future Scale:</b> Present sustainable crowd redistribution impact, tourism board admin integration, and conclude with the master closing punchline.", bullet_style))

    story.append(Spacer(1, 5))
    story.append(Paragraph("D. Pre-Presentation Validation Checklist", h2_style))
    checklist_box = (
        "<b>[OK] 1. Provenance Integrity:</b> Every crowd metric in the UI displays an explicit badge (Live, Recent, Historical, Predicted, Simulated).<br/>"
        "<b>[OK] 2. Zero Fabricated Precision:</b> No unsupported claims of exact live headcounts without verified sensor feeds.<br/>"
        "<b>[OK] 3. Experience Preservation:</b> Alternatives match primary visitor intent (e.g., sunset for sunset).<br/>"
        "<b>[OK] 4. Transit Grounding:</b> Transit estimates reflect road routing (OSRM/OSM), not straight-line distance.<br/>"
        "<b>[OK] 5. Working Disruption Flow:</b> The itinerary replan feature works end-to-end on simulated triggers.<br/>"
        "<b>[OK] 6. Data Source Attribution:</b> Links and acknowledgments for Rajasthan Tourism and Open-Meteo are visible.<br/>"
        "<b>[OK] 7. Graceful Empty States:</b> Destinations with sparse data display 'Insufficient Data' rather than arbitrary scores.<br/>"
        "<b>[OK] 8. Privacy Compliance:</b> No mandatory user GPS tracking; destination search works entirely manually.<br/>"
        "<b>[OK] 9. Clean Architecture:</b> Backend API keys are kept server-side; client never exposes private credentials.<br/>"
        "<b>[OK] 10. Clear Pitch Narrative:</b> Team is prepared to answer all 12 Judge Playbook questions with confidence."
    )
    story.append(make_callout(checklist_box, title="FINAL HACKATHON VERIFICATION CHECKLIST", bg_color="#F0FDF4", border_color="#16A34A"))

    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1, color=c_border, spaceBefore=2, spaceAfter=4))
    story.append(Paragraph(
        "<b>Master Closing Vision:</b> <i>'We do not simply tell tourists where to go. We empower them to choose when to go, "
        "protect them from predicted bottlenecks, preserve their authentic travel intent, and intelligently adapt their entire route when real-world conditions change.'</i>",
        ParagraphStyle('ClosingQuote', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=8.2, leading=11.5, textColor=c_primary, alignment=1)
    ))

    # Build Document using NumberedCanvas
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Master Blueprint PDF successfully generated at: {pdf_path}")
    return pdf_path

if __name__ == "__main__":
    build_pdf()
