# Script to update app/data.js to use Wikimedia API titles and direct CDN URLs
# Removing all local "images/..." paths

import re

# Curated Wikimedia Commons & verified encyclopedic CDN images for each of the 25 Udaipur hotspots
DEST_API_MAP = {
    "UDR_001": {
        "wikiTitle": "City_Palace,_Udaipur",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Udaipur_City_Palace.jpg/800px-Udaipur_City_Palace.jpg"
    },
    "UDR_002": {
        "wikiTitle": "Lake_Pichola",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Udaipur_Lake_India.JPG/800px-Udaipur_Lake_India.JPG"
    },
    "UDR_003": {
        "wikiTitle": "Jagdish_Temple",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Jagdish_Temple_Udaipur.jpg/800px-Jagdish_Temple_Udaipur.jpg"
    },
    "UDR_004": {
        "wikiTitle": "Bagore-ki-Haveli",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Bagore_ki_Haveli%2C_Rajasthan.jpg/800px-Bagore_ki_Haveli%2C_Rajasthan.jpg"
    },
    "UDR_005": {
        "wikiTitle": "Gangaur_Ghat",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Gangaur_Ghat_Udaipur.jpg/800px-Gangaur_Ghat_Udaipur.jpg"
    },
    "UDR_006": {
        "wikiTitle": "Ambrai_Ghat",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Ambrai_Ghat_Udaipur_at_Dusk.jpg/800px-Ambrai_Ghat_Udaipur_at_Dusk.jpg"
    },
    "UDR_007": {
        "wikiTitle": "Fateh_Sagar_Lake",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Fatehsagar_nehrugarden.jpg/800px-Fatehsagar_nehrugarden.jpg"
    },
    "UDR_008": {
        "wikiTitle": "Saheliyon-ki-Bari",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Saheliyon-ki-Bari_Fountain.JPG/800px-Saheliyon-ki-Bari_Fountain.JPG"
    },
    "UDR_009": {
        "wikiTitle": "Monsoon_Palace",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Monsoon_Palace.jpg/800px-Monsoon_Palace.jpg"
    },
    "UDR_010": {
        "wikiTitle": "Sajjangarh_Biological_Park",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Sajjangarh_Biological_Park_Foundation_Stone.jpg/800px-Sajjangarh_Biological_Park_Foundation_Stone.jpg"
    },
    "UDR_011": {
        "wikiTitle": "Doodh_Talai_Lake",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/DoodhTalai.jpg/800px-DoodhTalai.jpg"
    },
    "UDR_012": {
        "wikiTitle": "Manikya_Lal_Verma",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Dudh_Talai_Garden_Udaipur.jpg/800px-Dudh_Talai_Garden_Udaipur.jpg"
    },
    "UDR_013": {
        "wikiTitle": "Karni_Mata,_Udaipur",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/KarniMata.jpg/800px-KarniMata.jpg"
    },
    "UDR_014": {
        "wikiTitle": "Moti_Magri",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Moti_Magri_Maharana_Pratap_Statue.jpg/800px-Moti_Magri_Maharana_Pratap_Statue.jpg"
    },
    "UDR_015": {
        "wikiTitle": "Gulab_Bagh_and_Zoo",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/GulabBagh_Entrancec.jpg/800px-GulabBagh_Entrancec.jpg"
    },
    "UDR_016": {
        "wikiTitle": "Shilpgram,_Udaipur",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Mandana_art_work_at_shilpgram.JPG/800px-Mandana_art_work_at_shilpgram.JPG"
    },
    "UDR_017": {
        "wikiTitle": "Under_the_Sun_Aquarium",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Under_The_Sun_Aquarium_Udaipur.jpg/800px-Under_The_Sun_Aquarium_Udaipur.jpg"
    },
    "UDR_018": {
        "wikiTitle": "Lake_Badi",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Bird_in_Badi_Lake.jpg/800px-Bird_in_Badi_Lake.jpg"
    },
    "UDR_019": {
        "wikiTitle": "Udai_Sagar_Lake",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Udaisagar_Lake.jpg/800px-Udaisagar_Lake.jpg"
    },
    "UDR_020": {
        "wikiTitle": "Ahar_Cenotaphs",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Ahar_Cenotaphs_Udaipur.jpg/800px-Ahar_Cenotaphs_Udaipur.jpg"
    },
    "UDR_021": {
        "wikiTitle": "Jag_Mandir",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/JagMandir.jpg/800px-JagMandir.jpg"
    },
    "UDR_022": {
        "wikiTitle": "Dhebar_Lake",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Jaisamandlake.jpg/800px-Jaisamandlake.jpg"
    },
    "UDR_023": {
        "wikiTitle": "Sahastra_Bahu_Temples",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/N-RJ-147SasBahuTemplesUdaipur-SolReyes20100922_511.JPG/800px-N-RJ-147SasBahuTemplesUdaipur-SolReyes20100922_511.JPG"
    },
    "UDR_024": {
        "wikiTitle": "Haldighati",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Haldighati_Pass.jpg/800px-Haldighati_Pass.jpg"
    },
    "UDR_025": {
        "wikiTitle": "Shrinathji_Temple",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Shrinathji_Temple_Nathdwara.jpg/800px-Shrinathji_Temple_Nathdwara.jpg"
    }
}

with open("app/data.js", "r", encoding="utf-8") as f:
    content = f.read()

for pid, info in DEST_API_MAP.items():
    # Update image
    pat_img = rf'(id:\s*"{pid}",[\s\S]*?image:\s*")[^"]+(")'
    content = re.sub(pat_img, rf'\g<1>{info["image"]}\g<2>', content)
    
    # Add wikiTitle if not present
    if f'wikiTitle: "{info["wikiTitle"]}"' not in content:
        pat_wiki = rf'(id:\s*"{pid}",\s*\n)'
        content = re.sub(pat_wiki, rf'\g<1>    wikiTitle: "{info["wikiTitle"]}",\n', content)

with open("app/data.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated app/data.js with Wikipedia API titles and Wikimedia CDN image URLs!")
