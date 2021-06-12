# %%

import json
import requests

from itertools import chain, groupby

from icecream import ic

from bs4 import BeautifulSoup

# %%

ROOT_PATH = "https://catalogbucuresti.info"

# %%


def get_root():
    response = requests.request("GET", ROOT_PATH)
    response.raise_for_status()
    return response.content


# %%

soup = BeautifulSoup(get_root(), features="html.parser")

script = soup.find("script").contents[0]

# %%
lines = script.split("\n")

# TODO: this should be a lot safer
areas_str = lines[1].strip()
places_str = lines[2].strip()

# %%


def get_json(s):
    s = s.split("=")[1]
    s = "".join(s.split("'")[1:])
    s = "".join(s.split(")")[:-1])

    return json.loads(s)


areas = get_json(areas_str)
places = get_json(places_str)

ic(len(places))
zones_from_places = {int(z) for z in places.keys()}
# zones_from_areas = {int(a["id"]) for a in areas}
zones_from_areas = {a["name"] for a in areas}

ic(sorted(zones_from_areas))


# ic(zones_from_areas - zones_from_places)

places = [*chain(*places.values())]

with open("areas.json", "w", encoding="utf-8") as fh:
    json.dump(areas, fh, sort_keys=True, indent=2)

with open("places.json", "w", encoding="utf-8") as fh:
    json.dump(places, fh, sort_keys=True, indent=2)

zone = dict(groupby(areas, key=lambda p: p["id"]))

ic(len(areas))
ic(len(places))
ic(len(zone))

# ic(areas[0].keys())
# ic(places.keys())

# %%
print("== DONE ==")
