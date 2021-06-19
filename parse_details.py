#%%
import os
import json
import random

from icecream import ic

from bs4 import BeautifulSoup

# ----------------------------------------------------------

#%%

HTML_DETAILS_ROOT = "./details-html"

html_files = os.listdir(HTML_DETAILS_ROOT)
ids = [int(p.split(".")[0]) for p in html_files]

ic(len(html_files))


# %%


def parse_detail(id: int) -> dict:
    try:
        with open(f"{HTML_DETAILS_ROOT}/{id}.html", "r", encoding="utf-8") as fh:
            soup = BeautifulSoup(fh.read(), features="html.parser")

        # IMAGES
        # ------------------------------------------------------
        images_soup = soup.find("div", "main-image-c").find_all("img")
        images = [a["src"] for a in images_soup]

        # ZONA
        # ------------------------------------------------------
        zona = soup.find("h4").text.replace("Zona", "").strip()

        # PROFIL ??
        # ------------------------------------------------------
        profil = (
            soup.find("ul", "nav").text.replace("Profil (", "").replace(")", "").strip()
        )
        profil = int(profil)

        # PANELS
        # ------------------------------------------------------
        panels = soup.find_all("div", "panel")
        panels = {
            p.find("h6", "panel-title")
            .text.strip(): p.find("div", "panel-body")
            .children
            for p in panels
        }

        panels = {p[0]: [i for i in p[1] if i.name == "div"] for p in panels.items()}
        panels = {
            p[0]: {
                i.find("label")
                .text.strip(): i.find("div", "attribute-value")
                .text.strip()
                for i in p[1]
            }
            for p in panels.items()
        }

        # ------------------------------------------------------
        result = {
            "id": id,
            "zona": zona,
            "images": images,
            "profil": profil,
            **panels,
        }

        # print(result)
        return result
    except:
        ic(f"Error on {id}")
        raise


# ----------------------------------------------------------

# id = 2501
# id = random.choice(ids)

# with open(f"./details-json/{id}.json", "w", encoding="utf-8") as fh:
#     json.dump(parse_detail(id), fh, sort_keys=True, indent=2, ensure_ascii=False)

# ----------------------------------------------------------

details = [parse_detail(id) for id in ids]

with open("details.json", "w", encoding="utf-8") as fh:
    json.dump(details, fh, sort_keys=True, indent=2, ensure_ascii=False)

print("== DONE ==")

# %%

with open("details.json", "r", encoding="utf-8") as fh:
    details = json.loads(fh.read())

# %%

base_keys = set()

for d in details:
    for k, subs in d.items():

        for s in subs.keys():
            k = k.lower().replace(" ", "-")
            s = s.lower().replace(" ", "-")
            base_keys.add(f"{k}|{s}")

ic(base_keys)

